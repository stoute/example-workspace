import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import {
  defineCustomElements,
  applyPolyfills,
} from '@bsmp/webcomponents/dist/loader';
import { defineCustomElements as defineIoniconsElements } from 'ionicons/dist/loader';
import regeneratorRuntime from 'regenerator-runtime';
import './i18n';
import App from './app/App';

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById('root')
);

applyPolyfills().then(() => {
  defineCustomElements(window);
  defineIoniconsElements(window);
});
