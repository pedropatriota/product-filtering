import * as Styled from "./styles";
import { useContext } from "react";
import { FilterContainer, Rows } from "./components";
import { HomeContext } from "../../context/homeContext";

const Home = () => {
  const { properties, products } = useContext(HomeContext);

  return (
    <Styled.Container>
      <FilterContainer />
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
              <Rows key={id} property_values={property_values} />
            ))}
          </tbody>
        </Styled.Table>
      </Styled.TableContainer>
    </Styled.Container>
  );
};

export default Home;
