import { Link } from "wouter";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@/lib/store-context";
import { useLanguage } from "@/lib/language-context";
import type { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: t("تمت الإضافة", "Added to Cart"),
      description: t(
        `تم إضافة ${product.nameAr} إلى السلة`,
        `${product.name} has been added to cart`
      ),
    });
  };

  const discountPercentage = product.originalPrice
    ? Math.round((1 - Number(product.price) / Number(product.originalPrice)) * 100)
    : 0;

  const productName = language === "ar" ? product.nameAr : product.name;

  return (
    <Link href={`/product/${product.id}`} data-testid={`card-product-${product.id}`}>
      <Card className="group h-full overflow-visible hover-elevate cursor-pointer transition-all duration-300">
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
          <img
            src={product.images[0]}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            data-testid={`img-product-${product.id}`}
          />
          
          <div className="absolute top-2 end-2 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground" data-testid={`badge-new-${product.id}`}>
                {t("جديد", "New")}
              </Badge>
            )}
            {product.onSale && discountPercentage > 0 && (
              <Badge variant="destructive" data-testid={`badge-sale-${product.id}`}>
                {t(`خصم ${discountPercentage}%`, `${discountPercentage}% Off`)}
              </Badge>
            )}
          </div>

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          <Button
            size="icon"
            className="absolute bottom-3 start-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
            onClick={handleAddToCart}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>

        <CardContent className="p-4">
          <h3
            className="font-semibold text-base mb-2 line-clamp-2 min-h-[3rem]"
            data-testid={`text-product-name-${product.id}`}
          >
            {productName}
          </h3>

          {product.rating && Number(product.rating) > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(Number(product.rating))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>
          )}

          <div className="flex items-baseline gap-2">
            <span
              className="text-xl font-bold text-primary"
              data-testid={`text-price-${product.id}`}
            >
              {Number(product.price).toFixed(2)} {t("ر.س", "SAR")}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {Number(product.originalPrice).toFixed(2)} {t("ر.س", "SAR")}
              </span>
            )}
          </div>

          {!product.inStock && (
            <Badge variant="secondary" className="mt-2">
              {t("غير متوفر", "Out of Stock")}
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
