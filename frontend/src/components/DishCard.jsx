import { Salad, Vegan,Bot} from 'lucide-react';
export default function DishCard({ dish }) {
  const veganBadge = "/images/vegan-badge.png";
  const vegetarianBadge = "/images/vegetarian-badge.jpg";

  return (
    <div className="dish-card">
      <img src={`http://localhost:5000${dish.image_url}`} alt={dish.name} className="dish-image" />
      <h2 className="dish-name">{dish.name}</h2>
      <p className="dish-price">Price: ${dish.price}</p>
      <p className="dish-ingredients">Ingredients: {dish.ingredients}</p>
      {dish.on_sale ? (
        <p className="dish-sale-price">Sale Price: ${dish.sale_price}</p>
      ) : null}
     

      <p className="dish-description">{dish.description}</p>
      <p className="dish-reason"><Bot className="bot"/><span>{dish.reason}</span></p>
      {/* <div className="diet-row">
  {dish.is_vegan && <Vegan className="diet-icon" size={28} strokeWidth={2}/>}
  {dish.is_vegetarian && !dish.is_vegan && <Salad className="diet-icon" size={28} strokeWidth={2}/>}
</div> */}
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

