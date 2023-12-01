import React, { useContext, useState } from "react";

//import services

//import style
import "./styles/login.css";

import { SweetAlert } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import LoginService from "../../services/LoginService";

const service = new LoginService();
export const Register = () => {
  const [formState, setFormState] = useState({
    document: "",
    email: "",
    password1: "",
    password2: "",
    name: "",
  });

  const navigate = useNavigate();

  const handleForm = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  const handleSubmit = () => {
    const { name, password1, email, password2 } = formState;

    if (name === "" || password1 === "" || email === "" || password2 === "") {
      SweetAlert("Error", "Todos los campos son obligatorios", "error", 2000);
      return;
    }
    if (password1 !== password2) {
      SweetAlert("Error", "Las contraseñas no coinciden", "error", 2000);
      return;
    }
    service
      .register(name, email, password1)
      .then((resp) => {
        SweetAlert("Usuario registrado", " ", "success", 2000);
        navigate("/login");
      })
      .catch((err) => {
        SweetAlert("Error", err.message, "error", 2000);
      });
  };

  return (
    <div className="row login-container  ">
      <div className=" col-sm-4  col-md-4  col-xl-3 ">
        <div className="card">
          <div>
            <h3 className="text-center">Registrate ahora</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputname">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputname"
                  aria-describedby="emailHelp"
                  placeholder="example99"
                  name="name"
                  onChange={handleForm}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Correo electronico:</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="example99"
                  name="email"
                  onChange={handleForm}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="exampleInputPassword1">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="********"
                  name="password1"
                  onChange={handleForm}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="exampleInputPassword2">
                  Confirmacion Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  placeholder="********"
                  name="password2"
                  onChange={handleForm}
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-primary mt-3 "
                  onClick={() => handleSubmit()}
                >
                  Registrar
                </button>
              </div>
              <div className="register">
                <p>
                  ¿Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
