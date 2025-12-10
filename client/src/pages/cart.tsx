import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store-context";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useStore();

  const shippingCost = cartTotal >= 200 ? 0 : 25;
  const total = cartTotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="py-16">
            <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4" data-testid="text-empty-cart">
              سلة التسوق فارغة
            </h2>
            <p className="text-muted-foreground mb-8">
              لم تقم بإضافة أي منتجات إلى السلة بعد
            </p>
            <Link href="/products">
              <Button size="lg" data-testid="button-start-shopping">
                <ArrowRight className="ml-2 h-5 w-5" />
                ابدأ التسوق
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-cart-title">
          سلة التسوق ({cartItems.length} منتج)
        </h1>
        <Button variant="outline" onClick={clearCart} data-testid="button-clear-cart">
          <Trash2 className="ml-2 h-4 w-4" />
          إفراغ السلة
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} data-testid={`card-cart-item-${item.productId}`}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Link href={`/product/${item.productId}`} className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.nameAr}
                        className="w-full h-full object-cover"
                        data-testid={`img-cart-item-${item.productId}`}
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.productId}`}>
                      <h3
                        className="font-semibold mb-1 hover:text-primary transition-colors line-clamp-2"
                        data-testid={`text-cart-item-name-${item.productId}`}
                      >
                        {item.product.nameAr}
                      </h3>
                    </Link>

                    <p
                      className="text-lg font-bold text-primary mb-3"
                      data-testid={`text-cart-item-price-${item.productId}`}
                    >
                      {Number(item.product.price).toFixed(2)} ر.س
                    </p>

                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          data-testid={`button-decrease-${item.productId}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span
                          className="w-12 text-center font-medium"
                          data-testid={`text-quantity-${item.productId}`}
                        >
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          data-testid={`button-increase-${item.productId}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-bold" data-testid={`text-subtotal-${item.productId}`}>
                          {(Number(item.product.price) * item.quantity).toFixed(2)} ر.س
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.productId)}
                          data-testid={`button-remove-${item.productId}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span data-testid="text-subtotal">{cartTotal.toFixed(2)} ر.س</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">الشحن</span>
                  <span data-testid="text-shipping">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">مجاني</span>
                    ) : (
                      `${shippingCost.toFixed(2)} ر.س`
                    )}
                  </span>
                </div>

                {cartTotal < 200 && (
                  <p className="text-sm text-muted-foreground">
                    أضف منتجات بقيمة {(200 - cartTotal).toFixed(2)} ر.س للحصول على شحن مجاني
                  </p>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>الإجمالي</span>
                  <span className="text-primary" data-testid="text-total">
                    {total.toFixed(2)} ر.س
                  </span>
                </div>

                <Link href="/checkout" className="block">
                  <Button size="lg" className="w-full h-14 text-lg" data-testid="button-checkout">
                    إتمام الشراء
                  </Button>
                </Link>

                <Link href="/products" className="block">
                  <Button variant="outline" className="w-full" data-testid="button-continue-shopping">
                    <ArrowRight className="ml-2 h-4 w-4" />
                    متابعة التسوق
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
