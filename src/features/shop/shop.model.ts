export interface Shop {
  id: string;
  name: string;
  logo: string;
  banner?: string;
  address?: string;
  reviewCount: number;
  productCount: number;
  responseRate: number;
  responseTime: string;
  joinDate: Date | string | number;
  lastActive: Date | string | number;
  followerCount: number;
  userId: string;
}
