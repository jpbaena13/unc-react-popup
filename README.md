## Install

Install it with npm (`npm install unc-react-popup --save`). Here's a simple example:

```jsx
import React from 'react';
import { render } from 'react-dom';
import Popup from 'unc-react-popup';

import '../dist/assets/popup.css';

render(
  <Popup />,
  document.getElementById('app')
);

Popup.open({
  title: 'My Title',
  content: 'This is a Unico Digital Component'
});
```

## Documentation

Documentation and demo can be found here: http://jpbaena13.github.io/unc-react-popup/