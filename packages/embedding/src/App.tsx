import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { App as DevToolsCoreApp } from 'core';
import localforage from 'localforage';

const DEFAULT_DEVTOOLS_PANEL_WIDTH = 300;
const MIN_DEVTOOLS_PANEL_WIDTH = 200;

const STORAGE_KEY_EXPANDED = 'expanded';
const STORAGE_KEY_PANEL_WIDTH = 'panelWidth';

const Panel = styled.div<{ width?: number }>`
  position: fixed;
  top: 0;
  right: 0;
  width: ${({ width }) => width ?? DEFAULT_DEVTOOLS_PANEL_WIDTH}px;
`;
const expandButtonSize = 20;
const expandButtonStrokeWidth = 2;
const expandButtonPureSize = expandButtonSize - expandButtonStrokeWidth / 2;
const ExpandButton = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  width: ${expandButtonSize}px;
  height: ${expandButtonSize}px;
  cursor: pointer;
  z-index: 1000;
  user-select: none;
  polygon {
    fill: #000;
    stroke: #fff;
    stroke-width: ${expandButtonStrokeWidth}px;
    stroke-linejoin: miter;
  }
`;
const resizeHandleWidth = 10;
const ResizeHandle = styled.div`
  position: absolute;
  top: 0;
  left: -${resizeHandleWidth / 3}px;
  width: ${resizeHandleWidth}px;
  height: 100%;
  cursor: col-resize;
  z-index: 1;
`;
const ResizeMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  cursor: col-resize;
`;

function App() {
  const [isDevToolsPanelExpanded, setIsDevToolsPanelExpanded] = useState<boolean>();
  const [devToolsPanelWidth, setDevToolsPanelWidth] = useState<number>();
  const [isDevToolsPanelResizing, setIsDevToolsPanelResizing] = useState(false);
  const resizingInitialInfo = useRef<{ x: number; width: number } | null>(null);

  useEffect(() => {
    let resizedDevToolsPanelWidth: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingInitialInfo.current) return;
      const offset = resizingInitialInfo.current.x - e.clientX;
      resizedDevToolsPanelWidth = Math.max(
        MIN_DEVTOOLS_PANEL_WIDTH,
        resizingInitialInfo.current.width + offset
      );
      setDevToolsPanelWidth(resizedDevToolsPanelWidth);
    };
    const handleMouseUp = () => {
      if (!resizingInitialInfo.current) return;
      resizingInitialInfo.current = null;
      setIsDevToolsPanelResizing(false);
      if (resizedDevToolsPanelWidth !== null) {
        // After resizing, save the width to local storage.
        localforage.setItem(STORAGE_KEY_PANEL_WIDTH, resizedDevToolsPanelWidth);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    (async () => {
      // Restore the width from local storage.
      const width = await localforage.getItem<number>(STORAGE_KEY_PANEL_WIDTH);
      setDevToolsPanelWidth(width ?? DEFAULT_DEVTOOLS_PANEL_WIDTH);
      const expanded = await localforage.getItem<boolean>(STORAGE_KEY_EXPANDED);
      if (expanded !== null) {
        setIsDevToolsPanelExpanded(expanded);
      }
    })();
  }, []);

  useEffect(() => {
    if (isDevToolsPanelExpanded === undefined) return;
    // Save the expanded state to local storage.
    localforage.setItem(STORAGE_KEY_EXPANDED, isDevToolsPanelExpanded);
  }, [isDevToolsPanelExpanded]);

  return (
    <Panel width={devToolsPanelWidth}>
      <ExpandButton onClick={() => setIsDevToolsPanelExpanded(!isDevToolsPanelExpanded)}>
        <polygon
          points={`0,0 ${expandButtonPureSize},0 ${expandButtonPureSize},${expandButtonPureSize}`}
        />
      </ExpandButton>
      <ResizeHandle
        onMouseDown={e => {
          if (isDevToolsPanelResizing || !devToolsPanelWidth) return;
          resizingInitialInfo.current = {
            x: e.clientX,
            width: devToolsPanelWidth,
          };
          setIsDevToolsPanelResizing(true);
        }}
      />
      {isDevToolsPanelResizing && <ResizeMask />}
      {isDevToolsPanelExpanded && <DevToolsCoreApp />}
    </Panel>
  );
}

export default App;
