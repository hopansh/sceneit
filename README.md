# Sceneit: React Resolution Simulator

A React component that simulates a website or web application at a specific resolution.

## Installation

To install the Sceneit, you can use npm or yarn:

```
npm install sceneit

yarn add sceneit
```

## Usage

To use the component, simply import it and render it with your website or web application as its child:

```jsx
import React from 'react';
import { SceneitWrapper } from 'sceneit';

const App = () => {
  return (
    <SceneitWrapper width={2000} height={1000}>
      <div className='app'>Hello World</div>
    </SceneitWrapper>
  );
};

export default App;
```

The SceneitWrapper component takes a width and height prop, which specify the desired resolution to simulate. It also takes a children prop, which should be your website or web application.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
### MIT
