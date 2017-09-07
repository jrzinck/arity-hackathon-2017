import React, {Component, PropTypes} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import * as apiCalls from '../middleware/api-client';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../src/material_ui_raw_theme_file'
import TextInput from "../components/TextInput";

class App extends Component {
    componentDidMount() {
        let myLatlng = new google.maps.LatLng(41.881934, -87.650052);
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
        setTimeout(() => this.setUpRoutes(), 3000);
        this.setState({globalGoogleMap: new google.maps.Map(document.getElementById('googleMap'), myOptions)});
    }

    handleSave(text) {
        if (text.length !== 0) {
            this.props.addTodo(text);
        }
    }

    setUpRoutes() {
        let trip = {
            sourceLng: -87.67664909362793,
            sourceLat: 41.88133612075702,
            destinationLng: -87.67175674438477,
            destinationLat: 41.88138404831982
        };

        this.getPathColor(trip).then(pathColor => {
            this.drawTrip(pathColor, trip);
        });
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
        return apiCalls.getRiskInfo(trip).then(result => {    let totalRiskScore = 0;
        let totalElements = result.data.riskInfoItem.length;
            result.data.riskInfoItem.forEach(e => {
            totalRiskScore += parseFloat(e.riskScore);
                });

            console.log(totalRiskScore);

        return "#FF0000";
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
                        <div id="googleMap" style={{marginLeft: "30px", width: "50%", height: "600px", border: "2px solid #122846"}}/>
                        <TextInput
                            onSave={this.handleSave.bind(this)}
                            placeholder="Please enter and address..."/>
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
