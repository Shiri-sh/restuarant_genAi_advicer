export default function DishCard({ dish }) {
  const veganBadge = "/images/vegan-badge.png";
  const vegetarianBadge = "/images/vegetarian-badge.jpg";

  return (
    <div className="dish-card">
      <img src={dish.image_url} alt={dish.name} className="dish-image" />
      <h2 className="dish-name">{dish.name}</h2>
      <p className="dish-price">Price: ${dish.price}</p>
      <p className="dish-ingredients">Ingredients: {dish.ingredients}</p>
      {dish.on_sale ? (
        <p className="dish-sale-price">Sale Price: ${dish.sale_price}</p>
      ) : null}
      {dish.is_vegan && (
        <div
          className="diet-badge"
          style={{ backgroundImage: `url(${veganBadge})` }}
        />
      )}
      {dish.is_vegetarian && !dish.is_vegan && (
        <div
          className="diet-badge"
          style={{ backgroundImage: `url(${vegetarianBadge})` }}
        />
      )}
      <p className="dish-reason">{dish.reason}</p>
    </div>
  );
}
