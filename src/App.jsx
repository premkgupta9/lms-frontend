import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Aboutus from './pages/Aboutus'
import Notfound from './pages/Notfound'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Contact from './pages/Contact'
import Denied from './pages/Denied'
import CourseList from './pages/Courses/CouresList'
import CourseDescription from './pages/Courses/CourseDescription'
import CreateCourse from './pages/Courses/Createcourse'

import Profile from './pages/user/Profile'
import RequireAuth from './components/Auth/RequireAuth'
import EditProfile from './pages/user/EditProfile'


function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<Aboutus />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/courses' element={<CourseList />} />
      <Route path='/course/description' element={<CourseDescription />} />

      <Route element={<RequireAuth allowedRoles={['ADMIN', 'USER']}/>}>
        <Route path='/user/profile' element={<Profile />} />
        <Route path='/user/editprofile' element={<EditProfile />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={['ADMIN']}/>}>
        <Route path='/course/create' element={<CreateCourse />} />
      </Route>

      <Route path='/contact' element={<Contact />} />
      <Route path='/denied' element={<Denied />} />
      <Route path='*' element={<Notfound />} />
    </Routes>
  )
}

export default App
