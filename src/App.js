import React from 'react';
import {View, Text} from 'react-native';
import {buildNumber} from '../app.json';

function App() {
  return (
    <View>
      <Text>
        {buildNumber}
      </Text>
    </View>
  );
}

export default App;