import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import { isEmail, isValidPassword } from "../helper/regexMatcher";
import { useDispatch } from "react-redux";
import { createAccount } from "../redux/slices/authSlice";

function Signup() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signupDetails, setSignupDetails] = useState({
        email: '',
        fullName: '',
        password: '',
        avatar: ''
    });

    const [previewImage, setPreviewImage] = useState('');

    function handleUserInput(e) {
        const {name, value} = e.target;
        setSignupDetails({
            ...signupDetails,
            [name]: value
        })
    }

    function handleImage(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(!uploadedImage) return;
        setSignupDetails({
            ...signupDetails,
            avatar: uploadedImage
        });
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load", function () {
            setPreviewImage(this.result);
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!signupDetails.email || !signupDetails.password || !signupDetails.fullName) {
           toast.error('Please fill all details');
           return; 
        }
        if (signupDetails.fullName.length < 5) {
            toast.error('name should be atleast of 5 characters');
            return;
        }
        if (!isEmail(signupDetails.email)) {
            toast.error('Invalid email provided');
            return;
        }
        if (isValidPassword(signupDetails.password)) {
            toast.error('Invalid password provided, password should be 6-18 charcater long atleast a number and a special character');
        }

        const formData = new FormData();
        formData.append("fullName", signupDetails.fullName);
        formData.append("email", signupDetails.email);
        formData.append("password", signupDetails.password);
        formData.append("avatar", signupDetails.avatar);

        const response = await dispatch(createAccount(formData));
        console.log(response);
        if (response?.payload?.data) {
            navigate('/');
        }
        setSignupDetails({
        email: '',
        fullName: '',
        password: '',
        avatar: ''
        });
        setPreviewImage('');
    }

    return (
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form onSubmit={onFormSubmit} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-black w-35" >
                   <h1 className="text-2xl text-center font-bold">Registration Page</h1> 
                   <label htmlFor="image_uploads" className="cursor-pointer">
                   { previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage}/>
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                   </label>
                   <input 
                   onChange={handleImage}
                   type="file"
                          className="hidden"
                          name="image_uploads"
                          id="image_uploads"
                          accept=".jpg, .jpeg, .png, .svg"
                   />
                   <div className="flex flex-col gap-1">
                        <label htmlFor="fullname" className="font-semibold"> Name</label>
                        <input
                        onChange={handleUserInput}
                        value={signupDetails.fullName} 
                        required
                        type="text"
                        name="fullName"
                        className="bg-transparent px-2 py-1 border"
                        placeholder="Enter your user name"
                        id="fullName" />
                   </div>
                   <div className="flex flex-col gap-1">
                        <label htmlFor="fullname" className="font-semibold"> Email</label>
                        <input 
                        onChange={handleUserInput}
                        value={signupDetails.email} 
                        required
                        type="text"
                        name="email"
                        className="bg-transparent px-2 py-1 border"
                        placeholder="Enter your email"
                        id="email" />
                   </div>
                   <div className="flex flex-col gap-1">
                        <label htmlFor="fullname" className="font-semibold"> Password</label>
                        <input 
                        onChange={handleUserInput}
                        value={signupDetails.password} 
                        required
                        type="text"
                        name="password"
                        className="bg-transparent px-2 py-1 border"
                        placeholder="Enter your password"
                        id="password" />
                   </div>
                   <button className="mt-2 bg-yellow-300 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg">
                    Create account
                   </button>
                   <p className="text-center">
                                Already have an account ? <Link to='/login' className="cusror-pointer text-accent">
                                    Login
                                </Link>
                   </p>
                </form>

            </div>
        </HomeLayout>
    );
}

export default Signup;