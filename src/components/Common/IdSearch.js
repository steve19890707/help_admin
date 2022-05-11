import { useState } from "react";
import styled from "styled-components";
import { noop } from "lodash";
import { styles } from "../../constants/styles";
import { IoSearch } from "react-icons/io5";
import { Button } from "./Button";

const StyledIdSearch = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  label {
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 50px;
    padding: 14px 16px;
    background: ${styles.searchInputBG};
  }
  .svg-IoSearch {
    fill: ${styles.searchInputColor};
    width: 18px;
    height: 18px;
  }
  input {
    width: 165px;
    margin-left: 5px;
    background: transparent;
    color: ${styles.searchInputColor};
  }
  .id-search {
    position: absolute;
    right: 5px;
    border-radius: 50px;
    margin-left: 3px;
  }
`;

export const IdSearch = ({ searchKey = "", handler = noop }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputClear, setInputClear] = useState(false);
  return (
    <StyledIdSearch>
      <label>
        <IoSearch className="svg-IoSearch" />
        <input
          id="search-input"
          placeholder={`請輸入${searchKey}`}
          onChange={(e) => {
            const clearValue = e.target.value.replace(/\s+/g, "");
            e.target.value = clearValue;
            setInputClear(false);
            setInputValue(clearValue.toLocaleUpperCase());
          }}
        />
      </label>
      <Button
        classname="id-search"
        type={"btnLinear"}
        title={inputClear ? "清除" : "搜尋"}
        handler={() => {
          inputValue.length > 0 && setInputClear((prev) => !prev);
          if (inputClear) {
            document.getElementById("search-input").value = "";
            setInputValue("");
          } else {
            handler(inputValue);
          }
        }}
      />
    </StyledIdSearch>
  );
};
