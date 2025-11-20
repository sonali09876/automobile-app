import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function VehicleCard() {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h5">Maruti Swift</Typography>
        <Typography>Model: 2022</Typography>
        <Typography>Price: ₹7,00,000</Typography>
        <Button variant="contained" sx={{ mt: 2 }}>View Details</Button>
      </CardContent>
    </Card>
  );
}
