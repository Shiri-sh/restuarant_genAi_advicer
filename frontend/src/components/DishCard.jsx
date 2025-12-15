export default function DishCard({ dish }) {
  return (
    <div className="dish-card">
      <img src={dish.image_url} alt={dish.name} className="dish-image" />

      <h2 className="dish-name">{dish.name}</h2>
      <p className="dish-reason">{dish.reason}</p>
      <p className="dish-price">Price: ${dish.price}</p>
      <p className="dish-ingredients">Ingredients: {dish.ingredients}</p>
      {dish.on_sale ? (
        <p className="dish-sale-price">Sale Price: ${dish.sale_price}</p>
      ) : null}
      <p className="dish-dietary">
        {dish.is_vegan ? "Vegan" : dish.is_vegetarian ? "Vegetarian" : "Non-Vegetarian"}
      </p>
    </div>
  );
}