import React, {useEffect, useState} from "react"
import Cookies from 'js-cookie'
import Card from "../Card/Card"
import axios from "axios"
import { BASE_BACKEND_URL } from "../.."

const CookieChecker: React.FC<{children?: JSX.Element}> = ({children}) => {

    const [user, setUser] = useState<string | undefined>(Cookies.get('user'));

    const setNewUser = () => {
        const newUser = Cookies.get('user')
        setUser(newUser)
    }

    return (
        <>
            {user !== 'admin' && user !== 'guest' ? <LogInForm setNewUser={setNewUser}/> : children}
        </>
    )
}

export default CookieChecker


const LogInForm = ({setNewUser}: {setNewUser: any}) => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const continueAsGuest = () => {
        Cookies.set('user', 'guest')
        setNewUser()
    }

    const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
        const res = await axios.post(`${BASE_BACKEND_URL}/log-in`, {login, password})

         if (res.status === 200) {
            Cookies.set('user', 'admin')
            setNewUser()
        }
        } catch (e) {
            console.log('LOGOWANIE NIEUDANE', e)
        }
    }

    return (
        <Card>
            <>
            <h1>Zaloguj się</h1>
            <p>Zalogowanie się pozwoli na korzystanie z przywilejów admina</p>
        <form onSubmit={logIn}>
            <label>Login</label>
            <input value={login} onChange={(e) => setLogin(e.target.value)} id="login"></input>
            <br/>
            <br/>
            <label>Hasło</label>
            <input value={password} onChange={(e) => (setPassword(e.target.value))} id="password"></input>
            <br/>
            <br/>
            <button>Zaloguj</button>
        </form>
        <button onClick={continueAsGuest}>Kontynuuj jako gość</button>
        </>
        </Card>
    )
}
