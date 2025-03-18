export interface Address {
  id: string;
  name: string;
  phone: string;
  phonePrefix: string;
  city: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  type: "home" | "work";
  isDefault?: boolean;
}
