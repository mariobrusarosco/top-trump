import { useEffect, useState } from "react";
import resultsImage from "./assets/results.png";
import yourTurnImage from "./assets/your-turn.png";
import othersTurnImage from "./assets/others-turn.png";
import introCardImage from './assets/intro-cards.png'
import "./App.css";
import { setScrolledValue } from "./temp-helper";

function App() {
  const [count, setCount] = useState(0);


  useEffect(() => {

    window.addEventListener("scroll", setScrolledValue)
    window.addEventListener("resize", setScrolledValue)

    return () => {
      
    window.removeEventListener("scroll", setScrolledValue)
    window.removeEventListener("resize", setScrolledValue)
    }
  }, [])

  return (
    <>
      <div className="section section-home">
        <h1>Top Trump</h1>

        <div className="left-intro">
          <div className="box">
            <p className="title">Lorem ipsum dolor, </p>
            
            <div className="divider" />
            
            <p> nobis in placeat non numquam iste cum dicta assumenda </p>
          </div>

          <div className="box">
            <p className="title">Lorem ipsum dolor, </p>
            
            <div className="divider" />
            
            <p> nobis in placeat non numquam iste cum dicta assumenda </p>
          </div>
        </div>

        <div className="right-intro">
          <img src={introCardImage} alt="" />
        </div>
      </div>

      <div className="section section-your-turn">
        <h2>Your Turn</h2>
        <div className="card">
          <p className="read-the-docs">
            Lorem Ipsum
          </p>
        </div>on the Vite and React logos to learn more
      </div>

      <div className="section section-others-turn">
        <h2>Others Turn</h2>
        <div className="card">
          <p className="read-the-docs">
            Lorem Ipsum
          </p>
        </div>
    </div>  

    <div className="section section-results">
        <h2>Results</h2>
        <div className="card">
          <p className="read-the-docs">
            Lorem Ipsum
          </p>
        </div>
    </div>  

    <div className="images">
      <img src={yourTurnImage} alt="" className="show" />
      <img src={othersTurnImage} alt="" />
      <img src={resultsImage} alt="" />
    </div>

      {/* <section className="top-section full-screen-section">
            <div className="left">
              <h1>Build Better Backends</h1>
              <p>
                The only platform that gives AI the ability to autonomously build web
                services.
              </p>
            </div>
            <div className="right"></div>
          </section>
          <section className="full-screen-section first-main-section">
            <h1>Completely Visual</h1>
            <p>Never touch the command line, from provision to production.</p>
            <div data-img-to-show="#img-1"></div>
          </section>
          <section className="full-screen-section">
            <h1>Full Stack</h1>
            <p>
              Never manage infrastructure again. One click gets you: a database, APIs,
              deployments, hosting, etc.
            </p>
            <div data-img-to-show="#img-2"></div>
          </section>
          <section className="full-screen-section">
            <h1>Launch Faster</h1>
            <p>Logical can get systems to market in minutes instead of weeks.</p>
            <div data-img-to-show="#img-3"></div>
          </section> */}
    </>
  );
}

export default App;
