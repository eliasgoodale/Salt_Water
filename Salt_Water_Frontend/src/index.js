import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core'
import {blueGrey, amber, deepPurple} from '@material-ui/core/colors'

const theme = createMuiTheme({
	palette: {
		primary: blueGrey,
		secondary: {
			main: deepPurple[50],
			light: amber[200],
			dark: deepPurple[100]
		},
		type: "dark"
	},
	spacing: {
		unit: 10
	}
});


console.log(theme);

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
	<App /> 
	</MuiThemeProvider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
