import {React} from 'react'

export default function CardMobile(props) {
    return (
        <>
        <div className='w-full aspect-square rounded-lg touch-manipulation'>
            {props.orderSwitch ? 
            (<div className="relative w-full h-full">
                <div className='absolute top-0 left-3 w-[92%] h-[92%] border rounded-lg overflow-hidden bg-[#2e2e2e]'>
                    <img src={props.mask_path} 
                    className='w-full h-full object-cover'
                    alt="Mask" 
                    loading="lazy"/>
                </div>

                <div className='absolute top-3 left-0 w-[92%] h-[92%] rounded-lg overflow-hidden'>
                    <img src={props.img_path} 
                    className='w-full h-full object-cover'
                    alt="Image"
                    loading="lazy"/>
                </div>
            </div>) :
            (<div className="relative w-full h-full">
                <div className='absolute top-0 left-3 w-[92%] h-[92%] rounded-lg overflow-hidden border border-gray-400'>
                    <img src={props.img_path} 
                    className='w-full h-full object-cover'
                    alt="Image"
                    loading="lazy"/>
                </div>

                <div className='absolute top-3 left-0 w-[92%] h-[92%] rounded-lg overflow-hidden bg-[#2e2e2e]'>
                    <img src={props.mask_path} 
                    className='w-full h-full object-cover'
                    alt="Mask"
                    loading="lazy"/>
                </div>
            </div>)
            }
        </div>
        </>
    )
} 