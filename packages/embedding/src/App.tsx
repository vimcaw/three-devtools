import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { App as DevToolsCoreApp } from 'core';
import localforage from 'localforage';
import Draggable from 'react-draggable';
import {picker} from "core/src/store/threeJsData";
import {IInitProps} from "./main";

const DEFAULT_DEVTOOLS_PANEL_WIDTH = 300;
const MIN_DEVTOOLS_PANEL_WIDTH = 200;

const STORAGE_KEY_EXPANDED = 'expanded';
const STORAGE_KEY_PANEL_WIDTH = 'panelWidth';

const Panel = styled.div<{ width?: number }>`
  position: fixed;
  top: 0;
  right: 0;
  width: ${({ width }) => width ?? DEFAULT_DEVTOOLS_PANEL_WIDTH}px;
  z-index: 9999999;
  border-radius: 6px;
  
  &::-webkit-scrollbar {
    width: 0px !important;
  }
`;
const expandButtonSize = 20;
const expandButtonStrokeWidth = 2;
const expandButtonPureSize = expandButtonSize - expandButtonStrokeWidth / 2;
const ExpandButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  padding: 0;
  line-height: 1;
  border: none;
  outline: none;
  box-shadow: none;
  background: none;
  cursor: pointer;
  z-index: 1000;
  user-select: none;
  &,
  svg {
    width: ${expandButtonSize}px;
    height: ${expandButtonSize}px;
    polygon {
      fill: #000;
      stroke: #fff;
      stroke-width: ${expandButtonStrokeWidth}px;
      stroke-linejoin: miter;
    }
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

function App(props: IInitProps) {
  const {panelStyle} = props
  const [isDevToolsPanelExpanded, setIsDevToolsPanelExpanded] = useState<boolean>();
  const [devToolsPanelWidth, setDevToolsPanelWidth] = useState<number>(0);
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

    if(!isDevToolsPanelExpanded) {
      // clear all debug groups children
      // picker.clearDebugGroups()
    }

  }, [isDevToolsPanelExpanded]);

  return (
    <Draggable handle=".draggable">
      <Panel
        width={devToolsPanelWidth}
        style={{
          maxHeight: "500px",
          ...(isDevToolsPanelExpanded ? {overflowY: "auto" } : {}),
          ...panelStyle,
        }}
      >
        <ExpandButton onClick={() => setIsDevToolsPanelExpanded(!isDevToolsPanelExpanded)}>
          <svg>
            <polygon
              points={`0,0 ${expandButtonPureSize},0 ${expandButtonPureSize},${expandButtonPureSize}`}
            />
          </svg>
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
    </Draggable>
  );
}

export default App;
