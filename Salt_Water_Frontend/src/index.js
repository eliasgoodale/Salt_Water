import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core'

const theme = createMuiTheme({
	pallete: {
		primary: '#3f51b5',
		secondary: '#43a047',
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
