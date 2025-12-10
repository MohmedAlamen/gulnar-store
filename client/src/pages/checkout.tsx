import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Check, ArrowRight, CreditCard, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStore } from "@/lib/store-context";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const cities = [
  "الرياض",
  "جدة",
  "مكة المكرمة",
  "المدينة المنورة",
  "الدمام",
  "الخبر",
  "الطائف",
  "تبوك",
  "بريدة",
  "خميس مشيط",
];

type CheckoutStep = "shipping" | "payment" | "review";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { cartItems, cartTotal, clearCart, sessionId } = useStore();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    city: "",
    notes: "",
    paymentMethod: "cash",
  });

  const shippingCost = cartTotal >= 200 ? 0 : 25;
  const total = cartTotal + shippingCost;

  const steps: { key: CheckoutStep; label: string; icon: typeof MapPin }[] = [
    { key: "shipping", label: "الشحن", icon: MapPin },
    { key: "payment", label: "الدفع", icon: CreditCard },
    { key: "review", label: "المراجعة", icon: FileText },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateShipping = () => {
    if (!formData.customerName.trim()) {
      toast({ title: "خطأ", description: "الرجاء إدخال الاسم الكامل", variant: "destructive" });
      return false;
    }
    if (!formData.customerEmail.trim() || !formData.customerEmail.includes("@")) {
      toast({ title: "خطأ", description: "الرجاء إدخال بريد إلكتروني صحيح", variant: "destructive" });
      return false;
    }
    if (!formData.customerPhone.trim()) {
      toast({ title: "خطأ", description: "الرجاء إدخال رقم الهاتف", variant: "destructive" });
      return false;
    }
    if (!formData.shippingAddress.trim()) {
      toast({ title: "خطأ", description: "الرجاء إدخال العنوان", variant: "destructive" });
      return false;
    }
    if (!formData.city) {
      toast({ title: "خطأ", description: "الرجاء اختيار المدينة", variant: "destructive" });
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (currentStep === "shipping" && !validateShipping()) return;
    if (currentStep === "shipping") setCurrentStep("payment");
    else if (currentStep === "payment") setCurrentStep("review");
  };

  const prevStep = () => {
    if (currentStep === "payment") setCurrentStep("shipping");
    else if (currentStep === "review") setCurrentStep("payment");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const orderData = {
        sessionId,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: formData.shippingAddress,
        city: formData.city,
        notes: formData.notes,
        subtotal: cartTotal.toString(),
        shipping: shippingCost.toString(),
        total: total.toString(),
        items: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.product.name,
          productNameAr: item.product.nameAr,
          price: item.product.price,
          quantity: item.quantity,
        })),
      };

      const result = await apiRequest("POST", "/api/orders", orderData);
      
      clearCart();
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      
      toast({
        title: "تم إرسال طلبك بنجاح!",
        description: `رقم الطلب: ${result.id?.slice(0, 8) || 'جديد'}`,
      });

      setLocation("/orders");
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إرسال الطلب. الرجاء المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">السلة فارغة</h1>
        <p className="text-muted-foreground mb-8">لا يمكنك إتمام الشراء بدون منتجات</p>
        <Link href="/products">
          <Button data-testid="button-go-shopping">ابدأ التسوق</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center" data-testid="text-checkout-title">
        إتمام الشراء
      </h1>

      <div className="flex items-center justify-center mb-12">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                index <= currentStepIndex
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-muted-foreground text-muted-foreground"
              }`}
            >
              {index < currentStepIndex ? (
                <Check className="h-5 w-5" />
              ) : (
                <step.icon className="h-5 w-5" />
              )}
            </div>
            <span
              className={`mx-2 hidden sm:block ${
                index <= currentStepIndex ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-8 sm:w-16 h-0.5 ${
                  index < currentStepIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentStep === "shipping" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  معلومات الشحن
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">الاسم الكامل *</Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      placeholder="أدخل اسمك الكامل"
                      className="h-12"
                      data-testid="input-customer-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">رقم الهاتف *</Label>
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      placeholder="05xxxxxxxx"
                      className="h-12"
                      dir="ltr"
                      data-testid="input-customer-phone"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerEmail">البريد الإلكتروني *</Label>
                  <Input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="h-12"
                    dir="ltr"
                    data-testid="input-customer-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">المدينة *</Label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-lg border-2 bg-background"
                    data-testid="select-city"
                  >
                    <option value="">اختر المدينة</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingAddress">العنوان بالتفصيل *</Label>
                  <Textarea
                    id="shippingAddress"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    placeholder="الحي، الشارع، رقم المبنى، الشقة..."
                    className="min-h-[100px]"
                    data-testid="input-shipping-address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="أي ملاحظات خاصة بالتوصيل..."
                    data-testid="input-notes"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  طريقة الدفع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, paymentMethod: value }))
                  }
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-4 space-x-reverse p-4 border rounded-lg hover-elevate cursor-pointer">
                    <RadioGroupItem value="cash" id="cash" data-testid="radio-cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <span className="font-medium">الدفع عند الاستلام</span>
                      <p className="text-sm text-muted-foreground">
                        ادفع نقداً عند استلام طلبك
                      </p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse p-4 border rounded-lg hover-elevate cursor-pointer">
                    <RadioGroupItem value="card" id="card" data-testid="radio-card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <span className="font-medium">بطاقة ائتمانية</span>
                      <p className="text-sm text-muted-foreground">
                        Visa, Mastercard, Mada
                      </p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-4 space-x-reverse p-4 border rounded-lg hover-elevate cursor-pointer">
                    <RadioGroupItem value="apple" id="apple" data-testid="radio-apple" />
                    <Label htmlFor="apple" className="flex-1 cursor-pointer">
                      <span className="font-medium">Apple Pay</span>
                      <p className="text-sm text-muted-foreground">
                        ادفع باستخدام Apple Pay
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          {currentStep === "review" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  مراجعة الطلب
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">معلومات الشحن</h3>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p><strong>الاسم:</strong> {formData.customerName}</p>
                    <p><strong>الهاتف:</strong> {formData.customerPhone}</p>
                    <p><strong>البريد:</strong> {formData.customerEmail}</p>
                    <p><strong>المدينة:</strong> {formData.city}</p>
                    <p><strong>العنوان:</strong> {formData.shippingAddress}</p>
                    {formData.notes && <p><strong>ملاحظات:</strong> {formData.notes}</p>}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">طريقة الدفع</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p>
                      {formData.paymentMethod === "cash"
                        ? "الدفع عند الاستلام"
                        : formData.paymentMethod === "card"
                        ? "بطاقة ائتمانية"
                        : "Apple Pay"}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">المنتجات</h3>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.nameAr}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.product.nameAr}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} x {Number(item.product.price).toFixed(2)} ر.س
                          </p>
                        </div>
                        <p className="font-bold">
                          {(Number(item.product.price) * item.quantity).toFixed(2)} ر.س
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between mt-6 gap-4">
            {currentStep !== "shipping" && (
              <Button variant="outline" onClick={prevStep} data-testid="button-prev-step">
                <ArrowRight className="ml-2 h-4 w-4" />
                السابق
              </Button>
            )}
            {currentStep !== "review" ? (
              <Button onClick={nextStep} className="mr-auto" data-testid="button-next-step">
                التالي
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mr-auto"
                data-testid="button-place-order"
              >
                {isSubmitting ? "جاري الإرسال..." : "تأكيد الطلب"}
              </Button>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.nameAr}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">
                          {item.product.nameAr}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} x {Number(item.product.price).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm font-bold">
                        {(Number(item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span>{cartTotal.toFixed(2)} ر.س</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">الشحن</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600">مجاني</span>
                    ) : (
                      `${shippingCost.toFixed(2)} ر.س`
                    )}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>الإجمالي</span>
                  <span className="text-primary" data-testid="text-checkout-total">
                    {total.toFixed(2)} ر.س
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
