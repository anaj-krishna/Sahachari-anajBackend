# 🛵 DELIVERY API DOCUMENTATION

## Overview
Delivery partner API endpoints for accepting and managing delivery jobs. All endpoints require `DELIVERY` role with JWT authentication.

---

## Authentication & Authorization

### Guards Applied
- ✅ `JwtAuthGuard` - Must provide valid JWT token
- ✅ `RolesGuard` - Must have `DELIVERY` role

### Headers Required
```
Authorization: Bearer <JWT_TOKEN>
```

---

## API Endpoints

### 1️⃣ Get Available Jobs
**Purpose:** Show all orders ready for pickup that haven't been assigned yet

**Endpoint:** `GET /delivery/orders?status=READY`

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| status | string | No | - | Filter by status (READY) |

**Response (200 OK):**
```json
[
  {
    "_id": "order_123",
    "userId": {
      "_id": "user_456",
      "name": "John Doe",
      "phone": "+1234567890"
    },
    "storeId": {
      "_id": "store_789",
      "name": "Main Store",
      "address": "123 Main St",
      "phone": "+0987654321"
    },
    "items": [
      {
        "productId": {
          "_id": "prod_101",
          "name": "Product Name",
          "price": 10.99
        },
        "quantity": 2,
        "price": 10.99
      }
    ],
    "totalAmount": 21.98,
    "deliveryAddress": {
      "street": "456 Delivery St",
      "city": "San Francisco",
      "zipCode": "94102",
      "phone": "+1111111111",
      "notes": "Ring doorbell twice"
    },
    "status": "READY",
    "deliveryBoyId": null,
    "createdAt": "2025-01-19T10:00:00.000Z",
    "updatedAt": "2025-01-19T10:00:00.000Z"
  }
]
```

**Error Responses:**
| Status | Code | Message |
|--------|------|---------|
| 401 | Unauthorized | Invalid or missing JWT token |
| 403 | Forbidden | User doesn't have DELIVERY role |

**Use Cases:**
- Delivery app home screen
- Delivery partner browsing available jobs
- Finding new delivery assignments

---

### 2️⃣ Get My Assigned Jobs
**Purpose:** Fetch all orders assigned to the logged-in delivery person

**Endpoint:** `GET /delivery/orders/me`

**Response (200 OK):**
```json
[
  {
    "_id": "order_123",
    "userId": {
      "_id": "user_456",
      "name": "John Doe",
      "phone": "+1234567890",
      "email": "john@example.com"
    },
    "storeId": {
      "_id": "store_789",
      "name": "Main Store",
      "address": "123 Main St",
      "phone": "+0987654321"
    },
    "items": [
      {
        "productId": {
          "_id": "prod_101",
          "name": "Product Name",
          "price": 10.99
        },
        "quantity": 2,
        "price": 10.99
      }
    ],
    "totalAmount": 21.98,
    "deliveryAddress": {
      "street": "456 Delivery St",
      "city": "San Francisco",
      "zipCode": "94102",
      "phone": "+1111111111",
      "notes": "Ring doorbell twice"
    },
    "status": "ACCEPTED",
    "deliveryBoyId": "delivery_user_123",
    "createdAt": "2025-01-19T10:00:00.000Z",
    "updatedAt": "2025-01-19T10:30:00.000Z"
  }
]
```

**Statuses Returned:**
- `ACCEPTED` - Delivery partner accepted the job
- `PICKED_UP` - Package picked up from store
- `DELIVERED` - Successfully delivered
- `FAILED` - Delivery failed

**Use Cases:**
- "My Orders" / "My Deliveries" screen
- Tracking all assigned deliveries
- Dashboard for delivery partner

---

### 3️⃣ Get Single Order Details
**Purpose:** Get full details of a specific delivery job

**Endpoint:** `GET /delivery/orders/:id`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Order ID (MongoDB ObjectId) |

