import * as Styled from "./styles";
import { useContext } from "react";
import { Filter } from "../../components";
import { HomeContext } from "../../context/homeContext";

const Home = () => {
  const {
    properties,
    operators,
    select,
    products,
    handleSelectOperator,
    handleSelectProperty,
    handleSelectValues,
    valuesSelectFilter,
  } = useContext(HomeContext);

  return (
    <Styled.Container>
      <Filter
        filter={select}
        handleFilter={[
          handleSelectProperty,
          handleSelectOperator,
          handleSelectValues,
        ]}
        label={["property", "operator", "values"]}
        options={[
          properties,
          operators(
            select?.property?.type as "string" | "number" | "enumerated"
          ),
          valuesSelectFilter(select?.property?.value),
        ]}
      />

      <Styled.TableContainer>
        <Styled.Table>
          <Styled.TableHeader>
            <Styled.TableHeaderRows>
              {properties.map(({ label, value }) => (
                <Styled.TableHeaderCell key={value}>
                  {label}
                </Styled.TableHeaderCell>
              ))}
            </Styled.TableHeaderRows>
          </Styled.TableHeader>
          <tbody>
            {products.map(({ id, property_values }) => (
              <Styled.TableRows key={id}>
                {property_values.map(({ property_id, value }) => (
                  <Styled.TableCell key={property_id}>{value}</Styled.TableCell>
                ))}
              </Styled.TableRows>
            ))}
          </tbody>
        </Styled.Table>
      </Styled.TableContainer>
    </Styled.Container>
  );
};

export default Home;
