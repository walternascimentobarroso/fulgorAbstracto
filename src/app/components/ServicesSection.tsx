import {
  CodeBracketIcon,
  ServerStackIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import type { Dictionary } from "../dictionaries";
import SectionHeading from "./SectionHeading";

type Props = {
  dict: Dictionary["services"];
};

const icons = [CodeBracketIcon, ServerStackIcon, WrenchScrewdriverIcon];

const ServicesSection = ({ dict }: Props) => {
  return (
    <section id="services" className="py-20 scroll-mt-28">
      <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
      <ul className="grid gap-6 md:grid-cols-3">
        {dict.items.map((service, index) => {
          const Icon = icons[index];
          return (
            <li
              key={service.title}
              className="group rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur p-8 transition hover:-translate-y-1 hover:border-primary-400 hover:shadow-xl hover:shadow-primary-900/10"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white mb-6 shadow-lg shadow-primary-600/30">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {service.text}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ServicesSection;
