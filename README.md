# FoodFlow production incident

FoodFlow is a backend service used by a fictional
food-delivery platform.

<p align="center">
  <img src="./assets/screenshots/architecture-diagram.png" alt="Logo de mi proyecto" width="300" />
</p>

The application allows clients to:

- Create orders
- Retrieve orders
- Retrieve restaurants
- Update restaurant availability
- Process payments
- Send notifications
- Register analytics events

## Requirements

- Node.js 20+
- npm

## Installation

```bash
npm install
```

## Start one instance

```
npm start
```

Default:

```
http://localhost:3000
```

## Start production-like cluster

```
npm run cluster
```

## Instances:

```
http://localhost:3001
http://localhost:3002
http://localhost:3003
```

## Health check

```
GET /health
```

## Orders

### List orders

```
GET /api/orders
```

### Get order

```
GET /api/orders/:id
```

### Create order

```
POST /api/orders
```

Headers:

```
Content-Type: application/json
Idempotency-Key: ORDER-001
```

Body:

```
{
  "customerId": "customer-1",
  "restaurantId": "restaurant-1",
  "items": [
    {
      "productId": "burger-1",
      "quantity": 2,
      "price": 150
    }
  ]
}
```

## Restaurants

```
GET /api/restaurants
GET /api/restaurants/:id
PATCH /api/restaurants/:id/open
```

Update example:

```
{
  "open": false
}
```

## Diagnostic scripts

Start the cluster first:

```
npm run cluster
```

Then use another terminal.

### Load

```
npm run test:load
```

### Duplicate requests

```
npm run test:duplicates
```

### Payment behavior

```
npm run test:payment
```

# Cómo ejecutarlo

Una vez que tengas todos los archivos:

```bash
npm install
```

Primero verifica tipos:

```
npm run typecheck
```

Después prueba una sola instancia:

```
npm start
```

Ve a:

```
http://localhost:3000/health
```

Debe responder:

```
{
  "status": "ok"
}
```

Después:

```
http://localhost:3000/api/restaurants
```

Y:

```
http://localhost:3000/api/orders
```

---

# Después ejecuta el escenario real

Terminal 1:

```
npm run cluster
```

Deja esa terminal abierta.

Terminal 2:

```
npm run test:duplicates
```

Después:

```
npm run test:payment
```

Y:

```
npm run test:load
```
