import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Menu, Sun, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/lib/store-context";
import { useTheme } from "@/lib/theme-context";
import { useLanguage } from "@/lib/language-context";
import { useAuth } from "@/lib/auth-context";

export function Header() {
  const [location] = useLocation();
  const { cartCount } = useStore();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { name: t("إلكترونيات", "Electronics"), slug: "electronics" },
    { name: t("ملابس", "Clothing"), slug: "clothing" },
    { name: t("منزل ومطبخ", "Home & Kitchen"), slug: "home-kitchen" },
    { name: t("جمال وعناية", "Beauty"), slug: "beauty" },
    { name: t("رياضة", "Sports"), slug: "sports" },
    { name: t("كتب", "Books"), slug: "books" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between gap-4 text-sm">
          <p data-testid="text-shipping-info">
            {t("شحن مجاني للطلبات فوق ٢٠٠ ريال", "Free shipping on orders over 200 SAR")}
          </p>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/orders" className="hover-elevate px-2 py-1 rounded" data-testid="link-my-orders">
              {t("طلباتي", "My Orders")}
            </Link>
            <span>{t("خدمة العملاء: ٩٢٠٠١٢٣٤٥", "Customer Service: 920012345")}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="h-20 flex items-center justify-between gap-4">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side={language === "ar" ? "right" : "left"} className="w-[300px] p-0">
              <div className="p-4 border-b">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <h2 className="text-2xl font-bold text-primary">{t("جلنار", "Gulnar")}</h2>
                </Link>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/products?category=${cat.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-3 px-4 rounded-lg hover-elevate"
                        data-testid={`link-mobile-category-${cat.slug}`}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex-shrink-0" data-testid="link-logo">
            <h1 className="text-3xl font-bold text-primary">{t("جلنار", "Gulnar")}</h1>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <Input
                type="search"
                placeholder={t("ابحث عن منتجات...", "Search for products...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 ps-12 pe-4 rounded-full border-2 border-muted focus:border-primary transition-colors bg-card"
                data-testid="input-search"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute end-1.5 top-1/2 -translate-y-1/2 rounded-full px-6"
                data-testid="button-search"
              >
                {t("بحث", "Search")}
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("ar")} className={language === "ar" ? "bg-accent" : ""}>
                  العربية
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden sm:flex">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Link href={user ? "/dashboard" : "/login"} data-testid="link-user">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/cart" data-testid="link-cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <Badge
                    className="absolute -top-1 -end-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                    data-testid="badge-cart-count"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative group">
            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              type="search"
              placeholder={t("ابحث عن منتجات...", "Search for products...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 ps-12 pe-4 rounded-full border-2 border-muted focus:border-primary transition-colors bg-card"
              data-testid="input-search-mobile"
            />
          </div>
        </form>
      </div>

      <nav className="hidden lg:block border-t bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1 h-12">
            <li>
              <Link
                href="/products"
                className={`px-4 py-2 rounded-lg font-medium transition-colors hover-elevate ${
                  location === "/products" ? "bg-primary text-primary-foreground" : ""
                }`}
                data-testid="link-all-products"
              >
                {t("جميع المنتجات", "All Products")}
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="px-4 py-2 rounded-lg font-medium transition-colors hover-elevate"
                  data-testid={`link-category-${cat.slug}`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
