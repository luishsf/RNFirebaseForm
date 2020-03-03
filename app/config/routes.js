import React from 'react';
import {
  Scene,
  Router,
  Stack,
  Modal,
} from 'react-native-router-flux';

//Splash Component
import Splash from '../components/Splash/Splash';

//Authentication Screens
import Home from '../modules/auth/scenes/Auth/Home';
import Register from '../modules/auth/scenes/Auth/Register';

import {color, navTitleStyle} from '../styles/theme';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: true,
    };
  }
  
  render() {
    if (!this.state.isReady) {
      return <Splash />;
    }

    return (
      <Router>
        <Modal>
          <Scene
            key="root"
            hideNavBar
            navigationBarStyle={{backgroundColor: '#fff'}}
            titleStyle={navTitleStyle}
            backButtonTintColor={color.black}>
            <Stack key="Auth" initial={!this.state.isLoggedIn}>
              <Scene
                key="Home"
                component={Home}
                title=""
                initial={true}
                hideNavBar
              />
              <Scene
                key="Register"
                component={Register}
                title="Cadastro"
                back
              />
            </Stack>
          </Scene>
        </Modal>
      </Router>
    );
  }
}
