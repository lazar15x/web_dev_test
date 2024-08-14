import { FC } from 'react';
import style from './style.module.scss';
import { useAppSelector } from '../../store/store';
import star from '../../../public/star.svg';

interface IDescriptionProps {
  /**Choosed repository id */
  selected: null | number;
}

const Description: FC<IDescriptionProps> = ({ selected }) => {
  const repositories = useAppSelector((store) => store.search.repo);
  const currentRepo = repositories.find((repo) => repo.id === selected);

  if (!currentRepo) {
    return (
      <div className={style.description}>
        <div className={style.choose_repo}>
          <div>Выберите репозиторий</div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.description}>
      <div className={style.description_full}>
        <div className={style.top}>
          <div className={style.name_repo}>{currentRepo.name}</div>
          <div className={style.star_repo}>
            <img src={star} alt="Count of star" />
            {currentRepo.stargazers_count}
          </div>
        </div>
        <div className={style.description_repo}>
          {currentRepo.description}
        </div>
        <div className={style.topics_repo}>
          {currentRepo.topics.map((tag: string) => (
            <div key={tag} className={style.topics_tag}>{tag}</div>
          ))}
        </div>
        <div className={style.license}>
          {currentRepo.license?.name || 'No license'}
        </div>
      </div>
    </div>
  );
  
  // return (
  //   <div className={style.description}>
  //     {selected === null ? (
  //       <div className={style.choose_repo}>
  //         <div>Выберите репозиторий</div>
  //       </div>
  //     ) : (
  //       <div className={style.description_full}>
  //         <div className={style.top}>
  //           <div className={style.name_repo}>{currentRepo.name}</div>
  //           <div className={style.star_repo}>
  //             <img src={star} alt="Count of star" />
  //             {currentRepo.stargazers_count}
  //           </div>
  //         </div>
  //         <div className={style.description_repo}>
  //           {currentRepo.description}
  //         </div>
  //         <div className={style.topics_repo}>
  //           {currentRepo.topics.map((tag: string[]) => (
  //             <div className={style.topics_tag}>{tag}</div>
  //           ))}
  //         </div>
  //         <div className={style.license}>{currentRepo.license.name}</div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default Description;
