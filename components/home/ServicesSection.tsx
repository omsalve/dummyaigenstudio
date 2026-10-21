import { brand } from "@/content/brand";
import { massField } from "@/content/home";
import { industries } from "@/content/industries";
import { serviceGroups, services } from "@/content/services";
import { verticals } from "@/content/verticals";
import { MassField, type MassFieldGroup, type MassFieldServiceGroup } from "./MassField";

// Each practice, then its services by short name, in the services' own order.
const serviceColumn: MassFieldServiceGroup[] = serviceGroups.map((group) => ({
  name: group.name,
  items: services.filter((service) => service.group === group.id).map((service) => service.shortName),
  image: group.image.src,
}));

// Industries in the brief's vertical order, each with what LMR does for it.
const industryGroups: MassFieldGroup[] = verticals.flatMap((vertical) => {
  const industry = industries.find((entry) => entry.vertical === vertical.id);
  return industry ? [{ name: vertical.name, items: industry.offerings }] : [];
});

export function ServicesSection() {
  return (
    <MassField
      title={massField.title}
      servicesLabel={massField.servicesLabel}
      industriesLabel={massField.industriesLabel}
      tagline={massField.tagline}
      frameLabel={brand.descriptor}
      cue={massField.cue}
      notes={massField.notes}
      services={serviceColumn}
      industries={industryGroups}
    />
  );
}