**Response (200 OK):**
```json
{
  "_id": "order_123",
  "userId": {
    "_id": "user_456",
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com"
  },
  "storeId": {
    "_id": "store_789",
    "name": "Main Store",
    "address": "123 Main St",
    "phone": "+0987654321"
  },
  "items": [
    {
      "productId": {
        "_id": "prod_101",
        "name": "Product Name",
        "price": 10.99
      },
      "quantity": 2,
      "price": 10.99
    }
  ],
  "totalAmount": 21.98,
  "deliveryAddress": {
    "street": "456 Delivery St",
    "city": "San Francisco",
    "zipCode": "94102",
    "phone": "+1111111111",
    "notes": "Ring doorbell twice"
  },
  "status": "ACCEPTED",
  "deliveryBoyId": "delivery_user_123",
  "createdAt": "2025-01-19T10:00:00.000Z",
  "updatedAt": "2025-01-19T10:30:00.000Z"
}
```

**Error Responses:**
| Status | Code | Message |
|--------|------|---------|
| 404 | Not Found | Order not found or not assigned to you |
| 401 | Unauthorized | Invalid or missing JWT token |
| 403 | Forbidden | User doesn't have DELIVERY role |

**Security:**
⚠️ Delivery person can **only see orders assigned to them**

**Use Cases:**
- Opening order detail screen
- Viewing customer address, phone, and items
- Map view with delivery address
- Checking delivery instructions

---

## Delivery Actions (Status Transitions)

### 4️⃣ Accept Job
**Purpose:** Delivery partner accepts a job and becomes assigned to it

**Endpoint:** `POST /delivery/orders/:id/accept`

**Status Transition:** `READY → ACCEPTED`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Order ID (MongoDB ObjectId) |

**Request Body:**
```json
{}
```
(No body required)

**Response (200 OK):**
```json
{
  "_id": "order_123",
  "status": "ACCEPTED",
  "deliveryBoyId": "delivery_user_123",
  "userId": {
    "_id": "user_456",
    "name": "John Doe",
    "phone": "+1234567890"
  },
  "storeId": {
    "_id": "store_789",
    "name": "Main Store",
    "address": "123 Main St",
    "phone": "+0987654321"
  },
  "deliveryAddress": {
    "street": "456 Delivery St",
    "city": "San Francisco",
    "zipCode": "94102",
    "phone": "+1111111111",
    "notes": "Ring doorbell twice"
  },
  "items": [
    {
      "productId": "_id_of_product",
      "quantity": 2,
      "price": 10.99
    }
  ],
  "totalAmount": 21.98,
  "createdAt": "2025-01-19T10:00:00.000Z",
  "updatedAt": "2025-01-19T10:30:00.000Z"
}
```

**Error Responses:**
| Status | Code | Message |
|--------|------|---------|
| 404 | Not Found | Order not found, already assigned, or not in READY status |
| 401 | Unauthorized | Invalid or missing JWT token |
| 403 | Forbidden | User doesn't have DELIVERY role |

**Rules:**
- ✅ Order must be in `READY` status
- ✅ Order must not already be assigned (`deliveryBoyId = null`)
- ✅ Only one delivery person per order

**Use Cases:**
- Delivery partner taps "Accept Job"
- Assigns delivery person to the order
- Order moves to next stage

---

### 5️⃣ Pickup Order
**Purpose:** Confirm order picked up from store

**Endpoint:** `POST /delivery/orders/:id/pickup`

**Status Transition:** `ACCEPTED → PICKED_UP`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Order ID (MongoDB ObjectId) |

**Request Body:**
```json
{}
```
(No body required)

**Response (200 OK):**
```json
{
  "_id": "order_123",
  "status": "PICKED_UP",
  "deliveryBoyId": "delivery_user_123",
  "userId": {
    "_id": "user_456",
    "name": "John Doe",
    "phone": "+1234567890"
  },
  "storeId": {
    "_id": "store_789",
    "name": "Main Store",
    "address": "123 Main St",
    "phone": "+0987654321"
  },
  "deliveryAddress": {
    "street": "456 Delivery St",
    "city": "San Francisco",
    "zipCode": "94102",
    "phone": "+1111111111",
    "notes": "Ring doorbell twice"
  },
  "items": [
    {
      "productId": "_id_of_product",
      "quantity": 2,
      "price": 10.99
    }
  ],
  "totalAmount": 21.98,
  "createdAt": "2025-01-19T10:00:00.000Z",
  "updatedAt": "2025-01-19T10:45:00.000Z"
}
```

**Error Responses:**
| Status | Code | Message |
|--------|------|---------|
| 404 | Not Found | Order not found, not assigned to you, or not in ACCEPTED status |
| 401 | Unauthorized | Invalid or missing JWT token |
| 403 | Forbidden | User doesn't have DELIVERY role |

