import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();

      var formData = new FormData();
      formData.append('imageCar', {
        uri: photo.uri,
        //nom de l'image en fonction de l'id du form : on a ainsi une image unique
        //qui n'est pas écrasée à chaque fois et on peut retrouver facilement l'image associée au form
        name: this.props.id+'.jpg',
        type:'image/jpeg'
      });
      fetch("https://savecardata.herokuapp.com/saveImageCar", {
        method: "POST",
        body:formData
      });

      console.log(photo);
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>

              <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                onPress={this.takePicture.bind(this)}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  SNAP
                </Text>
              </TouchableOpacity>

            </View>
          </Camera>
        </View>
      );
    }
  }


}

module.exports = CameraExample
