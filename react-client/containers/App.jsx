import React, {Component, PropTypes} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import * as apiCalls from '../middleware/api-client';
import Button from 'material-ui/RaisedButton'

import * as riskColors from '../constants/riskColors';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../src/material_ui_raw_theme_file'
import TextInput from "../components/TextInput";

const buttonStyle = {
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 40
};

const inline = {
    display: "inline-block"
};

class App extends Component {

    componentDidMount() {
        let myLatlng = new google.maps.LatLng(41.880784, -87.674153);
        let myOptions = {
            zoom: 14,
            center: myLatlng,
            disableDefaultUI: true,
            panControl: true,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT
            },
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
            },
            streetViewControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.setState({globalGoogleMap: new google.maps.Map(document.getElementById('googleMap'), myOptions)}, this.setUpRoutes);
    }

    handleSave(text) {
        if (text.length !== 0) {
            this.props.addTodo(text);
        }
    }

    setUpRoutes = () => {
        //region United Center
        //north
        let tripNorthUnitedCenter = {
            sourceLng: -87.67664909362793,
            sourceLat: 41.88133612075702,
            destinationLng: -87.67175674438477,
            destinationLat: 41.88138404831982
        };

        this.getPathColor(tripNorthUnitedCenter).then(pathColor => {
            this.drawTrip(pathColor, tripNorthUnitedCenter);
        });

        //east
        let tripEastUnitedCenter = {
            sourceLng: -87.67177820205688,
            sourceLat: 41.88140002416609,
            destinationLng: -87.67169237136841,
            destinationLat: 41.878763955489404
        };

        this.getPathColor(tripEastUnitedCenter).then(pathColor => {
            this.drawTrip(pathColor, tripEastUnitedCenter);
        });

        //south
        let tripSouthUnitedCenter = {
            sourceLng: -87.67169237136841,
            sourceLat: 41.878827861470725,
            destinationLng: -87.67664909362793,
            destinationLat: 41.878747978984066
        };

        this.getPathColor(tripSouthUnitedCenter).then(pathColor => {
            this.drawTrip(pathColor, tripSouthUnitedCenter);
        });

        //west
        let tripWestUnitedCenter = {
            sourceLng: -87.67662763595581,
            sourceLat: 41.878747978984066,
            destinationLng: -87.67662763595581,
            destinationLat: 41.881352096615274
        };

        this.getPathColor(tripWestUnitedCenter).then(pathColor => {
            this.drawTrip(pathColor, tripWestUnitedCenter);
        });
        //endregion

        //region Wrigley Field
        //north
        let tripNorthWrigleyField = {
            sourceLng: -87.6544189453125,
            sourceLat: 41.94904584118921,
            destinationLng: -87.65795946121216,
            destinationLat: 41.948982005475216
        };

        this.getPathColor(tripNorthWrigleyField).then(pathColor => {
            this.drawTrip(pathColor, tripNorthWrigleyField);
        });

        //east
        let tripEastWrigleyField = {
            sourceLng: -87.65440821647644,
            sourceLat: 41.94905382064896,
            destinationLng: -87.65435457229614,
            destinationLat: 41.947210538912316
        };

        this.getPathColor(tripEastWrigleyField).then(pathColor => {
            this.drawTrip(pathColor, tripEastWrigleyField);
        });

        //south
        let tripSouthWrigleyField = {
            sourceLng: -87.65435457229614,
            sourceLat: 41.94723447797777,
            destinationLng: -87.65651106834412,
            destinationLat: 41.947194579530354
        };

        this.getPathColor(tripSouthWrigleyField).then(pathColor => {
            this.drawTrip(pathColor, tripSouthWrigleyField);
        });

        //west
        let tripWestWrigleyField = {
            sourceLng: -87.65647888183594,
            sourceLat: 41.947194579530354,
            destinationLng: -87.6579487323761,
            destinationLat: 41.94897402600648
        };

        this.getPathColor(tripWestWrigleyField).then(pathColor => {
            this.drawTrip(pathColor, tripWestWrigleyField);
        });
        //endregion

        //region LaSalle Street

        let lasalle = {
            sourceLng: -87.63261795043945,
            sourceLat: 41.88781200691925,
            destinationLng: -87.63321876525879,
            destinationLat: 41.911194015189594
        };

        this.getPathColor(lasalle).then(pathColor => {
            this.drawTrip(pathColor, lasalle);
        });
        //endregion

        //region Lake Shore

        let lakeshoreLower = {
            sourceLng: -87.61716842651367,
            sourceLat: 41.869918351732906,
            destinationLng: -87.61734008789062,
            destinationLat: 41.88199711855609
        };

        this.getPathColor(lakeshoreLower).then(pathColor => {
            this.drawTrip(pathColor, lakeshoreLower);
        });

        let lakesoreMiddle = {
            sourceLng: -87.61407852172852,
            sourceLat: 41.88416977613571,
            destinationLng: -87.61416435241699,
            destinationLat: 41.89311523481589
        };

        this.getPathColor(lakesoreMiddle).then(pathColor => {
            this.drawTrip(pathColor, lakesoreMiddle);
        });

        let lakeshoreUpper = {
            sourceLng: -87.61416435241699,
            sourceLat: 41.89298745136862,
            destinationLng: -87.61982917785645,
            destinationLat: 41.90097342550564
        };

        this.getPathColor(lakeshoreUpper).then(pathColor => {
            this.drawTrip(pathColor, lakeshoreUpper);
        });
        //endregion
    };

    drawTrip(pathColor, trip) {
        let directionsService = new google.maps.DirectionsService();
        let directionsDisplay = new google.maps.DirectionsRenderer({
            map: this.state.globalGoogleMap,
            polylineOptions: {
                strokeColor: pathColor
            },
            preserveViewport: true,
            suppressMarkers: true
        });
        directionsService.route({
            origin: new google.maps.LatLng(trip.sourceLat, trip.sourceLng),
            destination: new google.maps.LatLng(trip.destinationLat, trip.destinationLng),
            travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    getPathColor(trip) {
        return apiCalls.getRiskInfo(trip).then(result => {
            let totalRiskScore = 0;
            let totalElements = result.data.riskInfoItem.length;
            result.data.riskInfoItem.forEach(e => {
                totalRiskScore += parseFloat(e.riskScore);
            });

            let averageScore = 0;
            if (totalElements !== 0) {
                averageScore = totalRiskScore / totalElements;
            }

            console.log("Average Score", averageScore);
            return riskColors.getColorForRiskScore(averageScore);
        });
    }

    render() {
        const {todos, actions} = this.props;
        return (
            <div>
                <MuiThemeProvider muiTheme={theme}>
                    <div>
                        <Header addTodo={actions.addTodo}/>
                        <MainSection todos={todos} actions={actions}/>
                        <div id="googleMap"
                             style={{marginLeft: "30px", width: "50%", height: "600px", border: "2px solid #122846"}}/>
                        <div style={{inline}}>
                            <TextInput
                                onSave={this.handleSave.bind(this)}
                                placeholder="Please enter an address..."/>
                            <Button label="Update" primary={true} style={buttonStyle} onClick={this.setUpRoutes}/>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

App.propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        todos: state.todos
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
