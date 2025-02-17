import { OrderStatus } from "@prisma/client";

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  sellerId: string;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
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
