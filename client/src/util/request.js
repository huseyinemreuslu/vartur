const apiUrl = "http://localhost:8080/api";

export const getProducts = async function (name, skip, take) {
  const response = await fetch(
    `${apiUrl}/products?name=${name}&skip=${skip}&take=${take}`
  );
  const jsonData = await response.json();
  return jsonData;
};

export const getProduct = async function (id) {
  const response = await fetch(`${apiUrl}/products/${id}`);
  const jsonData = await response.json();
  return jsonData;
};

export const removeProduct = async function (id) {
  const response = await fetch(`${apiUrl}/products/${id}`, {
    method: "DELETE",
  });
  const jsonData = await response.json();
  return jsonData;
};

export const createProduct = async function (productName) {
  const response = await fetch(`${apiUrl}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ name: productName }),
  });
  const jsonData = await response.json();
  return jsonData;
};

export const updateProduct = async function (productName, productId) {
  const response = await fetch(`${apiUrl}/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ name: productName }),
  });
  const jsonData = await response.json();
  return jsonData;
};
