import Footer from "../components/Footer";
import { FiMenu } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";

function HomeLayout({ children }) {

    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking user logged in or not
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);  // state manage by redux then useselector

     // for dispaying the options, according to user role
    const role = useSelector((state) => state?.auth?.role);

    // function for changing the drawer width on menu button click
    function changeWidth() {
       const drawerSide = document.getElementsByClassName('drawer-side') 
       drawerSide[0].style.width = 'auto';
    }

    // function to hide the drawer on close button click
    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

         // collapsing the drawer-side width to zero
        const drawerSide = document.getElementsByClassName('drawer-side') 
       drawerSide[0].style.width = '0';
    }

     // function to handle logout
    async function onLogout(e) {
        e.preventDefault();

      // calling logout action
       const response = await dispatch(logout());

     // redirect to home page if true
      if (response?.payload?.success)  navigate('/');
    };

    return (
       <div className="min-h-[90vh]">
        {/* adding the daisy ui drawer */}
            <div className="drawer absolute left-0 z-50 w-fit">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />      
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative"> 
                       <FiMenu onClick={changeWidth} size={"32px"} className="font-bold text-black m-4" /> 
                    </label>
                </div>

                <div className="drawer-side w-0">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-48 h-[100%] sm:w-48 bg-base-100 text-base-content relative" >
                 {/* close button for drawer */}   
                  <li className="w-fit absolute right-2 z-50 ">
                        <button onClick={hideDrawer}>
                          <AiFillCloseCircle size={24} />
                        </button>
                    </li>  

                  <li>
                    <Link to='/'> Home </Link>
                    </li> 

              {/* displaying dashboard, if user is logged in */}
                    {isLoggedIn && role === "ADMIN" && (
                        <li>
                            <Link to={'/admin/dashboard'}>Admin Dashboard</Link>
                        </li>
                    )} 

                <li>
                    <Link to='/about'> About us </Link>
                </li> 

                <li>
                    <Link to='/contact'> Contact us </Link>
                </li> 

                <li>
                    <Link to='/courses'> All Courses </Link>
                </li>  

                {/* creating the bottom part of drawer */}
            {/* if user is not logged in */}
                    {!isLoggedIn && (
                        <li className="absolute bottom-4 w-[90%]">
                            <div className="w-full flex items-center justify-center">
                                <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                    <Link to={'/signin'}>Login</Link>
                                </button>

                                <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                    <Link to={'/signup'}>Signup</Link>
                                </button>
                            </div>
                        </li>
                    )}
                    {/* if user is logged in */}
            {isLoggedIn && (
                        <li className="absolute bottom-4 w-[90%]">
                            <div className="w-full flex items-center justify-center">
                                <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                    <Link to={'/user/profile'}>Profile</Link>
                                </button>

                                <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-4">
                                    <Link onClick={onLogout}>Logout</Link>
                                </button>
                            </div>
                        </li>
                    )}
                </ul>
                </div>
            </div>

            {children}

            {/* adding the footer content */}
            <Footer />
       </div>
    );
};

export default HomeLayout;