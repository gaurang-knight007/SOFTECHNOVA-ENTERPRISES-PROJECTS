import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import AdminCreateJob from './components/admin/AdminCreateJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoutes from './components/admin/ProtectedRoutes'
import ProtectedUserRoutes from './components/ProtectedUserRoutes'
import ProtectedUnauthorizedUser from './components/ProtectedUnauthorizedUser'
import WishList from './components/WishList'

const appRoute = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedUserRoutes><Home /></ProtectedUserRoutes>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <ProtectedUnauthorizedUser><ProtectedUserRoutes><Jobs /></ProtectedUserRoutes></ProtectedUnauthorizedUser>
  },
  {
    path: '/description/:id',
    element: <ProtectedUnauthorizedUser><ProtectedUserRoutes><JobDescription /></ProtectedUserRoutes></ProtectedUnauthorizedUser>
  },
  {
    path: '/browse',
    element: <ProtectedUnauthorizedUser><ProtectedUserRoutes><Browse /></ProtectedUserRoutes></ProtectedUnauthorizedUser>
  },
  {
    path: '/wishlist',
    element: <ProtectedUnauthorizedUser><ProtectedUserRoutes><WishList /></ProtectedUserRoutes></ProtectedUnauthorizedUser>
  }
  ,
  {
    path: '/profile',
    element: <ProtectedUnauthorizedUser><ProtectedUserRoutes><Profile /></ProtectedUserRoutes></ProtectedUnauthorizedUser>
  },

  // From here, all routes are related to admin
  {
    path: '/admin/companies',
    element: <ProtectedRoutes><Companies /></ProtectedRoutes>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoutes><CreateCompany /></ProtectedRoutes>
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoutes><CompanySetup /></ProtectedRoutes>
  },
  // this are related to job in admin section
  {
    path: '/admin/jobs',
    element: <ProtectedRoutes><AdminJobs /></ProtectedRoutes>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoutes><AdminCreateJob /></ProtectedRoutes>
  },
  {
    path: '/admin/:id/applicants',
    element: <ProtectedRoutes><Applicants /></ProtectedRoutes>
  },

])

function App() {

  return (
    <>
      <RouterProvider router={appRoute} />
    </>
  )
}

export default App