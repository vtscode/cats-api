import { Skeleton } from "antd";

const SkeletonComp = ({ loading }) => {
  return (
    <>
      {loading &&
        Array(10)
          .fill(0)
          .map((x, idx) => {
            return <Skeleton active key={idx} />;
          })}
    </>
  );
};
export default SkeletonComp;
