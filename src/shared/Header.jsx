import { NavLink} from 'react-router';
import todolistlogo from  '../assets/to-do-list.png';
import styles from './Header.module.css';


export default function Header({title}){
    const comparisonResult = title.localeCompare("Todo List");

    return(
        <>                        
            <nav className={styles.nav}>
            <NavLink to={"/"} className={({ isActive }) => isActive ? styles.active: styles.inactive}>Home</NavLink>
           
            <NavLink to={"/about"} className={({ isActive }) => isActive ? styles.active : styles.inactive}>About</NavLink>
         </nav>
         <div id="title" className={styles.title} >
                       
            {comparisonResult === 0  && <img src={todolistlogo} alt="Todo List Logo" width='35' />  }
             <h1>{title}</h1>
         </div>
        </>
    )
}