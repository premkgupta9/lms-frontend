import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import homePageMainImage from '../assets/Images/homePageMainImage.png';

function Home( ) {
    return (
        <HomeLayout>
        <div className="p-10 text-black flex item-center justify-center gap-10 mx-16 h-[90vh] ">
            {/* for platform details */}
            <div className="w-1/2 space-y-6">
                <h1 className="text-5xl font-semibold">Find out best <span className="text-yellow-500 font-bold">Online courses</span>
                </h1>
                <p className="text-xl text-gray-600">
                    We have large library of courses taught by highly skilled and qualified faculaties at very affordable cost.
                </p>

                {/* for buttons */}
                <div className="space-x-6">
                    <Link to={'/courses'}>
                        <button className="bg-yellow-500 px-5 py-3 rounded-md font -semibold text-lg curser-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                            Explore courses
                        </button>
                    </Link>

                    <Link to={'/contact'}>
                        <button className=" border border-yellow-400 px-5 py-3 rounded-md font -semibold text-lg curser-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                            Contact Us
                        </button>
                    </Link>
                </div>
            </div>

            {/* right section for image */}
            <div className="w-1/2 flex item-center justify-center">
                <img src={homePageMainImage} alt="home-page" />
            </div>
        </div>
        </HomeLayout>
    );
};

export default Home;