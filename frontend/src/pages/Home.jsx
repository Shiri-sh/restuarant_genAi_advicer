import React from "react";
import AudioRecorder from "../components/AudioRecorder";
import DishCard from "../components/DishCard";
import { useState } from "react";
import "./Home.css";


export default function Home() {
  const [dishes, setDishes] = useState([]);

  return (
    <div className="home-page">
      <h1 className="home-title">The Restaurant that Understands You</h1>
      <p className="home-subtitle">
         Speak your cravings and get smart dish recommendations instantly!
       </p>
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
