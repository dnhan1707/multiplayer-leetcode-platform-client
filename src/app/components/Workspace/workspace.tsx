import React from 'react';
import Split from 'react-split';
import ProblemDescription from '../../components/ProblemDescription/ProblemDescription'
import LandingEditor from '../Editor/LandingEditor';

const Workspace : React.FC = () => {
    return(
        <div className="h-screen flex flex-col bg-dark-fill-3">
            
            <Split className='flex flex-grow' minSize={0}>
            
            {/** left panel */}
            <div className="rounded-md border border-dark-border m-4 p-1">
                    <ProblemDescription/>
			</div>
            
            {/** right panel */}
            <div className="flex flex-col">
                
                <div className="flex flex-grow flex-col p-0">

                    <div className="flex-grow rounded-md border border-dark-border mb-4">
                        <div className="bg-gray-800">Code</div>
                        <div className="text-white">
                           <LandingEditor/>
                        </div>
                    </div>

                    <div className="h-1/4 rounded-md border border-dark-border">
                        <div className="text-white p-4">
                            Test Cases Here
                        </div>
                    </div>
                </div>
			</div>
		
            </Split>
        </div>
    )
}

export default Workspace;
