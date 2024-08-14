/**Type of data in table */
export interface Data {
  id: number;
  language: string;
  forks_count: number;
  stargazers_count: number;
  name: string;
  updated_at: number | string;
}

/**Order of sort */
export type Order = 'asc' | 'desc';

/**Type of head cell */
export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

/**Type of enhanced table props */
export interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
