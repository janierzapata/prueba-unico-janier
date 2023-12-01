import { useRef, useState } from "react";
import "../../styles/profile.css";
import { useSelector } from "react-redux";
import LoginService from "../../services/LoginService";
import { SweetAlert } from "../../hooks";

const initialpassword = {
  current: "",
  newPass: "",
  confirm: "",
};

export const Profile = () => {
  const [password, setPassword] = useState(initialpassword);

  const { user } = useSelector((state) => state.login);

  const service = new LoginService();

  const btnClose = useRef();

  const handlePassword = ({ target }) => {
    setPassword({
      ...password,
      [target.name]: target.value,
    });
  };

  const handleEditPassword = ({ current, newPass, confirm }) => {
    if (newPass !== confirm) {
      SweetAlert(
        "Error",
        "La nueva contraseña y la confirmacion no coinciden",
        "error",
        2000
      );
      return;
    }

    service
      .updatePassword({
        email: user.email,
        password: current,
        newPassword: newPass,
      })
      .then((resp) => {
        btnClose.current.click();
        setPassword(initialpassword);
        SweetAlert(
          "OK",
          "Contraseña actualizada correctamente",
          "success",
          2000
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

 

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Informacion de la cuenta</h5>
            <p className="card-text">
              <span>Nombre:</span> {user.name}
            </p>

            <p className="card-text">
              <span>Correo electronico: </span> {user.email}
            </p>
          </div>

          <div className="actions actionst-center">
            
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Cambiar contraseña
            </button>
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
                Actualizar informacion de la cuenta
              </h3>
            </div>
            <div className="modal-body">
              <form className="row g-3 my-3">
                <div className="col-md-6">
                  <label htmlFor="current" className="form-label">
                    Contraseña actual
                  </label>
                  <input
                    onChange={handlePassword}
                    value={password.current}
                    type="password"
                    className="form-control"
                    id="current"
                    name="current"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="new" className="form-label">
                    Nueva contraseña
                  </label>
                  <input
                    onChange={handlePassword}
                    value={password.newPass}
                    type="password"
                    className="form-control"
                    id="new"
                    name="newPass"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="confirm" className="form-label">
                    Confirmar contraseña
                  </label>
                  <input
                    onChange={handlePassword}
                    value={password.confirm}
                    type="password"
                    className="form-control"
                    id="confirm"
                    name="confirm"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={btnClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleEditPassword(password);
                }}
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
