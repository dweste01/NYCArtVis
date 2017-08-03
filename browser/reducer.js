// import constants from action creators

const initialState = {
	permPOIs: []
};



export default function (state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {

  	case TOGGLE_DELIVERY:
  		newState.permPOIs = action.permPOIs;
  		break;
    default:
      return state;
      
  }
  return newState;

}