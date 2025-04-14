import {React} from 'react'
import Landing from './src/pages/landing'
import Dashboard from './src/pages/dashboard'
import Map from './src/pages/map'
import {Route, Routes} from 'react-router-dom'

export default function App() {
    return (
        <div>


        <Routes>
            <Route path='' element={<Landing/>}/>
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/map" element={<Map/>} />
        </Routes>

        </div>
    )
}