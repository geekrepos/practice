import React from 'react';
import {Text,TouchableOpacity} from 'react-native';

class SecondScreen extends React.Component{

  static navigationOptions = {
    title: 'Second',
    headerStyle:{backgroundColor: 'orange'}
  }

  render(){
    const {navigation} = this.props;

    return(
      <TouchableOpacity style={styles} onPress={()=> this.moveNext()}>
        <Text> Screen 2</Text>
      </TouchableOpacity>
    )
  }

  moveNext(){
    this.props.navigation.navigate('Screen3', styles)
  }
}

const styles = {
  flex :1,
  justifyContent:'center', 
  alignItems:'center' 
}

export default SecondScreen;