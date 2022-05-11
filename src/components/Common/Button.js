import styled from "styled-components";
import { noop } from "lodash";
import { styles } from "../../constants/styles";

const StyledButton = styled.div`
  border: 0;
  font-size: 14px;
  padding: 10px 14px;
  border-radius: 5px;
  margin-right: 12px;
  color: ${styles.btnColor};
  background: ${({ type }) => styles[type]};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
`;

export const Button = ({
  classname = "",
  type = "",
  title = "",
  disabled = false,
  handler = noop,
}) => {
  return (
    <StyledButton
      className={classname}
      type={type}
      onClick={() => !disabled && handler()}
    >
      {title}
    </StyledButton>
  );
};
