import { useSelector } from 'react-redux';
import styles from './Pagination.module.css';

const Pagination = ({changePage, numberOfPages}) => {
  let pagesToRender = [];
  const currentPage = useSelector((state) => state.currentPage)

  for (let i=1; i <= numberOfPages; i++) {
    pagesToRender.push(i);
  }

  return (
    <div className={styles.paginationContainer} >
      <ul>
        { pagesToRender &&
        pagesToRender.map(page => (
          <li key={page} className={styles.paginationItem}>
            <button className={styles.paginationButton} disabled={page === currentPage} onClick={() => changePage(page)}>{page}</button>
          </li>
        ))
        }
      </ul>
    </div>
  )
}

export default Pagination;