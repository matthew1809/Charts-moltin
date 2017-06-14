import * as types from '../constants/ActionTypes';

const ChartsApp = () => {

};

const initialState = {
  time : 1
}


export function time(state = initialState, action) {
  switch (action.type) {

    case types.TFH:

      return state;

    default:
      return state;
  }
}


export default ChartsApp;
