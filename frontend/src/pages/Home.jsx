import React from "react";
import AudioRecorder from "../components/AudioRecorder";
import DishCard from "../components/DishCard";
import { useState } from "react";
import "./Home.css";
//{ dishes, setDishes }
export default function Home() {
  const [analysis, setAnalysis] = useState(null);
    const handleAudioResult = (results) => {
        console.log("Audio results received:", results);
        setAnalysis(results.analysis);
      };

      
  return (
    <div className="home-page">
      <h1 className="home-title">The Restaurant that Understands You</h1>
      <p className="home-subtitle">
        Speak your cravings and get smart dish recommendations instantly!
      </p>

      {/* <AudioRecorder onResult={setDishes} /> */}
      <AudioRecorder onResult={handleAudioResult} />
      {analysis && (
  <div className="analysis-box">
    <h2>AI Analysis</h2>
    <p>{analysis}</p>
  </div>
)}
      {/* <div className="dishes-grid">

        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div> */}
    </div>
  );
}
