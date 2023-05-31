import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import axios from "axios";
import { API } from "../../api/api";

 function ProtectedRoutes() {
    const navigate = useNavigate()
    let  [flag, setFlag] = useState(false);
    useEffect(()=>{
        let token = localStorage.getItem("userId");
        const headers = { Authorization: `Bearer ${token}` };
        axios.get(`${API}user/isAuthenticated`, { headers }).then(() => {
            setFlag(true)
        }).catch(() => {
            setFlag(false)
            navigate("/login")
        })
    })
   
    return  flag ? <Outlet /> : null;
}

export default ProtectedRoutes