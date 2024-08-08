import { Button, TextField } from '@mui/material';
import { FC } from 'react';

import style from './style.module.scss';

const Header: FC = () => {
  return (
    <div className={style.header}>
      <div>
        <TextField
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
