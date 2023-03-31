import type { Euler, Vector3 } from 'three';
import {Input, Space, Typography} from 'antd';
import {Object3D} from "three";
import styled from "styled-components";
import {useState} from "react";
import {observerLayer} from "../../store/threeJsData";

const StyledSpace = styled(Space)`
  display: flex;
  flex-direction: column;
`
const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const StyledInput = styled(Input)`
  width: 120px;
  margin-left: 10px;
`

interface IVec3Props {
  fieldName: string;
  object: Object3D
}

export function VectorProperty(props: IVec3Props) {
  const { fieldName, object } = props;
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [z, setZ] = useState(0)
  const [useNativeV, setUseNativeV] = useState(false)

  const updateVec = (k: "x" | "y" | "z") => {
    const node = observerLayer.findNode(object.uuid)

    if(node) {
      if (k === "x") {
        node[fieldName].x = x
        setX(0)
      } else if (k === "y") {
        node[fieldName].y = y
        setY(0)
      } else if (k === "z") {
        node[fieldName].z = z
        setZ(0)
      }

      observerLayer.refreshUI()
      setUseNativeV(true)
    }
  }

  const onChange = (k: "x" | "y" | "z", e) => {
    setUseNativeV(false)
    const v = +e.target.value;

    if (k === "x") {
      setX(v)
    } else if (k === "y") {
      setY(v)
    } else if (k === "z") {
      setZ(v)
    }
  }

  return (
    <StyledSpace>
      <StyledDiv>
        X:
        <StyledInput
          value={useNativeV ? object[fieldName].x : x}
          onChange={(v) => onChange("x", v)}
          onBlur={() => updateVec("x")}
          onPressEnter={() => updateVec("x")}
        />
      </StyledDiv>
      <StyledDiv>
        Y:
        <StyledInput
          value={useNativeV ? object[fieldName].y : y}
          onChange={(v) => onChange("y", v)}
          onBlur={() => updateVec("y")}
          onPressEnter={() => updateVec("y")}
        />
      </StyledDiv>
      <StyledDiv>
        Z:
        <StyledInput
          value={useNativeV ? object[fieldName].z : z}
          onChange={(v) => onChange("z", v)}
          onBlur={() => updateVec("z")}
          onPressEnter={() => updateVec("z")}
        />
      </StyledDiv>
    </StyledSpace>
  );
}
