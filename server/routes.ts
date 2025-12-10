import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Categories API
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  // Products API
  app.get("/api/products", async (req, res) => {
    try {
      let products = await storage.getProducts();
      
      // Filter by category
      const categorySlug = req.query.category as string;
      if (categorySlug) {
        const category = await storage.getCategoryBySlug(categorySlug);
        if (category) {
          products = products.filter(p => p.categoryId === category.id);
        }
      }

      // Filter by featured
      if (req.query.featured === 'true') {
        products = products.filter(p => p.featured);
      }

      // Filter by new
      if (req.query.new === 'true') {
        products = products.filter(p => p.isNew);
      }

      // Filter by on sale
      if (req.query.sale === 'true') {
        products = products.filter(p => p.onSale);
      }

      // Search
      const search = req.query.search as string;
      if (search) {
        const lowerSearch = search.toLowerCase();
        products = products.filter(p =>
          p.name.toLowerCase().includes(lowerSearch) ||
          p.nameAr.includes(search) ||
          p.description?.toLowerCase().includes(lowerSearch) ||
          p.descriptionAr?.includes(search)
        );
      }

      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Cart API
  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const cartItems = await storage.getCartItems(req.params.sessionId);
      
      // Include product details
      const itemsWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return { ...item, product };
        })
      );
      
      res.json(itemsWithProducts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const { sessionId, productId, quantity } = req.body;
      
      if (!sessionId || !productId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const cartItem = await storage.addToCart({
        sessionId,
        productId,
        quantity: quantity || 1
      });

      res.json({ ...cartItem, product });
    } catch (error) {
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      
      if (quantity <= 0) {
        await storage.removeFromCart(req.params.id);
        return res.json({ deleted: true });
      }

      const item = await storage.updateCartItem(req.params.id, quantity);
      if (!item) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      const product = await storage.getProduct(item.productId);
      res.json({ ...item, product });
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await storage.removeFromCart(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  });

  app.delete("/api/cart/session/:sessionId", async (req, res) => {
    try {
      await storage.clearCart(req.params.sessionId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  // Orders API
  app.get("/api/orders", async (req, res) => {
    try {
      const sessionId = req.query.sessionId as string;
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID required" });
      }

      const orders = await storage.getOrders(sessionId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
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

  app.post("/api/orders", async (req, res) => {
    try {
      const {
        sessionId,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        city,
        notes,
        subtotal,
        shipping,
        total,
        items
      } = req.body;

      // Validate required fields
      if (!sessionId || !customerName || !customerEmail || !customerPhone || !shippingAddress || !city) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create order
      const order = await storage.createOrder({
        sessionId,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        city,
        notes: notes || null,
        subtotal,
        shipping,
        total,
        status: "pending"
      });

      // Create order items
      if (items && Array.isArray(items)) {
        for (const item of items) {
          await storage.createOrderItem({
            orderId: order.id,
            productId: item.productId,
            productName: item.productName,
            productNameAr: item.productNameAr,
            price: item.price,
            quantity: item.quantity
          });
        }
      }

      // Clear cart after order
      await storage.clearCart(sessionId);

      res.status(201).json(order);
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.patch("/api/orders/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ error: "Status required" });
      }

      const order = await storage.updateOrderStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order status" });
    }
  });

  return httpServer;
}
