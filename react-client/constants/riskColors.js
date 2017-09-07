export const riskColors = {
    0: "#123456",
    0.1: "#123456",
    0.2: "#123456",
    0.3: "#123456",
    0.4: "#123456",
    0.5: "#123456",
    0.6: "#123456",
    0.7: "#123456",
    0.8: "#123456",
    0.9: "#123456",
    1: "#123456",
    1.1: "#123456",
    1.2: "#123456",
    1.3: "#123456",
    1.4: "#123456",
    1.5: "#123456",
    1.6: "#123456",
    1.7: "#123456",
    1.8: "#123456",
    1.9: "#123456",
    2: "#123456"
};

export function getColorForRiskScore(riskScore) {
    if (riskScore < 0.1) {
        return riskColors[0];
    } else if (riskScore < 0.2) {
        return riskColors[1];
    } else if (riskScore < 0.3) {
        return riskColors[2];
    } else if (riskScore < 0.4) {
        return riskColors[3];
    } else if (riskScore < 0.5) {
        return riskColors[4];
    } else if (riskScore < 0.6) {
        return riskColors[5];
    } else if (riskScore < 0.7) {
        return riskColors[6];
    } else if (riskScore < 0.8) {
        return riskColors[7];
    } else if (riskScore < 0.9) {
        return riskColors[8];
    } else if (riskScore < 1) {
        return riskColors[9];
    } else if (riskScore < 1.1) {
        return riskColors[10];
    } else if (riskScore < 1.2) {
        return riskColors[11];
    } else if (riskScore < 1.3) {
        return riskColors[12];
    } else if (riskScore < 1.4) {
        return riskColors[13];
    } else if (riskScore < 1.5) {
        return riskColors[14];
    } else if (riskScore < 1.6) {
        return riskColors[15];
    } else if (riskScore < 1.7) {
        return riskColors[16];
    } else if (riskScore < 1.8) {
        return riskColors[17];
    } else if (riskScore < 1.9) {
        return riskColors[18];
    } else if (riskScore < 2) {
        return riskColors[19];
    }
}