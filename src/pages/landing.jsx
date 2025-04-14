import {React} from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './landing.css'



function Landing() {

    const [dimmed, setDimmed] = useState(false)

    return <>
    <div className= 'landing relative flex justify-center w-full h-dvh gap-4 p-5 z-0'>

        <div className={`absolute flex items-center justify-center top-0 left-0 w-screen h-screen z-0 ${dimmed ? 'dimmed' : 'opacity-0'}`}>
    
                <div className='glass w-[500px] h-[300px] flex flex-col items-center gap-6 border border-teal-300 bg-black rounded-2xl py-10'>
                    
                    <h1 className=' text-gray-200 text-2xl font-semibold'>Sign In</h1>
                    <input type="text" className="w-[80%] p-2 font-semibold bg-gray-100 text-gray-900 border rounded-md border-none outline-none focus:outline-none focus:ring-0 focus:border-none" placeholder="Username" />
                    <input type="password" className="w-[80%] p-2 font-semibold bg-gray-100 text-gray-900 border rounded-md border-none outline-none focus:outline-none focus:ring-0 focus:border-none" placeholder="Password" />
                
                    
                    <Link
                        to='/dashboard/133f5bfe-6b8b-49a4-bcb8-9dc289307b54'
                        className="mt-auto w-[50%] py-2 hover:cursor-pointer border- text-xl 
                    font-light rounded-[10px] hover:text-gray-500 transition-all duration-200 text-center"
                        >
                        Sign In
                    </Link>

                </div>
           
        </div>

        <div className='absolute top-[20vh]'>
            <div className=' flex justify-center gap-3 py-6'>
            <img src="./satelite.svg" alt="" width={45}/>
                <h1 className='text text-5xl'>Timber AI </h1>
            </div>

            <div className='typewriter flex font-light text-xl justify-center'>
                <h2>Digital twins for forest preservation.</h2>
            </div>
        </div>

        <div className='absolute top-[40vh] w-[50vw] min-w-[800px] h-auto flex justify-center items-center gap-4'>
            <div className='flex flex-col gap-4'>
                <div className='glass relative w-[400px] h-[28vh] slide-animate0 overflow-hidden'>
                    <div className='flex flex-col items-center'>
                        <h1 className='absolute top-3 left-40 text-gray-200 text-2xl font-semibold'>Sentinel-2 Images</h1>
                        <p className='absolute top-15 left-20 mr-2.5 text-right text-'>
                            Powered by Copernicus API we use latest Sentinel-2 
                            data to keep up with
                            <br /> rapid changes in most 
                            <br />critical regions of 
                            <br />the world.
                            </p>
                        <img src="./sentinel-2.png" alt="" className='absolute top-10 right-5 w-full'/>
                    </div>
                </div>

                <div className='glass relative w-[400px] h-[28vh] slide-animate2 overflow-hidden'>
                    <img src="./ai-brain.png" alt="" 
                    className='absolute bottom-25 right-18'/>
                    <h1 className='absolute top-30 left-5 text-gray-200 text-2xl font-semibold'>Cutting Edge AI</h1>
                    <p className='absolute top-40 left-5 text-gray-300'>
                        Using the latest state-of-the-art <br />
                        deep learning models, we create and store <br />
                        timestamped digital twins to be used for detecting forest landmass change in real time.
                    </p>
                </div>
            </div>

            <div className='glass relative w-[400px] h-[57.5vh] slide-animate1 overflow-hidden'>
              
                <h1 className='absolute top-4 left-22  text-gray-200 text-3xl font-semibold'>Interpretable Visualizations</h1>
             
                <div className="absolute justify-center items-center w-full gap-4"> 
                    
                    <div className='scan-container absolute top-30 left-7'>
                        <img src="/landing_mask.png" 
                            className="scan-bottom-image rounded-2xl w-[86%]"
                            alt="" />
                        <img src="/landing_img.png" 
                        className={`scan-top-image rounded-2xl w-[86%] ${dimmed? '' : 'scan-top-image-animate'}`}
                        alt="" />
                    </div>

                    <button className="absolute top-120 left-42 w-[60px] h-[45px] hover:cursor-pointer border- text-xl 
                    font-light rounded-[10px] hover:text-gray-500 transition-all"
                    onClick={() => {
                        setDimmed(true)
                    }}
                    > Sign In
                    </button>  
                </div>

            </div>  
        </div>
        
    </div>


    </>
}

export default Landing