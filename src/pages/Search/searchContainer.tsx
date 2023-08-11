import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery } from "@apollo/client";
import SearchBar from "./searchBar";
import { SEARCH_REPOSITORIES } from "../../service/query";
import type { Edge } from "../../service/contracts";
import { useDebounce } from "../../hooks";

const SearchContainer = () => {
  const [expand, setExpand] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedValue = useDebounce(searchTerm, 300);

  const containerRef = useRef<HTMLUListElement | null>(null);

  const { loading, error, fetchMore, data } = useQuery(SEARCH_REPOSITORIES, {
    variables: {
      searchTerm: debouncedValue ? debouncedValue : "is:public",
      cursor: null,
    },
    fetchPolicy: "cache-and-network",
  });

  const handleScroll = useCallback(() => {
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
            return fetchMoreResult;
          },
        });
    }
  }, [
    containerRef.current,
    data?.search.pageInfo.endCursor,
    data?.search.pageInfo.hasNextPage,
  ]);

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

  const filteredResult = data?.search?.edges
    .map((edge: Edge) => edge.node)
    .filter(({ name }: { name: string }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <SearchBar
      ref={containerRef}
      expand={expand}
      loading={loading}
      inputValue={searchTerm}
      clearInputValue={clearInputValue}
      result={filteredResult}
      expandSearchBox={expandSearchBox}
      handleChangeInputValue={handleChangeInputValue}
    />
  );
};

export default SearchContainer;
