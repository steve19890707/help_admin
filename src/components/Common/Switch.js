import styled from "styled-components";
import cx from "classnames";
import Switch from "react-switch";
import { noop } from "lodash";
import { styles } from "../../constants/styles";

const StyledSwitchKit = styled.div`
  display: flex;
  align-items: center;
  .switch-span {
    margin-left: 8px;
    &.checked {
      color: ${styles.switchStatus};
    }
  }
`;

export const SwitchKit = ({ checked = false, handler = noop }) => {
  return (
    <StyledSwitchKit>
      <Switch
        onColor={styles.switchStatus}
        onChange={(status) => handler(status)}
        checked={checked}
      />
      <span className={cx("switch-span", { checked: checked })}>
        {checked ? "啟用" : "停用"}
      </span>
    </StyledSwitchKit>
  );
};
