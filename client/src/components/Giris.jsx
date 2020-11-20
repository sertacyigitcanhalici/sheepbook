import React, { useState } from "react";
import { toast } from "react-toastify";
const Giris = ({ setIsAuthenticated }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  const onSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setIsAuthenticated(true);
        toast.success("Kayit Basarili");
      } else {
        setIsAuthenticated(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setIsAuthenticated(true);
        toast.success("Giris Basarili");
      } else {
        setIsAuthenticated(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="container">
      <h1>Kayit</h1>
      <form onSubmit={onSubmitRegister}>
        <input
          type="text"
          name="name"
          placeholder="isim"
          value={name}
          className="form-control my-3"
          onChange={(e) => onChange(e)}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          className="form-control  my-3"
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="sifre"
          value={password}
          className="form-control my-3"
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Kayit Ol</button>
      </form>
      <h1>Giris</h1>
      <form onSubmit={onSubmitLogin}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          className="form-control  my-3"
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="sifre"
          value={password}
          className="form-control my-3"
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-primary btn-block">Giris Yap</button>
      </form>
    </div>
  );
};

export default Giris;
