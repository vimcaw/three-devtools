import type { Euler, Vector3 } from 'three';
import { Input, Space, Typography } from 'antd';
import { Object3D } from 'three';
import styled from 'styled-components';
import { useState } from 'react';
import { observerLayer } from '../../store/threeJsData';

const StyledSpace = styled(Space)`
  display: flex;
  flex-direction: column;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const StyledInput = styled(Input)`
  width: 120px;
  margin-left: 10px;
`;

interface IVec3Props {
  fieldName: string;
  object: Object3D;
}

export function VectorProperty(props: IVec3Props) {
  const { fieldName, object } = props;
  const [x, setX] = useState(object.position.x);
  const [y, setY] = useState(object.position.y);
  const [z, setZ] = useState(object.position.z);
  const [useNativeV, setUseNativeV] = useState(true);

  const updateVec = (k: 'x' | 'y' | 'z') => {
    const node = observerLayer.findNode(object.uuid);

    if (node) {
      if (k === 'x') {
        const _x = isNaN(+x) ? 0 : x;
        node[fieldName].x = _x;
        setX(_x);
      } else if (k === 'y') {
        const _y = isNaN(+y) ? 0 : y;
        node[fieldName].y = _y;
        setX(_y);
      } else if (k === 'z') {
        const _z = isNaN(+z) ? 0 : z;
        node[fieldName].z = _z;
        setZ(_z);
      }

      observerLayer.refreshUI();
      setUseNativeV(true);
    }
  };

  const onChange = (k: 'x' | 'y' | 'z', e) => {
    setUseNativeV(false);
    const v = e.target.value;

    if (k === 'x') {
      setX(v);
    } else if (k === 'y') {
      setY(v);
    } else if (k === 'z') {
      setZ(v);
    }
  };

  return (
    <StyledSpace>
      <StyledDiv>
        X:
        <StyledInput
          value={useNativeV ? object[fieldName].x : x}
          onChange={v => onChange('x', v)}
          onBlur={() => updateVec('x')}
          onPressEnter={() => updateVec('x')}
        />
      </StyledDiv>
      <StyledDiv>
        Y:
        <StyledInput
          value={useNativeV ? object[fieldName].y : y}
          onChange={v => onChange('y', v)}
          onBlur={() => updateVec('y')}
          onPressEnter={() => updateVec('y')}
        />
      </StyledDiv>
      <StyledDiv>
        Z:
        <StyledInput
          value={useNativeV ? object[fieldName].z : z}
          onChange={v => onChange('z', v)}
          onBlur={() => updateVec('z')}
          onPressEnter={() => updateVec('z')}
        />
      </StyledDiv>
    </StyledSpace>
  );
}
