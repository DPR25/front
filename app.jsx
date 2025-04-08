import {React} from 'react'
import Landing from './src/pages/landing'
import Dashboard from './src/pages/dashboard'
import {Route, Routes} from 'react-router-dom'

export default function App() {
    return (
        <div>


        <Routes>
            <Route path='' element={<Landing/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>

        </div>
    )
}