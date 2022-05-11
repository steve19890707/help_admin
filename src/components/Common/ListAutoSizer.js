import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export const ListAutoSizer = ({ dataList = [], CreateData, size = 100 }) => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          itemCount={dataList.length}
          itemData={dataList}
          itemSize={size}
          // ref={scrollRef}
          // onScroll={(e) => {
          //   e.scrollOffset > 0 ? setIsScroll(true) : setIsScroll(false);
          // }}
        >
          {CreateData}
        </List>
      )}
    </AutoSizer>
  );
};
