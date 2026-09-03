import { Restaurant } from "../types/restaurant.types";
import { restaurantRepository } from "../repositories/restaurant.repository";

class RestaurantService {
  private cache = new Map<string, Restaurant>();

  async getAll(): Promise<Restaurant[]> {
    return restaurantRepository.findAll();
  }

  async getById(id: string): Promise<Restaurant | null> {
    const cached = this.cache.get(id);

    if (cached) {
      return cached;
    }

    const restaurant = await restaurantRepository.findById(id);

    if (restaurant) {
      this.cache.set(id, restaurant);
    }

    return restaurant;
  }

  async updateOpenStatus(
    id: string,
    open: boolean,
  ): Promise<Restaurant | null> {
    return restaurantRepository.updateOpenStatus(id, open);
  }
}

export const restaurantService = new RestaurantService();
