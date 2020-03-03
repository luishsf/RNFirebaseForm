import {StyleSheet} from 'react-native';
import {theme} from '../../index';
const {padding, fontSize, fontFamily, windowWidth} = theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: padding * 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0096D2',
  },

  title: {
    color: 'rgba(255,255,255,1)',
    fontSize: 40,
    fontFamily: 'roboto-regular',
    marginTop: 18,
  },

  subText: {
    color: '#414141',
    fontSize: fontSize.large,
    lineHeight: fontSize.large + 10,
    marginVertical: padding * 2,
  },

  //===============================

  bottomContainer: {
    backgroundColor: 'white',
    paddingVertical: padding * 3,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },

  buttonContainer: {
    borderRadius: 100,
    shadowOpacity: 0.1,
    overflow: 'hidden',
    alignSelf: 'center',
  },

  containerView: {
    width: windowWidth - 40,
  },

  button: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    backgroundColor: '#005e84',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },

  buttonText: {
    fontSize: fontSize.regular + 2,
    fontFamily: fontFamily.medium,
  },

  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: padding * 2,
  },

  bottomText: {
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium,
    marginRight: 5,
    color: '#414141',
  },

  signInText: {
    fontSize: fontSize.regular,
    color: '#FF553F',
    fontFamily: fontFamily.medium,
  },
});

export default styles;
