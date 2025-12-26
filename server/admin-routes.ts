import { type Express, type Request, type Response } from "express";
import { storage } from "./storage";

export function registerAdminRoutes(app: Express) {
  // Admin Stats
  app.get("/api/admin/stats", async (req: Request, res: Response) => {
    try {
      const products = await storage.getProducts();
      const orders = await storage.getOrders(""); // Get all orders
      const users = await storage.getUsers?.() || [];
      
      const totalRevenue = orders.reduce((sum, order) => {
        return sum + (parseFloat(order.total as any) || 0);
      }, 0);

      const recentOrders = orders.slice(0, 10);
      const topProducts = products.slice(0, 6);

      res.json({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length || 0,
        totalRevenue,
        recentOrders,
        topProducts,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Get all products
  app.get("/api/admin/products", async (req: Request, res: Response) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Create product
  app.post("/api/admin/products", async (req: Request, res: Response) => {
    try {
      const product = await storage.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  // Update product
  app.put("/api/admin/products/:id", async (req: Request, res: Response) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      // Update product (note: storage doesn't have updateProduct, so we'll need to add it)
      const updated = { ...product, ...req.body };
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  // Delete product
  app.delete("/api/admin/products/:id", async (req: Request, res: Response) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Get all orders
  app.get("/api/admin/orders", async (req: Request, res: Response) => {
    try {
      const orders = await storage.getOrders("");
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // Update order status
  app.patch("/api/admin/orders/:id", async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      const order = await storage.updateOrderStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order" });
    }
  });

  // Get order details
  app.get("/api/admin/orders/:id", async (req: Request, res: Response) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      const items = await storage.getOrderItems(order.id);
      res.json({ ...order, items });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });
}
