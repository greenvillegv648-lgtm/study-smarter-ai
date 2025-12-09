import { Link } from "react-router-dom";
import { Sparkles, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">
                Study<span className="text-primary">Booster</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              AI-powered study tools that help students learn smarter, not harder.
            </p>
            <div className="flex gap-3">
              {[Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {["Features", "Pricing", "Quiz Generator", "Flashcards", "Cheat Sheets"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Blog", "Careers", "Press Kit", "Contact"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {["Help Center", "Privacy Policy", "Terms of Service", "Student Discount", "Accessibility"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Study Booster Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <a href="mailto:support@studybooster.pro" className="text-muted-foreground hover:text-foreground transition-colors">
              support@studybooster.pro
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;