import { orderRepository } from "../repositories/order.repository";
import { OrderStatus, CreateOrderData } from "../types/order.types";

class OrderService {
  async createOrder(data: CreateOrderData) {
    return orderRepository.create(data);
  }

  async getOrders() {
    return orderRepository.findAll();
  }

  async getOrderById(id: string) {
    return orderRepository.findById(id);
  }
  // TODO: Implementar la lógica de negocio para actualizar un pedido recuerda que repository es el encargado de la persistencia de datos y service es el encargado de la lógica de negocio

  // TODO: Implementar la lógica de negocio para borrar un pedido recuerda que repository es el encargado de la persistencia de datos y service es el encargado de la lógica de negocio
}

export const orderService = new OrderService();
