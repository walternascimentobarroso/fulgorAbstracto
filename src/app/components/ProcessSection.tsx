import SectionHeading from "./SectionHeading";
import type { Dictionary } from "../dictionaries";

type Props = {
  dict: Dictionary["process"];
};

const ProcessSection = ({ dict }: Props) => {
  return (
    <section id="process" className="py-20 scroll-mt-28">
      <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
      <ol className="grid gap-6 md:grid-cols-4">
        {dict.steps.map((step, index) => (
          <li
            key={step.title}
            className="relative rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-6"
          >
            <span className="block text-4xl font-bold text-primary-600/30 dark:text-primary-400/30 mb-4">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">{step.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ProcessSection;
