import React, { useState, useEffect } from 'react';
import ModelCard from './modelcard'; 
import './modelselector.css'; 

const ModelSelector = ({activeIndex, setActiveIndex}) => {
  const [models, setModels] = useState(null);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    fetch('/model_config.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        try {
          const data = JSON.parse(text);
          setModels(data);
        } catch (e) {
          setError(`Failed to parse JSON: ${e.message}\nFirst 100 chars: ${text.substring(0, 100)}`);
        }
      })
      .catch(err => setError(`Fetch error: ${err.message}`));
  }, []);

  if (error) {
    return (
      <div className="">
        <h1 className="text-2xl font-bold">Error</h1>
        <pre className="text-red-600">{error}</pre>
      </div>
    );
  }

  if (!models) {
    return <div className="p-5">Loading...</div>;
  }

  const modelEntries = Object.entries(models);

  return (
    <div className="max-w-full mx-auto">
        <div className='flex w-full gap-2 items-start relative'> 
      <h1 className="text-2xl font-bold mb-4">Segmentation Models Info</h1>
        
        
        <img src="/help.svg" alt=""  width={30}/>
        </div>
        <div className="w-full overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-h-2 p-5">        <div className="flex gap-5 min-w-max">
          {modelEntries.map(([key, model], index) => (
            <div
              key={key}
              className={`p-5 modelcard w-[250px] rounded-xl border h-75 ${activeIndex === index ? 'modelcard-active' : ''}`}

              onClick={() => setActiveIndex(index)} 
            >
              <ModelCard
                modelName={model.name}
                epochs={model.model_details.epochs}
                size_MB={model.model_details.size_MB}
                num_classes={model.model_details.num_classes}
                band_inputs={model.model_details.band_input}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;