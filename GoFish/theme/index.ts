import {
  DefaultTheme as NavigationLightTheme,
  DarkTheme as NavigationDarkTheme,
  Theme,
} from '@react-navigation/native';
import { Colors } from './colors';

export const LightTheme: Theme = {
  ...NavigationLightTheme,
  dark: false,
  colors: {
    ...NavigationLightTheme.colors,
    background: Colors.background.darkblue,
    card: Colors.background.midblue,
    primary: Colors.background.brightblue,
    text: Colors.text.paragraph,
    border: Colors.text.heading,
  },
};

export const DarkTheme: Theme = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...NavigationDarkTheme.colors,
    background: Colors.background.darkblue,
    card: Colors.background.midblue,
    primary: Colors.background.brightblue,
    text: Colors.text.paragraph,
    border: Colors.text.heading,
  },
};