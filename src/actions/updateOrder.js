export const updateBook = (order) => async (dispatch, getState) => {
  if (order.type === "Limit") {
    if (order.buyOrSell === "sell") {
      var {
        orderBook: { ask },
      } = getState();
      const time1 = new Date();
      var order1 = {
        id: Date.now(),
        date: `${time1.getHours()}:${time1.getMinutes()}:${time1.getSeconds()}:${time1.getMilliseconds()}`,
        shares: order.shares,
        price: order.forLimit,
      };
      ask ? ask.push(order1) : (ask = [order1]);
      ask.sort(function (a, b) {
        if (a.price === b.price) {
          return b.id - a.id;
        }
        return a.price - b.price;
      });

      dispatch({
        type: "UPDATE_ASK_SIDE",
        payload: ask,
      });
    } else {
      var {
        orderBook: { bid },
      } = getState();
      const time = new Date();
      var order2 = {
        id: Date.now(),
        date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}`,
        shares: order.shares,
        price: order.forLimit,
      };
      bid ? bid.push(order2) : (bid = [order2]);

      bid.sort(function (a, b) {
        if (a.price === b.price) {
          return b.id - a.id;
        }
        return b.price - a.price;
      });

      dispatch({
        type: "UPDATE_BID_SIDE",
        payload: bid,
      });
    }
  } else {
    if (order.buyOrSell === "buy") {
      var {
        orderBook: { ask },
      } = getState();
      var s = order.shares;
      if (!ask) {
      } else {
        while (s !== 0 && ask.length > 0) {
          if (ask[0].shares > s) {
            ask[0].shares -= s;
            break;
          } else if (ask[0].shares === s) {
            ask.shift();
            break;
          } else {
            s -= ask[0].shares;
            ask.shift();
          }
        }
        ask.sort(function (a, b) {
          if (a.price === b.price) {
            return b.id - a.id;
          }
          return a.price - b.price;
        });
        dispatch({
          type: "UPDATE_ASK_SIDE",
          payload: ask,
        });
      }
    } else {
      var {
        orderBook: { bid },
      } = getState();
      var s = order.shares;
      if (!bid) {
      } else {
        while (s !== 0 && bid.length > 0) {
          if (bid[0].shares > s) {
            bid[0].shares -= s;
            break;
          } else if (bid[0].shares === s) {
            bid.shift();
            break;
          } else {
            s -= bid[0].shares;
            bid.shift();
          }
        }
        bid.sort(function (a, b) {
          if (a.price === b.price) {
            return b.id - a.id;
          }
          return b.price - a.price;
        });
        dispatch({
          type: "UPDATE_BID_SIDE",
          payload: bid,
        });
      }
    }
  }
  var {
    orderBook: { ask, bid },
  } = getState();
  if (ask && bid) {
    if (ask.length && bid.length) {
      while (ask.length > 0 && bid.length > 0 && ask[0].price <= bid[0].price) {
        if (ask[0].shares > bid[0].shares) {
          ask[0].shares -= bid[0].shares;
          bid.shift();
        } else if (ask[0].shares === bid[0].shares) {
          bid.shift();
          ask.shift();
        } else {
          bid[0].shares -= ask[0].shares;
          ask.shift();
        }
      }
      dispatch({
        type: "UPDATE_BID_SIDE",
        payload: bid,
      });
      dispatch({
        type: "UPDATE_ASK_SIDE",
        payload: ask,
      });
    }
  }
};
