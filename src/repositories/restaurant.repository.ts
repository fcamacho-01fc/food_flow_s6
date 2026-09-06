import { delay } from "../utils/delay";
import { Restaurant } from "../types/restaurant.types";

class RestaurantRepository {
  // TODO: Replace this with a real database connection and queries
  private restaurants: Restaurant[] = [
    {
      id: "restaurant-1",
      name: "Burger Factory",
      open: true,
    },
    {
      id: "restaurant-2",
      name: "Pizza Central",
      open: true,
    },
    {
      id: "restaurant-3",
      name: "Sushi House",
      open: true,
    },
    {
      id: "restaurant-4",
      name: "Taco Lab",
      open: true,
    },
    {
      id: "restaurant-5",
      name: "Green Kitchen",
      open: true,
    },
  ];

  async findAll(): Promise<Restaurant[]> {
    await delay(40);

    return [...this.restaurants];
  }

  async findById(id: string): Promise<Restaurant | null> {
    await delay(35);

    return this.restaurants.find((restaurant) => restaurant.id === id) ?? null;
  }

  async updateOpenStatus(
    id: string,
    open: boolean,
  ): Promise<Restaurant | null> {
    await delay(50);

    const restaurant = this.restaurants.find(
      (restaurant) => restaurant.id === id,
    );

    if (!restaurant) {
      return null;
    }

    restaurant.open = open;

    return { ...restaurant };
  }
}

export const restaurantRepository = new RestaurantRepository();
