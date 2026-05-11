import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Layout from "@/components/Layout";
import PageHero, { GoldDivider } from "@/components/PageHero";
import heroFaqs from "@/assets/hero-faqs.jpg";
import { Mail } from "lucide-react";
import { useContent } from "@/hooks/useDatabase";

const Faqs = () => {
  const { content, isLoaded } = useContent();

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">იტვირთება...</div>;
  }

  const { faqs, company } = content;

  return (
    <Layout>
      <PageHero title="ხშირად დასმული კითხვები" backgroundImage={heroFaqs} subtitle="პასუხები თქვენს კითხვებზე" />

      <section className="section-padding py-24 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <GoldDivider />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-gold">
              ხშირად დასმული კითხვები
            </h2>
            <p className="text-muted-foreground text-sm">
              აქ არის კითხვებზე მარტივად გაცემული პასუხები რათა გაგიმარტივოთ
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="border border-border rounded-xl px-6 bg-card data-[state=open]:shadow-[var(--shadow-md)] transition-shadow hover:border-gold/30">
                <AccordionTrigger className="font-serif text-lg hover:no-underline py-5 text-foreground">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-14 bg-card rounded-2xl p-8 border border-border shadow-[var(--shadow-sm)] hover:border-gold/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-5 h-5 text-gold" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">ვერ იპოვე ის კითხვა რაც გაინტერესებს?</p>
            <p className="font-semibold text-sm">
              მოგვწერე აქ: <a href={`mailto:${company.email}`} className="text-gold hover:underline">{company.email}</a>
            </p>
          </motion.div>
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

export default Faqs;
