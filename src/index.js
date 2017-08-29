import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import '../node_modules/normalize.css/normalize.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './styles/styles.css';

render(<p>Voting App</p>, document.getElementById('root'));

registerServiceWorker();
