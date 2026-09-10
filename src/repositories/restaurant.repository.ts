import { Restaurant } from "../types/restaurant.types";

import { postgres } from "../database/postgres";

class RestaurantRepository {
  async findAll(): Promise<Restaurant[]> {
    const result = await postgres.query(
      `SELECT id, name, open
        FROM restaurants
        ORDER BY name`,
    );
    return result.rows;
  }

  async findById(id: string): Promise<Restaurant | null> {
    const result = await postgres.query(
      `SELECT id, name, open      
        FROM restaurants
        WHERE id = $1 `,
      [id],
    );

    return result.rows[0] ?? null;
  }

  async create(restaurant: Restaurant): Promise<Restaurant> {
    const result = await postgres.query(
      `INSERT INTO restaurants (id,name,open)
      VALUES ($1, $2, $3)
      RETURNING id,name,open`,
      [restaurant.id, restaurant.name, restaurant.open],
    );

    return result.rows[0];
  }

  async updateOpenStatus(
    id: string,
    open: boolean,
  ): Promise<Restaurant | null> {
    const result = await postgres.query(
      `UPDATE restaurants
       SET open = $2
       WHERE id = $1
       RETURNING id, name, open`,
      [id, open],
    );

    return result.rows[0] ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await postgres.query(
      `DELETE FROM restaurants
       WHERE id = $1`,
      [id],
    );

    return (result.rowCount ?? 0) > 0;
  }
}

export const restaurantRepository = new RestaurantRepository();
