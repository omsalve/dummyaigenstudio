import { brand } from "@/content/brand";
import styles from "./BrandLockup.module.css";

interface BrandLockupProps {
  className?: string;
}

/**
 * [SCAFFOLD] Stand-in for the scaffold's BrandLockup, which wasn't in this
 * repo. Renders the lockup's label (name over descriptor, as on the palette
 * board). Swap for the real component; Hero only uses it as a label.
 */
export function BrandLockup({ className }: BrandLockupProps) {
  return (
    <p className={className ? `${styles.label} ${className}` : styles.label}>
      <span>{brand.name}</span>
      <span className="sr-only">, </span>
      <span>{brand.descriptor}</span>
    </p>
  );
}
