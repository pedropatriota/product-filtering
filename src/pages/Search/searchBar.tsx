import { Repository } from "../../components";
import logo from "../../assets/logo.png";
import type { ISearchBar } from "./contracts";
import type { IRepoProps } from "../../service/contracts";
import { useClickOutside } from "../../hooks/useClickOutside";

import * as Styled from "./styles";
import { forwardRef } from "react";

const SearchBar = forwardRef<HTMLUListElement | null, ISearchBar<IRepoProps>>(
  (
    {
      expand,
      inputValue,
      result,
      expandSearchBox,
      handleChangeInputValue,
      clearInputValue,
      loading,
    },
    ref
  ) => {
    const SearchRef = useClickOutside(() => {
      clearInputValue();
    });

    return (
      <>
        <Styled.LogoImg src={logo} alt="logo GitHub" />
        <Styled.SearchContainer
          expand={expand.toString()}
          ref={SearchRef}
          data-testid="search-container"
        >
          <Styled.InputContainer>
            <Styled.Input
              onFocus={expandSearchBox}
              onChange={handleChangeInputValue}
              value={inputValue}
              placeholder="Make your search..."
            />
            {inputValue && (
              <Styled.CloseIcon onClick={clearInputValue}>
                &#10006;
              </Styled.CloseIcon>
            )}
          </Styled.InputContainer>
          <Styled.DropdownContainer ref={ref}>
            {loading && "Loading..."}
            {result?.map((repo) => (
              <Repository key={repo.id} repo={repo} inputValue={inputValue} />
            ))}
          </Styled.DropdownContainer>
        </Styled.SearchContainer>
      </>
    );
  }
);

export default SearchBar;
