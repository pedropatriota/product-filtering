type TUniqueOrderedProps = { label: string | number; value: string | number }[];

const getUniqueOrderedValues = (options: TUniqueOrderedProps) => {
  const unique = [...new Set(options.map((item) => JSON.stringify(item)))].map(
    (str) => JSON.parse(str)
  );

  const sortedOptions = unique.sort((a, b) => {
    if (typeof a.label === "number") {
      return a.label - b.label;
    }
    return 0;
  });

  return sortedOptions;
};

export default getUniqueOrderedValues;
