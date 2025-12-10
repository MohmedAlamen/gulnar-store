import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useStore } from "@/lib/store-context";

const categories = [
  { name: "إلكترونيات", slug: "electronics" },
  { name: "ملابس", slug: "clothing" },
  { name: "منزل ومطبخ", slug: "home-kitchen" },
  { name: "جمال وعناية", slug: "beauty" },
  { name: "رياضة", slug: "sports" },
  { name: "كتب", slug: "books" },
];

export function Header() {
  const [location] = useLocation();
  const { cartCount } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <p data-testid="text-shipping-info">شحن مجاني للطلبات فوق ٢٠٠ ريال</p>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/orders" className="hover-elevate px-2 py-1 rounded" data-testid="link-my-orders">
              طلباتي
            </Link>
            <span>خدمة العملاء: ٩٢٠٠١٢٣٤٥</span>
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
            <SheetContent side="right" className="w-[300px] p-0">
              <div className="p-4 border-b">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <h2 className="text-2xl font-bold text-primary">جلنار</h2>
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
            <h1 className="text-3xl font-bold text-primary">جلنار</h1>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="ابحث عن منتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pr-12 rounded-lg border-2"
                data-testid="input-search"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute left-1 top-1/2 -translate-y-1/2"
                data-testid="button-search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-2">
            <Link href="/cart" data-testid="link-cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
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
          <div className="relative">
            <Input
              type="search"
              placeholder="ابحث عن منتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pr-12 rounded-lg border-2"
              data-testid="input-search-mobile"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute left-1 top-1/2 -translate-y-1/2"
            >
              <Search className="h-5 w-5" />
            </Button>
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
                جميع المنتجات
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
