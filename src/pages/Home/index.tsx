import * as Styled from "./styles";
import { useContext } from "react";
import { Filter } from "../../components";
import { HomeContext } from "../../context/homeContext";

const Home = () => {
  const {
    tableHeaders,
    operators,
    select,
    products,
    handleSelectOperator,
    handleSelectProperty,
    handleSelectOptions,
  } = useContext(HomeContext);

  console.log({ products });

  return (
    <Styled.Container>
      <Styled.TableContainer>
        <Filter
          filter={[select.property, select.operator, select.options]}
          handleFilter={[
            handleSelectProperty,
            handleSelectOperator,
            handleSelectOptions,
          ]}
          label={["property", "operator", "options"]}
          options={[tableHeaders, operators, []]}
        />
        <Styled.Table>
          <Styled.TableHeader>
            <Styled.TableHeaderRows>
              {tableHeaders.map((head) => (
                <Styled.TableHeaderCell key={head.value}>
                  {head.label}
                </Styled.TableHeaderCell>
              ))}
            </Styled.TableHeaderRows>
          </Styled.TableHeader>
          {products.map(({ id, properties }) => (
            <Styled.TableRows key={id}>
              {properties.map(({ property_id, value }) => (
                <Styled.TableCell key={property_id}>{value}</Styled.TableCell>
              ))}
            </Styled.TableRows>
          ))}
        </Styled.Table>
      </Styled.TableContainer>
    </Styled.Container>
  );
};

export default Home;
