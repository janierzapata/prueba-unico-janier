import { useEffect, useRef, useState } from "react";
import "../../styles/tableProducts.css";

import ProductService from "../../services/ProductService";
import { SweetAlert } from "../../hooks";

const service = new ProductService();
export const Products = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);

  const btnClose = useRef();
  

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    service
      .getProducts(true)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setData([]);
    };
  };

  const handleDelete = (id) => {
    service
      .deleteProduct(id)
      .then((resp) => {
        getProducts();
        SweetAlert("OK", "Producto eliminado correctamente", "success", 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStatus = (id, status) => {
    status = status == "enabled" ? "disabled" : "enabled";

    service
      .updateProduct(id, { status })
      .then((resp) => {
        getProducts();
        SweetAlert("OK", "Producto actualizado correctamente", "success", 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeEdit = (e) => { 
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (id) => {  
    service
      .updateProduct(id, {...edit})
      .then((resp) => {
        if (!resp.res) {
          SweetAlert("Error", resp.message, "error", 2000);
          return;
        }
        btnClose.current.click();
        getProducts();
        SweetAlert("OK", "Producto actualizado correctamente", "success", 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-table">
        <div className="card card-table">
          <div className="card-body">
            <h5 className="card-title">Mis productos</h5>

            <table className="table table-striped mt-5">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Descripcion</th>
                  <th>Cantidad</th>
                  <th>Codigo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((product) => (
                  <tr key={product.id}>
                    <th>{product.id}</th>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td className="productDescription">
                      {product.description}
                    </td>
                    <td>{product.quantity}</td>
                    <td>{product.code}</td>
                    <td>
                      {product.status == "enabled" ? "Activo" : "Inactivo"}
                    </td>
                    <td className="groupactions">
                      <button
                        onClick={() => {
                          setEdit(product);
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        className="btn btn-primary"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-warning"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => handleStatus(product.id, product.status)}
                        className={`btn btn-${
                          product.status == "enabled" ? "danger" : "success"
                        }`}
                      >
                        {product.status == "enabled" ? "Desactivar" : "Activar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="">
              <h3 className="modal-title " id="exampleModalLabel">
                Actualización de producto
              </h3>
            </div>
            <div className="modal-body">
              <form className="row g-3 my-3">
                <div className="col-md-6">
                  <label htmlFor="inputName" className="form-label">
                    Nombre
                  </label>
                  <input
                    value={edit?.name}
                    onChange={handleChangeEdit}
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
                    value={edit?.price}
                    onChange={handleChangeEdit}
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
                    value={edit?.quantity}
                    onChange={handleChangeEdit}
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
                    value={edit?.code}
                    onChange={handleChangeEdit}
                    type="text"
                    className="form-control"
                    id="inputCode"
                    name="code"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputDescription" className="form-label">
                    Descripción
                  </label>
                  <textarea
                    value={edit?.description}
                    onChange={handleChangeEdit}
                    className="form-control"
                    id="inputDescription"
                    name="description"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={btnClose}
                onClick={() => {
                  setEdit(null);
                }}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                onClick={()=>handleEdit(edit.id)}
                type="button"
                className="btn btn-primary"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
