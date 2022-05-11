import { useState } from "react";
import styled from "styled-components";
import { noop } from "lodash";
import { styles } from "../../constants/styles";
import { GoTriangleDown } from "react-icons/go";
// listener
import { Mousedown } from "../../common-lib/hooks";

const StyledSelector = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  min-width: ${({ minWidth }) => `${minWidth}px`};
  border-radius: 5px;
  padding: 6px 12px;
  background: ${styles.selectorLinear};
  z-index: ${({ zindex }) => `${zindex}`};
  cursor: pointer;
  .s-title {
    color: ${styles.selectorColor};
  }
  .svg-GoTriangleDown {
    width: 16px;
    height: 16px;
    margin-left: 5px;
    fill: ${styles.selectorColor};
  }
  .s-area {
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    padding: 2px 0;
    border-radius: 0 0 5px 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    background: ${styles.selectorLinear};
    max-height: 300px;
    overflow: auto;
  }
  .sa-style {
    padding: 6px 8px;
    &:hover,
    &.active {
      color: #fff;
      background: ${styles.selectorColor};
    }
  }
`;

export const Selector = ({
  id = "",
  zindex = "2",
  minWidth = "40",
  defaultValue = "",
  valueList = [],
  viewValue = noop,
  handler = noop,
}) => {
  const [opOption, setOpOption] = useState(false);
  Mousedown((e) => {
    const sArea = document.getElementById(`s-area-${id}`);
    if (sArea && !sArea.contains(e.target)) {
      setOpOption(false);
    }
  });
  return (
    <StyledSelector
      id={`s-area-${id}`}
      minWidth={minWidth}
      zindex={zindex}
      onClick={() => setOpOption((prev) => !prev)}
    >
      <div className="s-title">{defaultValue}</div>
      <GoTriangleDown className="svg-GoTriangleDown" />
      {opOption && (
        <div className="s-area">
          {valueList.map((v, k) => {
            return (
              <div
                key={k}
                className={`sa-style ${v === defaultValue ? "active" : ""}`}
                onClick={() => handler(v)}
              >
                {viewValue(v)}
              </div>
            );
          })}
        </div>
      )}
    </StyledSelector>
  );
};
