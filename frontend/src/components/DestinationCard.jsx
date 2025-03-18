// src/components/DestinationCard.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function DestinationCard({ recommendation }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{recommendation.name}</CardTitle>
        <CardDescription>{recommendation.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{recommendation.description}</p>
      </CardContent>
    </Card>
  );
}

export default DestinationCard;