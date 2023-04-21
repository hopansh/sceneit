import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
import ReactDOMServer from 'react-dom/server';

interface SceneitWrapperProps {
  children: ReactElement;
  width: number;
  height: number;
}

const SceneitWrapper: React.FC<SceneitWrapperProps> = ({ children, width, height }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.body.style.margin = '0';
      iframeDoc.body.style.padding = '0';
      iframeDoc.body.style.overflow = 'hidden';
      const clonedElement = React.cloneElement(children, {
        style: { ...children.props.style, width: '100%', height: '100%', margin: 0, padding: 0 },
      });
      const container = iframeDoc.createElement('div');
      container.innerHTML = ReactDOMServer.renderToString(clonedElement);
      iframeDoc.body.appendChild(container.firstChild as Node);
    }
  }, [children]);

  const scale = Math.min(window.innerWidth / width, window.innerHeight / height);
  const handleLoad = () => {
    setError(null);
  };

  const handleError = () => {
    setError(new Error('An error occurred while loading the iframe.'));
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }} className='sceneit-wrapper'>
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
