import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageHero, { GoldDivider } from "@/components/PageHero";
import heroAbout from "@/assets/hero-about.jpg";
import heroCases from "@/assets/hero-cases.jpg";
import { Shield, Heart, Handshake, ArrowRight } from "lucide-react";

const values = [
  { icon: Shield, title: "ნდობა", desc: "ასე ასე" },
  { icon: Heart, title: "რაიმე", desc: "………………" },
  { icon: Handshake, title: "რაიმე", desc: "……………..…" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const About = () => {
  return (
    <Layout>
      <PageHero title="ჩვენს შესახებ" backgroundImage={heroAbout} subtitle="გაიცანით ჩვენი გუნდი და ღირებულებები" />

      {/* Who are we */}
      <section className="section-padding py-24 bg-background">
        <div className="container mx-auto max-w-5xl">
          <GoldDivider />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 text-center">ვინ ვართ ჩვენ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-muted-foreground leading-relaxed mb-10">
            <p className="text-lg">………………….. ……………………</p>
            <p className="text-lg">……………………………… ……………………………………</p>
          </div>
          <motion.div {...fadeUp} className="bg-card rounded-2xl p-8 border border-border shadow-[var(--shadow-md)] flex items-center gap-6">
            <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-serif font-bold text-accent">5+</span>
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold">ამდენი წლის გამოცდილება</h3>
              <p className="text-muted-foreground mt-1 text-sm">ასე ასე ასე BLANK BLANK</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* History & Mission */}
      <section className="section-padding py-24 bg-card">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl">
          <motion.div {...fadeUp}>
            <GoldDivider />
            <h2 className="text-3xl font-serif font-bold mb-5">ჩვენი ისტორია</h2>
            <p className="text-muted-foreground leading-relaxed">
              ჩვენ ესა და ეს გავაკეთეთ ამ ნაბიჯამდე რომ მივსულიყავით და ასე ვფიქრობთ რომ უკეთესია :)
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <GoldDivider />
            <h2 className="text-3xl font-serif font-bold mb-5">ჩვენი მიზანი</h2>
            <p className="text-muted-foreground leading-relaxed">blank blank blank</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding py-24 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <GoldDivider />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">ჩვენი მთავარი ღირებულება</h2>
            <p className="text-muted-foreground text-sm">ეს ეს ესს……….. </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border text-center card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-serif text-lg font-semibold mb-3">{v.title}</h4>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Won Cases */}
      <section className="relative section-padding py-24 overflow-hidden">
        <img src={heroCases} alt="" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="page-hero-overlay" />
        <div className="container mx-auto relative z-10 text-center max-w-2xl">
          <GoldDivider />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
            ჩვენი მოგებული საქმეები
          </h2>
          <p className="text-primary-foreground/70 mb-8 text-sm">გაეცანით დეტალებს</p>
          <Link to="/cases">
            <Button variant="outline" className="rounded-full px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm gap-2">
              იხილეთ ყველა გამარჯვება <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding py-20 bg-gradient-to-br from-primary to-crimson-dark">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-foreground mb-4">
            ჩვენი გამოცდილი ადვოკატები მზად არიან უპასუხონ თქვენს კითხვებს
          </h2>
          <Link to="/contact">
            <Button variant="outline" className="rounded-full px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              მოითხოვეთ უფასო ზარი
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
