import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import SearchBar from "./searchBar";
import { SEARCH_REPOSITORIES } from "../../service/query";
import type { Edge, IRepoProps } from "../../service/contracts";
import { useClickOutside, useDebounce } from "../../hooks";

const SearchContainer = () => {
  const [expand, setExpand] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 1000);

  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, {
    variables: { searchTerm: debouncedValue },
    skip: !debouncedValue,
  });

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
      expand={expand}
      loading={loading}
      inputValue={searchTerm}
      clearInputValue={clearInputValue}
      result={data?.search?.edges.map((edge: Edge) => edge.node) || []}
      expandSearchBox={expandSearchBox}
      handleChangeInputValue={handleChangeInputValue}
    />
  );
};

export default SearchContainer;
