import { useEffect, useState } from 'react';
import { DefaultScene } from './scene';

const defaultScene = new DefaultScene();

function App() {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (container) {
      defaultScene.mount(container);
    }
    return () => {
      defaultScene.unmount();
    };
  }, [container]);

  return <div ref={setContainer} />;
}

export default App;
