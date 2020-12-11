export const updateBook = (order) => async (dispatch, getState) => {
  if (order.type === "Limit") {
    if (order.buyOrSell === "sell") {
      var {
        orderBook: { ask },
      } = getState();
      const time1 = new Date();
      var order1 = {
        id: Date.now(),
        date: time1.getDate(),
        shares: order.shares,
        price: order.forLimit,
      };
      ask ? ask.push(order1) : (ask = [order1]);

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
        date: time.getDate(),
        shares: order.shares,
        price: order.forLimit,
      };
      bid ? bid.push(order2) : (bid = [order2]);

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
        dispatch({
          type: "UPDATE_BID_SIDE",
          payload: bid,
        });
      }
    }
  }
};
