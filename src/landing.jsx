import {React} from 'react';
import './landing.css'


function Landing() {
    return <>
    <div className='landing relative flex justify-center w-full h-dvh gap-4 p-5'>
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
                        timestamped digital twins to be used for detecting forest landmass changes in real time.
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
                        className="scan-top-image rounded-2xl w-[86%]"
                        alt="" />
                    </div>

                    <button className="absolute top-120 left-42 w-[60px] h-[45px] hover:cursor-pointer border- text-xl 
                    font-light rounded-[10px] hover:text-gray-500 transition-all"> Sign In
                    </button>  
                </div>

            </div>  
        </div>
        
    </div>
    </>
}

export default Landing