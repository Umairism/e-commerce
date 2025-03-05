import React from 'react';

function ProductDetails({ match }) {
  const { id } = match.params;

  return (
    <div>
      <h1>Product Details</h1>
      <p>Details for product ID: {id}</p>
    </div>
  );
}

export default ProductDetails;
