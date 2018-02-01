import React from "react";
import { reduxForm, Field } from "redux-form";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet
} from "react-native";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Constants, Location, Permissions } from 'expo';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

class MyMap extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markers: [],
      location: {coords: {
        latitude: 0,
        longitude: 0
      },},
      errorMessage: null,
    };
  }

  onRegionChange = (region) => {
    this.setState({ region });
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    var ctx = this;
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    this.setState({ location:location});
  };

  componentDidMount () {
    fetch('https://savecardata.herokuapp.com/getCars')
    .then((response) => response.json())
    .then((datas) => {
      var newmarkers = [];
      for (var i = 0; i < datas.length; i++) {
      var newmarker = {
          latlng: {
            latitude: datas[i].lat,
            longitude: datas[i].lon
          },
          title: datas[i].marque,
          description: datas[i].modele,
          key : [i],
          pinColor: 'green'
        };
        newmarkers.push(newmarker);
      }
      this.setState({markers:newmarkers})})
    .catch((error) => console.log(error))
  }

  render() {
    console.log(this.state.markers);
    console.log(this.state.location);

    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      console.log(text);
    }

    let coords = {latitude:this.state.location.coords.latitude, longitude:this.state.location.coords.longitude};

    return (

      <View style={styles.container}>
        <MapView
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
        >
        {this.state.markers.map(marker => (
          <MapView.Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            pinColor={marker.pinColor}
          />
        ))}
        <MapView.Marker
        coordinate={coords}
        title='Hello'
        description="It's me"
      />

        </MapView>
      </View>
    );
  }
}

module.exports = MyMap;
