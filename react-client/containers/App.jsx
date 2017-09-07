import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';

// For Customization Options, edit  or use
// './src/material_ui_raw_theme_file.jsx' as a template.
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../src/material_ui_raw_theme_file'

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

    setUpRoutes() {
        let directionsService1 = new google.maps.DirectionsService();
        let directionsDisplay1 = new google.maps.DirectionsRenderer({
            map: this.state.globalGoogleMap,
            polylineOptions: {
                strokeColor: "#FF0000"
            },
            preserveViewport: true,
            suppressMarkers: true
        });
        directionsService1.route({
            origin: new google.maps.LatLng(41.947945, -87.654429),
            destination: new google.maps.LatLng(41.947278, -87.652952),
            travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay1.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });

        let directionsService2 = new google.maps.DirectionsService();
        let directionsDisplay2 = new google.maps.DirectionsRenderer({
            map: this.state.globalGoogleMap,
            polylineOptions: {
                strokeColor: "#0000FF"
            },
            preserveViewport: true,
            suppressMarkers: true
        });
        directionsService2.route({
            origin: new google.maps.LatLng(41.941676, -87.661470),
            destination: new google.maps.LatLng(41.940750, -87.660011),
            travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay2.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });

        let directionsService3 = new google.maps.DirectionsService();
        let directionsDisplay3 = new google.maps.DirectionsRenderer({
            map: this.state.globalGoogleMap,
            polylineOptions: {
                strokeColor: "#00FF00"
            },
            preserveViewport: true,
            suppressMarkers: true
        });
        directionsService3.route({
            origin: new google.maps.LatLng(41.941676, -87.661470),
            destination: new google.maps.LatLng(41.941732, -87.654270),
            travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay3.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

  render() {
    const { todos, actions } = this.props;
    return (
      <div>
        <MuiThemeProvider muiTheme={theme}>
          <div>
            <Header addTodo={actions.addTodo}/>
            <MainSection todos={todos} actions={actions}/>
            <div id="googleMap" style={{marginLeft: "30px", width: "75%", height: "600px"}}/>
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
