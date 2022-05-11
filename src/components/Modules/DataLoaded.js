import { noop } from "lodash";
// loader
import { CompsLoader } from "./CompsLoader";
// component
import { ListComp, CompFloor1, CompFloor2 } from "./ListComp";

export const DataLoaded = ({
  isLoading = true,
  data = [],
  children = noop,
}) => {
  return (
    <>
      {isLoading ? (
        <CompsLoader />
      ) : (
        <ListComp>
          {data.length === 0 ? (
            <CompFloor2 className="nodata">暫無資料</CompFloor2>
          ) : (
            data.map((v, k) => (
              <CompFloor1 key={k} index={k}>
                {children(v)}
              </CompFloor1>
            ))
          )}
        </ListComp>
      )}
    </>
  );
};
