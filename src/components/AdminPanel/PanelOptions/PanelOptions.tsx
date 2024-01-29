import { useEffect, useState } from 'react'
import PanelOption from "./PanelOption/PanelOption"
import styles from './PanelOptions.module.scss'
import axios from "axios"

const PanelOptions = () => {


    const options = {
        klienci: "Klienci",
        'pozycje-zamowien': "Pozycje zamówień",
        zamowienia: "Zamówienia",
        produkty: "Produkty",
    }
    
    return (
        <div className={styles.options}>
            {Object.entries(options).map(([tableName, prettyName]) => {
                   return <PanelOption tableName={tableName} labelName={prettyName}/>
            })}
        </div>

    )
}

export default PanelOptions


