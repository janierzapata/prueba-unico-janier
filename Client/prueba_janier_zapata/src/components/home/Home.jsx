import React, { useEffect, useState } from "react";

import "../../styles/products.css";

import ProductService from "../../services/ProductService";
import { SweetAlert } from "../../hooks";
import { Order } from "../../hooks/data/Order";

const service = new ProductService();

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none");
  const [filterData, setFilterData] = useState(products);
  const [modalInfo, setModalInfo] = useState(null);

  useEffect(() => {
    service
      .getProducts()
      .then((res) => {
        setProducts(res.data);
        setFilterData([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let resp = filter();
    setFilterData([...resp]);
  }, [search, sort]);



  const formatPrice = (price) => {
    price = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);

    return price.replace(/[$,]/g, " ");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const filter = () => {
    const data = (() => {
      if (search === "") return products;
      return products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    })();

    const sortFilter = (() => {
      if (sort === "none") return data;

      const options = {
        lowerPrice: { param: "price", order: false },
        HeigherPrice: { param: "price", order: true },
        lowerName: { param: "name", order: false },
        HeigherName: { param: "name", order: true },
        lowerQueantity: { param: "quantity", order: false },
        HeigherQueantity: { param: "quantity", order: true },
      };

      const resp = Order(data, options[sort].param, options[sort].order);

      return resp;
    })();

    return sortFilter;
  };

  const openWhatsAppChat = () => {
    const whatsappURL = `https://wa.me/3015258391?text=${encodeURIComponent('Hola janier, me gustaría comprar el producto: ' + modalInfo?.name )}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="container-store">
      <h1>Productos publicados</h1>

      <div className="controllers">
        <div className="search">
          <input
            type="text"
            placeholder="Buscar producto"
            onChange={handleSearch}
          />
        </div>
        <div className="sort">
          <label htmlFor="sort">Ordenar por: </label>
          <select name="sort" id="sort" onChange={handleSort}>
            <option disabled value="none">Seleccione...</option>
            <option value="lowerName">Nombre A-Z</option>
            <option value="HeigherName">Nombre Z-A</option>
            <option value="lowerPrice">Menor precio</option>
            <option value="HeigherPrice">Mayor precio</option>
            <option value="lowerQueantity">Menor cantidad</option>
            <option value="HeigherQueantity">Mayor cantidad</option>
          </select>
        </div>
      </div>

      <div className="container-products">
        {filterData.length === 0 && (
          <div className="alert alert-info" role="alert">
            No se encontraron productos
          </div>
        )}
        {filterData.map((product) => (
          <div key={product.id} className="card card-product">
            <img
              src={`https://images.pexels.com/photos/266211${product.id}/pexels-photo-266211${product.id}.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`}
              className="card-img-top"
              alt={product.name}
            />
            <div className="card-body">
              <h5 className="card-title title-product mb-4">{product.name}</h5>
              <p className="card-text text-product">
                <span> Cantidad: </span>
                {product.quantity}
              </p>
              <p className="card-text text-product">
                <span> Precio: </span>
                {formatPrice(product.price)}
              </p>
              <button
                onClick={() => {
                  setModalInfo(product);
                }}
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Detalles del producto
              </button>
            </div>
          </div>
        ))}
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
                Detalles del producto
              </h3>
            </div>
            <div className="modal-body">
              <div className=" mb-3">
                <div className="row g-0">
                  <div className="col-md-4 d-flex justify-content-center image-description">
                    <img
                      src={`https://images.pexels.com/photos/266211${modalInfo?.id}/pexels-photo-266211${modalInfo?.id}.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body card-body-modal">
                      <h5 className="product-detail-card">{modalInfo?.name}</h5>
                      <p className="card-text">{modalInfo?.description}</p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          <strong> Cantidad: </strong>
                          {modalInfo?.quantity}
                        </small>
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          <strong> Precio: </strong>
                          {modalInfo?.price}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
              onClick={ ()=>setModalInfo(null)}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button onClick={openWhatsAppChat} type="button" className="btn btn-success">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
