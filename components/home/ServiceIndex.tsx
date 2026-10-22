"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import type { Service } from "@/content/types";
import { NARROW_QUERY, REDUCED_MOTION_QUERY } from "@/lib/media-queries";
import { useMediaQuery } from "@/lib/use-media-query";
import styles from "./Services.module.css";

// Tuning: the floating media. Its size and shape are --thumb-w and --thumb-ratio in Services.module.css.
/** Seconds the media takes to catch up with the pointer. */
const THUMB_LAG = 0.55;
/** px between the pointer and the media's near edge. */
const THUMB_OFFSET = 28;
/** Pointers that hover precisely; touch never gets the media. Keep in sync with the CSS. */
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

interface ServiceIndexProps {
  services: readonly Service[];
}

/**
 * The numbered list of services, column by column. With a fine pointer on
 * the desktop layout, the row under the pointer shows its media as a small
 * rounded thumbnail that trails the pointer inside the row (gsap.quickTo);
 * keyboard focus on a row that links somewhere shows it at the row's end.
 * Loops only play while shown. Phones, touch and reduced motion get the list.
 */
export function ServiceIndex({ services }: ServiceIndexProps) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const narrow = useMediaQuery(NARROW_QUERY);
  const canHover = useMediaQuery(HOVER_QUERY);
  const floating = canHover && !narrow && !reducedMotion;
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!floating || !list) return;

    const unbind: (() => void)[] = [];
    // Every quickTo made here is undone by context.revert().
    const context = gsap.context(() => {
      for (const row of list.querySelectorAll<HTMLElement>("[data-row]")) {
        const thumb = row.querySelector<HTMLElement>("[data-thumb]");
        if (!thumb) continue;
        const video = thumb.querySelector("video");
        const toX = gsap.quickTo(thumb, "x", { duration: THUMB_LAG, ease: "power3" });
        const toY = gsap.quickTo(thumb, "y", { duration: THUMB_LAG, ease: "power3" });

        // Beside the pointer, flipping to its left near the row's end, and kept inside the row.
        const place = (clientX: number, clientY: number, jump: boolean) => {
          const box = row.getBoundingClientRect();
          const width = thumb.offsetWidth;
          const height = thumb.offsetHeight;
          const pointerX = clientX - box.left;
          let x = pointerX + THUMB_OFFSET;
          if (x + width > box.width) x = pointerX - THUMB_OFFSET - width;
          x = gsap.utils.clamp(0, Math.max(0, box.width - width), x);
          const y = gsap.utils.clamp(-height * 0.2, box.height - height * 0.8, clientY - box.top - height / 2);
          if (jump) gsap.set(thumb, { x, y });
          toX(x);
          toY(y);
        };
        const show = () => {
          row.dataset.hover = "";
          video?.play().catch(() => {});
        };
        const hide = () => {
          delete row.dataset.hover;
          video?.pause();
        };
        const handleEnter = (event: PointerEvent) => {
          place(event.clientX, event.clientY, true);
          show();
        };
        const handleMove = (event: PointerEvent) => place(event.clientX, event.clientY, false);
        const handleFocus = () => {
          const box = row.getBoundingClientRect();
          place(box.right, box.top + box.height / 2, true);
          show();
        };

        row.addEventListener("pointerenter", handleEnter);
        row.addEventListener("pointermove", handleMove);
        row.addEventListener("pointerleave", hide);
        row.addEventListener("focusin", handleFocus);
        row.addEventListener("focusout", hide);
        unbind.push(() => {
          row.removeEventListener("pointerenter", handleEnter);
          row.removeEventListener("pointermove", handleMove);
          row.removeEventListener("pointerleave", hide);
          row.removeEventListener("focusin", handleFocus);
          row.removeEventListener("focusout", hide);
          hide();
        });
      }
    }, list);

    return () => {
      for (const off of unbind) off();
      context.revert();
    };
  }, [floating]);

  return (
    <ol
      ref={listRef}
      className={styles.list}
      style={{ "--rows": Math.ceil(services.length / 2) } as CSSProperties}
    >
      {services.map((service, index) => (
        <li key={service.name} className={styles.row} data-row data-reveal="block">
          <span className={styles.number} aria-hidden="true">
            {pad(index + 1)}
          </span>
          <div>
            <p className={styles.name}>
              {service.href ? (
                <a href={service.href} className={styles.link}>
                  {service.name}
                </a>
              ) : (
                service.name
              )}
            </p>
            <p className={styles.line}>{service.line}</p>
          </div>
          {service.media && (
            <span className={styles.thumb} data-thumb aria-hidden="true">
              {service.media.kind === "video" ? (
                <video
                  className={styles.thumbMedia}
                  src={service.media.src}
                  poster={service.media.poster}
                  style={{ objectPosition: service.media.focus }}
                  muted
                  loop
                  playsInline
                  preload="none"
                />
              ) : (
                <Image
                  className={styles.thumbMedia}
                  src={service.media.src}
                  alt=""
                  fill
                  sizes="15rem"
                  style={{ objectPosition: service.media.focus }}
                />
              )}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
