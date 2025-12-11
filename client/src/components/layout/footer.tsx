import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiWhatsapp } from "react-icons/si";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4" data-testid="text-footer-logo">
              {t("جلنار", "Gulnar")}
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed" data-testid="text-footer-about">
              {t(
                "متجر جلنار يقدم لكم أفضل المنتجات بأسعار منافسة مع ضمان الجودة وخدمة التوصيل السريع إلى جميع أنحاء المملكة.",
                "Gulnar Store offers the best products at competitive prices with quality guarantee and fast delivery service across the Kingdom."
              )}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover-elevate"
                aria-label="Facebook"
                data-testid="link-social-facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover-elevate"
                aria-label="Instagram"
                data-testid="link-social-instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover-elevate"
                aria-label="X"
                data-testid="link-social-x"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover-elevate"
                aria-label="WhatsApp"
                data-testid="link-social-whatsapp"
              >
                <SiWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t("خدمة العملاء", "Customer Service")}</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href="/orders" className="hover:text-foreground transition-colors" data-testid="link-footer-orders">
                  {t("تتبع طلبك", "Track Your Order")}
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("سياسة الإرجاع", "Return Policy")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("الشحن والتوصيل", "Shipping & Delivery")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  {t("الأسئلة الشائعة", "FAQ")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t("روابط سريعة", "Quick Links")}</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href="/products?category=electronics" className="hover:text-foreground transition-colors">
                  {t("إلكترونيات", "Electronics")}
                </Link>
              </li>
              <li>
                <Link href="/products?category=clothing" className="hover:text-foreground transition-colors">
                  {t("ملابس", "Clothing")}
                </Link>
              </li>
              <li>
                <Link href="/products?category=home-kitchen" className="hover:text-foreground transition-colors">
                  {t("منزل ومطبخ", "Home & Kitchen")}
                </Link>
              </li>
              <li>
                <Link href="/products?category=beauty" className="hover:text-foreground transition-colors">
                  {t("جمال وعناية", "Beauty")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t("تواصل معنا", "Contact Us")}</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span dir="ltr">+966 92 001 2345</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>info@gulnar.sa</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <span>{t("الرياض، المملكة العربية السعودية", "Riyadh, Saudi Arabia")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm" data-testid="text-copyright">
              © {new Date().getFullYear()} {t("متجر جلنار. جميع الحقوق محفوظة.", "Gulnar Store. All rights reserved.")}
            </p>
            <div className="flex items-center gap-4">
              <img src="https://cdn-icons-png.flaticon.com/64/349/349221.png" alt="Visa" className="h-8 opacity-70" />
              <img src="https://cdn-icons-png.flaticon.com/64/349/349228.png" alt="Mastercard" className="h-8 opacity-70" />
              <img src="https://cdn-icons-png.flaticon.com/64/5968/5968144.png" alt="Apple Pay" className="h-8 opacity-70" />
              <img src="https://cdn-icons-png.flaticon.com/64/6124/6124998.png" alt="Mada" className="h-8 opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
