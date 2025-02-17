import { OrderStatus } from "@prisma/client";

export interface OrderItem {
  productId: string;
  sellerId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  deliveryInstructions?: string;
}

export interface OrderResponse {
  success: boolean;
  orderId: string;
  status: OrderStatus;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      title: string;
    };
    seller: {
      id: string;
      name: string;
    };
  }>;
}
