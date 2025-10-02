import { Box, Card, CardContent, Typography } from '@mui/material';

export default async function CustomerDetail({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${API_BASE}/customer/${params.id}`, {
    cache: 'no-store'
  });
  const customer = await response.json();

  return (
    <Box className="p-8">
      <Typography variant="h4" component="h1" gutterBottom>
        Customer Details
      </Typography>
      
      <Card className="max-w-2xl">
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {customer.name}
          </Typography>
          
          <Typography color="text.secondary" gutterBottom>
            Member Number: {customer.memberNumber}
          </Typography>
          
          <Typography variant="body1" gutterBottom>
            Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}
          </Typography>
          
          <Typography variant="body1">
            Interests: {customer.interests}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}