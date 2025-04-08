import {React} from 'react'
import { useState } from 'react'

export default function Card(props) {

    return (
        <>
        <div className='w-60 h-75  rounded-2xl relative'
            style={{ transform: `scale(${props.scale})` }}>
            
            {props.orderSwitch ? 

            (<div>
            <div className='absolute top-0 left-5 w-55 h-55 rounded-xl overflow-hidden bg-[#2e2e2e] border-1 border-gray-400'>
                <img src={props.mask_path} 
                className='w-full h-full'
                alt="" />
            </div>

            <div className='absolute top-5 left-0 w-55 h-55 rounded-xl overflow-hidden border-1 border-gray-400'>
                <img src={props.img_path} 
                className='w-full h-full'
                alt="" />
            </div>
            </div>) :

            (<div>
                <div className='absolute top-0 left-5 w-55 h-55 rounded-xl overflow-hidden border-1 border-gray-400'>
                    <img src={props.img_path} 
                    className='w-full h-full'
                    alt="" />
                </div>

                <div className='absolute top-5 left-0 w-55 h-55 rounded-xl overflow-hidden bg-[#2e2e2e] border-1 border-gray-400'>
                    <img src={props.mask_path} 
                    className='w-full h-full'
                    alt="" />
                </div>
            </div>)
            }

            <div className='flex justify-between w-full px-5 absolute top-[84%]'>
                <div className='flex flex-col justify-center items-center'>
                    <img src="/time.svg" alt=""/>
                    <h2 className='text-[14px]'>{`28.08.2000 14:35`}</h2>
                </div>

                <div>
                    <img src="/cloud.svg" alt="" />
                    <h2 className='text-[14px]'>65%</h2>
                </div>
            </div>

        </div>
        </>
    )
}