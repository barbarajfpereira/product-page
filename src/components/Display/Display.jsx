import React, { useEffect, useState } from 'react';
import { getProducts, getProductsByCategory, getCategories } from '../../api';
import './Display.scss';
import rate from '../../assets/rate.png';

const Display = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(['all', ...categories]);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      getProducts().then((products) => {
        setProducts(products);
      });
    } else {
      getProductsByCategory(selectedCategory).then((products) =>
        setProducts(products)
      );
    }
  }, [selectedCategory]);

  return (
    <main className='display'>
      <section className='display__filters'>
        <h1>Categories</h1>
        {categories.map((category, index) => (
          <button
            key={index}
            value={category}
            className={category === selectedCategory ? 'active' : ''}
            onClick={(e) => setSelectedCategory(e.target.value)}
          >
            {category}
          </button>
        ))}
      </section>

      <section className='display__grid'>
        {products.map(({ id, title, image, price, rating }) => (
          <div className='product' key={id}>
            <img className='product__image' src={image} alt={title} />

            <p className='product__description'>{title}</p>

            <div className='product__details'>
              <strong className='product__price'>{`${price} €`}</strong>

              <span className='product__rating'>
                <img src={rate} alt='rating' />
                <span>{rating.rate}</span>
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Display;
