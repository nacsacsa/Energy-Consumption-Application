# **Meter API Documentation**

This API provides endpoints to manage meters, meter readings, and to calculate consumption for a given time period.  
Built with **Node.js**, **Express**, and **SQLite**.


# **Base URL**

- http://localhost:3000/

---


# **Meters**

### **<span style="color:green">GET</span> /meter**
Get all meters.

Response:
```json
[
    {
        "id": 1,
        "name": "Household1"
    },
    {
        "id": 2,
        "name": "Household2"
    }
]
```
Status codes:
- `200` OK

---

### **<span style="color:green">GET</span> /meter/`id`**
Get a meter by ID.

Parameters:
- `id` (number)

Response:
```json
{
    "id": 1,
    "name": "Household1"
}
```
Status codes:
- `200` OK

Errors:
- `400` Invalid `id`
- `404` Meter not found

---

### **<span style="color:yellow">POST</span> /meter**
Create a new meter.

Request body:
```json
{
    "name": "Household3"
}
```

Response:
```json
{
    "id": 3,
    "name": "Household3"
}
```
Status codes:
- `201` CREATED

Errors:
- `400` Name is mandatory

---

### **<span style="color:blue">PUT</span> /meter/`id`**
Update an existing meter.

Request body:
```json
{
    "name": "Updated meter name"
}
```

Status codes:
- `200` OK

Errors:
- `400` Invalid `id`
- `400` Name is mandatory
- `404` Meter not found

---

### **<span style="color:red">DELETE</span> /meter/`id`**
Delete a meter.

Response:
```json
{
    "message": "Meter 1 deleted"
}
```

Status codes:
- `200` OK

Errors:
- `400` Invalid id
- `404` Meter not found

---

# **Readings**

### **<span style="color:green">GET</span> /reading**
Get all meter readings.

Response:
```json
[
    {
        "id": 1,
        "meter_id": 1,
        "reading": 1234,
        "timestamp": "2025-01-10T10:00:00.000Z"
    },

    {
        "id": 2,
        "meter_id": 1,
        "reading": 1500,
        "timestamp": "2025-02-03T10:00:00.000Z"
    }
]
```

Status codes:
- `200` OK

### **<span style="color:green">GET</span> /reading/`id`**
Get a meter reading by ID.

```json
{
    "id": 2,
    "meter_id": 1,
    "reading": 1500,
    "timestamp": "2025-02-03T10:00:00.000Z"
}
```

Status codes:
- `200` OK

Errors:
- `400` Invalid `id`
- `404` Meter reading not found

---

### **<span style="color:yellow">POST</span> /reading**
Create a new meter reading.

Request body:
```json
{
    "meter_id": 1,
    "reading": 1500,
    "timestamp": "2025-01-12"
}
```

Notes:
- `timestamp` is optional
- If not provided, the current time is used

Response:
```json
{
    "id": 3,
    "meter_id": 1,
    "reading": 1500,
    "timestamp": "2025-01-12T11:57:24.537Z"
}
```
Status codes:
- `201` CREATED

Errors:
- `400` `meter_id` and `readin` are mandatory

---

### **<span style="color:blue">PUT</span> /reading/`id`**
Update a meter reading.

Request body:
```json
{
    "meter_id": 1,
    "reading": 1600,
    "timestamp": "2025-01-12"
}
```

Status codes:
- `200` OK

Errors:
- `400` Invalid `id`
- `404` Meter `reading` not found

---

### **<span style="color:red">DELETE</span> /reading/`id`**
Delete a meter `reading`.

Response:
```json
{
    "message": "Meter reading 3 deleted"
}
```

Status codes:
- `200` OK

Errors:
- `400` Invalid `id`
- `404` Meter `reading` not found

---

# **Consumption**

### **<span style="color:green">GET</span> /consumption**
Calculate consumption for a meter between two dates.

Query parameters:
- `meter_id` (number, required)
- `from` (YYYY-MM-DD, required)
- `to` (YYYY-MM-DD, required)

Search example:
- GET /consumption?meter_id=1&from=2025-01-01&to=2025-01-31

Response:
```json
250
```

Status codes:
- `200` OK

Errors:
- `400` meter_idn from and to are required
- `404` No readings found for start or end date

---

## **Notes**
- Recommended input format: YYYY-MM-DD
- Internally all timestamps are stored in ISO 8601 format