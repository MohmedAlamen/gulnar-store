import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface AnalyticsData {
  salesByMonth: Array<{ month: string; sales: number }>;
  topProducts: Array<{ name: string; count: number }>;
  orderStatus: Array<{ status: string; count: number }>;
  revenueByCategory: Array<{ category: string; revenue: number }>;
}

export default function AdminAnalytics() {
  const { user } = useAuth();
  const [, navigate] = useNavigate();
  const [data, setData] = useState<AnalyticsData>({
    salesByMonth: [],
    topProducts: [],
    orderStatus: [],
    revenueByCategory: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
    fetchAnalytics();
  }, [user, navigate]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/analytics");
      if (response.ok) {
        const analyticsData = await response.json();
        setData(analyticsData);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const maxSales = Math.max(...data.salesByMonth.map((s) => s.sales), 1);
  const maxCount = Math.max(...data.topProducts.map((p) => p.count), 1);
  const maxRevenue = Math.max(...data.revenueByCategory.map((r) => r.revenue), 1);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Analytics & Reports</h1>

        {/* Sales by Month */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.salesByMonth.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.month}</span>
                  <span className="font-semibold">${item.sales}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(item.sales / maxSales) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.topProducts.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-semibold">{item.count} sold</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${(item.count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.orderStatus.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">
                    {item.status}
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    {item.count}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Revenue by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.revenueByCategory.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.category}</span>
                  <span className="font-semibold">${item.revenue}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full transition-all"
                    style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
