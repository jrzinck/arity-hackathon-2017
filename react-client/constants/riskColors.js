import * as Colors from 'material-ui/styles/colors';


export const riskColors = {
    0: Colors.lightGreenA400,
    0.1: Colors.greenA400,
    0.2: Colors.greenA400,
    0.3: Colors.greenA400,
    0.4: Colors.greenA400,
    0.5: Colors.greenA400,
    0.6: Colors.greenA400,
    0.7: Colors.greenA400,
    0.8: Colors.greenA400,
    0.9: Colors.greenA400,
    1: Colors.greenA200,
    1.1: Colors.lightBlue600,
    1.2: Colors.lightBlue400,
    1.3: Colors.lightBlue200,
    1.4: Colors.amber400,
    1.5: Colors.amber600,
    1.6: Colors.amber800,
    1.7: Colors.red300,
    1.8: Colors.red500,
    1.9: Colors.red700,
    2: Colors.red900
};

export function getColorForRiskScore(riskScore) {
    if (riskScore < 0.1) {
        return riskColors[0];
    } else if (riskScore < 0.2) {
        return riskColors[0.1];
    } else if (riskScore < 0.3) {
        return riskColors[0.2];
    } else if (riskScore < 0.4) {
        return riskColors[0.3];
    } else if (riskScore < 0.5) {
        return riskColors[0.4];
    } else if (riskScore < 0.6) {
        return riskColors[0.5];
    } else if (riskScore < 0.7) {
        return riskColors[0.6];
    } else if (riskScore < 0.8) {
        return riskColors[0.7];
    } else if (riskScore < 0.9) {
        return riskColors[0.8];
    } else if (riskScore < 1) {
        return riskColors[0.9];
    } else if (riskScore < 1.1) {
        return riskColors[1.0];
    } else if (riskScore < 1.2) {
        return riskColors[1.1];
    } else if (riskScore < 1.3) {
        return riskColors[1.2];
    } else if (riskScore < 1.4) {
        return riskColors[1.3];
    } else if (riskScore < 1.5) {
        return riskColors[1.4];
    } else if (riskScore < 1.6) {
        return riskColors[1.5];
    } else if (riskScore < 1.7) {
        return riskColors[1.6];
    } else if (riskScore < 1.8) {
        return riskColors[1.7];
    } else if (riskScore < 1.9) {
        return riskColors[1.8];
    } else if (riskScore < 2) {
        return riskColors[1.9];
    } else {
        return riskColors[2];
    }
}