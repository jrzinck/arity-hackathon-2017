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

    setUpRoutes() {
        //region United Center
        //north
        let trip = {
            sourceLng: -87.67664909362793,
            sourceLat: 41.88133612075702,
            destinationLng: -87.67175674438477,
            destinationLat: 41.88138404831982
        };

        this.getPathColor(trip).then(pathColor => {
            this.drawTrip(pathColor, trip);
        });

        //east
        trip = {
            sourceLng: -87.67177820205688,
            sourceLat: 41.88140002416609,
            destinationLng: -87.67169237136841,
            destinationLat: 41.878763955489404
        };

        this.getPathColor(trip).then(pathColor => {
            this.drawTrip(pathColor, trip);
        });

        //south
        trip = {
            sourceLng: -87.67169237136841,
            sourceLat: 41.878827861470725,
            destinationLng: -87.67664909362793,
            destinationLat: 41.878747978984066
        };

        this.getPathColor(trip).then(pathColor => {
            this.drawTrip(pathColor, trip);
        });

        //west
        trip = {
            sourceLng: -87.67662763595581,
            sourceLat: 41.878747978984066,
            destinationLng: -87.67662763595581,
            destinationLat: 41.881352096615274
        };

        this.getPathColor(trip).then(pathColor => {
            this.drawTrip(pathColor, trip);
        });
        //endregion
    }

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

            return riskColors.getColorForRiskScore(totalRiskScore / totalElements);
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
                            <Button label="Update" primary={true} style={buttonStyle}/>
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
