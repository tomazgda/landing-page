import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import githubLogo from './assets/github-mark.svg'
import './App.css'

function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

// Something about hooks, and listeners -> updates window size variables when the window size changes
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}


function Adios() {
    return (
        <div className="card">
	  <p className="adios">
            Thanks for stopping by :)
	  </p>
        </div>
    );
}

// Welcome (left hand side) columns

function Welcome ({displayAdios}) {
    return (
        <>
          <h1>Welcome!</h1>

          <p>You have reached the landing page of tomazgda.</p>
          
          <div>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="Vite logo" />
            </a>
            <a href="https://github.com/tomazgda/" target="_blank">
              <img src={githubLogo} className="logo" alt="Github logo" />
            </a>
          </div>

          {displayAdios && <Adios/>}
        </>
    );
}

function Projects() {
    return (
        <>
          <div className="card">
            <h2> <code> $ ls -l projects</code> </h2>
            
            <ul className="external-links">
              <li> <a href="https://github.com/tomazgda/churn_predictions">Churn Predictions</a> <p className="description">ML Pipeline for predicting churn, productionised with GitHub Actions</p></li>
              
              <li> <a href="https://tomazgda.github.io/blog/">Blog</a> <p className="description">Largely a collection of poems.</p></li>
            </ul> 
            
          </div>
        </>
    );
}

// Projects (right hand size) column 

function App() {
    const {height, width} = useWindowDimensions();

    console.log("width " + width);

    return (
	<>

          {width < 800  ? (

              <>
                <Welcome displayAdios={false}/>
                <Projects/>
                <Adios/>
              </>
              
          ) : (

              <div className="row">

                <div className="column"><Welcome displayAdios={true}/></div>

                <div className="column projects"><Projects/></div>
                
              </div>
              
          )}
        </>
    );
}

export default App
