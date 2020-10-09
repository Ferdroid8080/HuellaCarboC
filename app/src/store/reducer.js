import * as actions from './actions';

const initialState = {
    travels: [],
    travelsError: null,
    travelsLoading: false,
    vehicles: [],
    vehiclesError: null,
    vehiclesLoading: false,
    newTravelLoading: false,
    newTravelError: null
}

const reducer = (state = initialState, action) => {
    if (action.type === actions.FETCH_TRAVELS_INIT) {
        return {
            ...state,
            travelsLoading: true,
            travelsError: null
        }
    } else if (action.type === actions.FETCH_TRAVELS_FAILED) {
        return {
            ...state,
            travelsLoading: false,
            travelsError: action.payload
        }
    } else if (action.type === actions.FETCH_TRAVELS_SUCCESS) {
        return {
            ...state, 
            travels: action.payload,
            travelsError: null,
            travelsLoading: false
        }
    } else if (action.type === actions.FETCH_VEHICLES_INIT) {
        return {
            ...state,
            vehiclesError: null,
            vehiclesLoading: true
        }
    } else if (action.type === actions.FETCH_VEHICLES_FAILED) {
        return {
            ...state,
            vehiclesError: action.payload,
            vehiclesLoading: false
        }
    } else if (action.type === actions.FETCH_VEHICLES_SUCCESS) {
        return {
            ...state,
            vehicles: action.payload,
            vehiclesError: null,
            vehiclesLoading: false
        }
    } else if (action.type === actions.REGISTER_TRAVEL_INIT) {
        return {
            ...state,
            newTravelError: null,
            newTravelLoading: true
        }
    } else if (action.type === actions.REGISTER_TRAVEL_FAILED) {
        return {
            ...state,
            newTravelError: action.payload,
            newTravelLoading: false
        }
    } else if (action.type === actions.REGISTER_TRAVEL_SUCCESS) {
        return {
            ...state,
            travels: state.travels.push(action.payload),
            newTravelError: null,
            newTravelLoading: false
        }
    }
    return state;
}

export default reducer;
