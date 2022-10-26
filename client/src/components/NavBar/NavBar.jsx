import { Outlet, Link } from "react-router-dom";
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <>
    <div className={styles.navBarContainer}>
      <Link to="/pokemons">
        <p className={styles.navBarTitle}>POKEMON</p>
      </Link>
    </div>
      <Outlet/>
    </>
  )
}

export default NavBar;