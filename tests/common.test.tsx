import * as React from 'react';
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;

import { SceneitWrapper } from '../src';
import { render } from '@testing-library/react';

import 'jest-canvas-mock';

// global.TextDecoder = TextDecoder;

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <SceneitWrapper height={1080} width={746}>
        <div> Hello World</div>
      </SceneitWrapper>,
    );
  });
});
