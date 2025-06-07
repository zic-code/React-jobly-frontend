import { Routes, Route, Navigate } from "react-router-dom"
import Homepage from './components/Homepage'
import CompanyList from './components/CompanyList'
import CompanyDetail from './components/CompanyDetail'
import JobList from './components/JobList'
import LoginForm from './components/LoginPage'
import SignupPage from './components/SignupForm'
import ProfileForm from "./components/ProfileForm";
import ProtectedRoute from "./components/ProtectedRoute";

function RoutesList({ login, signup }) {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/companies' element={
        <ProtectedRoute>
          <CompanyList />
        </ProtectedRoute>} />
      <Route path='/companies/:handle' element={<CompanyDetail />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignupPage signup={signup} />} />
      <Route path="/profile" element={
      <ProtectedRoute>
      <ProfileForm />
      </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}


export default RoutesList