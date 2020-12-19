import React from 'react';
import {Text} from 'react-native';
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