import { createContext, useContext, useState } from "react";
import axios from "axios";
import httpStatus from "http-status"
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const client = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1/users`
})

export const AuthProvider = ({children}) => {

    const authContext = useContext(AuthContext);

    const [userData, setUserData] = useState(authContext);

    const handleRegister = async(name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            })

            if(request.status === httpStatus.CREATED){
                return request.data.message;
            }
             
        } catch (error) {
            throw error;    
        }
    }

    const handleLogin = async(username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            })

            if(request.status === httpStatus.OK){
                localStorage.setItem("token",request.data.token);
                router("/home")
                return "Login Successful"
            }

        } catch (err) {
            throw err;
        }
    }

    const router = useNavigate();

    const getHistoryOfUser = async() => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            })

            return request.data;

        } catch (e) {
            throw(e);
        }
    }

    const addToUserHistory = async(meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });

            return request;

        } catch (e) {
            throw e;
        }
    }


    const data = {
        userData, setUserData, addToUserHistory, getHistoryOfUser, handleRegister, handleLogin
    }

    return(
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}