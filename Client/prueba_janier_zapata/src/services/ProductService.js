import axios from "axios";

export default class ProductService {
  api = "http://localhost:8000/api";

  constructor() {}
  getProducts(all = false) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.api}/products`)
        .then(({ data }) => {
          if (all) {
            resolve(data);
            return;
          }
          let resp = data.data.filter(
            (product) => product.status === "enabled"
          );
          resolve({ ...data, data: resp });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  createProduct(product) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.api}/products`, product)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  updateProduct(id, product) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.api}/products/${id}`, product)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.api}/products/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}
