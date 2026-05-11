import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "მთავარი", path: "/" },
  { label: "სამუშაო არეალი", path: "/practice-areas" },
  { label: "შესახებ", path: "/about" },
  { label: "გუნდი", path: "/team" },
  { label: "ქეისები", path: "/cases" },
  { label: "FAQ", path: "/faqs" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-gold/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center group-hover:shadow-[var(--shadow-gold)] transition-all duration-500">
              <Scale className="w-6 h-6 text-background" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold text-foreground tracking-tight">lawgicaal</span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-gold-muted font-medium">Law Firm</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm tracking-wide transition-all duration-300 py-2 ${
                  location.pathname === link.path
                    ? "text-gold"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link to="/contact" className="hidden lg:block">
            <Button className="bg-gold text-background hover:bg-gold-light rounded-none px-8 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:shadow-[var(--shadow-gold)]">
              კონსულტაცია
            </Button>
          </Link>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-foreground p-2 hover:text-gold transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-xl border-t border-gold/10">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-serif py-3 border-b border-border/50 transition-all ${
                  location.pathname === link.path
                    ? "text-gold"
                    : "text-foreground/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsOpen(false)} className="mt-4">
              <Button className="bg-gold text-background hover:bg-gold-light rounded-none w-full py-4 text-sm font-medium uppercase">
                კონსულტაცია
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
