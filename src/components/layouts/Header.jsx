import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {CgProfile} from '@react-icons/all-files/cg/CgProfile'
import axios from "axios"
import { API } from "../../../api/api"
import { toast } from "react-hot-toast"
function Header() {
        const [pathname,setPathname ] = useState("")
        const [profile, setProfile] = useState({})
        const navigate = useNavigate()
    useEffect(()=>{
        setPathname(window.location.pathname)
            let token = localStorage.getItem("userId");
            const headers = { Authorization: `Bearer ${token}` };
            axios.get(`${API}user/about`,{headers}).then((res)=>{
                setProfile(res?.data?.user)
                
            
        })
    },[])
    function checkAndGo(){
        
        let token = localStorage.getItem("userId");
        if(!token){
            toast("Please Login")
        }else{
            const headers = { Authorization: `Bearer ${token}` };
            axios.get(`${API}user/isAuthenticated`, { headers }).then(() => {
                    navigate('/profile');
            })
        }
    }
 
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="flex justify-end px-5">
                <div className=" flex gap-8 mx-4 font-mono my-2 cursor-pointer ">
                    <a className={pathname == "/" ?`bg-black text-white md:px-2 rounded`:"md:px-2"}  onClick={()=>{navigate('/')}}>Blog</a>
                    <a className={pathname == "/signup" ? `bg-black text-white md:px-2 rounded`:"md:px-2"} onClick={()=>{navigate('/signup')}}> Sign up</a>
                    <a className={pathname == "/login" ? `bg-black text-white md:px-2 rounded`:"md:px-2"} onClick={()=>{navigate('/login')}}>Login</a>
                    <a className={pathname == "/profile" ?`bg-black text-white md:px-2 py-1 rounded flex`:"md:px-2 pt-1 flex"}  onClick={()=>{checkAndGo()}}><CgProfile className="text-xl"></CgProfile> <p className="">{profile?.name}</p></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header