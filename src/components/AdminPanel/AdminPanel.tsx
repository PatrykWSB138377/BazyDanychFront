
import React from "react"
import PanelOptions from "./PanelOptions/PanelOptions";
import Card from "../Card/Card";
import Cookies from "js-cookie";

const AdminPanel = () => {

    const user = Cookies.get('user')

    const logOut = () => {
        Cookies.set('user', '')
        window.location.reload()
    }

    return (
        <Card>
            <>
                <button onClick={logOut}>Wyloguj</button>
                <h1>Panel {user === 'admin' ? 'Admina' : 'Gościa'}</h1>
                <PanelOptions/>
            </>
        </Card>
    )
        
    
}

export default AdminPanel;