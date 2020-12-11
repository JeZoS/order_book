import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const Tables = () => {
  const orderBook = useSelector((state) => state.orderBook);

  const { ask, bid } = orderBook;

  useEffect(() => {}, [ask, bid]);
  return (
    <div
      className="Tbl"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        //alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Table striped hover bordered responsive className="table-sm">
          <thead>
            <tr>
              <th>Time</th>
              <th>Shares</th>
              <th>Bid</th>
            </tr>
          </thead>
          <tbody>
            {bid &&
              bid.map((user) => (
                <tr key={user.id}>
                  <td>{user.date}</td>
                  <td>{user.shares}</td>
                  <td>{user.price}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Table striped hover bordered responsive className="table-sm">
          <thead>
            <tr>
              <th>Ask</th>
              <th>Shares</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {ask &&
              ask.map((user) => (
                <tr key={user.id}>
                  <td>{user.price}</td>
                  <td>{user.shares}</td>
                  <td>{user.date}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Tables;
