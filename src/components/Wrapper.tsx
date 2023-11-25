// IframeWrapper.jsx
import React, { useRef, useEffect, ReactElement } from 'react';
import ReactDOM from 'react-dom/client';

interface WrapperProps {
  children: ReactElement;
  style: { [key: string]: string | number };
}

const Wrapper: React.FC<WrapperProps> = ({ children, style }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current) return;
    if (!children) return;
    const iframeDocument = (iframeRef.current as HTMLIFrameElement).contentDocument;
    if (iframeDocument) {
      const loadScript = (src: string, callback: () => void) => {
        const script = iframeDocument.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = callback;
        iframeDocument.body.appendChild(script);
      };

      const loadReactScripts = () => {
        loadScript('https://unpkg.com/react@18/umd/react.development.js', () =>
          loadScript('https://unpkg.com/react-dom@18/umd/react-dom.development.js', () => renderReactComponent()),
        );
      };

      const renderReactComponent = () => {
        const rootElement = iframeDocument.createElement('div');
        rootElement.id = 'root';
        iframeDocument.body.appendChild(rootElement);

        const ComponentType = React.Children.only(children).type;

        const MyComponent = React.createElement(ComponentType, {}, children);
        const reactRoot = ReactDOM.createRoot(rootElement);
        reactRoot.render(MyComponent);
      };

      loadReactScripts();
    }

    return () => {
      iframeRef.current = null;
    };
  }, [children]);

  return <iframe title='IframeWrapper' style={style} ref={iframeRef} />;
};

export default Wrapper;
