import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { API } from "../../api/api";
import { toast } from "react-hot-toast";
import { GrStar } from "@react-icons/all-files/gr/GrStar"
import { AiOutlineArrowRight } from "@react-icons/all-files/ai/AiOutlineArrowRight"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { createSearchParams } from "react-router-dom";



function UserP0stsView() {
    const [searchParams] = useSearchParams();
    const [logedIn, setLoggedIn] = useState(false)
    const [currentPosts, setCurrentPost] = useState({})
    const [coroselPost, setCoroselPost] = useState([])
    const navigate = useNavigate()
    useEffect(() => {

        axios.get(`${API}user/fetch10post`).then((res) => {
            console.log(res.data.posts);
            setCoroselPost(res.data.posts)
        })

        let token = localStorage.getItem("userId");
        const headers = { Authorization: `Bearer ${token}` };
        axios.get(`${API}user/isAuthenticated`, { headers }).then(() => {
            setLoggedIn(true)
        }).catch(() => {
            setLoggedIn(false)
        })

        const params = {
            param1: searchParams.get('id'),
        };

        axios.get(`${API}user/fetchCurr`, {
            params: params,
            headers: headers
        }).then(res => {
            setCurrentPost(res?.data?.post)
        })
    }, [ searchParams.get('id')])


    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    function goToBlog(id) {
        scrollToTop();
        if (!logedIn) {
            toast("Please login for more Blogs")
        } else {
            navigate({
                pathname: "/userViewPost",
                search: createSearchParams({
                    id: id
                }).toString()
            })
        }
    }

    function nextPage() {
        !logedIn && toast('Please Login For More Blogs', {
            style: {
                border: '1px solid #48e052',
                padding: '16px',
                color: '#000000',
            },
            iconTheme: {
                primary: '#48e052',
                secondary: '#FFFAEE',
            },
        });
    }
    return (

        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 md:px-20 md:my-3 relative">
                        <div className="brightness-50 ">
                            <img src={`${API}images/${currentPosts?.image}`} className=" h-40 md:h-80 object-top inset-0 bg-black  object-none   w-full" alt="" />
                        </div>
                        <div className="absolute w-11/12 -top-10 md:top-0 left-7 ">
                            <div className="w-full h-72 flex flex-col justify-center  items-center">
                            <h1 className="text-white md:text-6xl font-semibold">{currentPosts?.heading}</h1>
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
                            <p>{currentPosts?.chapters}</p>
                            <div className="w-12/12 my-4 h-1 bg-black opacity-10"></div>
                            <div className="flex justify-end space-x-1 text-2xl cursor-pointer" onClick={nextPage}>
                                <div className=" py-5">
                                    <AiOutlineArrowRight />
                                </div>
                                <div className=" py-5">
                                    <h1 >CAPTER - 2</h1>
                                </div>
                            </div>
                        </div>

                        {/* ........................................................ */}
                        <h1 className="font-semibold text-xl flex space-x-2 mt-4 ">Short Reads</h1>
                        <div className=" flex mb-4 ">
                            <div className="w-1/12 h-1 bg-black"></div>
                            <div className="w-11/12 h-1 bg-black opacity-10"></div>
                        </div>
                        <Carousel responsive={responsive} className="py-3">
                            {coroselPost.map((data, i) => {
                                return <>
                                    <div className="flex cursor-pointer" key={i} onClick={() => { goToBlog(data._id) }} >
                                        <img src={`${API}images/${data?.image}`} className="w-56 h-32  object-center" alt="" />
                                        <div className="">
                                            <h1 className="font-bold p-2 uppercase">{data?.heading}</h1>
                                            <div className="p-2">
                                                <p className="text-xs"> {data?.chapters.slice(0, 50)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            })}



                        </Carousel>

                        {/* ........................................................ */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserP0stsView