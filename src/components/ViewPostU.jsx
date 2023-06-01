import { GrStar } from "@react-icons/all-files/gr/GrStar"
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../api/api";
import { toast } from "react-hot-toast";


function ViewPostU() {
    const [post, setPost] = useState({})
    const [photo, setPhoto] = useState([]);
    const [text, setText] = useState("")
    const [heading, setHeading] = useState("")
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [editor, setEditor] = useState(false)

    useEffect(() => {
        const params = {
            param1: searchParams.get('post_id'),
        };
        let token = localStorage.getItem("userId");
        const headers = { Authorization: `Bearer ${token}` };
        axios.get(`${API}user/fetchOnePost`,
            {
                params: params,
                headers: headers
            }
        ).then(res => {
            console.log(res.data);
            setPost(res.data.post)
        })
    }, [])


    function upload(e) {
        e.preventDefault()
        if (photo.length == 0 || text.length < 2000 || heading < 0 || heading > 15) {
            if (heading < 0 || heading > 15) {
                toast("Heading should be below 15 words")
            } else {

                toast.error("Please add values and your content must be above 2000 letters")
            }
        } else {

            let formData = new FormData();
            formData.append("file", photo);
            formData.append("chapters", text);
            formData.append('heading', heading)
            formData.append('id', post._id);

            let token = localStorage.getItem("userId");
            const headers = { Authorization: `Bearer ${token}` };
            axios.patch(`${API}user/update`, formData, { headers }).then(() => {
                location.reload();
            }).catch(() => {
                toast.error("Something went wrong")
            })
        }
    }
    function imageProcess(e) {
        setPhoto(e.target.files[0])
    }
    function deletePost(){
        
        let token = localStorage.getItem("userId");
        const headers = { Authorization: `Bearer ${token}` };
       
        axios.delete(`${API}user/deletePost`, {
            headers: headers,
            data: {
              id: post._id,
            }
          }).then(()=>{
            navigate('/profile');
          }).catch(()=>{
            toast.error(" OOPS can't delete ! ")
          })
    }
   


    return (
        <>
            {!editor ? <div className="container-fluid">
                <div className="row">
                    <div className="col-12 md:px-20 md:my-3  relative">
                        <div className="brightness-50 ">
                            <img src={`${API}images/${post?.image}`} className=" h-40 md:h-80 object-top inset-0 bg-black  object-none   w-full" alt="" />
                        </div>
                        <div className={`absolute w-11/12 -top-10 md:top-0 left-7   `}>
                            <div className="w-full h-72 flex flex-col justify-center  items-center">
                                <h1 className="text-white uppercase md:text-6xl font-semibold">{post?.heading}</h1>
                                <div className="text-yellow-400 flex justify-between  text-3xl md:text-7xl">
                                    <GrStar />
                                    <GrStar />
                                    <GrStar />
                                    <GrStar />
                                    <GrStar />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-12 md:px-20 font-mono">
                        <h1 className="font-semibold text-3xl flex space-x-2 mt-4 ">CHAPTER - 1</h1>
                        <div className=" flex mb-4 ">
                            <div className="w-1/12 h-1 bg-black"></div>
                            <div className="w-11/12 h-1 bg-black opacity-10"></div>
                        </div>
                        <div className="">
                            <p>{post?.chapters}</p>
                            <div className="w-12/12 my-4 h-1 bg-black opacity-10"></div>
                            <div className="flex justify-end space-x-1 text-2xl">
                                <div className=" py-5">
                                    {/* <AiOutlineArrowRight /> */}
                                </div>
                                <div className=" flex space-x-2 py-5">
                                    <h1 className="bg-black px-3 text-white rounded cursor-pointer" onClick={() => { setEditor(true) }} >Edit</h1>
                                    <h1 className="bg-black px-3 text-white rounded cursor-pointer" onClick={deletePost}>Delete</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <>


                <div className="container-fluid font-mono">
                    <div className="row">
                        <div className="col-12 relative ">
                            <div className="w-full fixed top-10 left-0 z-2">
                                <img src="images/login.jpg" className="w-full brightness-50 h-screen object-cover " alt="" />
                            </div>
                            <div className="absolute w-11/12 top-0">

                            <div className="w-full flex flex-col justify-center ">
                                <form className="my-4 md:px-4" >
                                    <div className="bg-black text-white p-1">
                                        <label htmlFor="cover"> Add Cover Photo</label>
                                        <input type="file" name="cover" className="w-full bg-white " onChange={imageProcess} accept="image/*" />
                                    </div>
                                    <div className="bg-black text-white p-1 my-3">
                                        <label htmlFor="cover"> Add Heading</label>
                                        <input type="text" name="cover" className="w-full bg-white text-black  " value={post?.heading.length > heading ? post?.heading : heading} onChange={(e) => { setHeading(e.target.value) }} />
                                    </div>
                                    <div className="bg-black text-white p-1 my-3">
                                        <label htmlFor="text"> Write Chapters</label>
                                        <textarea name="text" id="" cols="30" placeholder=" Must write atlest 2000 and atmost 2500 letters in one chapter" rows="10" value={post?.chapters.length > text ? post?.chapters : text} onChange={(e) => { setText(e.target.value) }} className="w-full h-96 text-black p-1 bg-white "></textarea>
                                    </div>
                                    <div className="flex  justify-end">
                                    </div>

                                    <div className="flex  justify-center space-x-1">
                                        <button className="bg-black w-6/12 my-2 p-2 rounded text-white  " onClick={()=>{setEditor(false)}}>Cancel</button>
                                        <button className="bg-black w-6/12 my-2 p-2 rounded text-white " onClick={upload}>Edit Blog</button>
                                    </div>

                                </form>

                            </div>

                            </div>
                        </div>
                    </div>
                </div>


            </>}
        </>
    )
}

export default ViewPostU