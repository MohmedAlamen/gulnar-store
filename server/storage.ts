import { 
  type User, type InsertUser,
  type Category, type InsertCategory,
  type Product, type InsertProduct,
  type CartItem, type InsertCartItem,
  type Order, type InsertOrder,
  type OrderItem, type InsertOrderItem
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
  
  // Orders
  getOrders(sessionId: string): Promise<Order[]>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  
  // Order Items
  getOrderItems(orderId: string): Promise<OrderItem[]>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, Category>;
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;
  private orderItems: Map<string, OrderItem>;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    
    this.seedData();
  }

  private seedData() {
    // Seed Categories
    const categoriesData: InsertCategory[] = [
      {
        name: "Electronics",
        nameAr: "إلكترونيات",
        description: "Electronic devices and accessories",
        descriptionAr: "أجهزة إلكترونية وملحقاتها",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
        slug: "electronics"
      },
      {
        name: "Clothing",
        nameAr: "ملابس",
        description: "Fashion and apparel",
        descriptionAr: "أزياء وملابس",
        image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400",
        slug: "clothing"
      },
      {
        name: "Home & Kitchen",
        nameAr: "منزل ومطبخ",
        description: "Home and kitchen essentials",
        descriptionAr: "مستلزمات المنزل والمطبخ",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
        slug: "home-kitchen"
      },
      {
        name: "Beauty",
        nameAr: "جمال وعناية",
        description: "Beauty and personal care",
        descriptionAr: "منتجات الجمال والعناية الشخصية",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
        slug: "beauty"
      },
      {
        name: "Sports",
        nameAr: "رياضة",
        description: "Sports and fitness equipment",
        descriptionAr: "معدات رياضية ولياقة",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
        slug: "sports"
      },
      {
        name: "Books",
        nameAr: "كتب",
        description: "Books and reading materials",
        descriptionAr: "كتب ومواد قراءة",
        image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
        slug: "books"
      }
    ];

    const categoryIds: string[] = [];
    categoriesData.forEach(cat => {
      const id = randomUUID();
      categoryIds.push(id);
      this.categories.set(id, { ...cat, id });
    });

    // Seed Products
    const productsData: (InsertProduct & { categoryIndex: number })[] = [
      // Electronics
      {
        categoryIndex: 0,
        name: "Wireless Bluetooth Headphones",
        nameAr: "سماعات بلوتوث لاسلكية",
        description: "High-quality wireless headphones with active noise cancellation",
        descriptionAr: "سماعات لاسلكية عالية الجودة مع خاصية إلغاء الضوضاء النشط، توفر صوتاً نقياً وبطارية تدوم حتى 30 ساعة",
        price: "299.99",
        originalPrice: "399.99",
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800"
        ],
        inStock: true,
        stockQuantity: 50,
        featured: true,
        isNew: true,
        onSale: true,
        rating: "4.8",
        reviewCount: 245
      },
      {
        categoryIndex: 0,
        name: "Smart Watch Pro",
        nameAr: "ساعة ذكية برو",
        description: "Advanced smartwatch with health monitoring",
        descriptionAr: "ساعة ذكية متطورة مع مراقبة الصحة واللياقة البدنية، مقاومة للماء ومتوافقة مع جميع الهواتف",
        price: "549.00",
        originalPrice: null,
        images: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
          "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800"
        ],
        inStock: true,
        stockQuantity: 30,
        featured: true,
        isNew: true,
        onSale: false,
        rating: "4.6",
        reviewCount: 128
      },
      {
        categoryIndex: 0,
        name: "Portable Power Bank 20000mAh",
        nameAr: "شاحن متنقل 20000 مللي أمبير",
        description: "Fast charging portable power bank",
        descriptionAr: "شاحن متنقل بسعة كبيرة مع شحن سريع، يدعم شحن جهازين في نفس الوقت",
        price: "89.00",
        originalPrice: "119.00",
        images: [
          "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800"
        ],
        inStock: true,
        stockQuantity: 100,
        featured: false,
        isNew: false,
        onSale: true,
        rating: "4.5",
        reviewCount: 89
      },
      {
        categoryIndex: 0,
        name: "Wireless Keyboard and Mouse",
        nameAr: "لوحة مفاتيح وماوس لاسلكي",
        description: "Ergonomic wireless keyboard and mouse combo",
        descriptionAr: "مجموعة لوحة مفاتيح وماوس لاسلكية بتصميم مريح، مثالية للعمل من المنزل",
        price: "149.00",
        originalPrice: null,
        images: [
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800"
        ],
        inStock: true,
        stockQuantity: 45,
        featured: false,
        isNew: false,
        onSale: false,
        rating: "4.3",
        reviewCount: 67
      },
      // Clothing
      {
        categoryIndex: 1,
        name: "Premium Cotton T-Shirt",
        nameAr: "تيشيرت قطن فاخر",
        description: "Comfortable premium cotton t-shirt",
        descriptionAr: "تيشيرت من القطن الفاخر بتصميم عصري، متوفر بعدة ألوان وأحجام",
        price: "79.00",
        originalPrice: null,
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
        ],
        inStock: true,
        stockQuantity: 200,
        featured: true,
        isNew: false,
        onSale: false,
        rating: "4.7",
        reviewCount: 312
      },
      {
        categoryIndex: 1,
        name: "Classic Denim Jacket",
        nameAr: "جاكيت جينز كلاسيكي",
        description: "Timeless denim jacket for all seasons",
        descriptionAr: "جاكيت جينز كلاسيكي بقصة مريحة، مناسب لجميع المواسم والمناسبات",
        price: "249.00",
        originalPrice: "329.00",
        images: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"
        ],
        inStock: true,
        stockQuantity: 35,
        featured: true,
        isNew: false,
        onSale: true,
        rating: "4.5",
        reviewCount: 156
      },
      {
        categoryIndex: 1,
        name: "Running Sneakers",
        nameAr: "حذاء رياضي للجري",
        description: "Lightweight running sneakers",
        descriptionAr: "حذاء رياضي خفيف الوزن مصمم للجري والتمارين، بتقنية امتصاص الصدمات",
        price: "349.00",
        originalPrice: null,
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
        ],
        inStock: true,
        stockQuantity: 60,
        featured: false,
        isNew: true,
        onSale: false,
        rating: "4.8",
        reviewCount: 203
      },
      // Home & Kitchen
      {
        categoryIndex: 2,
        name: "Coffee Maker Machine",
        nameAr: "ماكينة صنع القهوة",
        description: "Automatic coffee maker with grinder",
        descriptionAr: "ماكينة قهوة أوتوماتيكية مع مطحنة مدمجة، تحضر قهوة طازجة في دقائق",
        price: "599.00",
        originalPrice: "749.00",
        images: [
          "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800"
        ],
        inStock: true,
        stockQuantity: 25,
        featured: true,
        isNew: false,
        onSale: true,
        rating: "4.6",
        reviewCount: 178
      },
      {
        categoryIndex: 2,
        name: "Non-Stick Cookware Set",
        nameAr: "طقم أواني طهي غير لاصقة",
        description: "12-piece non-stick cookware set",
        descriptionAr: "طقم أواني طهي من 12 قطعة بطبقة غير لاصقة، آمنة للاستخدام على جميع أنواع المواقد",
        price: "449.00",
        originalPrice: null,
        images: [
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
        ],
        inStock: true,
        stockQuantity: 40,
        featured: false,
        isNew: true,
        onSale: false,
        rating: "4.4",
        reviewCount: 92
      },
      {
        categoryIndex: 2,
        name: "Smart Air Purifier",
        nameAr: "منقي هواء ذكي",
        description: "HEPA air purifier with smart controls",
        descriptionAr: "منقي هواء بفلتر HEPA يزيل 99.9% من الملوثات، يمكن التحكم به عبر التطبيق",
        price: "699.00",
        originalPrice: "899.00",
        images: [
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800"
        ],
        inStock: true,
        stockQuantity: 20,
        featured: true,
        isNew: false,
        onSale: true,
        rating: "4.7",
        reviewCount: 134
      },
      // Beauty
      {
        categoryIndex: 3,
        name: "Luxury Skincare Set",
        nameAr: "مجموعة عناية بالبشرة فاخرة",
        description: "Complete skincare routine set",
        descriptionAr: "مجموعة متكاملة للعناية بالبشرة تشمل غسول ومرطب وسيروم بمكونات طبيعية",
        price: "399.00",
        originalPrice: "499.00",
        images: [
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800"
        ],
        inStock: true,
        stockQuantity: 55,
        featured: true,
        isNew: true,
        onSale: true,
        rating: "4.9",
        reviewCount: 287
      },
      {
        categoryIndex: 3,
        name: "Professional Hair Dryer",
        nameAr: "مجفف شعر احترافي",
        description: "Salon-quality ionic hair dryer",
        descriptionAr: "مجفف شعر بتقنية الأيونات للعناية بالشعر، سريع وخفيف الوزن",
        price: "279.00",
        originalPrice: null,
        images: [
          "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=800"
        ],
        inStock: true,
        stockQuantity: 38,
        featured: false,
        isNew: false,
        onSale: false,
        rating: "4.5",
        reviewCount: 145
      },
      // Sports
      {
        categoryIndex: 4,
        name: "Yoga Mat Premium",
        nameAr: "سجادة يوغا فاخرة",
        description: "Extra thick non-slip yoga mat",
        descriptionAr: "سجادة يوغا سميكة ومضادة للانزلاق، مثالية للتمارين المنزلية",
        price: "99.00",
        originalPrice: null,
        images: [
          "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800"
        ],
        inStock: true,
        stockQuantity: 80,
        featured: false,
        isNew: false,
        onSale: false,
        rating: "4.6",
        reviewCount: 198
      },
      {
        categoryIndex: 4,
        name: "Adjustable Dumbbells Set",
        nameAr: "مجموعة أثقال قابلة للتعديل",
        description: "Space-saving adjustable dumbbells",
        descriptionAr: "مجموعة أثقال يمكن تعديل وزنها من 2 إلى 20 كجم، موفرة للمساحة",
        price: "799.00",
        originalPrice: "999.00",
        images: [
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800"
        ],
        inStock: true,
        stockQuantity: 15,
        featured: true,
        isNew: false,
        onSale: true,
        rating: "4.8",
        reviewCount: 76
      },
      // Books
      {
        categoryIndex: 5,
        name: "Arabic Literature Collection",
        nameAr: "مجموعة الأدب العربي",
        description: "Classic Arabic literature books collection",
        descriptionAr: "مجموعة من أروع الأعمال الأدبية العربية الكلاسيكية والمعاصرة",
        price: "149.00",
        originalPrice: null,
        images: [
          "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800"
        ],
        inStock: true,
        stockQuantity: 60,
        featured: false,
        isNew: true,
        onSale: false,
        rating: "4.9",
        reviewCount: 234
      },
      {
        categoryIndex: 5,
        name: "Business Strategy Guide",
        nameAr: "دليل استراتيجيات الأعمال",
        description: "Comprehensive business strategy book",
        descriptionAr: "كتاب شامل في استراتيجيات الأعمال والإدارة للمبتدئين والمحترفين",
        price: "89.00",
        originalPrice: "119.00",
        images: [
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"
        ],
        inStock: true,
        stockQuantity: 45,
        featured: false,
        isNew: false,
        onSale: true,
        rating: "4.4",
        reviewCount: 112
      }
    ];

    productsData.forEach(({ categoryIndex, ...prod }) => {
      const id = randomUUID();
      this.products.set(id, {
        ...prod,
        id,
        categoryId: categoryIds[categoryIndex]
      });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      const updated = { ...user, ...data };
      this.users.set(id, updated);
      return updated;
    }
    return undefined;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (cat) => cat.slug === slug
    );
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const newCategory: Category = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (p) => p.categoryId === categoryId
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter((p) => p.featured);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.nameAr.includes(query) ||
        p.description?.toLowerCase().includes(lowerQuery) ||
        p.descriptionAr?.includes(query)
    );
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const newProduct: Product = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const existingItem = Array.from(this.cartItems.values()).find(
      (i) => i.sessionId === item.sessionId && i.productId === item.productId
    );
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
      return existingItem;
    }
    
    const id = randomUUID();
    const newItem: CartItem = { ...item, id };
    this.cartItems.set(id, newItem);
    return newItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
    }
    return item;
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const items = await this.getCartItems(sessionId);
    items.forEach((item) => this.cartItems.delete(item.id));
  }

  // Order methods
  async getOrders(sessionId: string): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter((order) => order.sessionId === sessionId)
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter((order) => (order as any).userId === userId)
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(order: InsertOrder & { userId?: string }): Promise<Order> {
    const id = randomUUID();
    const newOrder: Order & { userId?: string } = { 
      ...order, 
      id,
      createdAt: new Date()
    };
    this.orders.set(id, newOrder as Order);
    return newOrder as Order;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      order.status = status;
    }
    return order;
  }

  // Order Items methods
  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (item) => item.orderId === orderId
    );
  }

  async createOrderItem(item: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const newItem: OrderItem = { ...item, id };
    this.orderItems.set(id, newItem);
    return newItem;
  }
}

export const storage = new MemStorage();
