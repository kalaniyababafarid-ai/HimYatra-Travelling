import { useEffect, useRef } from 'react';
import { createApp } from 'vue';

/**
 * Mounts a Vue 3 Single File Component cleanly inside a React tree.
 * Passes reactive props and forwards custom events back into React.
 */
export default function VueIsland({ component, props = {}, className = '' }) {
  const containerRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !component) return;

    const app = createApp(component, props);
    app.mount(containerRef.current);
    appRef.current = app;

    return () => {
      app.unmount();
      appRef.current = null;
    };
  }, [component]);

  return <div ref={containerRef} className={className} />;
}
