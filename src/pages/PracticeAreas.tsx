import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageHero, { GoldDivider } from "@/components/PageHero";
import heroPractice from "@/assets/hero-practice.jpg";
import { Building2, Home as HomeIcon, Briefcase, Shield, Gavel, Globe, ArrowRight } from "lucide-react";
import { useContent } from "@/hooks/useDatabase";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Home: HomeIcon,
  Briefcase,
  Shield,
  Gavel,
  Globe,
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const PracticeAreas = () => {
  const { content, isLoaded } = useContent();

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">იტვირთება...</div>;
  }

  const { practiceAreas } = content;

  return (
    <Layout>
      <PageHero title="სამუშაო არეალი" backgroundImage={heroPractice} subtitle="ჩვენი ექსპერტიზის სფეროები" />

      <section className="section-padding py-24 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <GoldDivider />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-gold">ჩვენი სამუშაო არეალი</h2>
            <p className="text-muted-foreground text-sm">გაეცანი ჩვენს სამუშაო არეალს</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((area, i) => {
              const Icon = iconMap[area.icon] || Briefcase;
              return (
                <motion.div
                  key={area.id}
                  {...fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card rounded-2xl p-8 border border-border group card-hover hover:border-gold/30"
                >
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-gold transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{area.description}</p>
                  <span className="text-gold text-sm font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    გაიგეთ მეტი <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding py-20 bg-gradient-to-br from-gold/20 to-gold/5 border-y border-gold/20">
        <div className="container mx-auto text-center max-w-2xl">
          <GoldDivider />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold mb-6">
            ჩვენი გამოცდილი ადვოკატები მზად არიან უპასუხონ თქვენს კითხვებს
          </h2>
          <Link to="/contact">
            <Button className="rounded-full px-8 py-6 bg-gold text-black hover:bg-gold-light">
              მოითხოვეთ უფასო ზარი
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default PracticeAreas;
