import { BASE_FRONT_URL } from "../../../.."
import styles from './PanelOptions.module.scss'
import Cookies from "js-cookie"

const PanelOption = ({tableName, labelName}: {tableName: string, labelName: string}) => {


    const user = Cookies.get('user')

    return (
        <div>
            <h2>{labelName}</h2>
            <div className={styles.actions}>
            <a href={`${BASE_FRONT_URL}/view/${tableName}`}>{user === 'admin' ? 'Wyświetl i edytuj' : 'Wyświetl'}</a>    
            {user === 'admin' && <a href={`${BASE_FRONT_URL}/add/${tableName}`}>Dodaj</a>} 
            </div>
        </div>
    )
}

export default PanelOption