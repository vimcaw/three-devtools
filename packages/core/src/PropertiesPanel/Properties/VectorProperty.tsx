import { Input, Space } from 'antd';
import type { Object3D, Vector3 } from 'three';
import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { observerLayer } from '../../store/threeJsData';

const StyledSpace = styled(Space)`
  display: flex;
  flex-direction: column;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
`;
const StyledInput = styled(Input)`
  width: 100px;
  margin-left: 10px;
`;

interface IVec3Props {
  fieldName: keyof Object3D;
  object: Object3D;
}

export function VectorProperty(props: IVec3Props) {
  const { fieldName, object } = props;
  const vec3 = object[fieldName] as Vector3;
  const cloneV3 = vec3?.clone() as Vector3;
  const [x, setX] = useState(vec3.x);
  const [y, setY] = useState(vec3.y);
  const [z, setZ] = useState(vec3.z);
  const [useNativeV, setUseNativeV] = useState(true);

  const updateVec = (k: 'x' | 'y' | 'z') => {
    if (k === 'x') {
      vec3.x = Number.isNaN(+x) ? cloneV3.x : +x;
      setX(vec3.x);
    } else if (k === 'y') {
      vec3.y = Number.isNaN(+y) ? cloneV3.y : +y;
      setY(vec3.y);
    } else if (k === 'z') {
      vec3.z = Number.isNaN(+z) ? cloneV3.z : +z;
      setZ(vec3.z);
    }

    observerLayer.refreshUI();
    setUseNativeV(true);
  };

  const onChange = (k: 'x' | 'y' | 'z', e: ChangeEvent<HTMLInputElement>) => {
    setUseNativeV(false);
    const v = Number(e.target.value);

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
          value={useNativeV ? vec3.x : x}
          onChange={v => onChange('x', v)}
          onBlur={() => updateVec('x')}
          onPressEnter={() => updateVec('x')}
        />
      </StyledDiv>
      <StyledDiv>
        Y:
        <StyledInput
          value={useNativeV ? vec3.y : y}
          onChange={v => onChange('y', v)}
          onBlur={() => updateVec('y')}
          onPressEnter={() => updateVec('y')}
        />
      </StyledDiv>
      <StyledDiv>
        Z:
        <StyledInput
          value={useNativeV ? vec3.z : z}
          onChange={v => onChange('z', v)}
          onBlur={() => updateVec('z')}
          onPressEnter={() => updateVec('z')}
        />
      </StyledDiv>
    </StyledSpace>
  );
}
