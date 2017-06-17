const timeReducer = (state=0, action) => {
  switch (action.type) {
    case "7d": {
      return action.payload;
    }
    case "24h": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default timeReducer;
