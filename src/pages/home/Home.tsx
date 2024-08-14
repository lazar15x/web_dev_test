import { FC, useState } from 'react';
import style from './style.module.scss';
import Table from '../../components/table/Table';
import Description from '../../components/description/Description';
import { useAppSelector } from '../../store/store';

const Home: FC = () => {
  const [selected, setSelected] = useState<null | number>(null);
  const repositoriesLength = useAppSelector(
    (store) => store.search.repo
  ).length;
  
  return (
    <div className={style.home}>
      {repositoriesLength == 0 ? (
        <div className={style.welcome}>
          <h1 className={style.welcome_title}>Добро пожаловать</h1>
        </div>
      ) : (
        <div className={style.content}>
          <Table setSelected={setSelected} />
          <Description selected={selected} />
        </div>
      )}
    </div>
  );
};

export default Home;
