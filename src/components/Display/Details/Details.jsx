import React, { useEffect, useState } from 'react';
import { getProductById } from '../../../api';
import './Details.scss';

const Details = ({ productId, onClose }) => {
  const [product, setProduct] = useState();

  useEffect(() => {
    if (productId) {
      getProductById(productId).then((product) => setProduct(product));
    } else {
      setProduct();
    }
  }, [productId]);

  if (!product) {
    return null;
  }

  const { title, image, description } = product;

  return (
    <div className='details' onClick={onClose}>
      <article className='details__modal'>
        <p>{title}</p>

        <img src={image} alt={title} width='100px' />

        <p>{description}</p>

        <button onClick={onClose}>Close</button>
      </article>
    </div>
  );
};

export default Details;
