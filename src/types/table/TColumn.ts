export interface TColumn<T> {
  header: string;
  accessor: string;
  render?: (data: T) => JSX.Element;
}
