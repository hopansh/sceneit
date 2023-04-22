import React, { useState, useEffect, useRef, ReactElement, ChangeEvent } from 'react';
import { TextEncoder } from 'util';
import './index.css';

global.TextEncoder = TextEncoder;
import ReactDOMServer from 'react-dom/server';

interface SceneitWrapperProps {
  children: ReactElement;
  width: number;
  height: number;
  hideResolutionCustomizer?: boolean;
  className?: string;
}

const SceneitWrapper: React.FC<SceneitWrapperProps> = ({
  children,
  width: widthRaw = 1920,
  height: heightRaw = 1080,
  hideResolutionCustomizer = false,
  className = '',
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<Error | null>(null);
  const [height, setHeight] = useState(heightRaw);
  const [width, setWidth] = useState(widthRaw);

  useEffect(() => {
    const iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.body.style.margin = '12px';
      iframeDoc.body.style.padding = '0';
      iframeDoc.body.style.overflow = 'hidden';
      const clonedElement = React.cloneElement(children, {
        style: { ...children.props.style, width: '100%', height: '100%', margin: 0, padding: 0 },
      });
      const container = iframeDoc.createElement('div');
      container.innerHTML = ReactDOMServer.renderToString(clonedElement);
      iframeDoc.body.appendChild(container.firstChild as Node);
    }
  }, []);

  const scale = Math.min((window.innerWidth - 44) / width, (window.innerHeight - 62) / height);
  const handleLoad = () => {
    setError(null);
  };

  const handleError = () => {
    setError(new Error('An error occurred while loading the iframe.'));
  };

  const handleDimensionChange = (e: ChangeEvent<HTMLInputElement>, type: 'height' | 'width') => {
    if (e) {
      const value = e?.target?.value;
      if (type === 'height') setHeight(Number(value));
      else if (type === 'width') setWidth(Number(value));
    }
  };

  return (
    <div className={`sceneit-wrapper ${className}`}>
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
      <iframe
        title='Resolution Simulator'
        ref={iframeRef}
        width={width}
        height={height}
        style={{
          border: 'none',
          transformOrigin: '0 0',
          transform: `scale(${scale})`,
        }}
        onLoad={handleLoad}
        onError={handleError}
        className='sceneit-iframe'
      />
      {error && (
        <div style={{ position: 'absolute', top: 0, left: 0, width, height, background: 'white' }}>
          <p>Sorry, an error occurred:</p>
          <pre>{error.message}</pre>
        </div>
      )}
    </div>
  );
};

export default SceneitWrapper;
