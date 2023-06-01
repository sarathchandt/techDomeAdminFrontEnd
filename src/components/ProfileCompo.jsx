import axios from "axios";
import { useEffect, useState } from "react"
import { API } from "../../api/api";
import { toast } from "react-hot-toast";
import { createSearchParams, useNavigate } from "react-router-dom";


function ProfileCompo() {

    const [photo, setPhoto] = useState([]);
    const [text, setText] = useState("")
    const [heading, setHeading] = useState('')
    const [addPost, setAddpost] = useState(true)
    const [allPosts, setAllPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem("userId");
        const headers = { Authorization: `Bearer ${token}` };
        axios.get(`${API}user/fetchPost`, { headers }).then(post => {
            setAllPosts(post.data.posts)
        })
    })


    function gotoPost(id) {
        navigate({
            pathname: "/viewPost",
            search: createSearchParams({
                post_id: id
            }).toString()
        })
    }

    function upload(e) {
        e.preventDefault()
        
        if (photo.length == 0 || text.length < 2000 || heading < 0 || heading > 15) {
            if (heading < 0 || heading > 15) {
                toast("Heading should be below 15 words")
            } else {
                
                toast.error("Please add values and your content must be above 2000 letters")
            }
        } else {
            const notification = toast.loading("Please wait a while...")

            let formData = new FormData();
            formData.append("file", photo);
            formData.append("chapters", text);
            formData.append('heading', heading)

            let token = localStorage.getItem("userId");
            const headers = { Authorization: `Bearer ${token}` };
            axios.post(`${API}user/upload`, formData, { headers }).then(() => {
                setPhoto([]);
                setText("");
                setHeading("")
                let token = localStorage.getItem("userId");
                const headers = { Authorization: `Bearer ${token}` };
                axios.get(`${API}user/fetchPost`, { headers }).then(post => {
                    setAllPosts(post.data.posts)
                    toast.success("Posted",
                    {id:notification})
                    setAddpost(false);
                })
               
            }).catch(() => {
                toast.error("Something went wrong")
            })
        }
    }
    function imageProcess(e) {
        setPhoto(e.target.files[0])
    }


    return (
        <>
            <div className="container-fluid font-mono">
                <div className="row">
                    <div className="col-12 relative ">
                        <div className="w-full fixed top-10 left-0 z-2">
                            <img src="images/login.jpg" className="w-full brightness-50 h-screen object-cover " alt="" />
                        </div>
                        <div className="absolute w-11/12 top-0">

                            <div className="w-full flex justify-center md:mt-5">
                                <div className="md:w-6/12 flex justify-between">
                                    <div className={addPost ? " bg-white rounded p-1" : "bg-black rounded p-1"}>
                                        <p className={addPost ? " bg-black text-white px-5 py-1 rounded cursor-pointer" : "bg-white text-black px-5 py-1 rounded cursor-pointer"} onClick={() => { setAddpost(true) }}>  Add Post </p>
                                    </div>
                                    <div className={addPost ? " bg-black rounded p-1" : 'bg-white rounded p-1'}>
                                        <p className={addPost ? " bg-white text-black px-5 py-1 rounded cursor-pointer" : "bg-black text-white px-5 py-1 rounded cursor-pointer"} onClick={() => { setAddpost(false) }}>  View Post </p>
                                    </div>

                                </div>
                            </div>
                            {addPost ? <div className="w-full flex flex-col justify-center ">
                                <form className="my-4 md:px-4" >
                                    <div className="bg-black text-white p-1">
                                        <label htmlFor="cover"> Add Cover Photo</label>
                                        <input type="file" name="cover" className="w-full bg-white " onChange={imageProcess} accept="image/*" />
                                    </div>
                                    <div className="bg-black text-white p-1 my-3">
                                        <label htmlFor="cover"> Add Heading</label>
                                        <input type="text" name="cover" className="w-full bg-white text-black  " value={heading} onChange={(e) => { setHeading(e.target.value) }} />
                                    </div>
                                    <div className="bg-black text-white p-1 my-3">
                                        <label htmlFor="text"> Write Chapters</label>
                                        <textarea name="text" id="" cols="30" placeholder=" Must write atlest 2000 and atmost 2500 letters in one chapter" rows="10" value={text} onChange={(e) => { setText(e.target.value) }} className="w-full h-96 text-black p-1 bg-white "></textarea>
                                    </div>
                                    <div className="flex  justify-end">
                                    </div>

                                    <div className="flex  justify-center">
                                        <button className="bg-black w-6/12 my-2 p-2 rounded text-white " onClick={upload}>Upload Blog</button>
                                    </div>

                                </form>

                            </div> : <>
                                <div className="w-full my-5 ">

                                    {
                                        allPosts.map(data => {
                                            return <>
                                                <div className="w-full  md:px-20 py-2 relative ">
                                                    <img src={`${API}images/${data.image}`} className="object-cover w-full h-36 rounded-lg border-2" alt="" />
                                                    <div className="absolute top-0 left-10 w-full flex flex-col justify-center items-center h-36 ">
                                                        <p className="text-white text-2xl font-serif uppercase stroke-black ">{data.heading}</p>
                                                        <p className="bg-black px-4 rounded  text-white cursor-pointer" onClick={() => { gotoPost(data._id) }}>View</p>
                                                    </div>
                                                </div>

                                            </>
                                        })
                                    }
                                </div>
                            </>}

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCompo