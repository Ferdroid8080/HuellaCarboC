import * as actions from './actions';

const initialState = {
    travels: [],
    travelsError: null,
    travelsLoading: false,
    vehicles: [],
    vehiclesError: null,
    vehiclesLoading: false
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
    }
    return state;
}

export default reducer;
