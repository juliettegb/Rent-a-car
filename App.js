import React from 'react';
import Expo from 'expo';
import { Text, View, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import Home from './home';
import FormRedux from './form';
import CameraExample from './cameraExample';
import MyMap from './map';

const globalReducer = combineReducers({form: formReducer});
var store = createStore(globalReducer);


const RootTabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Form: {
    screen: FormRedux,
  },
  MyMap: {
    screen: MyMap,
  }
});


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: null
    };
    this.submit = this.submit.bind(this);
  }

  state={
    id: null
  };

  submit(data){
    //ctx car pb avec le fetch qui fait perdre la signification du this, il faut donc binder le this
    var ctx = this;
    var formData = new FormData();
    formData.append('modele', data.modele);
    formData.append('marque', data.marque);
    formData.append('ville', data.ville);
    formData.append('places', data.places);
    console.log(data);
    fetch("https://savecardata.herokuapp.com/form",{
      method: 'POST',
      body: formData
    }).then(function(response){
      //Convert to JSON. En gros on récup l'id du form pour ensuite màj le state et ainsi passer à l'étape photo
      return response.text();
    }).then(function(carData){
      //.id=id unique donné sur mlab
      console.log(carData);
      ctx.setState({
        id: carData
      });
    });
  }

  render(){
//Création d'une var step pour conditionner l'affichage sur l'écran: form d'abord
//puis caméra quand form rempli (cf setState au dessus + return)
//Avec le tabnav, on n'a plus cette redirection vers la caméra.. dans le return en dessous
//il faudrait {step} plutôt que <RootTabs/> mais du coup plus de home ni map..
    var step;
    if(this.state.id == null){
      step = <FormRedux onSubmit={this.submit}/>
    } else {
      step = <CameraExample id={this.state.id}/>
    }


    return(
      <Provider store={store}>
        <View style={{flex: 1}}>
          <RootTabs/>
        </View>
      </Provider>
    )
  }
}

export default App;
