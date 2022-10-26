import styles from './Filters.module.css';
import { useDispatch } from 'react-redux';
import { orderByName, orderByAttack, filterBySource, filterByType, setCurrentPage } from '../../../app/actions'

const Filters = ({ types }) => {
    const dispatch = useDispatch()

    const handleFilterChange = (e) => {
        let selected = e.target.value;
        if (selected === "A-Z" || selected === "Z-A") {
          dispatch(orderByName(selected));
          dispatch(setCurrentPage(1));
        }
        else if (selected === "ASC" || selected === "DESC") {
          dispatch(orderByAttack(selected));
          dispatch(setCurrentPage(1));
        }
        else if (selected === "Api" || selected === "Database"){
          dispatch(filterBySource(selected));
          dispatch(setCurrentPage(1));
        } else {
          dispatch(filterByType(selected));
          dispatch(setCurrentPage(1));
        }
    }

  return (
    <div className={styles.filtersContainer}>

        <select className={styles.selectContainer} defaultValue="Alphabetical order" onChange={handleFilterChange}>
            <option disabled>Alphabetical order</option>
            <option value="A-Z"> A - Z </option>
            <option value="Z-A"> Z - A </option>
        </select>

        <select className={styles.selectContainer} defaultValue="Attack" onChange={handleFilterChange}>
            <option disabled>Attack</option>
            <option value="ASC"> Lower Attack </option>
            <option value="DESC"> Higher Attack </option>
        </select>

        <select className={styles.selectContainer} defaultValue="Types" onChange={handleFilterChange}>
            <option disabled>Types</option>
            <option value="All">All</option>
            { types && types.map(type => (
                <option key={type.name} value={type.name}>
                    {type.name}
                </option>
            ))}
        </select>

        <select className={styles.selectContainer} defaultValue="Source" onChange={handleFilterChange}>
            <option disabled>Source</option>
            <option value="All"> All </option>
            <option value="Api"> Api </option>
            <option value="Database"> Database </option>
        </select>

    </div>
  )
}

export default Filters;