// import React from "react";
// import AudioRecorder from "../components/AudioRecorder";
// import DishCard from "../components/DishCard";
// import { useState } from "react";
// import "./Home.css";


// export default function Home() {
//   const [dishes, setDishes] = useState([]);
//   const imageUrls = [
//     "http://localhost:5000/images/dishes/cheesy_toast.png",
//     "http://localhost:5000/images/dishes/chips.png",
//     "http://localhost:5000/images/dishes/creamy_salmon_fettuccine.png",
//     "http://localhost:5000/images/dishes/dreamy_skewers.png",
//     "http://localhost:5000/images/dishes/lemon_pistachio_bar.png",
//     "http://localhost:5000/images/dishes/new_york_cheesecake.png",
//     "http://localhost:5000/images/dishes/penna_wild_mushroom_cream.png",
//     "http://localhost:5000/images/dishes/pizza_emilia.png",
//     "http://localhost:5000/images/dishes/soup_of_the_day.png",
//     "http://localhost:5000/images/dishes/spicy_tomato_shakshuka.png",
//     "http://localhost:5000/images/dishes/smoked_salmon_toast.png",
//     "http://localhost:5000/images/dishes/tamara_double_morning.png",
//     "http://localhost:5000/images/dishes/tamara_toast.png"
//   ];

//   return (
//     <div className="home-page">
//       <div className="header-background">
//   {imageUrls.map((url, index) => (
//     <div
//       key={index}
//       className="slideshow"
//       style={{
//         backgroundImage: `url(${url})`,
//         animationDelay: `${(index * 15) / imageUrls.length}s`
//       }}
//     ></div>
//   ))}
//   <div className="header-content">
//     <h1 className="home-title">The Restaurant that Understands You</h1>
//     <p className="home-subtitle">
//       Speak your cravings and get smart dish recommendations instantly!
//     </p>
//   </div>
// </div>


//       <AudioRecorder onResult={setDishes} />

//       <div className="dishes-grid">
//   {Array.isArray(dishes) &&
//     dishes.map((dish, index) => (
//       <DishCard key={index} dish={dish} />
//     ))}
// </div>
//     </div>
//   );
// }
import React from "react";
import AudioRecorder from "../components/AudioRecorder";
import DishCard from "../components/DishCard";
import { useState } from "react";
import "./Home.css";

export default function Home() {
  const [dishes, setDishes] = useState([]);
  const imageUrls = [
    "http://localhost:5000/images/dishes/cheesy_toast.png",
    "http://localhost:5000/images/dishes/chips.png",
    "http://localhost:5000/images/dishes/creamy_salmon_fettuccine.png",
    "http://localhost:5000/images/dishes/dreamy_skewers.png",
    "http://localhost:5000/images/dishes/lemon_pistachio_bar.png",
    "http://localhost:5000/images/dishes/new_york_cheesecake.png",
    "http://localhost:5000/images/dishes/penna_wild_mushroom_cream.png",
    "http://localhost:5000/images/dishes/pizza_emilia.png",
    "http://localhost:5000/images/dishes/soup_of_the_day.png",
    "http://localhost:5000/images/dishes/spicy_tomato_shakshuka.png",
    "http://localhost:5000/images/dishes/smoked_salmon_toast.png",
    "http://localhost:5000/images/dishes/tamara_double_morning.png",
    "http://localhost:5000/images/dishes/tamara_toast.png"
  ];


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
          <h1 className="home-title">The Restaurant that Understands You</h1>
          <p className="home-subtitle">
            Speak your cravings and get smart dish recommendations instantly!
          </p>
        </div>
      </div>

      <AudioRecorder onResult={setDishes} />

      <div className="dishes-grid">
        {Array.isArray(dishes) &&
          dishes.map((dish, index) => <DishCard key={index} dish={dish} />)}
      </div>
    </div>
  );
}
