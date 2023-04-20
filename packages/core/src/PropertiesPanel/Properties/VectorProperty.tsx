import { Input, Space } from 'antd';
import type { Object3D } from 'three';
import styled from 'styled-components';
import { ChangeEvent, useMemo, useState } from 'react';
import { observerLayer } from '../../store/threeJsData';
import { ThreeJsClientAdapter } from '../../ThreeJsClientAdapter';

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
  fieldName: keyof Object3D;
  object: Object3D;
}

export function VectorProperty(props: IVec3Props) {
  const { fieldName, object } = props;
  const prop = useMemo(() => {
    const node = observerLayer.findNode(object.uuid);
    if (!node) return null;
    const value = object[fieldName];
    return value && value instanceof ThreeJsClientAdapter.USER_THREE.Vector3 ? value : null;
  }, [fieldName, object]);
  const [x, setX] = useState(object.position.x);
  const [y, setY] = useState(object.position.y);
  const [z, setZ] = useState(object.position.z);
  const [useNativeV, setUseNativeV] = useState(true);
  if (!prop) return null;

  const updateVec = (k: 'x' | 'y' | 'z') => {
    if (prop) {
      if (k === 'x') {
        prop.x = Number.isNaN(+x) ? 0 : x;
        setX(prop.x);
      } else if (k === 'y') {
        prop.y = Number.isNaN(+y) ? 0 : y;
        setX(prop.y);
      } else if (k === 'z') {
        prop.z = Number.isNaN(+z) ? 0 : z;
        setZ(prop.z);
      }

      observerLayer.refreshUI!();
      setUseNativeV(true);
    }
  };

  const onChange = (k: 'x' | 'y' | 'z', e: ChangeEvent<HTMLInputElement>) => {
    setUseNativeV(false);
    const v = e.target.value;

    if (k === 'x') {
      setX(+v);
    } else if (k === 'y') {
      setY(+v);
    } else if (k === 'z') {
      setZ(+v);
    }
  };

  return (
    <StyledSpace>
      <StyledDiv>
        X:
        <StyledInput
          value={useNativeV ? prop.x : x}
          onChange={v => onChange('x', v)}
          onBlur={() => updateVec('x')}
          onPressEnter={() => updateVec('x')}
        />
      </StyledDiv>
      <StyledDiv>
        Y:
        <StyledInput
          value={useNativeV ? prop.y : y}
          onChange={v => onChange('y', v)}
          onBlur={() => updateVec('y')}
          onPressEnter={() => updateVec('y')}
        />
      </StyledDiv>
      <StyledDiv>
        Z:
        <StyledInput
          value={useNativeV ? prop.z : z}
          onChange={v => onChange('z', v)}
          onBlur={() => updateVec('z')}
          onPressEnter={() => updateVec('z')}
        />
      </StyledDiv>
    </StyledSpace>
  );
}
