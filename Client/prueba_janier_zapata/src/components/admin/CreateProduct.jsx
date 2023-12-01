import { useState } from "react";
import "../../styles/CreateProduct.css";
import { SweetAlert } from "../../hooks";
import { useEffect } from "react";
import ProductService from "../../services/ProductService";

const initialForm = {
  name: "",
  price: "",
  quantity: "",
  code: "",
  description: "",
};

const service = new ProductService();

export const CreateProduct = () => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const { error, message } = validateForm();

    if (error) {
      SweetAlert("Error", message, "error", 2000);
      return;
    }

    service
      .createProduct(form)
      .then((resp) => {
        if (!resp.res) {
          SweetAlert("Error", resp.message, "error", 2000);
          return;
        }
        SweetAlert(
          "Producto creado",
          "El producto se ha creado correctamente",
          "success",
          2000
        );
        setForm(initialForm);
      })
      .catch((err) => {
        SweetAlert("Error", "Ha ocurrido un error", "error", 2000);
      });
  };

  const validateForm = () => {
    const { name, price, quantity, code, description } = form;

    if (
      !name.length ||
      !price.length ||
      !quantity.length ||
      !code.length ||
      !description.length
    ) {
      return { error: true, message: "Todos los campos son obligatorios" };
    }
    if (price < 0 || quantity < 0) {
      return { error: true, message: "No se permiten valores negativos" };
    }

    return { error: false, message: "" };
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Nuevo producto</h5>
          <form className="row g-3 mt-5">
            <div className="col-md-6">
              <label htmlFor="inputName" className="form-label">
                Nombre
              </label>
              <input
                value={form.name}
                onChange={handleChange}
                type="text"
                className="form-control"
                id="inputName"
                name="name"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPrice" className="form-label">
                Precio
              </label>
              <input
                value={form.price}
                onChange={handleChange}
                type="number"
                className="form-control"
                id="inputPrice"
                name="price"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputQuantity" className="form-label">
                Cantidad
              </label>
              <input
                value={form.quantity}
                onChange={handleChange}
                type="text"
                className="form-control"
                id="inputQuantity"
                name="quantity"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCode" className="form-label">
                Código
              </label>
              <input
                value={form.code}
                onChange={handleChange}
                type="text"
                className="form-control"
                id="inputCode"
                name="code"
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputDescription" className="form-label">
                Descripcion
              </label>
              <textarea
                value={form.description}
                onChange={handleChange}
                className="form-control"
                id="inputDescription"
                name="description"
              ></textarea>
            </div>

            <div className="col-12 mt-5">
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Crear producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
