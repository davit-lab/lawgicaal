import { Link } from "react-router-dom";
import { Scale, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useContent } from "@/hooks/useDatabase";

const Footer = () => {
  const { content, isLoaded } = useContent();

  if (!isLoaded) {
    return null;
  }

  const { company, practiceAreas } = content;

  const contactInfo = [
    { icon: Mail, label: "email", value: company.email },
    { icon: Phone, label: "კონტაქტი", value: `${company.phone}, ${company.phone2}` },
    { icon: MapPin, label: "მისამართი", value: company.address },
  ];

  const companyLinks = [
    { label: "ჩვენს შესახებ", path: "/about" },
    { label: "ადვოკატები", path: "/team" },
    { label: "ქეისები", path: "/cases" },
    { label: "FAQ", path: "/faqs" },
    { label: "დაგვიკავშირდით", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: company.facebook },
    { icon: Instagram, href: company.instagram },
  ];

  return (
    <footer className="bg-dark text-primary-foreground">
      {/* Contact strip */}
      <div className="section-padding py-10 border-b border-dark-light">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-gold" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold mb-0.5">{label}</h4>
                <p className="text-xs text-primary-foreground/60">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="section-padding py-14">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center">
                <Scale className="w-4 h-4 text-black" />
              </div>
              <span className="font-serif text-xl font-bold text-gold">{company.name}</span>
            </Link>
            <p className="text-sm text-primary-foreground/50 leading-relaxed">
              {company.description}
            </p>
          </div>

          {/* Practice areas */}
          <div>
            <h4 className="font-serif font-semibold mb-5 text-sm text-gold">ჩვენი გამოცდილება</h4>
            <ul className="space-y-2.5 text-xs text-primary-foreground/50">
              {practiceAreas.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <Link to="/practice-areas" className="hover:text-gold transition-colors duration-200">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif font-semibold mb-5 text-sm text-gold">გამოგვყევი სოც მედიაში</h4>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-dark-light flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif font-semibold mb-5 text-sm text-gold">კომპანია</h4>
            <ul className="space-y-2.5 text-xs text-primary-foreground/50">
              {companyLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path} className="hover:text-gold transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-dark-light section-padding py-5">
        <div className="container mx-auto text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} {company.name}. ყველა უფლება დაცულია.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
