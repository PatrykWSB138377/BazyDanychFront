import React, { useState, useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom"
import Card from "../Card/Card"
import axios from "axios"
import { BASE_BACKEND_URL, BASE_FRONT_URL } from "../.."
import styles from './AddView.module.scss'

const AddView = () => {
    const params = useParams()
    const [data, setData] = useState<string[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${BASE_BACKEND_URL}/${params.table}`)
            const keys = Object.keys(res.data[0])
            keys.shift() // remove primary key

            const newDataObject: any = {}

            keys.forEach((key) => {
                newDataObject[key] = null
            })

            setData(newDataObject)
        }

        fetchData()
    }, [])


    const submitHandler = () => {
      axios.post(`${BASE_BACKEND_URL}/${params.table}`, data)
      navigate(`../../`)
    }


    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({...prevData, [e.target.id]: e.target.value}))
    }

    return (
        <Card>
            <>
            <button onClick={() => navigate(-1)}>Wróć do panelu admina</button>
            <form className={styles.form} onSubmit={submitHandler}>
               {Object.entries(data).map(([label, value]) => {
                    return <>
                            <label> {label}</label>
                            <input id={label} onChange={inputChangeHandler} value={value}></input>
                           </>
                })}
            </form>
            <button className={styles.submitButton} onClick={submitHandler}>Wstaw</button>
            </>
        </Card>
    )
}

export default AddView