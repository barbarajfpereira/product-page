import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api';
import './Display.scss';

const Display = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='display'>
      {products.map(({ id, title, image, price }) => (
        <div className='product' key={id}>
          <img className='product__image' src={image} alt={title} />

          <p className='product__description'>{title}</p>

          <strong className='product__price'>{`${price} €`}</strong>
        </div>
      ))}
    </main>
  );
};

export default Display;