**Rules:**
- ✅ Order must be in `ACCEPTED` status
- ✅ Order must be assigned to the delivery person making the request
- ✅ Can only proceed after accepting the job

**Side Effects:**
- ⏱️ Start delivery timer
- 🗺️ Enable live tracking
- 📍 Ready for delivery

**Use Cases:**
- Delivery person confirms package collected from store
- Package is ready for route optimization
- Start timer for delivery SLA
- Enable live tracking for customer

---

### 6️⃣ Deliver Order
**Purpose:** Mark order as successfully delivered

**Endpoint:** `POST /delivery/orders/:id/deliver`

**Status Transition:** `PICKED_UP → DELIVERED`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Order ID (MongoDB ObjectId) |

**Request Body:**
```json
{}
```
(No body required)

**Response (200 OK):**
```json
{
  "_id": "order_123",
  "status": "DELIVERED",
  "deliveryBoyId": "delivery_user_123",
  "userId": {
    "_id": "user_456",
    "name": "John Doe",
    "phone": "+1234567890"
  },
  "storeId": {
    "_id": "store_789",
    "name": "Main Store",
    "address": "123 Main St",
    "phone": "+0987654321"
  },
  "deliveryAddress": {
    "street": "456 Delivery St",
    "city": "San Francisco",
    "zipCode": "94102",
    "phone": "+1111111111",
    "notes": "Ring doorbell twice"
  },
  "items": [
    {
      "productId": "_id_of_product",
      "quantity": 2,
      "price": 10.99
    }
  ],
  "totalAmount": 21.98,
  "createdAt": "2025-01-19T10:00:00.000Z",
  "updatedAt": "2025-01-19T11:00:00.000Z"
}
```

**Error Responses:**
| Status | Code | Message |
|--------|------|---------|
| 404 | Not Found | Order not found, not assigned to you, or not in PICKED_UP status |
| 401 | Unauthorized | Invalid or missing JWT token |
| 403 | Forbidden | User doesn't have DELIVERY role |

**Rules:**
- ✅ Order must be in `PICKED_UP` status
- ✅ Order must be assigned to the delivery person making the request
- ✅ Cannot mark as delivered without picking up first

**Side Effects:**
- ✅ Order is closed
- 💳 Payment settlement triggered
- 📊 Delivery marked as completed
- 🎯 Delivery SLA timer stopped
- 📧 Customer receives delivery confirmation

**Use Cases:**
- Customer receives and confirms order
- Delivery person marks successful delivery
- Order completion and payment processing
- Delivery metrics updated

---

### 7️⃣ Fail Delivery
**Purpose:** Mark delivery as failed

**Endpoint:** `POST /delivery/orders/:id/fail`

**Status Transition:** `PICKED_UP → FAILED`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Order ID (MongoDB ObjectId) |

**Request Body:**
```json
{}
```
(No body required - Failure reason can be logged in future versions)

**Response (200 OK):**
```json
{
  "_id": "order_123",
  "status": "FAILED",
  "deliveryBoyId": "delivery_user_123",
  "userId": {
    "_id": "user_456",
    "name": "John Doe",
    "phone": "+1234567890"
  },
  "storeId": {
    "_id": "store_789",
    "name": "Main Store",
    "address": "123 Main St",
    "phone": "+0987654321"
  },
  "deliveryAddress": {
    "street": "456 Delivery St",
    "city": "San Francisco",
    "zipCode": "94102",
    "phone": "+1111111111",
    "notes": "Ring doorbell twice"
  },
  "items": [
    {
      "productId": "_id_of_product",
      "quantity": 2,
      "price": 10.99
    }
  ],
  "totalAmount": 21.98,
  "createdAt": "2025-01-19T10:00:00.000Z",
  "updatedAt": "2025-01-19T11:30:00.000Z"
}
```

**Error Responses:**
| Status | Code | Message |
|--------|------|---------|
| 404 | Not Found | Order not found, not assigned to you, or not in PICKED_UP status |
| 401 | Unauthorized | Invalid or missing JWT token |
| 403 | Forbidden | User doesn't have DELIVERY role |

**Rules:**
- ✅ Order must be in `PICKED_UP` status
- ✅ Order must be assigned to the delivery person making the request
- ✅ Cannot fail before picking up the order

