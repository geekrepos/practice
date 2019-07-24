import React, {Fragment,Component} from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
//import {navigation, createStackNavigator,createAppContainer,createSwitchNavigator} from 'react-navigation';
//import WelcomeScreen from this;

import {navigation, createStackNavigator, createAppContainer} from 'react-navigation';



export class WelcomeScreen extends Component{
  render(){e
    return(
    <View style={{flex:1, alignItems: 'center'}}>
      <TouchableOpacity onPress={()=> this.props.navigation.navigate('Screen2')}>
        <Text>Welcome Screen</Text>
      </TouchableOpacity>
    </View>)
    
  }
}

export class ScreenNo2 extends Component{
  render(){
    return(
    <View>
      <Text> Screen 2</Text>
    </View>)
    
  }
}

export class ScreenNo3 extends Component{
  render(){
    return(
    <View>
      <Text>Screen 3</Text>
    </View>)
    
  }
}


const StackNavigator = createStackNavigator({
  Welcome : {
    screen : WelcomeScreen
    //navigationOptions : ({navigation}) => ({})
  },
  Screen2 : {
    screen : ScreenNo2
  },
  Screen3 : {
    screen : ScreenNo3
  },
  
},{
  initialRouteName : 'Welcome'
}
)

const MainAC       = createAppContainer(StackNavigator);


export default class App extends Component{
  render(){
    return (
    <View>
      <MainAC />
    </View>
    )
  }
}
