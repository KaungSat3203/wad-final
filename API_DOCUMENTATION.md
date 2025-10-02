API Design Documentation - Customer Management

1. Read All Customers
Route           GET /api/customer
Payload (body)  -
Response        [{ 
                    _id: string,
                    name: string,
                    dateOfBirth: Date,
                    memberNumber: number,
                    interests: string 
                }, ...]
File            /app/api/customer/route.js
Test            curl http://localhost:3000/api/customer

2. Read Single Customer
Route           GET /api/customer/[id]
Payload (body)  -
Response        { 
                    _id: string,
                    name: string,
                    dateOfBirth: Date,
                    memberNumber: number,
                    interests: string 
                }
File            /app/api/customer/[id]/route.js
Test            curl http://localhost:3000/api/customer/[id]

3. Create Customer
Route           POST /api/customer
Payload (body)  {
                    name: string,
                    dateOfBirth: Date,
                    memberNumber: number,
                    interests: string
                }
Response        {
                    _id: string,
                    name: string,
                    dateOfBirth: Date,
                    memberNumber: number,
                    interests: string
                }
File            /app/api/customer/route.js
Test            curl -X POST http://localhost:3000/api/customer \
                -H "Content-Type: application/json" \
                -d '{"name":"John Doe","dateOfBirth":"2000-01-01","memberNumber":1,"interests":"sports"}'

4. Update Customer
Route           PUT /api/customer
Payload (body)  {
                    _id: string,
                    name: string,
                    dateOfBirth: Date,
                    memberNumber: number,
                    interests: string
                }
Response        {
                    _id: string,
                    name: string,
                    dateOfBirth: Date,
                    memberNumber: number,
                    interests: string
                }
File            /app/api/customer/route.js
Test            curl -X PUT http://localhost:3000/api/customer \
                -H "Content-Type: application/json" \
                -d '{"_id":"[id]","name":"John Doe","dateOfBirth":"2000-01-01","memberNumber":1,"interests":"sports"}'

5. Delete Customer
Route           DELETE /api/customer/[id]
Payload (body)  -
Response        {
                    _id: string,
                    name: string,
                    dateOfBirth: Date,
                    memberNumber: number,
                    interests: string
                }
File            /app/api/customer/[id]/route.js
Test            curl -X DELETE http://localhost:3000/api/customer/[id]

Data Model (MongoDB Schema):
{
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    memberNumber: {
        type: Number,
        required: true,
        unique: true
    },
    interests: {
        type: String,
        required: true
    }
}