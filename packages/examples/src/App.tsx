import { useEffect, useState } from 'react';
import { DefaultScene } from './scene';

export function App() {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const defaultScene = new DefaultScene();

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
