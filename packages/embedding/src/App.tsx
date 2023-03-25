import { useState } from 'react';
import styled from 'styled-components';
import { App as DevToolsCoreApp } from 'core';

const Panel = styled.div<{ expanded?: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
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

function App() {
  const [isDevToolsPanelExpanded, setIsDevToolsPanelExpanded] = useState(false);

  return (
    <Panel>
      <ExpandButton onClick={() => setIsDevToolsPanelExpanded(!isDevToolsPanelExpanded)}>
        <polygon
          points={`0,0 ${expandButtonPureSize},0 ${expandButtonPureSize},${expandButtonPureSize}`}
        />
      </ExpandButton>
      {isDevToolsPanelExpanded && <DevToolsCoreApp />}
    </Panel>
  );
}

export default App;
