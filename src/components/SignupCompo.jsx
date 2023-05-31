import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import  toast  from 'react-hot-toast';
import { API } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function SignupCompo() {
    const navigate = useNavigate()
    const [otpInd, setOtpInd] = useState(false)
    

    useEffect(() => {
        let token = localStorage.getItem("userId");
        const headers = { Authorization: `Bearer ${token}` };
        axios.get(`${API}user/isAuthenticated`, { headers }).then(() => {
           
                navigate('/')
            
        })
    }, [])

    const validationSchema = yup.object().shape({
        name: yup.string().min(3).required(),
        email: yup.string().email().required('Name is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            otp: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                console.log(values);
                if(values.otp.length <= 0){
                    setOtpInd(true);
                    axios.post(`${API}user/otpMail`,values).then((res)=>{
                        console.log(res.data);
                        toast.success('Check mail for OTP ')
                    }).catch(()=>{
                        toast.error("OOPS can't sent mail")
                    })
                   
                }else{
                    console.log(values);
                    axios.post(`${API}user/signup`, values).then(res => {
                        console.log(res.data);
                        if(res.data.already){
                            toast("This email already registered")
                            setOtpInd(false)
                            setOtpInd(false)

                        }else{
                            navigate('/')
                            localStorage.setItem("userId", res?.data?.token);
                        }
                        }).catch(() => {
                                toast.error("Invalid Credentials")
                            })
                        }

            } catch (error) {
                console.error(error);
            }
        },
    })

   
    return (

        <>
            <div className="container-fluid font-mono">
                <div className="row">

                    <div className="col-12 relative">
                        <div className="w-full relative ">
                            <img src="images/login.jpg" className='w-full object-cover h-screen brightness-50' alt="" />
                            <div className=" absolute top-0 w-full   h-screen flex justify-center items-center">
                                <form className=" p-5 space-y-5 rounded-lg text-white" onSubmit={formik.handleSubmit}>
                                    <div className="">
                                        <div className="flex bg-slate-100 p-2 ">
                                            <p className='bg-black p-1  w-24 flex justify-center'>NAME</p>
                                            <input type="text" name="name" id="" value={formik.values.name} onChange={formik.handleChange} className=" px-1 outline-none  text-black " placeholder=" Name" />

                                        </div>
                                    </div>
                                    {formik.touched.name && formik.errors.name && <span className='text-red-600 text-sm'>Please Enter Name</span>}
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
                                        <button type="submit" className="btn bg-black text-white hover:bg-slate-800">Request OTP</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                        {otpInd && (  <div className="absolute w-full h-screen top-0 flex justify-center items-center backdrop-blur-lg">
                            <div>
                                <div className="flex bg-slate-100 p-2 ">
                                    <p className='bg-black p-1 w-24 flex justify-center text-white'>OTP</p>
                                    <input type="text" name="otp" value={formik.values.otp} onChange={formik.handleChange} id="" className=" px-1 text-black outline-none " placeholder=" otp" />
                                </div>
                                <div className="flex justify-center py-3">
                                        <button type="" className="btn bg-black text-white hover:bg-slate-800" onClick={formik.handleSubmit}>Sign up</button>
                                    </div>
                            </div>
                                
                                    {formik.touched.otp && formik.errors.otp && <span className='text-red-600 text-sm'>Please Check the otp</span>}
                                   
                        </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupCompo