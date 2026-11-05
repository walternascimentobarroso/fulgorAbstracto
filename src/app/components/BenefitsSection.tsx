import { BoltIcon, ChatBubbleLeftRightIcon, MapPinIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import type { Dictionary } from "../dictionaries";

type Props = {
  dict: Dictionary["benefits"];
};

const icons = [ShieldCheckIcon, BoltIcon, ChatBubbleLeftRightIcon, MapPinIcon];

const BenefitsSection = ({ dict }: Props) => {
  return (
    <section className="py-12">
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-ink-900/60 p-8">
        {dict.items.map((benefit, index) => {
          const Icon = icons[index];
          return (
            <li key={benefit.title} className="text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary-500/40 text-primary-600 dark:text-primary-400 mb-4">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">{benefit.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{benefit.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default BenefitsSection;
