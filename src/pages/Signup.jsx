import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { isEmail, isValidPassword } from "../helper/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";
import toast from 'react-hot-toast';
import { createAccount } from '../redux/slices/authSlice';


function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // for user input
    const [signupDetails, setSignupDetails] = useState({
        email: '',
        fullName: '',
        password: '',
        avatar: '',
    });

    const [previewImage, setPreviewImage] = useState("");

    // function to set the signup data
    function handleUserInput(e) {
        const {name, value} = e.target;
        setSignupDetails({
            ...signupDetails,
            [name]: value,
        });
    };

     // function to handle the image upload
    function handleImage(e) {
        e.preventDefault();
         // getting the image
        const uploadedImage = e.target.files[0];

        // if image exists then getting the url link of it
        if(!uploadedImage) return;
        setSignupDetails({
            ...signupDetails,
            avatar: uploadedImage,
        });
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load", function () {
            setPreviewImage(this.result);
        });
    }

    // function to create account
    async function onFormSubmit(e) {
        e.preventDefault();
        console.log(signupDetails);

         // checking the empty fields
        if(!signupDetails.email || !signupDetails.password || !signupDetails.fullName ) {
            toast.error("Please fill all the details");
            return;
        }

        // checking the name field length
        if(signupDetails.fullName.length < 5) {
            toast.error("Name should be atleast of 5 characters");
            return;
        }

         // email validation 
        if(!isEmail(signupDetails.email)) {
            toast.error("Invalid email provided");
            return;
        }

         // password validation 
        if(!isValidPassword(signupDetails.password)) {
            toast.error("Invalid password provided, password should 6-16 character long with atleast a number and a special character");
            return;
        }

        // creating the form data from the existing data
        const formData = new FormData();
        formData.append("fullName", signupDetails.fullName);
        formData.append("email", signupDetails.email);
        formData.append("password", signupDetails.password);
        formData.append("avatar", signupDetails.avatar);

         // calling create account action
        const response = await dispatch(createAccount(formData));
        console.log(response);

        // redirect to login page if true
        if(response?.payload?.data) {
            navigate("/");
        }

        // clearing the signup inputs
        setSignupDetails({
            email: '',
            fullName: '',
            password: '',
            avatar: '',
        });
        setPreviewImage("");
    };

    return (
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form onSubmit={onFormSubmit} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-black w-35">
                    <h1 className="text-2xl text-center font-bold">Registration Page</h1>

                   {/* input for image file */} 
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        { previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage}
                            alt="preview image"/>
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

                    {/* input for name */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold">Name</label>
                        <input 
                            onChange={handleUserInput}
                            value={signupDetails.fullName}
                            required
                            type="text" 
                            name="fullName"
                            className="bg-transparent px-2 py-1 border"
                            placeholder="enter your username..."
                            id="fullName" />
                    </div>

                     {/* input for email */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input 
                            onChange={handleUserInput}
                            value={signupDetails.email}
                            required
                            type="text" 
                            name="email"
                            className="bg-transparent px-2 py-1 border"
                            placeholder="enter your Email..."
                            id="email" />
                    </div>

                     {/* input for password */} 
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input 
                            required
                            onChange={handleUserInput}
                            value={signupDetails.password}
                            type="password" 
                            name="password"
                            className="bg-transparent px-2 py-1 border"
                            placeholder="enter your Password..."
                            id="password" />
                    </div>

                     {/* registration button */}
                    <button className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer 
                    rounded-sm text-lg
                    py-2 font-semibold text-lg"
                    type="submit">
                        Create account
                    </button>

                    <p className="text-center">
                            Already have an account ? {""} <Link to={"/login"} className="cusror-pointer text-accent">Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
};

export default Signup;