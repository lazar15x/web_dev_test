import { HeadCell } from './types';

export const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Название',
  },
  {
    id: 'language',
    numeric: false,
    disablePadding: false,
    label: 'Язык',
  },
  {
    id: 'forks_count',
    numeric: false,
    disablePadding: false,
    label: 'Число форков',
  },
  {
    id: 'stargazers_count',
    numeric: false,
    disablePadding: false,
    label: 'Число звезд',
  },
  {
    id: 'updated_at',
    numeric: false,
    disablePadding: false,
    label: 'Дата обновления',
  },
];
