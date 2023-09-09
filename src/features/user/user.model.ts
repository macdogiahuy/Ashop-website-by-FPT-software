import { Address } from "../address/address.model";

export interface UserDetails {
  id: string;
  addresses: Address[];
  defaultAddressId: string;
}
