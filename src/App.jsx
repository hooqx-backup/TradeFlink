import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import NotFound from './Pages/NotFound/NotFound'
import MainLayout from './layouts/MainLayout'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <MainLayout>
          <Home />
        </MainLayout>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
