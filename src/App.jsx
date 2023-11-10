import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CourseList from "./pages/Course/CouresList";
import NotFound from './pages/Notfound';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Payment/Checkout";
import CheckoutSuccess from "./pages/Payment/CheckoutSuccess";
import CheckoutFail from "./pages/Payment/CheckoutFailure";
import ForgetPassword from "./pages/Password/ForgetPassword";
import ResetPassword from "./pages/Password/ResetPassword";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import CourseDescription from "./pages/Course/CourseDescription";
import Profile from "./pages/user/Profile";
import ChangePassword from "./pages/Password/ChangePassword";
import EditProfile from "./pages/user/EditProfile";
import CreateCourse from "./pages/Course/Createcourse";
import AddLecture from "./pages/Dashboard/AddLecture";
import DisplayLectures from "./pages/Dashboard/DisplayLectures";
import RequireAuth from "./components/Auth/RequireAuth";
import NotRequireAuth from './components/Auth/NotRequireAuth';
import Denied from "./pages/Denied";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        <Route element={<NotRequireAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
          <Route path="/course/description" element={<CourseDescription />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFail />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/course/displaylectures" element={<DisplayLectures />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/course/addlecture" element={<AddLecture />} />
          <Route path="/course/create" element={<CreateCourse />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;