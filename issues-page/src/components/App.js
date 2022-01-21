import IssueList from "./IssueList";
import { useEffect, useState } from "react";
import OpenIssueIcon from "./OpenIssueIcon";
import CloseIssueIcon from "./CloseIssueIcon";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const FILTER_TYPE = {
  NO_FILTER: 0,
  OPEN: 1,
  CLOSED: 2,
};
const useApi = () => {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(FILTER_TYPE.NO_FILTER);
  const [page, setPage] = useState(0);
  const [ended, setEnded] = useState(false);

  const request = async (new_filter, setIsFetching) => {
    let pageIndex = 1;
    if (filter == new_filter) {
      pageIndex = page + 1;
      if (ended) return;
    } else {
      setFilter(new_filter);
      setEnded(false);
    }
    setPage(pageIndex);

    setIsFetching(true);
    try {
      const req = await fetch(
        `http://localhost:9000/issues?page=${pageIndex}&issuesFilter=${new_filter}`
      );
      const data = await req.json();
      if (data.length === 0) setEnded(true);
      else if (pageIndex != 1) setList([...list, ...data]);
      else setList(data);
    } catch (e) {
    } finally {
      setIsFetching(false);
    }
  };

  return { list, ended, filter, request };
};

function App() {
  const { list, filter, request } = useApi();
  const fetchMoreData = (setIsFetching2) => {
    request(filter, setIsFetching2);
  };
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreData);

  useEffect(() => {
    request(0, setIsFetching);
  }, []);

  const handleFilter = (clicked_filter) => {
    if (filter === clicked_filter) request(0, setIsFetching);
    else request(clicked_filter, setIsFetching);
  };

  return (
    <div className="container">
      <div className="box">
        <div className="box-header">
          <div
            data-testid="open-issues"
            onClick={() => handleFilter(FILTER_TYPE.OPEN)}
            className={`open-issues ${
              filter == FILTER_TYPE.OPEN ? "active" : ""
            }`}
          >
            <OpenIssueIcon /> Open
          </div>
          <div
            data-testid="close-issues"
            onClick={() => handleFilter(FILTER_TYPE.CLOSED)}
            className={`close-issues ${
              filter == FILTER_TYPE.CLOSED ? "active" : ""
            }`}
          >
            <CloseIssueIcon /> Closed
          </div>
        </div>
        <IssueList list={list} pending={isFetching} />
      </div>
    </div>
  );
}

export default App;
