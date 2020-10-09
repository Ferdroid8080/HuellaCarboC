export const FETCH_TRAVELS_INIT = 'FETCH_TRAVELS_INIT'
export const FETCH_TRAVELS_FAILED = 'FETCH_TRAVELS_FAILED'
export const FETCH_TRAVELS_SUCCESS = 'FETCH_TRAVELS_SUCCESS'

export const FETCH_VEHICLES_INIT = 'FETCH_VEHICLES_INIT'
export const FETCH_VEHICLES_FAILED = 'FETCH_VEHICLES_FAILED'
export const FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLES_SUCCESS'


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


export const fetchTravels = () => (
    async dispatch => {
        dispatch(fetchTravelsInit())
        try {
            let travels = await fetch('http://localhost:4500/travels')
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
            let vehicles = await fetch('http://localhost:4500/vehicles')
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