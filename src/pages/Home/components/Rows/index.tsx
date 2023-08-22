import * as Styled from "./styles";
import type { IRowsProps } from "./contracts";

const Rows = ({ property_values }: IRowsProps) => {
  return (
    <Styled.TableRows>
      {property_values.map(({ property_id, value }) => (
        <Styled.TableCell key={property_id}>{value}</Styled.TableCell>
      ))}
    </Styled.TableRows>
  );
};

export default Rows;
