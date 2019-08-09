import React from 'react';
import {StyleSheet, Button,TextInput, View , Text, AsyncStorage } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

class HomeScreen extends React.Component {

  constructor(props) {
 
    super(props);
 
    this.state = {
 
      username: '',
      pass: ''
 
    }
 
  }

  componentDidMount(){
    this._loadInitialState().done();
  }

  _loadInitialState= async () => {
    var value =await AsyncStorage.getItem('usuario');
    if(value!== null){
      this.props.navigation.navigate('Details');
    }
  }
  UserLoginFunction = async () =>{
    const {username, pass} = this.state;
    
    alert(username);
    alert(pass);
    fetch('http://192.168.4.241:4000/usuario?username=${username}&password=${pass}')
    .then((response) => response.json())
    .then((responseJson) => {
      alert(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
    
     }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>

        <Text style= {styles.TextComponentStyle}>User Login Form</Text>
  
        <TextInput
          
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Email"
 
          onChangeText={username => this.setState({username})}
 
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
 
          style={styles.TextInputStyleClass}
        />
 
        <TextInput
          
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Password"
 
          onChangeText={pass => this.setState({pass})}
 
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
 
          style={styles.TextInputStyleClass}
 
          secureTextEntry={true}
        />
 
        <Button title="Click Here To Login" onPress={this.UserLoginFunction} color="#2196F3" />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

HomeScreen.defaultProps = {
  username:'incognito',
  pass:'incognito'
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


const styles = StyleSheet.create({
 
  MainContainer :{
   
  justifyContent: 'center',
  flex:1,
  margin: 10,
  },
   
  TextInputStyleClass: {
   
  textAlign: 'center',
  marginBottom: 7,
  height: 40,
  borderWidth: 1,
  // Set border Hex Color Code Here.
   borderColor: '#2196F3',
   
   // Set border Radius.
   borderRadius: 5 ,
   
  },
   
   TextComponentStyle: {
     fontSize: 20,
    color: "#000",
    textAlign: 'center', 
    marginBottom: 15
   }
  });