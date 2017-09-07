import axios from "axios";

export function getRiskInfo(trip) {
    let params = {
        geometry: `LINESTRING(${trip.sourceLng} ${trip.sourceLat}, ${trip.destinationLng} ${trip.destinationLat})`,
        radius: 0.00003,
        queryMethod: "ContainsBuffer"
    };
    return axios.get("https://api-beta.arity.com/riskIndex/v1/riskInfo", {params});
}