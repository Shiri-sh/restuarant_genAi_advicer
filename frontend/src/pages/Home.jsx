import React from "react";
import AudioRecorder from "../components/AudioRecorder";
import DishCard from "../components/DishCard";
import "./Home.css";
//{ dishes, setDishes }
export default function Home() {

    const handleAudioResult = (results) => {
        console.log("Audio results received:", results);
      };

      
  return (
    <div className="home-page">
      <h1 className="home-title">The Restaurant that Understands You</h1>
      <p className="home-subtitle">
        Speak your cravings and get smart dish recommendations instantly!
      </p>

      {/* <AudioRecorder onResult={setDishes} /> */}
      <AudioRecorder onResult={handleAudioResult} />
      {/* <div className="dishes-grid">

        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div> */}
    </div>
  );
}
