import {React} from 'react'

export default function Card(props) {

    return (
        <>
        <div className='w-100 h-100 rounded-2xl'>
            
            {props.orderSwitch ? 

            (<div className="relative w-full h-full">
            <div className='absolute top-0 left-5 w-95 h-95 border rounded-xl overflow-hidden bg-[#2e2e2e] '>
                <img src={props.mask_path} 
                className='w-full h-full'
                alt="" />
            </div>

            <div className='absolute top-5 left-0 w-95 h-95 rounded-xl overflow-hidden'>
                <img src={props.img_path} 
                className='w-full h-full'
                alt="" />
            </div>
            </div>) :

            (<div className="relative w-full h-full">
                <div className='absolute top-0 left-5 w-95 h-95 rounded-xl overflow-hidden border-1 border-gray-400'>
                    <img src={props.img_path} 
                    className='w-full h-full'
                    alt="" />
                </div>

                <div className='absolute top-5 left-0 w-95 h-95 rounded-xl overflow-hidden bg-[#2e2e2e]'>
                    <img src={props.mask_path} 
                    className='w-full h-full'
                    alt="" />
                </div>
            </div>)
            }

        </div>
        </>
    )
}