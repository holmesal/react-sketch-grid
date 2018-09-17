import React from 'react';
import { render } from 'react-dom';
import Grid from './lib';

const App = () => (
  <div style={{ width: 640, margin: '15px auto', position: 'relative' }}>
    <Grid />
    <h1>Control + G to toggle grid</h1>
  </div>
);

render(<App />, document.getElementById('root'));
