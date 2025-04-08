import {React} from 'react'
import Cardousel from '../assets/partials/cardousel'


export default function Dashboard() {
    return (
        <>
        <div className='w-full h-screen bg-[#131518] flex justify-center items-center'>
            <Cardousel orderSwitch={1}/>
        </div>
        </>
    )
}