**Failure Reasons (for logging):**
- ❌ Customer unreachable
- ❌ Address incorrect
- ❌ Customer refused order
- ❌ Item damaged
- ❌ Other (custom reason)

**Side Effects:**
- 📧 Customer notified of failed delivery
- 🔄 Order may be reassigned or returned to store
- 📊 Delivery failure metrics recorded
- 💳 Payment processing paused

**Use Cases:**
- Customer unreachable or unavailable
- Address incorrect or invalid
- Customer refuses delivery
- Order damaged during transport
- Unforeseen delivery issues

---

## Order Status Lifecycle

```
PLACED
  ↓
ACCEPTED (by Storekeeper)
  ↓
READY (Storekeeper marks ready for delivery)
  ↓ (Delivery partner accepts)
ACCEPTED (Delivery person accepts the job)
  ↓
PICKED_UP (From store)
  ↓
DELIVERED ✅ (Successful delivery)
   OR
FAILED ❌ (Failed delivery attempt)
```

---

## Complete Order Schema

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  storeId: ObjectId (ref: User/Store),
  checkoutId: string,
  deliveryBoyId: ObjectId | null (ref: User/Delivery),
  items: [
    {
      productId: ObjectId (ref: Product),
      quantity: number,
      price: number
    }
  ],
  totalAmount: number,
  deliveryAddress: {
    street: string,
    city: string,
    zipCode: string,
    phone: string,
    notes?: string
  },
  status: 'PLACED' | 'ACCEPTED' | 'REJECTED' | 'READY' | 'PICKED_UP' | 'DELIVERED' | 'FAILED' | 'CANCELLED',
  createdAt: Date,
  updatedAt: Date
}
```

---

## Example cURL Requests

### Get Available Jobs
```bash
curl -X GET "http://localhost:3000/delivery/orders?status=READY" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### Get My Jobs
```bash
curl -X GET "http://localhost:3000/delivery/orders/me" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### Get Order Details
```bash
curl -X GET "http://localhost:3000/delivery/orders/ORDER_ID" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### Accept Job
```bash
curl -X POST "http://localhost:3000/delivery/orders/ORDER_ID/accept" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Pickup Order
```bash
curl -X POST "http://localhost:3000/delivery/orders/ORDER_ID/pickup" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Deliver Order
```bash
curl -X POST "http://localhost:3000/delivery/orders/ORDER_ID/deliver" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Fail Delivery
```bash
curl -X POST "http://localhost:3000/delivery/orders/ORDER_ID/fail" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## Error Handling

### Common HTTP Status Codes

| Status | Meaning | When It Occurs |
|--------|---------|----------------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid request body or parameters |
| 401 | Unauthorized | Missing or invalid JWT token |
| 403 | Forbidden | User lacks required DELIVERY role |
| 404 | Not Found | Order not found or not accessible |
| 500 | Server Error | Unexpected server error |

### Error Response Format
```json
{
  "statusCode": 404,
  "message": "Order not found or not assigned to you",
  "error": "Not Found"
}
```

---

## Testing Workflow

### Complete Delivery Workflow Test
1. **Get Available Jobs** → Lists READY orders
2. **Accept Job** → Changes status to ACCEPTED, assigns delivery person
3. **Get Order Details** → Shows full order info
4. **Pickup Order** → Changes status to PICKED_UP
5. **Deliver Order** → Changes status to DELIVERED (Success path)
   - OR **Fail Delivery** → Changes status to FAILED (Failure path)

---

## Notes

- All timestamps are in UTC (ISO 8601 format)
- MongoDB ObjectId format: 24-character hexadecimal string
- JWT tokens should be included in `Authorization: Bearer <token>` header
- All endpoints require valid JWT token with DELIVERY role
- Delivery person can only access orders assigned to them
- Status transitions are strictly enforced
- Orders are automatically created by storekeeper when marked READY

---

## Future Enhancements

- 📝 Add failure reason logging to fail delivery endpoint
- 📍 Real-time location tracking for delivery in progress
- 🔔 Push notifications for job acceptance/delivery
- ⏱️ SLA metrics and delivery time tracking
- 🗺️ Route optimization for multiple deliveries
- 🔄 Reassignment workflow for failed deliveries
- 📸 Photo proof of delivery
- 💬 In-app messaging between delivery and customer
