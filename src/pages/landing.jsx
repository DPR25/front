import {React} from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './landing.css'

function Landing() {
    const [dimmed, setDimmed] = useState(false)

    return <>
    <div className='landing relative flex justify-center w-full h-screen gap-4 p-5 z-0'>
        {/* Sign In Modal */}
        <div className={`absolute flex items-center justify-center top-0 left-0 w-screen h-screen z-0 ${dimmed ? 'dimmed' : 'opacity-0'}`}>
            <div className='glass w-[90%] sm:w-[500px] h-[300px] flex flex-col items-center gap-4 sm:gap-6 border border-teal-300 bg-black rounded-2xl py-6 sm:py-10'>
                <h1 className='text-gray-200 text-xl sm:text-2xl font-semibold'>Sign In</h1>
                <input type="text" className="w-[80%] p-2 font-semibold bg-gray-100 text-gray-900 border rounded-md border-none outline-none focus:outline-none focus:ring-0 focus:border-none" placeholder="Username" value="user" />
                <input type="password" className="w-[80%] p-2 font-semibold bg-gray-100 text-gray-900 border rounded-md border-none outline-none focus:outline-none focus:ring-0 focus:border-none" placeholder="Password" value="pass" />
                <Link
                    to='/dashboard/133f5bfe-6b8b-49a4-bcb8-9dc289307b54'
                    className="mt-auto w-[50%] py-2 hover:cursor-pointer border- text-xl 
                    font-light rounded-[10px] hover:text-gray-500 transition-all duration-200 text-center"
                >
                    Sign In
                </Link>
            </div>
        </div>

        {/* Mobile Login Button */}
        <button 
            className="sm:hidden absolute top-4 right-4 w-20 h-10 hover:cursor-pointer border- text-lg 
            font-light rounded-[10px] hover:text-gray-500 transition-all bg-black/50 backdrop-blur-sm"
            onClick={() => setDimmed(true)}
        >
            Sign In
        </button>

        {/* Header */}
        <div className='absolute top-[10vh] sm:top-[20vh]'>
            <div className='flex justify-center gap-3 py-4 sm:py-6'>
                <img src="./satelite.svg" alt="" className="w-8 sm:w-[45px]"/>
                <h1 className='text text-3xl sm:text-5xl'>Timber AI </h1>
            </div>
            <div className='typewriter flex font-light text-lg sm:text-xl justify-center'>
                <h2>Digital twins for forest preservation.</h2>
            </div>
        </div>

        {/* Main Content */}
        <div className='absolute top-[30vh] sm:top-[40vh] w-[90%] sm:w-[50vw] min-w-0 sm:min-w-[800px] h-screen overflow-auto flex flex-col sm:flex-row justify-center items-center gap-4'>
            {/* Left Column */}
            <div className='flex flex-col gap-4 w-full sm:w-auto'>
                <div className='glass relative w-full sm:w-[400px] h-[28vh] slide-animate0 overflow-hidden'>
                    <div className='flex flex-col items-center'>
                        <h1 className='absolute top-3 left-4 sm:left-40 text-gray-200 text-xl sm:text-2xl font-semibold'>Sentinel-2 Images</h1>
                        <p className='absolute top-15 left-4 sm:left-20 mr-2.5 text-right text-sm sm:text-base'>
                            Powered by Copernicus API we use latest Sentinel-2 
                            data to keep up with
                            <br /> rapid changes in most 
                            <br />critical regions of 
                            <br />the world.
                        </p>
                        <img src="./sentinel-2.png" alt="" className='absolute top-10 right-5 w-full'/>
                    </div>
                </div>

                <div className='glass relative w-full sm:w-[400px] h-[28vh] slide-animate2 overflow-hidden'>
                    <img src="./ai-brain.png" alt="" 
                    className='absolute bottom-25 right-18'/>
                    <h1 className='absolute top-30 left-5 text-gray-200 text-xl sm:text-2xl font-semibold'>Cutting Edge AI</h1>
                    <p className='absolute top-40 left-5 text-gray-300 text-sm sm:text-base'>
                        Using the latest state-of-the-art <br />
                        deep learning models, we create and store <br />
                        timestamped digital twins to be used for detecting forest landmass change in real time.
                    </p>
                </div>
            </div>

            {/* Right Column */}
            <div className='glass relative w-full sm:w-[400px] h-[57.5vh] slide-animate1 overflow-hidden'>
                <h1 className='absolute top-4 left-4 sm:left-22 text-gray-200 text-2xl sm:text-3xl font-semibold'>Interpretable Visualizations</h1>
                <div className="absolute justify-center items-center w-full gap-4"> 
                    <div className='scan-container absolute top-30 left-4 sm:left-7'>
                        <img src="/landing_mask.png" 
                            className="scan-bottom-image rounded-2xl w-[90%] sm:w-[86%]"
                            alt="" />
                        <img src="/landing_img.png" 
                        className={`scan-top-image rounded-2xl w-[90%] sm:w-[86%] ${dimmed? '' : 'scan-top-image-animate'}`}
                        alt="" />
                    </div>
                    <button className="absolute top-120 left-4 sm:left-42 w-[60px] h-[45px] hover:cursor-pointer border- text-xl 
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

export default Landing;