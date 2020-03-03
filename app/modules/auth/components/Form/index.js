import React, {Component} from 'react';
import {
  Alert,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';

import Geolocation from '@react-native-community/geolocation';

import styles from './styles';

// Enable Geolocation Permission on Android
PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  {
    title: 'Location Accessing Permission',
    message: 'App needs access to your location',
  },
);

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      latitude: null,
      longitude: null,
      name: '',
      email: '',
      phone: '',
      emailValid: true,
      phoneValid: true,
      nameValid: true,
    };

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.signup = this.signup.bind(this);
  }

  signup() {
    LayoutAnimation.easeInEaseOut();
    const nameValid = this.validateName();
    const emailValid = this.validateEmail();
    const phoneValid = this.validatePhone();
    if (emailValid && phoneValid && nameValid) {
      this.setState({isLoading: true});
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        this.setState({isLoading: false});
        Alert.alert('Cadastro realizado com sucesso!');
      }, 1500);
    }
  }

  findCoordinates() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000},
    );
  }

  validateName() {
    const {name} = this.state;
    const nameValid = name.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({nameValid});
    nameValid || this.nameInput.shake();
    return nameValid;
  }

  validateEmail() {
    const {email} = this.state;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({emailValid});
    emailValid || this.emailInput.shake();
    return emailValid;
  }

  validatePhone() {
    const {phone} = this.state;
    const phoneValid = phone.length >= 9;
    LayoutAnimation.easeInEaseOut();
    this.setState({phoneValid});
    phoneValid || this.phoneInput.shake();
    return phoneValid;
  }

  postMsg = (name, phone, email, latitude, longitude) => {
    if (this.state.name != null) {
      fetch('https://rnfirebase-4511f.firebaseio.com/contacts.json', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          email: email,
          latitude: latitude,
          longitude: longitude,
        }),
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.name != null) {
            this.setState({
              latitude: null,
              longitude: null,
              name: null,
              phone: null,
              email: null,
              isSubmited: true,
            });
          } else {
            Alert.alert(
              'Oops !',
              'Algo deu errado.',
              [
                {
                  text: 'OK',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
          }
        })
        .done();
    } else {
      Alert.alert(
        'Oops !',
        'Os campos não podem estar vazios.',
        [
          {
            text: 'OK',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  };

  _togglePostCard() {
    this.setState({
      isSubmited: false,
    });
  }

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          contentContainerStyle={styles.formContainer}>
          <Text style={styles.signUpText}>Cadastro</Text>

          <View style={styles.userTypesContainer} />
          <View style={{width: '80%', alignItems: 'center'}}>
            <FormInput
              onPress={this.findCoordinates()}
              refInput={input => (this.nameInput = input)}
              icon="user"
              value={this.state.name}
              onChangeText={name => this.setState({name})}
              placeholder="Nome"
              autoCapitalize="words"
              returnKeyType="next"
              errorMessage={
                this.state.nameValid ? null : 'Seu nome não pode estar vazio'
              }
              onSubmitEditing={() => {
                this.validateName();
                this.emailInput.focus();
              }}
            />
            <FormInput
              refInput={input => (this.emailInput = input)}
              icon="envelope"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              errorMessage={
                this.state.emailValid ? null : 'Insira um e-mail válido'
              }
              onSubmitEditing={() => {
                this.validateEmail();
                this.phoneInput.focus();
              }}
            />
            <FormInput
              refInput={input => (this.phoneInput = input)}
              icon="phone"
              value={this.state.phone}
              onChangeText={phone => this.setState({phone})}
              placeholder="Telefone"
              keyboardType="phone-pad"
              secureTextEntry
              returnKeyType="next"
              errorMessage={this.state.phoneValid ? null : 'Número inválido'}
              onSubmitEditing={() => {
                this.validatePhone();
                this.postMsg(
                  this.state.name,
                  this.state.phone,
                  this.state.email,
                  this.state.latitude,
                  this.state.longitude,
                );
                this.signup();
              }}
            />
          </View>
          <Button
            success
            onPress={() => {
              this.postMsg(
                this.state.name,
                this.state.phone,
                this.state.email,
                this.state.latitude,
                this.state.longitude,
              );
              this.signup();
            }}
            loading={this.state.isLoading}
            title="CADASTRAR"
            containerStyle={{flex: -1}}
            buttonStyle={styles.signUpButton}
            titleStyle={styles.signUpButtonText}
            // onPress={this.signup}
            disabled={this.state.isLoading}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export const FormInput = props => {
  const {icon, refInput, ...otherProps} = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.inputContainer}
      leftIcon={
        <Icon name={icon} type={'simple-line-icon'} color="#0096D2" size={18} />
      }
      inputStyle={styles.inputStyle}
      autoFocus={false}
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="#0096D2"
    />
  );
};

export default Form;
