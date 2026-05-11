import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import PageHero, { GoldDivider } from "@/components/PageHero";
import heroContact from "@/assets/hero-contact.jpg";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  { icon: Mail, label: "Email", value: "official@gmail.com" },
  { icon: Phone, label: "ტელეფონი", value: "(+995)-599999999, (+995)-598999999" },
  { icon: MapPin, label: "მისამართი", value: "ესა და ეს ქუჩა" },
  { icon: Clock, label: "სამუშაო საათები", value: "ორშაბათი-პარასკევი 8:00-20:00" },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("შეტყობინება გაიგზავნა!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Layout>
      <PageHero title="დაგვიკავშირდით" backgroundImage={heroContact} subtitle="ჩვენ მზად ვართ დაგეხმაროთ" />

      <section className="section-padding py-24 bg-background">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <GoldDivider />
            <h2 className="text-3xl font-serif font-bold mb-4">საკონტაქტო ინფორმაცია</h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              დაგვიკავშირდით და მიიღეთ უფასო კონსულტაცია. ჩვენი გუნდი მზად არის დაგეხმაროთ.
            </p>

            <div className="space-y-5">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-[var(--shadow-sm)] transition-shadow"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-0.5">{label}</h4>
                    <p className="text-muted-foreground text-sm">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-[var(--shadow-md)]"
          >
            <h3 className="text-2xl font-serif font-bold mb-2">მოგვწერეთ</h3>
            <p className="text-muted-foreground text-sm mb-7">შეავსეთ ფორმა და ჩვენ დაგიკავშირდებით</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">სახელი</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="თქვენი სახელი"
                  required
                  className="bg-background rounded-xl h-12"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="თქვენი ემაილი"
                  required
                  className="bg-background rounded-xl h-12"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">ტელეფონი</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="თქვენი ტელეფონის ნომერი"
                  className="bg-background rounded-xl h-12"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">შეტყობინება</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="თქვენი შეტყობინება"
                  rows={5}
                  required
                  className="bg-background rounded-xl"
                />
              </div>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-crimson-dark rounded-full px-8 py-6 w-full shadow-[var(--shadow-crimson)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 gap-2">
                <Send className="w-4 h-4" /> გაგზავნა
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
