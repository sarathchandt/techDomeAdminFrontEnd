import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { API } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function LoginCompo() {
    const navigate = useNavigate()
    useEffect(() => {
        let token = localStorage.getItem("userId");
        const headers = { Authorization: `Bearer ${token}` };
        axios.get(`${API}user/isAuthenticated`, { headers }).then(() => {
            navigate('/')
        })
    }, [])

    const validationSchema = yup.object().shape({
        email: yup.string().email().required('Name is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                axios.post(`${API}user/login`, values).then(res => {
                    navigate('/')
                    localStorage.setItem("userId", res?.data?.token);
                }).catch(() => {
                    toast.error("Invalid Credentials")
                })

            } catch (error) {
                console.error(error);
            }
        },
    })
    return (
        <>
            <div className="container-fluid font-mono">
                <div className="row">

                    <div className="col-12">
                        <div className="w-full relative ">
                            <img src="images/login.jpg" className='w-full object-cover h-screen brightness-50' alt="" />
                            <div className=" absolute top-0 w-full   h-screen flex justify-center items-center">
                                <form className=" p-5 space-y-5 rounded-lg text-white" onSubmit={formik.handleSubmit}>
                                    <div className="">
                                        <div className="flex bg-slate-100 p-2 ">
                                            <p className='bg-black p-1  w-24 flex justify-center'>E-MAIL</p>
                                            <input type="text" name="email" id="" value={formik.values.email} onChange={formik.handleChange} className=" px-1 outline-none  text-black " placeholder=" E-mail" />
                                        </div>
                                    </div>
                                    {formik.touched.email && formik.errors.email && <span className='text-red-600 text-sm'>Please Enter Proper Email</span>}
                                    <div>
                                        <div className="flex bg-slate-100 p-2 ">
                                            <p className='bg-black p-1 w-24 flex justify-center'>PASSWORD</p>
                                            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} id="" className=" px-1 text-black outline-none " placeholder=" Password" />
                                        </div>
                                    </div>
                                    {formik.touched.password && formik.errors.password && <span className='text-red-600 text-sm'>Please Check the Password</span>}
                                    <div className="flex justify-center">
                                        <button type="submit" className="btn bg-black text-white hover:bg-slate-800">Log in</button>
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

export default LoginCompo;