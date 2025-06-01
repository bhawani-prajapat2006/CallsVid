import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function History() {

    const {getHistoryOfUser} = useContext(AuthContext)

    const [meetings, setMeetings] = useState([])

    const routeTo = useNavigate()

    useEffect(() => {
        const fetchHistory = async() => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (e) {
                // implement snack bar
            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }
    
    return (
        <div style={{color: "white"}}>History</div>
    )
}