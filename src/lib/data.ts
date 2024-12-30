import storeData from '@/data/store-data.json';

export type Product = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  inStock: boolean;
  featured: boolean;
  isOffer?: boolean;
  offerPrice?: number;
  offerEndDate?: string;
  tags: string[];
  specifications: Record<string, any>;
  slug: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  featured: boolean;
  slug: string;
};

export type StoreInfo = typeof storeData.storeInfo;
export type HomepageData = typeof storeData.homepage;
export type OffersData = typeof storeData.offers;
export type NewArrivalsData = typeof storeData.newArrivals;
export type UIData = typeof storeData.ui;

// Store Info
export function getStoreInfo(): StoreInfo {
  return storeData.storeInfo;
}

// Homepage
export function getHomepageData(): HomepageData {
  return storeData.homepage;
}

export function getFeaturedProductsData(): Product[] {
  const featuredIds = storeData.homepage.featuredProducts;
  return storeData.products.filter(product => featuredIds.includes(product.id));
}

// Products
export function getAllProducts(): Product[] {
  return storeData.products;
}

export function getProductById(id: string): Product | undefined {
  return storeData.products.find(product => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return storeData.products.find(product => product.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return storeData.products.filter(product => product.category === categoryId);
}

// Categories
export function getAllCategories(): Category[] {
  return storeData.categories;
}

export function getCategoryById(id: string): Category | undefined {
  return storeData.categories.find(category => category.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return storeData.categories.find(category => category.slug === slug);
}

export function getFeaturedCategories(): Category[] {
  return storeData.categories.filter(category => category.featured);
}

// Offers
export function getOffersData(): OffersData {
  return storeData.offers;
}

export function getOfferProducts(): Product[] {
  return storeData.products.filter(product => product.isOffer);
}

export function getFeaturedOffers(): Product[] {
  const offerIds = storeData.offers.featuredOffers;
  return storeData.products.filter(product => offerIds.includes(product.id));
}

// New Arrivals
export function getNewArrivalsData(): NewArrivalsData {
  return storeData.newArrivals;
}

export function getNewArrivalProducts(): Product[] {
  const newArrivalIds = storeData.newArrivals.featuredNewArrivals;
  return storeData.products.filter(product => newArrivalIds.includes(product.id));
}

// Search and Filter
export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return storeData.products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];

  return storeData.products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}

// UI Data
export function getNavigationItems() {
  return storeData.ui.navigation;
}

export function getFooterSections() {
  return storeData.ui.footer.sections;
}
