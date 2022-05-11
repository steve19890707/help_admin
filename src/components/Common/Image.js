import { useState } from "react";
import styled from "styled-components";
import { MdImageNotSupported } from "react-icons/md";

const StyledGameIconError = styled.div`
  width: 60px;
  height: 60px;
  text-align: center;
  border: 1px dashed #9b9b9b;
  box-sizing: border-box;
  padding: 5px;
  .svg-MdImageNotSupported {
    width: 28px;
    height: 28px;
    fill: #9b9b9b;
  }
  .sub-title {
    font-size: 14px;
    color: #9b9b9b;
  }
`;

export const Image = ({ classname = "", src = "", type = "" }) => {
  const [imgError, setImgError] = useState(false);
  const ErrorType = () => {
    switch (type) {
      case "game-icon":
        return (
          <StyledGameIconError>
            <MdImageNotSupported className="svg-MdImageNotSupported" />
            <div className="sub-title">error</div>
          </StyledGameIconError>
        );
      default:
        return <div>img error</div>;
    }
  };

  return (
    <>
      {src && !imgError ? (
        <img
          onError={() => {
            setImgError(true);
          }}
          className={classname}
          src={src}
          alt=""
        />
      ) : (
        <ErrorType />
      )}
    </>
  );
};
