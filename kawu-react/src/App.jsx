import { Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminAchievements from './pages/admin/AdminAchievements'
import AdminHome from './pages/admin/AdminHome'
import AdminAbout from './pages/admin/AdminAbout'
import AdminMessages from './pages/admin/AdminMessages'
import ProtectedRoute from './components/ProtectedRoute'

function PublicLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/achievements" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        <Route path="achievements" element={<AdminAchievements />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="about" element={<AdminAbout />} />
        <Route path="messages" element={<AdminMessages />} />
      </Route>
    </Routes>
  )
}
