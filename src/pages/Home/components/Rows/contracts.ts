export interface IRowsProps {
  property_values: (
    | {
        property_id: number;
        value: string;
      }
    | {
        property_id: number;
        value: number;
      }
  )[];
}
