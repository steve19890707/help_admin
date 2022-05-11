import styled from "styled-components";
import { styles } from "../../constants/styles";

// 最外層
const StyledListComp = styled.div`
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
  background-color: ${styles.mainColor};
`;
export const ListComp = ({ className, children }) => {
  return <StyledListComp className={className}>{children}</StyledListComp>;
};

// 第一層
const StyledCompFloor1 = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 0 25px;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  animation: ${({ second }) => {
    const updateSecond = second > 12 ? `2.4` : `${second * 0.2}`;
    return `ListfadeIn ${updateSecond}s`;
  }};
  &.close {
    background-color: ${styles.closeColor};
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;
export const CompFloor1 = ({ className, index = 0, children }) => {
  return (
    <StyledCompFloor1 className={className} second={index}>
      {children}
    </StyledCompFloor1>
  );
};

// 第二層
const StyledCompFloor2 = styled.div`
  width: ${({ size }) => `${size}%`};
  position: relative;
  box-sizing: border-box;
  padding: 20px 20px 20px 0;
  overflow: auto;
  &.unhidden {
    overflow: unset;
  }
  &.btns {
    display: flex;
  }
  &.delete {
    color: ${styles.alert};
  }
  &.nodata {
    text-align: center;
  }
`;
export const CompFloor2 = ({ className, children, size = 100 }) => {
  return (
    <StyledCompFloor2 className={className} size={size}>
      {children}
    </StyledCompFloor2>
  );
};
