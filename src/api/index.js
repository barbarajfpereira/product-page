const API_BASE = 'https://fakestoreapi.com';

function getProducts() {
  return fetch(`${API_BASE}/products`).then((response) => response.json());
}

function getProductsByCategory(category) {
  return fetch(`${API_BASE}/products/category/${category}`).then((response) =>
    response.json()
  );
}

function getCategories() {
  return fetch(`${API_BASE}/products/categories`).then((response) =>
    response.json()
  );
}

export { getProducts, getProductsByCategory, getCategories };
