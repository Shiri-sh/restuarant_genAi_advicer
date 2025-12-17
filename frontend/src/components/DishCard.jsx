import { Salad, Vegan, Bot } from 'lucide-react';
import "../css/DishCard.css";
export default function DishCard({ dish }) {

  return (
    <div className="dish-card">
      <img src={`http://localhost:5000${dish.image_url}`} alt={dish.name} className="dish-image" />
      <h2 className="dish-name">{dish.name}</h2>
      <p className="dish-price"><span className="bold">Price:</span>   {dish.price}₪</p>
      <p className="dish-ingredients"><span className="bold">Ingredients:</span>   {dish.ingredients}</p>
      {dish.on_sale ? (
        <p className="dish-sale-price"><span className="bold">Sale Price:</span> ${dish.sale_price}</p>
      ) : null}
      <p className="dish-description">{dish.description}</p>
      <p>-----------------------------------------------</p>
      <div className='bot-row'>
      <Bot className="bot" />
       </div>
       <p className="dish-reason">{dish.reason}</p>
      <div className="diet-row">
        {dish.is_vegan
          ? <Vegan className="diet-icon" size={28} strokeWidth={2} />
          : null}
        {dish.is_vegetarian && !dish.is_vegan
          ? <Salad className="diet-icon" size={28} strokeWidth={2} />
          : null}
      </div>
    </div>
  );
}

