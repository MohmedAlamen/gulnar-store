import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { useStore } from "@/lib/store-context";
import { useToast } from "@/hooks/use-toast";
import { Package, ShoppingBag, User, Settings, LogOut, Loader2 } from "lucide-react";
import type { Order } from "@shared/schema";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user, logout, isLoading: authLoading } = useAuth();
  const { t } = useLanguage();
  const { sessionId } = useStore();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
  }, [user, authLoading, setLocation]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/user/orders", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        const fallbackRes = await fetch(`/api/orders?sessionId=${sessionId}`);
        if (fallbackRes.ok) {
          const data = await fallbackRes.json();
          setOrders(data);
        }
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast({
      title: t("تم تسجيل الخروج", "Logged out"),
      description: t("نراك قريباً!", "See you soon!"),
    });
    setLocation("/");
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profileForm),
      });
      if (res.ok) {
        toast({
          title: t("تم التحديث", "Updated"),
          description: t("تم تحديث معلوماتك بنجاح", "Your profile has been updated"),
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast({
        title: t("خطأ", "Error"),
        description: t("فشل تحديث المعلومات", "Failed to update profile"),
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: t("قيد الانتظار", "Pending"), variant: "secondary" },
      processing: { label: t("قيد المعالجة", "Processing"), variant: "default" },
      shipped: { label: t("تم الشحن", "Shipped"), variant: "default" },
      delivered: { label: t("تم التسليم", "Delivered"), variant: "default" },
      cancelled: { label: t("ملغي", "Cancelled"), variant: "destructive" },
    };
    const config = statusMap[status] || statusMap.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t("لوحة التحكم", "Dashboard")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("مرحباً", "Welcome")}, {user.name || user.username}!
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 me-2" />
          {t("تسجيل الخروج", "Logout")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("إجمالي الطلبات", "Total Orders")}
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("الطلبات النشطة", "Active Orders")}
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter((o) => !["delivered", "cancelled"].includes(o.status)).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t("إجمالي المشتريات", "Total Spent")}
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.reduce((sum, o) => sum + Number(o.total), 0).toFixed(2)} {t("ر.س", "SAR")}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="orders">
            <Package className="h-4 w-4 me-2" />
            {t("طلباتي", "My Orders")}
          </TabsTrigger>
          <TabsTrigger value="profile">
            <Settings className="h-4 w-4 me-2" />
            {t("الملف الشخصي", "Profile")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          {isLoadingOrders ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : orders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">{t("لا توجد طلبات", "No orders yet")}</h3>
                <p className="text-muted-foreground mb-4">
                  {t("ابدأ التسوق واطلب منتجاتك المفضلة", "Start shopping and order your favorite products")}
                </p>
                <Link href="/products">
                  <Button>{t("تصفح المنتجات", "Browse Products")}</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">
                          {t("طلب رقم", "Order")} #{order.id.slice(-8)}
                        </CardTitle>
                        <CardDescription>
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ""}
                        </CardDescription>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {order.city} - {order.shippingAddress}
                      </div>
                      <div className="font-bold">
                        {Number(order.total).toFixed(2)} {t("ر.س", "SAR")}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("معلومات الحساب", "Account Information")}</CardTitle>
              <CardDescription>
                {t("حدث معلوماتك الشخصية", "Update your personal information")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("الاسم الكامل", "Full Name")}</Label>
                    <Input
                      id="name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      placeholder={t("أدخل اسمك", "Enter your name")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("البريد الإلكتروني", "Email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      placeholder={t("أدخل بريدك", "Enter your email")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("رقم الهاتف", "Phone")}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder={t("أدخل رقم هاتفك", "Enter your phone")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">{t("العنوان", "Address")}</Label>
                    <Input
                      id="address"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      placeholder={t("أدخل عنوانك", "Enter your address")}
                    />
                  </div>
                </div>
                <Button type="submit">{t("حفظ التغييرات", "Save Changes")}</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
