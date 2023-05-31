import axios from "axios";
import { useEffect, useState } from "react"
import { API } from "../../api/api";
import { toast } from "react-hot-toast";

function ProfileCompo() {

    const [photo, setPhoto] = useState([]);
    const [text, setText] = useState("")
    const [chapters, setChapters] = useState([])

    function addToChapter(e) {
        e.preventDefault()
        if (text.length < 2000 || text.length > 2500) {
            toast.error(" One chapter can include atleaset 2000 and atmost 2500 letters  ")
        } else {

            setChapters([...chapters, text])
            setText('')
        }

    }

    function upload(e) {
        e.preventDefault()
        if (photo.length == 0 || chapters.length == 0) {
            toast.error("Please add values")
        } else {
            try {
                let formData = new FormData();
                formData.append("name", 'sarath');
                formData.append("age", '23');
                formData.append("imagess", 'photo');
                formData.append("chapters", 'chapters');


                setTimeout(()=>{
                    let token = localStorage.getItem("userId");
                    const headers = { Authorization: `Bearer ${token}` };
                    axios.post(`${API}user/upload`, formData, { headers })
                },3000)
            } catch (error) {
                console.log(error);
            }


        }
    }
    function imageProcess(e) {
        // e.preventDefault();
        setPhoto(e.target.files[0])
    }

    console.log(chapters, text.length, photo);

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
                                    <div className=" bg-white rounded p-1">
                                        <p className=" bg-black text-white px-5 py-1 rounded">  Add Post </p>
                                    </div>
                                    <div className=" bg-black rounded p-1">
                                        <p className=" bg-white text-black px-5 py-1 rounded">  View Post </p>
                                    </div>

                                </div>
                            </div>
                            <div className="w-full flex flex-col justify-center ">
                                <form className="my-4 md:px-4" >
                                    <div className="bg-black text-white p-1">
                                        <label htmlFor="cover"> Add Cover Photo</label>
                                        <input type="file" name="cover" className="w-full bg-white " onChange={imageProcess} accept="image/*" />
                                    </div>
                                    <div className="bg-black text-white p-1 my-3">
                                        <label htmlFor="text"> Write Chapters</label>
                                        <textarea name="text" id="" cols="30" placeholder=" Must write atlest 2000 and atmost 2500 letters in one chapter" rows="10" value={text} onChange={(e) => { setText(e.target.value) }} className="w-full h-96 text-black p-1 bg-white "></textarea>
                                    </div>
                                    <div className="flex  justify-end">
                                        <button className="bg-black p-2 rounded text-white " onClick={addToChapter}>Add Chapter</button>
                                    </div>
                                    <div className=".container-fluid my-4">
                                        <div className="row ">
                                            {chapters.map((data, i) => {
                                                return <>
                                                    <div className="col-md-2 m-3">
                                                        <div className=" flex  justify-between bg-black text-white mx-2 px-2 rounded " >
                                                            <div className="">Chapter {i + 1}</div>
                                                            <div className="">X</div>
                                                        </div>
                                                    </div>
                                                </>
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex  justify-center">
                                        <button className="bg-black w-6/12 my-2 p-2 rounded text-white " onClick={upload}>Upload Blog</button>
                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCompo