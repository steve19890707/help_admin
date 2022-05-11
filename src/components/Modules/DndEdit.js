import styled from "styled-components";
import { noop } from "lodash";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AiOutlineFieldNumber } from "react-icons/ai";
// component
import { PureEditPopup } from "./EditPopup";

const StyledDndEdit = styled(PureEditPopup)`
  padding: 15vh 0;
  .drop-area {
    position: relative;
  }
  .content {
    width: 80%;
    min-width: 650px;
    max-width: 650px;
    height: 70vh;
    margin: auto;
    background-color: ${styles.mainColor};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: auto;
    box-sizing: border-box;
    padding: 0 50px 50px 50px;
    animation: editpopup 0.3s;
  }
  .last-btns {
    margin-top: 50px;
  }
`;

const StyledDataList = styled.div`
  width: 100%;
  padding: 24px;
  border-radius: 5px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  background-color: ${getData(styles, ["dnd", "backround"])};
  &:last-child {
    margin-bottom: 0;
  }
  .oder {
    display: flex;
    align-items: center;
  }
  .svg-AiOutlineFieldNumber {
    width: 24px;
    height: 24px;
    fill: ${getData(styles, ["dnd", "svg"])};
  }
  /* speical dnd part class */
  .dnd-title {
    width: 150px;
  }
  .dnd-time-range {
    &.isBefore {
      position: relative;
      padding-top: 20px;
      color: ${getData(styles, ["tipColor"])};
    }
  }
  .dnd-tip {
    transform: translate(0%, -70%);
  }
`;

export const DndEdit = ({
  title = "",
  data = [],
  dndId = "",
  className = "",
  children = noop,
  updateBtnHandler = noop,
  closeHandler = noop,
}) => {
  const CreateDnDList = () => {
    return (
      <DragDropContext
        onDragEnd={(res) => {
          const { source, destination } = res;
          if (!destination) {
            return;
          }
          const [remove] = data.splice(source.index, 1);
          data.splice(destination.index, 0, remove);
        }}
      >
        <Droppable droppableId={`${dndId}-dnd`}>
          {(provided) => (
            <div
              className="drop-area"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data.map((v, k) => (
                <Draggable draggableId={`${dndId}-dnd-${k}`} index={k} key={k}>
                  {(p) => (
                    <StyledDataList
                      ref={p.innerRef}
                      {...p.draggableProps}
                      {...p.dragHandleProps}
                      key={getData(v, ["id"])}
                    >
                      <div className="oder">
                        <AiOutlineFieldNumber className="svg-AiOutlineFieldNumber" />
                        <span>.{k + 1}</span>
                      </div>
                      {children(v)}
                    </StyledDataList>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };
  return (
    <StyledDndEdit
      title={`變更${title}順序`}
      updateBtn="確定變更"
      checkValueError={false}
      isClose={false}
      className={className}
      updateBtnHandler={updateBtnHandler}
      closeBtnHandler={closeHandler}
    >
      <CreateDnDList />
    </StyledDndEdit>
  );
};
