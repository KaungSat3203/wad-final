import Customer from "@/models/Customer";

export async function GET() {
  return Response.json(await Customer.find());
}

export async function POST(request) {
  try {
    const body = await request.json();
    // Ensure dateOfBirth is properly parsed as a Date object
    if (body.dateOfBirth) {
      body.dateOfBirth = new Date(body.dateOfBirth);
    }
    const customer = new Customer(body);
    await customer.save();
    return Response.json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    return new Response("Error creating customer", { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    // Ensure dateOfBirth is properly parsed as a Date object
    if (updateData.dateOfBirth) {
      updateData.dateOfBirth = new Date(updateData.dateOfBirth);
    }
    
    const customer = await Customer.findByIdAndUpdate(_id, updateData, { 
      new: true,
      runValidators: true
    });
    
    if (!customer) {
      return new Response("Customer not found", { status: 404 });
    }
    return Response.json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    return new Response("Error updating customer", { status: 500 });
  }
}

export async function PATCH(request) {
  const body = await request.json();
  const { _id, ...updateData } = body;
  const customer = await Customer.findByIdAndUpdate(_id, updateData, { new: true });
  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }
  return Response.json(customer);
}