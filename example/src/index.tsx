import React from 'react';
import ReactDOM from 'react-dom/client';
import { SceneitWrapper } from 'sceneit';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <SceneitWrapper width={1920} height={1080}>
    <div className='app' style={{ fontSize: 12, background: 'black', color: 'white', height: '100px', width: '100px' }}>
      Hello World
    </div>
  </SceneitWrapper>,
);
