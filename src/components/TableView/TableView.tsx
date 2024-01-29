import {useEffect, useState} from "react"
import axios from "axios"
import { BASE_BACKEND_URL } from "../.."
import Card from "../Card/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import  "./TableView.scss"
import Cookies from "js-cookie";

const TableView = () => {

    const user = Cookies.get('user')
    const params = useParams()
    const [tableData, setTableData] = useState<Object[]>();
    const [columnNames, setColumnNames] = useState<string[]>([])
    const navigate = useNavigate()


    const fetchTable = async () => {
        const res = await axios.get(`${BASE_BACKEND_URL}/${params.table}`)

        setTableData(res.data)
    }
    useEffect(() => {
        fetchTable()
    }, [])


    useEffect(() => {
        let rowWithMostData: string[] = []
        tableData?.forEach((dataRow) => {
            const keys = Object.keys(dataRow)
            if (rowWithMostData.length < keys.length) {
                rowWithMostData = keys
            }
        })
        
        setColumnNames(rowWithMostData)

    }, [tableData])


    const deleteRecord = async (id: string) => {
        const hasConfirmed = window.confirm(`Czy na pewno chcesz usunąć rekord o id ${id}?`)

        if (hasConfirmed) {
            await axios.delete(`${BASE_BACKEND_URL}/${params.table}/delete/${id}`)
            await fetchTable()
        }

    }

    return (
        <Card>
        <>
        <button onClick={() => navigate(-1)}>Wróć do panelu admina</button>
        {tableData?.length ? <table>
            <thead>
                <tr>
                    {columnNames.map((name, i) => (     
                        <th>{name}</th>
                    ))}
                    {user === 'admin' && <th>akcje</th>}
                </tr>
           </thead>
           <tbody>
                {tableData?.map((dataRow) => {

                    return <tr>
                        {Object.values(dataRow).map((value) => {
                            return <td>{value}</td>
                        })}
                        {user === 'admin' &&
                        <>
                            <td className="actions">
                            <Link className="editButton" to={`edit/${Object.values(dataRow)[0]}`}>Edytuj</Link>
                            <button onClick={() => deleteRecord(Object.values(dataRow)[0])} className="deleteButton">Usuń</button>
                            </td>
                        </>
                        }
                    </tr>
                })}
           </tbody>
        </table> : <p>Brak danych</p>} 
        </>
        </Card>
    )
}

export default TableView;