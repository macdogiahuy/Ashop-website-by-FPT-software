export interface Product {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  sold: number;
  category: string;
  rate: number;
  reviewCount: number;
  totalAvailable: number;
  count: number;
  images?: { original: string; thumbnail?: string }[];
  detail?: {
    description?: string;
    info?: { label: string; value: string }[];
  };
  addedDate?: string;
  updatedDate?: string;
  shopId: string;
}
