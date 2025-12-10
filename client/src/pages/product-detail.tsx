import { useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowRight, Minus, Plus, ShoppingCart, Star, Truck, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/lib/store-context";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import type { Product, Category } from "@shared/schema";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;

  const { addToCart } = useStore();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      return response.json();
    },
    enabled: !!productId,
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const category = categories?.find((c) => c.id === product?.categoryId);
  const relatedProducts = products
    ?.filter((p) => p.categoryId === product?.categoryId && p.id !== product?.id)
    .slice(0, 4) || [];

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "تمت الإضافة بنجاح",
        description: `تم إضافة ${quantity} من ${product.nameAr} إلى السلة`,
      });
    }
  };

  const discountPercentage = product?.originalPrice
    ? Math.round((1 - Number(product.price) / Number(product.originalPrice)) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <Skeleton className="aspect-square rounded-lg" />
            <div className="flex gap-2 mt-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-20 h-20 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
        <Link href="/products">
          <Button data-testid="button-back-to-products">
            <ArrowRight className="ml-2 h-4 w-4" />
            العودة للمنتجات
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">
          الرئيسية
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground transition-colors">
          المنتجات
        </Link>
        {category && (
          <>
            <span>/</span>
            <Link
              href={`/products?category=${category.slug}`}
              className="hover:text-foreground transition-colors"
            >
              {category.nameAr}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-foreground">{product.nameAr}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.nameAr}
              className="w-full h-full object-cover"
              data-testid="img-product-main"
            />
            {product.isNew && (
              <Badge className="absolute top-4 right-4 bg-primary">جديد</Badge>
            )}
            {product.onSale && discountPercentage > 0 && (
              <Badge variant="destructive" className="absolute top-4 left-4">
                خصم {discountPercentage}%
              </Badge>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  data-testid={`button-thumbnail-${index}`}
                >
                  <img
                    src={image}
                    alt={`${product.nameAr} - صورة ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1
            className="text-2xl md:text-3xl font-bold mb-4"
            data-testid="text-product-title"
          >
            {product.nameAr}
          </h1>

          {product.rating && Number(product.rating) > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(Number(product.rating))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                ({product.reviewCount} تقييم)
              </span>
            </div>
          )}

          <div className="flex items-baseline gap-3 mb-6">
            <span
              className="text-3xl font-bold text-primary"
              data-testid="text-product-price"
            >
              {Number(product.price).toFixed(2)} ر.س
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {Number(product.originalPrice).toFixed(2)} ر.س
              </span>
            )}
          </div>

          <p
            className="text-muted-foreground mb-6 leading-relaxed"
            data-testid="text-product-description"
          >
            {product.descriptionAr || product.description}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium">الكمية:</span>
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                data-testid="button-quantity-decrease"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span
                className="w-12 text-center font-medium"
                data-testid="text-quantity"
              >
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                data-testid="button-quantity-increase"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {product.inStock ? (
            <Badge variant="secondary" className="mb-6">
              متوفر في المخزون
            </Badge>
          ) : (
            <Badge variant="destructive" className="mb-6">
              غير متوفر
            </Badge>
          )}

          <Button
            size="lg"
            className="w-full h-14 text-lg mb-6"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            data-testid="button-add-to-cart"
          >
            <ShoppingCart className="ml-2 h-5 w-5" />
            أضف إلى السلة
          </Button>

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">شحن سريع</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">ضمان الجودة</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <RefreshCw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">إرجاع سهل</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description" data-testid="tab-description">
            الوصف
          </TabsTrigger>
          <TabsTrigger value="specifications" data-testid="tab-specifications">
            المواصفات
          </TabsTrigger>
          <TabsTrigger value="reviews" data-testid="tab-reviews">
            التقييمات ({product.reviewCount})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="leading-relaxed text-muted-foreground">
                {product.descriptionAr || product.description || "لا يوجد وصف متاح لهذا المنتج."}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">الفئة</span>
                  <span className="font-medium">{category?.nameAr || "-"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">التوفر</span>
                  <span className="font-medium">
                    {product.inStock ? "متوفر" : "غير متوفر"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">رقم المنتج</span>
                  <span className="font-medium" dir="ltr">{product.id.slice(0, 8)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              لا توجد تقييمات حالياً لهذا المنتج.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6" data-testid="text-related-products">
            منتجات ذات صلة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
