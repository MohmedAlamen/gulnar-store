import { Link } from "wouter";
import { ArrowLeft, Truck, Shield, RefreshCw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import type { Product, Category } from "@shared/schema";

const features = [
  {
    icon: Truck,
    title: "شحن مجاني",
    description: "للطلبات فوق ٢٠٠ ر.س",
  },
  {
    icon: Shield,
    title: "ضمان الجودة",
    description: "منتجات أصلية ١٠٠٪",
  },
  {
    icon: RefreshCw,
    title: "إرجاع سهل",
    description: "خلال ١٤ يوم",
  },
  {
    icon: Headphones,
    title: "دعم ٢٤/٧",
    description: "خدمة عملاء متميزة",
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-2xl">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            data-testid="text-hero-title"
          >
            تسوق أفضل المنتجات
            <span className="text-primary block">بأسعار لا تُقاوم</span>
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
            data-testid="text-hero-description"
          >
            اكتشف مجموعتنا الواسعة من المنتجات عالية الجودة مع خدمة توصيل سريعة إلى جميع أنحاء المملكة
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products">
              <Button size="lg" className="h-14 px-8 text-lg" data-testid="button-hero-shop">
                تسوق الآن
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/products?featured=true">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg" data-testid="button-hero-featured">
                المنتجات المميزة
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary)/0.15),transparent_50%)]" />
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <feature.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function CategoriesSection() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h2 className="text-2xl md:text-3xl font-bold" data-testid="text-categories-title">
          تسوق حسب الفئة
        </h2>
        <Link href="/products">
          <Button variant="outline" data-testid="button-view-all-categories">
            عرض الكل
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories?.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            data-testid={`link-category-${category.slug}`}
          >
            <Card className="group overflow-visible hover-elevate cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                <img
                  src={category.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"}
                  alt={category.nameAr}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-3 right-3 left-3 text-white font-semibold text-lg">
                  {category.nameAr}
                </h3>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeaturedProductsSection() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products?.filter((p) => p.featured).slice(0, 8) || [];

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <Skeleton className="aspect-square" />
              <CardContent className="p-4">
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h2 className="text-2xl md:text-3xl font-bold" data-testid="text-featured-title">
          منتجات مميزة
        </h2>
        <Link href="/products?featured=true">
          <Button variant="outline" data-testid="button-view-all-featured">
            عرض الكل
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function NewArrivalsSection() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const newProducts = products?.filter((p) => p.isNew).slice(0, 4) || [];

  if (isLoading || newProducts.length === 0) return null;

  return (
    <section className="bg-card py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <h2 className="text-2xl md:text-3xl font-bold" data-testid="text-new-arrivals-title">
            وصل حديثاً
          </h2>
          <Link href="/products?new=true">
            <Button variant="outline" data-testid="button-view-all-new">
              عرض الكل
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SaleSection() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const saleProducts = products?.filter((p) => p.onSale).slice(0, 4) || [];

  if (isLoading || saleProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h2 className="text-2xl md:text-3xl font-bold text-destructive" data-testid="text-sale-title">
          عروض خاصة
        </h2>
        <Link href="/products?sale=true">
          <Button variant="destructive" data-testid="button-view-all-sale">
            عرض الكل
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {saleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-newsletter-title">
          اشترك في نشرتنا البريدية
        </h2>
        <p className="mb-6 opacity-90">
          احصل على أحدث العروض والخصومات مباشرة في بريدك الإلكتروني
        </p>
        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="بريدك الإلكتروني"
            className="flex-1 h-12 px-4 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
            data-testid="input-newsletter-email"
          />
          <Button
            type="submit"
            variant="secondary"
            className="h-12 px-6"
            data-testid="button-newsletter-subscribe"
          >
            اشترك
          </Button>
        </form>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <NewArrivalsSection />
      <SaleSection />
      <NewsletterSection />
    </div>
  );
}
