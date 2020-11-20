import React, { useState, useEffect } from "react";
import { Accordion, Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import Koyun from "./Koyun";
const Koyunlar = ({ setIsAuthenticated }) => {
  const [koyunlar, setKoyunlar] = useState([]);
  const getKoyunlar = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/", {
        method: "GET",
        headers: { jwtToken: localStorage.token },
      });

      const parseData = await res.json();

      setKoyunlar(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      toast.success("Cikis Basarili");
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getKoyunlar();
    console.log(koyunlar);
  }, []);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Sheepbook</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Koyun Ekle</Nav.Link>
          <Nav.Link href="/">Asilar</Nav.Link>
          <Nav.Link href="/">Aile Agaci</Nav.Link>
        </Nav>
        <Button variant="outline-info" onClick={logout}>
          Cikis Yap
        </Button>
      </Navbar>
      <Accordion>
        {koyunlar.map((koyun) => (
          <Koyun koyun={koyun} key={koyun.id} />
        ))}
      </Accordion>
    </div>
  );
};

export default Koyunlar;
