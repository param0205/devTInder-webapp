import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Body from './Body';
import Login from './Login';
import Profile from './Profile';
import Footer from './Footer'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login/>} />
            <Route path="/Profile" element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </>
  )
}

export default App
