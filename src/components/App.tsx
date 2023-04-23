import React, { useState, ReactNode, ChangeEvent } from 'react';
import './index.css';
interface SceneitWrapperProps {
  children: ReactNode;
  width: number;
  height: number;
  hideResolutionCustomizer?: boolean;
}

const SceneitWrapper: React.FC<SceneitWrapperProps> = ({
  children,
  width: widthRaw,
  height: heightRaw,
  hideResolutionCustomizer,
}) => {
  const [height, setHeight] = useState(heightRaw);
  const [width, setWidth] = useState(widthRaw);
  const USED_WIDTH = 28;
  const USED_HEIGHT = 56;
  const availableWidth = window.innerWidth - USED_WIDTH;
  const availableHeight = window.innerHeight - USED_HEIGHT;
  const scale = Math.min(availableWidth / width, availableHeight / height);

  const handleDimensionChange = (e: ChangeEvent<HTMLInputElement>, type: 'height' | 'width') => {
    if (e) {
      const value = e?.target?.value;
      if (type === 'height') setHeight(Number(value));
      else if (type === 'width') setWidth(Number(value));
    }
  };

  return (
    <div
      className='wrapper'
      style={{
        height: '100vh',
        width: '100vw',
        padding: '12px',
      }}
    >
      {!hideResolutionCustomizer && (
        <div className='res-customizer'>
          <input
            type='number'
            name='customWidth'
            id='customWidth'
            className='input width'
            placeholder='width'
            value={width}
            onChange={(e) => handleDimensionChange(e, 'width')}
          />
          <span>X</span>
          <input
            type='number'
            name='customHeight'
            id='customHeight'
            className='input height'
            placeholder='height'
            value={height}
            onChange={(e) => handleDimensionChange(e, 'height')}
          />
        </div>
      )}
      <div
        className='child'
        style={{
          height: height,
          width: width,
          transformOrigin: '0 0',
          transform: `scale(${scale})`,
          border: '2px solid black',
          overflow: 'scroll',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SceneitWrapper;
