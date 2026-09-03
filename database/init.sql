CREATE TABLE restaurants (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    open BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE customers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    restaurant_id VARCHAR(50) NOT NULL,
    name VARCHAR(150) NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),

    CONSTRAINT fk_product_restaurant
        FOREIGN KEY (restaurant_id)
        REFERENCES restaurants(id)
);

CREATE TABLE orders (
    id UUID PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL,
    restaurant_id VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL,
    total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(id),

    CONSTRAINT fk_order_restaurant
        FOREIGN KEY (restaurant_id)
        REFERENCES restaurants(id)
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id UUID NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price NUMERIC(10,2) NOT NULL,

    CONSTRAINT fk_item_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_item_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
);

CREATE TABLE payments (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL,
    transaction_id VARCHAR(100),
    amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payment_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
);

CREATE TABLE idempotency_keys (
    key VARCHAR(200) PRIMARY KEY,
    order_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_idempotency_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
);


INSERT INTO restaurants (id, name, open)
VALUES
('restaurant-1', 'Burger Factory', TRUE),
('restaurant-2', 'Pizza Central', TRUE),
('restaurant-3', 'Sushi House', TRUE),
('restaurant-4', 'Taco Lab', TRUE),
('restaurant-5', 'Green Kitchen', FALSE);

INSERT INTO customers (id, name, email)
VALUES
('customer-1', 'Ana Torres', 'ana@example.com'),
('customer-2', 'Carlos Perez', 'carlos@example.com'),
('customer-3', 'Laura Gomez', 'laura@example.com');

INSERT INTO products (id, restaurant_id, name, price)
VALUES
('burger-1', 'restaurant-1', 'Classic Burger', 150),
('burger-2', 'restaurant-1', 'Double Burger', 220),
('pizza-1', 'restaurant-2', 'Pepperoni Pizza', 190),
('pizza-2', 'restaurant-2', 'Four Cheese Pizza', 210),
('sushi-1', 'restaurant-3', 'California Roll', 160),
('taco-1', 'restaurant-4', 'Taco Order', 120),
('salad-1', 'restaurant-5', 'Chicken Salad', 145);