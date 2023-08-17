import type { IDatastoreProps } from "./data/contracts";

declare global {
  interface Window {
    datastore: IDatastoreProps;
  }
}
