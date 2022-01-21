import useInfiniteScroll from "../hooks/useInfiniteScroll";
import IssueItem from "./IssueItem";
import Loading from "./Loading";

function IssueList({ list, pending }) {
  return (
    <>
      <div className="issues" data-testid="issues">
        {list.map((issue, index) => {
          return <IssueItem key={index} issue={issue} />;
        })}
      </div>
      {pending && <Loading />}
    </>
  );
}

export default IssueList;
