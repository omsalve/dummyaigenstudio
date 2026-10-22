import { Reveal } from "@/components/motion/Reveal";
import { consultation, servicesIndex } from "@/content/home";
import { services } from "@/content/services";
import { ServiceIndex } from "./ServiceIndex";
import styles from "./Services.module.css";

/**
 * Services: an editorial index of everything the studio makes, on ivory. A
 * big heading with its subline, then the services as a numbered list in two
 * columns (one on phones): number, name, one line, a hairline. On a desktop
 * pointer each row floats its media beside the pointer (ServiceIndex). The
 * consultation tile closes the index under the accent rule. Not to be
 * confused with ServicesSection.tsx, which feeds MassField.
 */
export function Services() {
  return (
    <section className={styles.services} aria-labelledby="services-title">
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <h2 id="services-title" className={styles.title} data-reveal>
            {servicesIndex.title}
          </h2>
          <p className={styles.subline} data-reveal>
            {servicesIndex.subline}
          </p>
        </Reveal>

        <Reveal>
          <ServiceIndex services={services} />
        </Reveal>

        <Reveal className={styles.consult}>
          <h3 className={styles.consultTitle} data-reveal>
            {consultation.title}
          </h3>
          <p className={styles.consultBody} data-reveal>
            {consultation.body}
          </p>
          <a href={consultation.href} className={styles.button} data-reveal="block">
            {consultation.label}
            <svg viewBox="0 0 18 10" width="18" height="10" aria-hidden="true">
              <path d="M0 5h16.5M12.5 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
