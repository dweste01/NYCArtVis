// import constants from action creators

const initialState = {};



export default function (state = initialState, action) {

  const newState = Object.assign({}, state)

  // switch (action.type) {

  // 	case TOGGLE_DELIVERY:
  // 		newState.delivery = action.delivery;
  // 		break;
  //   default:
  //     return state;
      
  // }
  return newState;

}