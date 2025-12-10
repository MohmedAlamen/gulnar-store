import { useState, useMemo } from "react";
import { useLocation, useSearch } from "wouter";
import { Grid3X3, List, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { useQuery } from "@tanstack/react-query";
import type { Product, Category } from "@shared/schema";

type SortOption = "newest" | "price-asc" | "price-desc" | "rating";

export default function Products() {
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const categorySlug = params.get("category");
  const searchQuery = params.get("search");
  const showFeatured = params.get("featured") === "true";
  const showNew = params.get("new") === "true";
  const showSale = params.get("sale") === "true";

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categorySlug ? [categorySlug] : []
  );
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.nameAr.includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.descriptionAr?.includes(query)
      );
    }

    if (selectedCategories.length > 0) {
      const categoryIds = categories
        ?.filter((c) => selectedCategories.includes(c.slug))
        .map((c) => c.id);
      if (categoryIds?.length) {
        filtered = filtered.filter((p) => categoryIds.includes(p.categoryId));
      }
    }

    if (showFeatured) {
      filtered = filtered.filter((p) => p.featured);
    }

    if (showNew) {
      filtered = filtered.filter((p) => p.isNew);
    }

    if (showSale) {
      filtered = filtered.filter((p) => p.onSale);
    }

    filtered = filtered.filter(
      (p) => Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1]
    );

    if (inStockOnly) {
      filtered = filtered.filter((p) => p.inStock);
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-desc":
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "rating":
        filtered.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, categories, searchQuery, selectedCategories, showFeatured, showNew, showSale, priceRange, inStockOnly, sortBy]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug)
        ? prev.filter((c) => c !== slug)
        : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setInStockOnly(false);
  };

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 5000 || inStockOnly;

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">الفئات</h3>
        <div className="space-y-3">
          {categories?.map((category) => (
            <div key={category.id} className="flex items-center gap-3">
              <Checkbox
                id={category.slug}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => toggleCategory(category.slug)}
                data-testid={`checkbox-category-${category.slug}`}
              />
              <Label htmlFor={category.slug} className="cursor-pointer">
                {category.nameAr}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">السعر (ر.س)</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={5000}
            step={50}
            className="mb-4"
            data-testid="slider-price-range"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{priceRange[0]} ر.س</span>
            <span>{priceRange[1]} ر.س</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
          data-testid="checkbox-in-stock"
        />
        <Label htmlFor="in-stock" className="cursor-pointer">
          المتوفر فقط
        </Label>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters} data-testid="button-clear-filters">
          <X className="ml-2 h-4 w-4" />
          مسح الفلاتر
        </Button>
      )}
    </div>
  );

  const getPageTitle = () => {
    if (searchQuery) return `نتائج البحث: "${searchQuery}"`;
    if (showFeatured) return "المنتجات المميزة";
    if (showNew) return "وصل حديثاً";
    if (showSale) return "عروض خاصة";
    if (categorySlug && categories) {
      const category = categories.find((c) => c.slug === categorySlug);
      return category?.nameAr || "المنتجات";
    }
    return "جميع المنتجات";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-products-title">
            {getPageTitle()}
          </h1>
          <p className="text-muted-foreground mt-1" data-testid="text-products-count">
            {filteredProducts.length} منتج
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" data-testid="button-filters-mobile">
                <SlidersHorizontal className="ml-2 h-4 w-4" />
                فلاتر
                {hasActiveFilters && (
                  <Badge className="mr-2" variant="secondary">
                    !
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>الفلاتر</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-[180px]" data-testid="select-sort">
              <SelectValue placeholder="ترتيب حسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">الأحدث</SelectItem>
              <SelectItem value="price-asc">السعر: من الأقل</SelectItem>
              <SelectItem value="price-desc">السعر: من الأعلى</SelectItem>
              <SelectItem value="rating">التقييم</SelectItem>
            </SelectContent>
          </Select>

          <div className="hidden sm:flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              data-testid="button-view-grid"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              data-testid="button-view-list"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-6">
              <FilterContent />
            </CardContent>
          </Card>
        </aside>

        <div className="flex-1">
          {productsLoading ? (
            <div className={`grid gap-4 md:gap-6 ${
              viewMode === "grid"
                ? "grid-cols-2 md:grid-cols-3"
                : "grid-cols-1"
            }`}>
              {[...Array(9)].map((_, i) => (
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
          ) : filteredProducts.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <p className="text-muted-foreground text-lg mb-4" data-testid="text-no-products">
                  لم يتم العثور على منتجات
                </p>
                <Button variant="outline" onClick={clearFilters} data-testid="button-reset-filters">
                  إعادة تعيين الفلاتر
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={`grid gap-4 md:gap-6 ${
              viewMode === "grid"
                ? "grid-cols-2 md:grid-cols-3"
                : "grid-cols-1"
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
