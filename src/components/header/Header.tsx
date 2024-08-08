import { Button, TextField } from '@mui/material';
import { FC, useState } from 'react';

import style from './style.module.scss';
import { fetchSearch } from '../../store/slices/search/searchThunk';
import { useAppDispatch } from '../../store/store';

const Header: FC = () => {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  const currentParams = {
    query: search,
    page: 1,
  };

  const handleFetchSearch = () => {
    dispatch(fetchSearch(currentParams));
  };

  return (
    <div className={style.header}>
      <div>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            style: { height: '42px' },
          }}
          inputProps={{
            style: { height: '42px' },
          }}
          sx={{
            backgroundColor: '#F2F2F2',
            borderRadius: '4px',
            marginRight: '8px',
            width: '912px',
            '& input::placeholder': {
              fontStyle: 'italic',
            },
          }}
          placeholder="Введите поисковый запрос"
          id="outlined-basic"
          variant="outlined"
        />
        <Button
          onClick={() => handleFetchSearch()}
          sx={{ padding: '8px 22px', fontSize: '15px', height: '42px' }}
          variant="contained"
        >
          Искать
        </Button>
      </div>
    </div>
  );
};

export default Header;
