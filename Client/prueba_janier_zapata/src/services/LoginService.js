import axios from "axios";

export default class LoginService {
  api = "http://localhost:8000/api";

  constructor() {}

  login(email, password) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.api}/auth?email=${email}&password=${password}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  register(name, email,password  ) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.api}/user`, {
          "name":name,
          "email":email,
          "password":password
        })
        .then(({data}) => {
          if (!data.res) {
            throw new Error(data.message);
          }
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    });
  }

  updatePassword(data) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.api}/updatePassword`, data)
        .then(({ data }) => {
          if (!data.res) {
            throw new Error(data.message);
          }
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


}
