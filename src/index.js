import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';

import registerServiceWorker from './registerServiceWorker';
import { firebaseConfig } from './config';

initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   
        <App />
    
);
registerServiceWorker();
