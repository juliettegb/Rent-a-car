import React from 'react';
import Expo from 'expo';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { reduxForm, Field } from 'redux-form';


function MyTextInput(props) {

  return (
    <View style={{justifyContent: 'center'}}>
      <TextInput
        style={{textAlign: 'center'}}
        onChangeText={props.input.onChange}
        value={props.input.value}
      />
    </View>
  );
}

function Form(props) {
  return (
    <View style={{flex: 1, justifyContent: 'center'}} keyboardShouldPersistTaps={'handled'}>
      <View>
        <Text style={{textAlign: 'center'}}>Modèle</Text>
        <Field
          name='modele'
          component={MyTextInput}
        />
        <Text style={{textAlign: 'center'}}>Marque</Text>
        <Field
          name='marque'
          component={MyTextInput}
        />
        <Text style={{textAlign: 'center'}}>Ville</Text>
        <Field
          name='ville'
          component={MyTextInput}
        />
        <Text style={{textAlign: 'center'}}>Places</Text>
        <Field
          name='places'
          component={MyTextInput}
        />

        <TouchableOpacity onPress={props.handleSubmit}>
          <Text style={{textAlign: 'center'}}>Submit!</Text>
        </TouchableOpacity>
     </View>
    </View>
  );
}

/*
class MyTextInput extends React.Component {
  render(props){
    return(
      <View>
        <TextInput
          onChangeText={props.input.onChange}
          value={props.input.value}
        />
      </View>
    );
  }
}

class Form extends React.Component {
  render(props) {
    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <Text>Phone Number</Text>
        <Field
          name='phoneNumber'
          component={MyTextInput}
        />
        <Text>Pseudo</Text>
        <Field
          name='pseudo'
          component={MyTextInput}
        />
        <Text>MDP</Text>
        <Field
          name='mdp'
          component={MyTextInput}
        />
        <TouchableOpacity onPress={props.handleSubmit}>
          <Text>Submit!</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
*/

var FormRedux = reduxForm({
  form: 'signIn'
})(Form)

module.exports = FormRedux
