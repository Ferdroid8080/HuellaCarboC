export const FETCH_TRAVELS_INIT = 'FETCH_TRAVELS_INIT'
export const FETCH_TRAVELS_FAILED = 'FETCH_TRAVELS_FAILED'
export const FETCH_TRAVELS_SUCCESS = 'FETCH_TRAVELS_SUCCESS'

export const FETCH_VEHICLES_INIT = 'FETCH_VEHICLES_INIT'
export const FETCH_VEHICLES_FAILED = 'FETCH_VEHICLES_FAILED'
export const FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLES_SUCCESS'

export const REGISTER_TRAVEL_INIT = 'REGISTER_TRAVEL_INIT'
export const REGISTER_TRAVEL_FAILED = 'REGISTER_TRAVEL_FAILED'
export const REGISTER_TRAVEL_SUCCESS = 'REGISTER_TRAVEL_SUCCESS'


const fetchTravelsInit = () => ({
    type: FETCH_TRAVELS_INIT
})

const fetchTravelsFail = (error) => ({
    type: FETCH_TRAVELS_FAILED,
    payload: error
})

const fetchTravelsSuccess = (data) => ({
    type: FETCH_TRAVELS_SUCCESS,
    payload: data
})

const fetchVehiclesInit = () => ({
    type: FETCH_VEHICLES_INIT
})

const fetchVehiclesFail = (error) => ({
    type: FETCH_VEHICLES_FAILED,
    payload: error
})

const fetchVehiclesSuccess = (data) => ({
    type: FETCH_VEHICLES_SUCCESS,
    payload: data
})

const registerTravelInit = () => ({
    type: REGISTER_TRAVEL_INIT
})

const registerTravelFail = (error) => ({
    type: REGISTER_TRAVEL_FAILED,
    payload: error
})

const registerTravelSuccess = (data) => ({
    type: REGISTER_TRAVEL_SUCCESS,
    payload: data
})


export const fetchTravels = () => (
    async dispatch => {
        dispatch(fetchTravelsInit())
        try {
            let travels = await fetch(`${process.env.REACT_APP_API_BASEURL}/travels`)
            if (travels.ok) {
                travels = await travels.json()
                if (travels.error) {
                    dispatch(fetchTravelsFail({
                        message: 'No travels registered yet'
                    }))
                } else {
                    dispatch(fetchTravelsSuccess(travels.results))
                }
            } else {
                throw Error(`${travels.status} ${travels.statusText}`)
            }
        } catch (error) {
            console.log(error.message)
            dispatch(fetchTravelsFail(error.message))
        }
    }
)

export const fetchVehicles = () => (
    async dispatch => {
        dispatch(fetchVehiclesInit())
        try {
            let vehicles = await fetch(`${process.env.REACT_APP_API_BASEURL}/vehicles`)
            if (vehicles.ok) {
                vehicles = await vehicles.json()
                if (vehicles.error) {
                    dispatch(fetchVehiclesFail({
                        message: 'No vehicles registered yet'
                    }))
                } else {
                    dispatch(fetchVehiclesSuccess(vehicles.results))
                }
            } else {
                throw Error(`${vehicles.status} ${vehicles.statusText}`)
            }
        } catch (error) {
            console.log(error.message)
            dispatch(fetchVehiclesFail(error.message))
        }
    }
)


export const registerTravel = (params) => (
    async dispatch => {
        dispatch(registerTravelInit())
        try {
            let newTravel = await fetch(`${process.env.REACT_APP_API_BASEURL}/travels/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
            if (newTravel.ok) {
                newTravel = await newTravel.json()
                if (newTravel.error) {
                    dispatch(registerTravelFail({
                        message: 'Travel cannot be added'
                    }))
                } else {
                    dispatch(registerTravelSuccess(newTravel.data))
                }
            } else {
                throw Error(`${newTravel.status} ${newTravel.statusText}`)
            }
        } catch (error) {
            console.log(error.message)
            dispatch(registerTravelFail(error.message))
        }
    }
)