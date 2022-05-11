import styled from "styled-components";
import { useSelector } from "react-redux";
import { noop } from "lodash";
import { styles } from "../../constants/styles";
const StyledCaption = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 25px 25px 20px 25px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px 8px 0 0;
  background-color: ${styles.mainColor};
  .caption-title {
    margin-bottom: 25px;
    span {
      font-size: 22px;
      font-weight: bold;
    }
  }
  .caption-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    .tags,
    .btns {
      display: flex;
      align-items: center;
    }
  }
  .subtitle-list {
    display: flex;
    align-items: center;
  }
`;
const StyledSubtitles = styled.div`
  width: ${({ size }) => `${100 / size}%`};
`;
export const Caption = ({
  className = "",
  subtitles = [],
  title = "標題",
  Buttons = noop,
}) => {
  const props = useSelector((state) => state.props);
  const SubTitles = () => {
    return subtitles.map((v, k) => {
      return (
        <StyledSubtitles size={subtitles.length} key={k}>
          <span>{v}</span>
        </StyledSubtitles>
      );
    });
  };
  return (
    <StyledCaption theme={props.theme} className={className}>
      <div className="caption-title">
        <span>{title}</span>
      </div>
      <div className="caption-list">
        {Buttons !== noop && <div className="btns">{Buttons}</div>}
      </div>
      <div className="subtitle-list">
        <SubTitles />
      </div>
    </StyledCaption>
  );
};
