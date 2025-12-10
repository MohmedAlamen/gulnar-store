import { Link } from "wouter";
import { Package, Clock, CheckCircle, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/lib/store-context";
import { useQuery } from "@tanstack/react-query";
import type { Order } from "@shared/schema";

const statusConfig = {
  pending: {
    label: "قيد المراجعة",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  processing: {
    label: "قيد التجهيز",
    icon: Package,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  shipped: {
    label: "تم الشحن",
    icon: Truck,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  delivered: {
    label: "تم التسليم",
    icon: CheckCircle,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
};

export default function Orders() {
  const { sessionId } = useStore();

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders", sessionId],
    queryFn: async () => {
      const response = await fetch(`/api/orders?sessionId=${sessionId}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      return response.json();
    },
  });

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-4 w-36" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="py-16">
            <Package className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4" data-testid="text-no-orders">
              لا توجد طلبات
            </h2>
            <p className="text-muted-foreground mb-8">
              لم تقم بإجراء أي طلبات بعد
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8" data-testid="text-orders-title">
        طلباتي
      </h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
          const StatusIcon = status.icon;

          return (
            <Card key={order.id} data-testid={`card-order-${order.id}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle className="text-lg" data-testid={`text-order-id-${order.id}`}>
                      طلب #{order.id.slice(0, 8)}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <Badge className={status.color} data-testid={`badge-status-${order.id}`}>
                    <StatusIcon className="h-4 w-4 ml-1" />
                    {status.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">اسم المستلم</p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">رقم الهاتف</p>
                    <p className="font-medium" dir="ltr">{order.customerPhone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">المدينة</p>
                    <p className="font-medium">{order.city}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">الإجمالي</p>
                    <p className="font-bold text-primary text-lg" data-testid={`text-order-total-${order.id}`}>
                      {Number(order.total).toFixed(2)} ر.س
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-muted-foreground text-sm mb-1">عنوان التوصيل</p>
                  <p className="font-medium">{order.shippingAddress}</p>
                </div>

                {order.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-muted-foreground text-sm mb-1">ملاحظات</p>
                    <p>{order.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
