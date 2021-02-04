import React from 'react';
import ReactDOM from 'react-dom';
import './configure';

// Components
import { Main } from './components/Main';
import { StoreProvider } from './store';
import { Notification } from './components/Notification';

ReactDOM.render(<StoreProvider> <Main /> <Notification /></StoreProvider>, document.getElementById('main'));
