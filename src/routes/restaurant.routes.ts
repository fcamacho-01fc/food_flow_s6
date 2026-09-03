import { Router } from "express";

import { restaurantController } from "../controllers/restaurant.controller";

export const restaurantRouter = Router();

restaurantRouter.get(
  "/",
  restaurantController.getAll.bind(restaurantController),
);

restaurantRouter.get(
  "/:id",
  restaurantController.getById.bind(restaurantController),
);

restaurantRouter.patch(
  "/:id/open",
  restaurantController.updateOpenStatus.bind(restaurantController),
);
