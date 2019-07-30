import React from 'react';
import {Text,TouchableOpacity, View} from 'react-native';

class HomeScreen extends React.Component{
   
    static navigationOptions = {
    title: 'Home',
    headerStyle:{backgroundColor: 'orange'}
  }


 
  render(){
    return (
      <TouchableOpacity style={styles} onPress={()=>this.navigation.toggleDrawer()}>
          <Text>Click to go</Text>
      </TouchableOpacity>
    )
  }  

  moveNext(){
    this.props.navigation.navigate('Screen2', styles)
  }

  
}

const styles = {
    justifyContent:'center', alignItems:'center'
}

export default HomeScreen;