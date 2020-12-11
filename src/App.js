import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col, Row, ListGroup } from "react-bootstrap";
import Tables from "./Tables";
import { updateBook } from "./actions/updateOrder";

const App = () => {
  const [type, setType] = useState("Market");
  const [shares, setShares] = useState(0);
  const [forLimit, setForLimit] = useState(0);
  const [buyOrSell, setBuyOrSell] = useState("buy");

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(type);
  }, [type]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(buyOrSell);
    dispatch(
      updateBook({
        type,
        shares,
        forLimit,
        buyOrSell,
      })
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Col
        md={3}
        style={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>Place Order</h1>
        <Form onSubmit={onSubmitHandler}>
          <ListGroup.Item>
            <Row>
              <Col>
                <Form.Control
                  as="select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option key={1} value="Market">
                    MARKET
                  </option>
                  <option key={2} value="Limit">
                    LIMIT
                  </option>
                  <option key={3} value="Stop">
                    STOP
                  </option>
                </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>
          <Form.Group controlId="Shares">
            <Form.Label className="items">Shares </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter no. of shares"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {type === "Limit" && (
            <Form.Group controlId="Limit">
              <Form.Label className="items">Limit Price </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Limit Price"
                value={forLimit}
                onChange={(e) => setForLimit(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          <ListGroup.Item>
            <Row>
              <Col>
                <Form.Control
                  as="select"
                  value={buyOrSell}
                  onChange={(e) => setBuyOrSell(e.target.value)}
                >
                  <option key={4} value="buy">
                    BUY
                  </option>
                  <option key={5} value="sell">
                    SELL
                  </option>
                </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>
          <Button
            style={{
              marginLeft: "6px",
            }}
            type="submit"
            variant="primary"
          >
            Place
          </Button>
        </Form>
      </Col>
      <Col
        md={9}
        style={{
          display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Tables />
      </Col>
    </div>
  );
};

export default App;
