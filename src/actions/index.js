var api = require('../utils/moltin.js');

export function fetchOrders() {

  return function(dispatch) {

      api.GetOrders()

      .then((orders) => {
        dispatch({type: "Fetch_Orders_End", payload: orders.data})
      })

      .catch((err) => {
        dispatch({type: "Fetch_Orders_Error", payload: err})
      })

  }
};
