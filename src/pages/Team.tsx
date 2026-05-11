import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageHero, { GoldDivider } from "@/components/PageHero";
import heroTeam from "@/assets/hero-team.jpg";
import { GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import { useContent } from "@/hooks/useDatabase";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const Team = () => {
  const { content, isLoaded } = useContent();

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">იტვირთება...</div>;
  }

  const { team } = content;

  return (
    <Layout>
      <PageHero title="ადვოკატები" backgroundImage={heroTeam} subtitle="გაიცანით ჩვენი პროფესიონალი გუნდი" />

      <section className="section-padding py-24 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <GoldDivider />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-gold">ჩვენი გუნდი</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">პროფესიონალი ადვოკატები თქვენს სამსახურში</p>
          </div>

          <div className="space-y-10">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-300 hover:border-gold/30"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  <div className="md:col-span-1 bg-gradient-to-br from-muted to-card flex items-center justify-center p-10 md:p-0 md:min-h-[320px]">
                    <div className="w-32 h-32 rounded-2xl bg-background flex items-center justify-center shadow-[var(--shadow-md)] border border-gold/20">
                      <span className="text-5xl font-serif font-bold text-gold">{member.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2 p-8 md:p-10">
                    <div className="mb-6">
                      <h3 className="text-2xl font-serif font-bold mb-1 text-foreground">{member.name}</h3>
                      <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gold bg-gold/10 rounded-full px-3 py-1">
                        {member.role}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-7">{member.bio}</p>

                    <Link to="/contact">
                      <Button className="bg-gold text-black hover:bg-gold-light rounded-full px-7 shadow-[var(--shadow-gold)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 gap-2">
                        დაჯავშნეთ კონსულტაცია <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
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

export default Team;
