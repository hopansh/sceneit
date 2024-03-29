import React from 'react';
import ReactDOM from 'react-dom/client';
import { SceneitWrapper } from 'sceneit';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <SceneitWrapper width={1920} height={1080}>
    <div
      className='app'
      style={{ fontSize: '2rem', background: 'black', color: 'white', height: '100%', width: '100%' }}
    >
      Hello World
    </div>
  </SceneitWrapper>,
);
