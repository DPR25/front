import React from 'react'
import './modelselector.css'

export default function ModelCard(props) {
    return (
        <div>
            <div className='h-[80px] '>
            <h1 className='font-semibold text-20' >{props.modelName}</h1>
            </div>

            <div className='flex justify-items-center'>
                <div>
                <div className=''>
                <h2 className='font-normal text-13'>Epochs: {props.epochs}</h2>
                </div>

                <div className=''>
                <h2 className='font-normal text-13'>Size: {props.size_MB} MB</h2>
                </div>

                <div className=''>
                <h2 className='font-normal text-13'>Classes: {props.num_classes}</h2>
                </div>

                <div className=''>
                <h2 className='font-normal text-13'>Band inputs: <br />{props.band_inputs.join(', ')}</h2>
                </div>
                </div>

                <div className='flex h-30 items-center justify-center p-5'>
                    <img src="/brain.svg" alt="" width={70}/>
                </div>
            </div>

        </div>
    )
}