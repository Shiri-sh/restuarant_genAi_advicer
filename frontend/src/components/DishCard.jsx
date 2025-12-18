import { Salad, Vegan, Bot } from 'lucide-react';
import "../css/DishCard.css";

export default function DishCard({ dish }) {
  // חישוב החיסכון
  const savings = dish.on_sale ? (dish.price - dish.sale_price).toFixed(2) : 0;
  const savingsPercent = dish.on_sale ? Math.round(((dish.price - dish.sale_price) / dish.price) * 100) : 0;

  return (
    <div className="dish-card">
      {/* Image Container with Badges */}
      <div className="dish-image-container">
        <img 
          src={`http://localhost:5000${dish.image_url}`} 
          alt={dish.name} 
          className="dish-image" 
        />
        
        {/* Diet Badge - מדבקה בפינה */}
        {(dish.is_vegan || dish.is_vegetarian) && (
          <div className={`diet-badge ${dish.is_vegan ? 'vegan' : 'vegetarian'}`}>
            {dish.is_vegan ? (
              <Vegan className="diet-icon" strokeWidth={2.5} />
            ) : (
              <Salad className="diet-icon" strokeWidth={2.5} />
            )}
          </div>
        )}
        
        {/* Sale Badge */}
        {dish.on_sale && dish.sale_price &&(
          <div className="sale-badge">
            SALE {savingsPercent}% OFF
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="dish-content">
        <h2 className="dish-name">{dish.name}</h2>
        
        {/* Price Section */}
        <div className="price-section">
          <span className={`original-price ${dish.on_sale ? 'strikethrough' : ''}`}>
            {dish.price}₪
          </span>
          
          {dish.on_sale && dish.sale_price &&(
            <>
              <span className="sale-price">{dish.sale_price}₪</span>
              <span className="sale-savings">Save {savings}₪</span>
            </>
          )}
        </div>
        
        {/* Info Grid */}
        <div className="dish-info">
          <span className="info-label">Ingredients:</span>
          <span className="info-value">{dish.ingredients}</span>
        </div>

        {/* Description */}
        {dish.description && (
          <p className="info-value" style={{margin: 0, lineHeight: 1.6}}>
            {dish.description}
          </p>
        )}

        {/* AI Recommendation */}
        <div className="ai-recommendation">
          <div className="ai-header">
            <Bot className="ai-icon" strokeWidth={2} />
            <span className="ai-label">Why this dish?</span>
          </div>
          <p className="dish-reason">{dish.reason}</p>
        </div>
      </div>
    </div>
  );
}