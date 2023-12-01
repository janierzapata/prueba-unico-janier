import React, { useContext, useEffect, useState } from "react";

//import services
import LoginService from "../../services/LoginService";

//import style
import "./styles/login.css";

import { SweetAlert } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../redux/Slices/LoginSlice";

const service = new LoginService();

export const Login = () => {
  const [formState, setFormState] = useState({ user: "", password: "" });
  const { logged } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const { user, password } = formState;
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(login({ ...JSON.parse(user) }));
    }
  }, []);

  const handleForm = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  const handleSubmit = () => {
    service
      .login(user, password)
      .then((resp) => {
        let user = {
          user: {
            id: resp.data.id,
            name: resp.data.name,
            email: resp.data.email,
          },
          token: resp.data.api_token,
          logged: true,
        };

        SweetAlert( user.user.name, "Bienvenido" ,"success",  2000);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(login(user));
      })
      .catch((err) => {
        SweetAlert("Error", "Usuario o contraseña incorrectos" ,"error",  2000);
        dispatch(logout());
      });
  };

  return (
    <div className="row login-container  ">
      <div className=" col-sm-4  col-md-4  col-xl-3 ">
        <div className="card">
          <div >
            <h3 className="text-center">Iniciar Sesion</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Correo electronico:</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="example99"
                  name="user"
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
                  name="password"
                  onChange={handleForm}
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-primary mt-3 "
                  onClick={() => handleSubmit()}
                >
                  Ingresar
                </button>
              </div>
              <div className="register">
                <p>
                  ¿No tienes cuenta? <Link to="/register">Registrate aqui</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
