import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "მთავარი", path: "/" },
  { label: "სამუშაო არეალი", path: "/practice-areas" },
  { label: "შესახებ", path: "/about" },
  { label: "ადვოკატები", path: "/team" },
  { label: "ქეისები", path: "/cases" },
  { label: "კითხვები", path: "/faqs" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 section-padding transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-[var(--shadow-md)]"
          : "bg-background shadow-sm"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3.5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:shadow-[var(--shadow-crimson)] transition-shadow duration-300">
            <Scale className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold text-gold leading-tight">lawgicaal</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">Law Firm</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === link.path
                  ? "text-primary bg-primary/5"
                  : "text-foreground/75 hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-accent rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link to="/contact" className="hidden lg:block">
          <Button className="bg-primary text-primary-foreground hover:bg-crimson-dark rounded-full px-7 shadow-[var(--shadow-crimson)] hover:shadow-[var(--shadow-lg)] transition-all duration-300">
            მოითხოვე ზარი
          </Button>
        </Link>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-border pb-4 animate-fade-in">
          <div className="container mx-auto flex flex-col gap-1 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium py-2.5 px-4 rounded-lg transition-all ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/5"
                    : "text-foreground/75 hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsOpen(false)} className="mt-2">
              <Button className="bg-primary text-primary-foreground hover:bg-crimson-dark rounded-full w-full shadow-[var(--shadow-crimson)]">
                მოითხოვე ზარი
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
