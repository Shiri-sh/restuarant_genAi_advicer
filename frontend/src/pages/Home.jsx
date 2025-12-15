import React from "react";
import AudioRecorder from "../components/AudioRecorder";
import DishCard from "../components/DishCard";
import { useState } from "react";
import "./Home.css";


export default function Home() {
  const [dishes, setDishes] = useState([]);
  const imageUrls = [
    "http://localhost:5000/images/img1.jpg",
    "http://localhost:5000/images/img2.jpg",
    "http://localhost:5000/images/img3.jpg",
    "http://localhost:5000/images/img4.jpg",
  ];

  return (
    <div className="home-page">
      <div className="header-background">
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="slideshow"
            style={{ backgroundImage: `url(${url})`, animationDelay: `${index * 5}s` }}
          ></div>
        ))}
        <div className="header-content">
          <h1 className="home-title">The Restaurant that Understands You</h1>
          <p className="home-subtitle">
            Speak your cravings and get smart dish recommendations instantly!
          </p>
        </div>
      </div>

      <AudioRecorder onResult={setDishes} />

      <div className="dishes-grid">
  {Array.isArray(dishes) &&
    dishes.map((dish, index) => (
      <DishCard key={index} dish={dish} />
    ))}
</div>
    </div>
  );
}
