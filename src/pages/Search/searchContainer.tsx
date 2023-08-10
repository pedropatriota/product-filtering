import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery } from "@apollo/client";
import SearchBar from "./searchBar";
import { SEARCH_REPOSITORIES } from "../../service/query";
import type { Edge, IRepoProps } from "../../service/contracts";
import { useDebounce } from "../../hooks";

const SearchContainer = () => {
  const [expand, setExpand] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedValue = useDebounce(searchTerm, 1000);

  const containerRef = useRef<HTMLUListElement | null>(null);

  const { loading, error, fetchMore, data } = useQuery(SEARCH_REPOSITORIES, {
    variables: {
      searchTerm: debouncedValue,
      cursor: null,
    },
    skip: !debouncedValue,
    fetchPolicy: "cache-and-network",
    // onCompleted: (result) => {
    //   const newData = result.search.edges.map((edge: Edge) => edge.node);
    //   setItems([...items, ...newData]);
    //   // setCursor(result.search.pageInfo.endCursor);
    //   setHasMore(result.search.pageInfo.hasNextPage);
    // },
  });

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight
    ) {
      const { endCursor, hasNextPage } = data.search.pageInfo;
      hasNextPage &&
        fetchMore({
          variables: {
            cursor: endCursor,
          },
          updateQuery(previousQueryResult, { fetchMoreResult }) {
            fetchMoreResult.search.edges = [
              ...previousQueryResult.search.edges,
              ...fetchMoreResult.search.edges,
            ];
          },
        });
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  const expandSearchBox = useCallback(() => {
    setExpand(true);
  }, []);

  const collapseSearchBox = useCallback(() => {
    setExpand(false);
  }, []);

  const handleChangeInputValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const clearInputValue = useCallback(() => {
    setSearchTerm("");
    collapseSearchBox();
  }, []);

  if (error) return `Error: ${error?.message}`;

  return (
    <SearchBar
      ref={containerRef}
      expand={expand}
      loading={loading}
      inputValue={searchTerm}
      clearInputValue={clearInputValue}
      result={data?.search?.edges.map((edge: Edge) => edge.node)}
      expandSearchBox={expandSearchBox}
      handleChangeInputValue={handleChangeInputValue}
    />
  );
};

export default SearchContainer;