import { NextFunction, Request, Response } from "express";

import { restaurantService } from "../services/restaurant.service";

class RestaurantController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurants = await restaurantService.getAll();

      res.json(restaurants);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const restaurant = await restaurantService.getById(id);

      if (!restaurant) {
        res.status(404).json({
          message: "Restaurant not found",
        });

        return;
      }

      res.json(restaurant);
    } catch (error) {
      next(error);
    }
  }

  async updateOpenStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const restaurant = await restaurantService.updateOpenStatus(
        id,
        Boolean(req.body.open),
      );

      if (!restaurant) {
        res.status(404).json({
          message: "Restaurant not found",
        });

        return;
      }

      res.json(restaurant);
    } catch (error) {
      next(error);
    }
  }
}

export const restaurantController = new RestaurantController();
