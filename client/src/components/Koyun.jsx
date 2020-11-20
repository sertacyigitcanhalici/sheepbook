import React from "react";
import { Accordion, Card, Table } from "react-bootstrap";
const Koyun = ({ koyun }) => {
  let x = document.getElementById("myRange");
  return (
    <Card text="white" bg={koyun.female ? "info" : "danger"}>
      <Accordion.Toggle as={Card.Header} eventKey={koyun.id}>
        {koyun.name}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={koyun.id}>
        <Card.Body>
          <Table bg={koyun.female ? "info" : "danger"} striped variant="dark">
            <tbody>
              <tr>
                <td>Dogum Tarihi</td>
                <td>{koyun.birthdate}</td>
                <td>
                  <input type="date" />
                </td>
                <button className="my-3 btn btn-warning">degistir</button>
              </tr>
              <tr>
                <td>Agirlik</td>
                <td>"{x}"</td>
                <td>
                  <input type="range" />
                </td>
                <button className="my-3 btn btn-warning">degistir</button>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default Koyun;
