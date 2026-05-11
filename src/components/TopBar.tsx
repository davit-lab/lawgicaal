import { Mail, MapPin, Clock, Phone } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-dark text-primary-foreground py-2.5 section-padding border-b border-dark-light">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 text-xs tracking-wide">
        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-accent" />
          <span className="opacity-90">example@gmail.com</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span className="opacity-90">tbilisi, nowhere</span>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-accent" />
          <span className="opacity-90">ორშაბათი-პარასკევი 8:00-20:00</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-accent" />
          <span className="opacity-90">(+995)000 000 000</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
