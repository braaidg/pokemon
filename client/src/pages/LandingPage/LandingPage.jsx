import styles from './LandingPage.module.css'
import {Link} from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className={styles.background}>
      <h2 className={styles.title}>Gotta catch 'em all!</h2>
      <Link to="/pokemons"><button>Let's go!</button></Link>
    </div>
  )
}

export default LandingPage;