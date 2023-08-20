export type TProductsProps = {
  id: number;
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
}[];

export type TPropertiesProps =
  | {
      id: number;
      name: string;
      type: string;
      values: string[];
    }[]
  | {
      id: number;
      name: string;
      type: string;
      values?: string[];
    }[];

export type TOperatorsProps = {
  text: string;
  id: string;
}[];

export interface IDatastoreProps {
  getProducts: () => TProductsProps;
  getProperties: () => TPropertiesProps;
  getOperators: () => TOperatorsProps;
  products: TProductsProps;
  properties: TPropertiesProps;
  operators: TOperatorsProps;
}
