import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const Tables = () => {
  const orderBook = useSelector((state) => state.orderBook);

  const { ask, bid } = orderBook;

  useEffect(() => {}, [ask, bid]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        //alignItems: "center",
        width: "100%",
      }}
    >
      <Table striped hover bordered responsive className="table-sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Time</th>
            <th>Shares</th>
            <th>Bid</th>
          </tr>
        </thead>
        <tbody>
          {bid &&
            bid.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.date}</td>
                <td>{user.shares}</td>
                <td>{user.price}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Table striped hover bordered responsive className="table-sm">
        <thead>
          <tr>
            <th>Ask</th>
            <th>Shares</th>
            <th>Time</th>
            <th>id</th>
          </tr>
        </thead>
        <tbody>
          {ask &&
            ask.map((user) => (
              <tr key={user.id}>
                <td>{user.price}</td>
                <td>{user.shares}</td>
                <td>{user.date}</td>
                <td>{user.id}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tables;
