function calcular_kgco2({ factor_emision, kilometers, roundTrip }) {
    return factor_emision * kilometers * (roundTrip ? 2 : 1)
}

export {
    calcular_kgco2
}
