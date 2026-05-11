import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Layout from "@/components/Layout";
import { GoldDivider } from "@/components/PageHero";
import { ArrowRight, Phone, CheckCircle, Building2, Home as HomeIcon, Briefcase, Shield, Gavel, Globe, Quote } from "lucide-react";
import { useContent } from "@/hooks/useDatabase";
import heroHome from "@/assets/hero-home.jpg";
import wavePattern from "@/assets/wave-pattern.svg";

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

const Index = () => {
  const { content, isLoaded } = useContent();

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">იტვირთება...</div>;
  }

  const { home, company, practiceAreas, faqs, testimonials, advantages, differentiators } = content;

  const stats = [
    { number: home.stats.years, label: "წლიანი გამოცდილება" },
    { number: home.stats.cases, label: "საქმეები და კლიენტები" },
    { number: home.stats.professionals, label: "პროფესიონალი" },
    { number: home.stats.clients, label: "კმაყოფილი კლიენტი" },
  ];

  // Show first testimonial or default
  const testimonial = testimonials[0] || {
    name: "კლიენტი",
    role: "კლიენტი",
    content: "ძალიან კმაყოფილი ვარ მომსახურებით",
    initial: "K",
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNkNGE1MzAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-5rem)] py-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-gold mb-8">
                <span className="h-px w-8 bg-gold/50" />
                {home.heroSlogan}
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-foreground leading-[1.1] mb-8">
                {home.heroTitle}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl font-light">
                {home.heroSubtitle}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button className="bg-gold text-background hover:bg-gold-light rounded-none px-10 py-6 text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:shadow-[var(--shadow-gold)] group">
                    {home.ctaText}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="rounded-none px-10 py-6 text-sm font-medium tracking-wide uppercase border-gold/30 hover:bg-gold/5 hover:border-gold/50 transition-all duration-300">
                    ჩვენს შესახებ
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 via-transparent to-gold/10 blur-2xl" />
                <div className="relative w-[500px] h-[600px] overflow-hidden subtle-gold-border">
                  <img src={heroHome} alt={company.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-charcoal border border-gold/20 p-6 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">უფასო კონსულტაცია</p>
                      <p className="font-serif text-lg text-foreground">24/7 ხელმისაწვდომი</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding py-14 bg-dark">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-gold">{stat.number}</h3>
                <p className="text-primary-foreground/60 mt-2 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators Accordion */}
      <section className="section-padding py-24 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <GoldDivider />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-gold">
              {differentiators.title}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">რაც გვხდის განსხვავებულს</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {differentiators.items.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl px-6 bg-card data-[state=open]:shadow-[var(--shadow-md)] transition-shadow hover:border-gold/30">
                  <AccordionTrigger className="font-serif text-lg hover:no-underline py-5 text-foreground">{item.title}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="section-padding py-24 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <GoldDivider />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-gold">
              გაეცანით ჩვენს სამუშაო არეალს
            </h2>
            <p className="text-muted-foreground mb-2">გაიგეთ თითოეულის შესახებ ინფორმაცია</p>
            <Link to="/practice-areas" className="text-gold text-sm font-medium hover:underline">
              იხილეთ ყველა →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {practiceAreas.map((area, i) => {
              const Icon = iconMap[area.icon] || Briefcase;
              return (
                <motion.div key={area.id} {...fadeUp} transition={{ delay: i * 0.08 }}>
                  <Link
                    to="/practice-areas"
                    className="block bg-background rounded-xl p-7 border border-border group card-hover hover:border-gold/30"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h4 className="font-serif text-lg font-semibold mb-2 group-hover:text-gold transition-colors">
                      {area.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {area.description}
                    </p>
                    <span className="text-gold text-sm font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      გაიგეთ მეტი <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Three Advantages */}
      <section className="relative section-padding py-24 overflow-hidden">
        <img src={heroHome} alt="" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="page-hero-overlay" />
        <div className="container mx-auto relative z-10 max-w-4xl">
          <div className="text-center mb-14">
            <GoldDivider />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold mb-4 text-balance">
              {advantages.title}
            </h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto text-sm">
              {advantages.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {advantages.items.map((text, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="bg-gold/10 backdrop-blur-sm rounded-xl p-6 border border-gold/20">
                <CheckCircle className="w-6 h-6 text-gold mb-3" />
                <p className="text-primary-foreground text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/contact">
              <Button variant="outline" className="rounded-full px-8 py-6 border-gold/50 text-gold hover:bg-gold/10 backdrop-blur-sm">
                დაჯავშნეთ ზარი
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding py-24 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <GoldDivider />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold">
              რას ამბობენ ჩვენი კლიენტები
            </h2>
          </div>
          <div className="bg-card rounded-2xl p-10 border border-border shadow-[var(--shadow-md)] relative hover:border-gold/30 transition-colors">
            <Quote className="w-10 h-10 text-gold/20 absolute top-6 right-8" />
            <p className="text-muted-foreground italic text-lg leading-relaxed mb-8">
              "{testimonial.content}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-serif font-bold text-black text-lg">
                {testimonial.initial}
              </div>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Consultation CTA */}
      <section className="section-padding py-20 bg-gradient-to-br from-gold/20 to-gold/5 border-y border-gold/20">
        <div className="container mx-auto text-center max-w-2xl">
          <GoldDivider />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold mb-4">
            უფასო, კონფიდენციალური კონსულტაცია
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">
            დაგვიკავშირდით დღესვე და მიიღეთ პროფესიონალური რჩევა
          </p>
          <Link to="/contact">
            <Button className="rounded-full px-8 py-6 bg-gold text-black hover:bg-gold-light">
              დაჯავშნეთ ზარი
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-padding py-24 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <GoldDivider />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-gold">
              ხშირად დასმული კითხვები
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm">
              სწრაფი გზამკვლევი ჩვენი სამართლებრივი სერვისებისა და გამოცდილების შესახებ
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.slice(0, 5).map((faq) => (
                <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="border border-border rounded-xl px-6 bg-card data-[state=open]:shadow-[var(--shadow-md)] transition-shadow hover:border-gold/30">
                  <AccordionTrigger className="font-serif hover:no-underline py-5 text-foreground">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="text-center mt-10">
            <Link to="/faqs" className="text-gold font-medium hover:underline text-sm">
              მიიღეთ უფასო სატელეფონო კონსულტაცია →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
