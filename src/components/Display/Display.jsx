import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { getProducts, getProductsByCategory, getCategories } from '../../api';
import './Display.scss';

const Display = ({ isWishlist }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ordered, setOrdered] = useState(false);
  const [search, setSearch] = useState('');
  const [minRating, setMinRating] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(['all', ...categories]);
    });

    const storedWishlist = localStorage.getItem('wishlist');

    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
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

  const toggleWishlist = (id) => {
    const newWishlist = wishlist.includes(id)
      ? wishlist.filter((wishlistId) => wishlistId !== id)
      : [...wishlist, id];

    setWishlist(newWishlist);

    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  let shownProducts = [...products];

  if (isWishlist) {
    shownProducts = shownProducts.filter(({ id }) => wishlist.includes(id));
  }

  if (search.length) {
    shownProducts = shownProducts.filter(({ title }) =>
      title.toUpperCase().includes(search.toUpperCase())
    );
  }

  if (minRating || minPrice || maxPrice) {
    shownProducts = shownProducts.filter(({ price, rating }) => {
      const matchedMinRating = !minRating || rating.rate >= minRating;
      const matchedMinPrice = !minPrice || price >= minPrice;
      const matchedMaxPrice = !maxPrice || price <= maxPrice;

      return matchedMinRating && matchedMinPrice && matchedMaxPrice;
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
        <div className='filter'>
          <h1>Categories</h1>

          <div>
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
        </div>

        <div className='filter'>
          <h1>Filter</h1>

          <div>
            <button
              className={ordered ? 'active' : ''}
              onClick={() => setOrdered(!ordered)}
            >
              Order By Name
            </button>

            <input
              className='filter__search'
              placeholder='Search product'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <input
              className='filter__rating'
              placeholder='Min rating'
              type='number'
              min='1'
              max='5'
              step='0.1'
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            />

            <input
              className='filter__price'
              placeholder='Min price'
              type='number'
              min='1'
              step='10'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <input
              className='filter__price'
              placeholder='Max price'
              type='number'
              min='1'
              step='10'
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
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
                <FontAwesomeIcon icon={faStar} />

                <span>{rating.rate}</span>
              </span>

              <div onClick={() => toggleWishlist(id)}>
                {wishlist.includes(id) ? (
                  <FontAwesomeIcon color='#ffef96' icon={faHeart} />
                ) : (
                  <FontAwesomeIcon icon={faHeartRegular} />
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Display;
