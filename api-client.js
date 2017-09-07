import axios from "axios";

export function getRiskInfo(lat, lng) {
    https://api-beta.arity.com/riskIndex/v1/riskInfo?geometry=LINESTRING(-87.67660617828369%2041.881328132826404%2C-87.67176747322083%2041.88139203624343)&radius=0.00003&queryMethod=ContainsBuffer
    let params = {

    };
    return axios.get("https://api-beta.arity.com/riskIndex/v1/riskInfo", {params});
}