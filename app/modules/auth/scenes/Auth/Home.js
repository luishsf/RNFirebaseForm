import React from 'react';
import {Text, View} from 'react-native';

import {Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

import styles from './styles';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>RNFirebaseForm</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={[styles.buttonContainer]}>
            <Button
              raised
              title={'CADASTRE-SE'}
              containerViewStyle={[styles.containerView]}
              buttonStyle={[styles.button]}
              textStyle={styles.buttonText}
              onPress={Actions.Register}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Home;
