import { Router } from "express";

import { orderController } from "../controllers/order.controller";

export const orderRouter = Router();

orderRouter.get("/", orderController.getAll.bind(orderController));

orderRouter.get("/:id", orderController.getById.bind(orderController));

orderRouter.post("/", orderController.create.bind(orderController));

// TODO: agrega aqui el patch para el order updateStatus, recuerda que el controller es el encargado de recibir la petición y enviar la respuesta, y el service es el encargado de la lógica de negocio
// TODO: agrega aqui el delete para el order delete, recuerda que el controller es el encargado de recibir la petición y enviar la respuesta, y el service es el encargado de la lógica de negocio
