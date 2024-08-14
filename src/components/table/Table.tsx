import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useAppSelector } from '../../store/store';
import React, { FC } from 'react';
import { headCells } from './const';
import { EnhancedTableProps, Data, Order } from './types';
import style from './style.module.scss';
import { stableSort, getComparator } from './utils';

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ minWidth: 200 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              classes={{ icon: style.leftIcon }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface IEnhancedTableProps {
  setSelected: (value: null | number) => void;
}

const EnhancedTable: FC<IEnhancedTableProps> = ({ setSelected }) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('language');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const repositories = useAppSelector((store) => store.search.repo);

  /**Select row */
  const handleClickRow = (value: string | number) => {
    const newValue: number | null =
      typeof value === 'number' ? value : Number(value) || null;

    setSelected(newValue);
  };

  /**Sorted values */
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  /**Changed page */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**Change count row per page */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - repositories.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(repositories, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, repositories]
  );

  return (
    <Box
      sx={{
        width: 'calc(100% - 480px)',
        paddingLeft: '32px',
        paddingRight: '16px',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 112px)',
      }}
    >
      <h1 className={style.result_title}>Результаты поиска</h1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          flexGrow: 1
        }}
      >
        <TableContainer
          sx={{
            overflowY: 'auto',
            minHeight: 'auto',
          }}
        >
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={repositories.length}
            />
            <TableBody>
              {visibleRows.map((repo, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    onClick={() => handleClickRow(repo.id)}
                    hover
                    tabIndex={-1}
                    key={repo.id}
                    sx={{
                      cursor: 'pointer',
                      ' & td': { paddingLeft: '42px' },
                    }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {repo.name}
                    </TableCell>
                    <TableCell align="left">{repo.language}</TableCell>
                    <TableCell align="left">{repo.forks_count}</TableCell>
                    <TableCell align="left">{repo.stargazers_count}</TableCell>
                    <TableCell align="left">{repo.updated_at}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        sx={{
          width: '100%',
          flexShrink: 0,
        }}
      >
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={repositories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default EnhancedTable;
