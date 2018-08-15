/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

import { render } from 'react-dom';

import Popup from '../dist';

import '../dist/assets/popup.css';

render(
  <Popup />,
  document.getElementById('app')
);

Popup.open({
  title: 'My Title',
  content: 'This is a Unico Digital Component'
});
