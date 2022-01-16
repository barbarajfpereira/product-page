function getProducts() {
  const url = 'https://fakestoreapi.com/products';

  return fetch(url).then((response) => response.json());
}

export { getProducts };
