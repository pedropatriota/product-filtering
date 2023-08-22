import type { TFilters } from "../context/contracts";

interface Props {
  filters: TFilters;
  operator:
    | {
        text: string;
        id: string;
      }
    | undefined;
  propertyValue: string | number | undefined;
}

const getMethodsByOperators = ({ propertyValue, operator, filters }: Props) => {
  switch (operator?.id) {
    case "equals":
      return propertyValue === filters.values;
    case "in": {
      const valuesToMatch = (filters.values as string[] | number[]).map(
        (val) => val
      );
      return valuesToMatch.includes(propertyValue as string | number);
    }
    case "contains": {
      const valuesToMatch = (filters.values as string[]).map((val) =>
        val.trim()
      );
      return valuesToMatch.some((val) =>
        (propertyValue as string).includes(val)
      );
    }
    case "greater_than": {
      return (propertyValue as number) > (filters.values as number);
    }
    case "less_than":
      return (propertyValue as number) < (filters.values as number);
    case "any":
      return propertyValue !== null && propertyValue !== undefined;
    case "none":
      return propertyValue === null || propertyValue === undefined;
    default: {
      return true;
    }
  }
};

export default getMethodsByOperators;
