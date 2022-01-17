import React, { useEffect, useState } from 'react';
import { getProducts, getProductsByCategory, getCategories } from '../../api';
import './Display.scss';
import rate from '../../assets/rate.png';

const Display = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ordered, setOrdered] = useState(false);
  const [search, setSearch] = useState('');

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

  let shownProducts = [...products];

  if (search.length) {
    shownProducts = shownProducts.filter(({ title }) => {
      return title.toUpperCase().includes(search.toUpperCase());
    });
  }

  if (ordered) {
    shownProducts.sort((a, b) => {
      const aTitle = a.title.toUpperCase();
      const bTitle = b.title.toUpperCase();

      if (aTitle < bTitle) {
        return -1;
      }

      if (aTitle > bTitle) {
        return 1;
      }

      return 0;
    });
  }

  return (
    <main className='display'>
      <section className='display__filters'>
        <div className='display__filter'>
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
        </div>

        <div className='display__filter'>
          <h1>Search</h1>

          <button
            className={ordered ? 'active' : ''}
            onClick={() => setOrdered(!ordered)}
          >
            Order By Name
          </button>

          <input
            placeholder='Search product'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className='display__grid'>
        {shownProducts.map(({ id, title, image, price, rating }) => (
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
