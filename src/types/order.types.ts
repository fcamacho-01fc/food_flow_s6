import { Restaurant } from "./restaurant.types";

export type OrderStatus = "pending" | "paid" | "cancelled";

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface CreateOrderDTO {
  customerId: string;
  restaurantId: string;
  items: OrderItem[];
}

export interface CreateOrderData {
  customerId: string;
  restaurantId: string;

  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];

  total: number;

  status?: OrderStatus;
}

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

export interface OrderWithRestaurant extends Order {
  restaurant: Restaurant | null;
}
