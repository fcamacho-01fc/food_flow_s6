import { OrderModel } from "../models/order.model";
import { CreateOrderData, OrderStatus } from "../types/order.types";

class OrderRepository {
  async create(data: CreateOrderData) {
    return OrderModel.create(data);
  }

  async findAll() {
    return OrderModel.find().sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return OrderModel.findById(id);
  }
  // Este metodo hace el update en la base de datos mongo, completa el service para que el controller pueda hacer el update de un order, recuerda que repository es el encargado de la persistencia de datos y service es el encargado de la lógica de negocio
  async updateStatus(id: string, status: OrderStatus) {
    return OrderModel.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );
  }
  // Este metodo hace el delete en la base de datos mongo, completa el service para que el controller pueda hacer el delete de un order, recuerda que repository es el encargado de la persistencia de datos y service es el encargado de la lógica de negocio
  async delete(id: string) {
    const result = await OrderModel.findByIdAndDelete(id);

    return result !== null;
  }
  async findByRestaurant(restaurantId: string) {
    return OrderModel.find({
      restaurantId,
    });
  }
}

export const orderRepository = new OrderRepository();
