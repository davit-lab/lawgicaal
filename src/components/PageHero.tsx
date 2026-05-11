import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  backgroundImage: string;
  subtitle?: string;
}

const GoldDivider = () => (
  <div className="flex items-center gap-2 justify-center mb-5">
    <span className="h-px w-8 bg-accent/40" />
    <div className="flex items-center gap-0.5">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`bg-accent rounded-full ${i === 1 ? "w-2 h-2" : "w-1.5 h-1.5 opacity-60"}`}
        />
      ))}
    </div>
    <span className="h-px w-8 bg-accent/40" />
  </div>
);

const PageHero = ({ title, backgroundImage, subtitle }: PageHeroProps) => {
  return (
    <section className="relative h-[340px] md:h-[420px] flex items-center justify-center overflow-hidden">
      <img
        src={backgroundImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover scale-105"
        loading="eager"
      />
      <div className="page-hero-overlay" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-4"
      >
        <GoldDivider />
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-primary-foreground/70 mt-3 text-sm md:text-base max-w-lg mx-auto">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  );
};

export { GoldDivider };
export default PageHero;
