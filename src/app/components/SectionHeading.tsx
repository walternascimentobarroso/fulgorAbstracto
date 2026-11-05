type Props = {
  eyebrow: string;
  title: string;
};

const SectionHeading = ({ eyebrow, title }: Props) => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary-600 dark:text-primary-400 mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;
