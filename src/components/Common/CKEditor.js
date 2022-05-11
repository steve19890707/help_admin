import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
// import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import cx from "classnames";
import styled from "styled-components";
import { noop } from "lodash";

const StyleCKEditor = styled.div`
  position: relative;
  width: 100%;
  margin-top: 25px;
  &.hidden {
    display: none;
  }
  .ck-content {
    min-height: 125px;
  }
  .ck-toolbar {
    border-radius: 5px 5px 0 0 !important;
  }
  .editor-container {
    background: #f9f9f9;
    min-height: 100px;
    border-radius: 0 0 5px 5px;
  }
`;

export const ReactCKEditor = ({
  updateKey = "",
  isEdit = true,
  content = "",
  setContent = noop,
}) => {
  return (
    <StyleCKEditor className={cx({ hidden: !isEdit })}>
      <div className="document-editor">
        <div id={`editor_toolbar_${updateKey}`} className="editor-toolbar" />
        <div className="editor-container">
          <CKEditor
            editor={Editor}
            // onReady={(editor) => {
            //   const toolbarContainer = document.getElementById(
            //     `editor_toolbar_${updateKey}`
            //   );
            //   toolbarContainer.appendChild(editor.ui.view.toolbar.element);
            // }}
            config={{
              fontColor: ckeditColors,
              toolbar: [
                "fontColor",
                "insertTable",
                // "tableColumn",
                // "tableRow",
                // "mergeTableCells",
                "removeFormat",
                "outdent",
                "indent",
                "|",
                "undo",
                "redo",
              ],
            }}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
        </div>
      </div>
    </StyleCKEditor>
  );
};

const ckeditColors = {
  colors: [
    { color: "#f44336", label: "f44336" },
    { color: "#ff9800", label: "ff9800" },
    { color: "#ffc107", label: "ffc107" },
    { color: "#8bc34a", label: "8bc34a" },
    { color: "#03a9f4", label: "03a9f4" },
    { color: "#673ab7", label: "673ab7" },
    { color: "#9c27b0", label: "9c27b0" },
    { color: "#fd7dd6", label: "fd7dd6" },
    { color: "#00bcd4", label: "00bcd4" },
    { color: "#ffff1a", label: "ffff1a" },
    { color: "#ffd542", label: "ffd542" },
    { color: "#ffd648", label: "ffd648" },
    { color: "#fff", label: "fff" },
    { color: "#c3c3c3", label: "c3c3c3" },
    { color: "#795548", label: "795548" },
    { color: "#000", label: "000" },
  ],
};
