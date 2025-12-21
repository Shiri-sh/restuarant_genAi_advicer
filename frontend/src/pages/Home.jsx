import AudioRecorder from "../components/AudioRecorder";
import DishCard from "../components/DishCard";
import { useState } from "react";
import imageUrls from "../services/dishesImagesUrls";
import { MessageSquareWarning } from 'lucide-react';
import "../css/Home.css";

export default function Home() {
  const [dishes, setDishes] = useState([]);
  const [noRecommendations, setNoRecommendations] = useState({});

  return (
    <div className="home-page">
      <div className="header-background">
        <div className="slider-track">
          {imageUrls.concat(imageUrls).map((url, index) => (
            <div
              key={index}
              className="slider-image"
              style={{ backgroundImage: `url(${url})` }}
            ></div>
          ))}
        </div>
        <div className="header-content">
          <div className="brand">
            <h3 className="brand-name">TAMARA</h3>
            <span className="brand-subtitle">cafe & restaurant</span>
          </div>
          <h1 className="home-title">The Restaurant that Understands You</h1>
          <p className="home-subtitle">
            Speak your cravings and get smart dish recommendations instantly!
          </p>
        </div>
      </div>

      <AudioRecorder onResultRecommendations={setDishes} onResultNoRecommendations={setNoRecommendations} />
      <div className="no-recommendations">
        {noRecommendations?.message && noRecommendations?.reason_type &&  (
          <div>
            <MessageSquareWarning className="no-recommendations-icon" />
            <h2 className="no-recommendations-title">{noRecommendations.reason_type}</h2>
            <p className="no-recommendations-message">{noRecommendations.message}</p>
          </div>
        )}
      </div>
      <div className="dishes-grid">
        {Array.isArray(dishes) &&
          dishes.map((dish, index) => <DishCard key={index} dish={dish} />)}
      </div>
    </div>
  );
}
