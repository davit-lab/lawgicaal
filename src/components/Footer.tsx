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
    <footer className="bg-charcoal border-t border-gold/10">
      {/* Contact strip */}
      <div className="border-b border-gold/10">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-12 h-12 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-sm text-foreground font-light">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gold flex items-center justify-center">
                <Scale className="w-5 h-5 text-background" />
              </div>
              <span className="font-serif text-2xl font-light text-foreground tracking-tight">{company.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md font-light">
              {company.description}
            </p>
          </div>

          {/* Practice areas */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-6">სერვისები</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {practiceAreas.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <Link to="/practice-areas" className="hover:text-gold transition-colors duration-300 font-light">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-6">ნავიგაცია</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {companyLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path} className="hover:text-gold transition-colors duration-300 font-light">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-6">სოციალური</h4>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gold/20 flex items-center justify-center hover:bg-gold hover:text-background hover:border-gold transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gold/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-light">
            <p>© {new Date().getFullYear()} {company.name}. ყველა უფლება დაცულია.</p>
            <p>Designed with precision</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
