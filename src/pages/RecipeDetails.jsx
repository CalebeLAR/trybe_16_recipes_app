import React from 'react';
import { useLocation } from 'react-router-dom';

export default function RecipeDetails() {
  const location = useLocation();

  return (
    <div>{ location.pathname }</div>
  );
}
