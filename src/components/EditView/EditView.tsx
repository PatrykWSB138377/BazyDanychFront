import React, { useState, useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom"
import Card from "../Card/Card"
import axios from "axios"
import { BASE_BACKEND_URL } from "../.."
import styles from './EditView.module.scss'

const EditView = () => {
    const params = useParams()
    const [data, setData] = useState<Object>({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${BASE_BACKEND_URL}/${params.table}/${params.id}`)
            setData(res.data)
        }

        fetchData()
    }, [])


    const submitHandler = () => {
      console.log(data)
      axios.patch(`${BASE_BACKEND_URL}/${params.table}/edit/${params.id}`, data)
      navigate(-1)
    }


    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({...prevData, [e.target.id]: e.target.value}))
    }

    return (
        <Card>
            <>
            <button onClick={() => navigate(-1)}>{`Wróć do tabeli "${params.table}"`}</button>
            <form className={styles.form} onSubmit={submitHandler}>
                {Object.entries(data).map(([label, value], i) => {
                    if (i === 0) {
                        return
                    }
                    return <>
                            <label> {label}</label>
                            <input id={label} onChange={inputChangeHandler} value={value}></input>
                           </>
                })}
            </form>
            <button className={styles.submitButton} onClick={submitHandler}>Zapisz</button>
            </>
        </Card>
    )
}

export default EditView