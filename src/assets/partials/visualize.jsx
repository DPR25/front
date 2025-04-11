import React, {useEffect, useState} from 'react'
import Card from './card'


export default function Visualize({jobID}) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderedData, setOrderedData] = useState(null)
  

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch(`/api/locations/${jobID}`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setPosts(data);
            setOrderedData(mapImageUrlsReverse(data.image_sources || []));
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
      
        fetchPosts();
      }, [jobID]);

      const mapImageUrlsReverse = (urls) => {
        const mapped = [];
        for (let i = urls.length - 2; i >= 0; i -= 2) {
          const imageUrl = urls[i];
          const maskUrl = urls[i + 1];
    
          const match = imageUrl.match(/satlas_rgb2_(\d{4}-\d{2}-\d{2})-(\d{4}-\d{2}-\d{2})_(\d)_image\.png$/);
          if (match) {
            const startDate = match[1];
            const endDate = match[2];
            const seriesIndex = parseInt(match[3], 10);
    
            mapped.push({
              series_index: seriesIndex,
              imagePath: imageUrl,
              maskPath: maskUrl,
              startDate,
              endDate,
            });
          }
        }
        return mapped;
      };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    

    return (
       
            <div className='w-full h-full flex justify-center items-center gap-20'>
            
            <button>
              <div className='w-30 h-25 flex justify-center items-center hover:bg-[#343a42]
              hover:cursor-pointer active:bg-[#24282e] rounded-2xl'>
                <img src="/arrow_left.svg" alt="" width={60}/>
              </div>
            </button>

            <Card
            img_path={orderedData[0].imagePath}
            mask_path={orderedData[0].maskPath}
            orderSwitch={0}
            />

            <button>
              <div className='w-30 h-25 flex justify-center items-center hover:bg-[#343a42]
              hover:cursor-pointer active:bg-[#24282e] rounded-2xl'>
                <img src="/arrow_right.svg" alt="" width={60}/>
              </div>
            </button>
             
            </div>
      
    )
}