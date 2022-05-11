import styled from "styled-components";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "../../constants/styles";
import { GrLanguage } from "react-icons/gr";
// reducers
import {
  setLanguage,
  setConfirm,
  setLineContentFirstInit,
} from "../../reducer/props";

const StyledMultiLanguage = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  .svg-GrLanguage {
    width: 22px;
    height: 22px;
    margin-right: 16px;
    path {
      stroke: ${styles.feature};
    }
  }
`;
const StyledLangBtn = styled.div`
  min-width: 80px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  text-align: center;
  margin: 8px;
  background: ${styles.mainColor};
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
  &.selected,
  &:hover {
    background: ${styles.btnLinear};
    color: ${styles.btnColor};
  }
`;
export const MultiLanguage = ({ className = "", isEditPopup = false }) => {
  const props = useSelector((state) => state.props);
  const dispatch = useDispatch();
  return (
    <StyledMultiLanguage className={className}>
      <GrLanguage className="svg-GrLanguage" />
      {props.langList.map((v, k) => {
        return (
          <StyledLangBtn
            key={k}
            className={cx({ selected: v.lang === props.language })}
            onClick={() => {
              if (v.lang === props.language) {
                return;
              }
              if (isEditPopup) {
                dispatch(
                  setConfirm({
                    status: true,
                    content: `確定切換成『 ${
                      props.langText[v.lang]
                    } 』? 尚未儲存的資料將會遺失。`,
                    type: "slotEditClose",
                    param: () => dispatch(setLanguage(v.lang)),
                  })
                );
                dispatch(setLineContentFirstInit(true));
              } else {
                dispatch(setLanguage(v.lang));
              }
            }}
          >
            <span>{v.name}</span>
          </StyledLangBtn>
        );
      })}
    </StyledMultiLanguage>
  );
};
