import react from "react";
import iBus from '../assets/Indore I Bus.jpg'
import Metro from '../assets/New.avif'
import cityBus from '../assets/City Bus.webp'
import indoreZoo from '../assets/Zoo.avif'
import regionalPark from '../assets/Regional Park Indore.jpg'
import Muncipal from '../assets/Muncipal Coprate.png'
import Railway from '../assets/Indore Railway Station.jpeg'
import Metropolitan from '../assets/Metropolitan City Indore.jpg'
import ITPark from '../assets/IT Park Indore.avif'

const CityServices = () => {
    return (
        <div className="about-img-container">
            <div className="first-image-container">
                <img src={iBus} className="about-img-first" />
                <h2>I Bus</h2>
                <p className="first-p-tag">View iBus corridor routes, station information, and operational timings.</p>
            </div>
            <div className="second-image-container">
                <img src={Metro} className="about-img-second" />
                <h2>Indore Metro</h2>
                <p className="second-p-tag">Check metro routes, station details, and service updates.</p>
            </div>
            <div className="third-image-container">
                <img src={cityBus} className="about-img-third" />
                <h2>City Bus</h2>
                <p className="third-p-tag">Search bus routes, stops, timings, and plan your city travel.</p>
            </div>
            <div className="fourth-image-container">
                <img src={indoreZoo} className="about-img-fourth" />
                <h2>Indore Zoo</h2>
                <p className="fourth-p-tag">Kamla Nehru Prani Sangrahalaya <br></br> Book zoo tickets online and check visiting hours.</p>
            </div>
            <div className="five-image-container">
                <img src={regionalPark} className="about-img-five" />
                <h2>Regional Park (Pipliyapala Park)</h2>
                <p className="five-p-tag">Book entry tickets, boating, and view park facilities.</p>
            </div>
            <div className="six-image-container">
                <img src={Muncipal} className="about-img-six" />
                <h2>Indore Municipal Corporation</h2>
                <p className="six-p-tag">Report issues related to sanitation, water, drainage, streetlights, and city maintenance.</p>
            </div>
            <div className="seven-image-container">
                <img src={Railway} className="about-img-seven" />
                <h2>Indore Junction railway station</h2>
                <p className="seven-p-tag">Check train schedules, platform information, and station facilities.</p>
            </div>
            <div className="eight-image-container">
                <img src={Metropolitan} className="about-img-eight" />
                <h2>Metropolitan City</h2>
                <p className="eight-p-tag">Indore is developing its metropolitan network and improving connectivity across the city.</p>
            </div>
            <div className="nine-image-container">
                <img src={ITPark} className="about-img-nine" />
                <h2>Commercial Hub</h2>
                <p className="nine-p-tag">Indore is the commercial hub of Madhya Pradesh with growing industries.</p>
            </div>
        </div>
    )
}
export default CityServices