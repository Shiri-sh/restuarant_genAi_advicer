export default function DishCard({ dish }) {
  const veganBadge = "/images/vegan-badge.png";
  const vegetarianBadge = "/images/vegetarian-badge.jpg";

  return (
    <div className="dish-card">
      {dish.isVegan && (
        <div
          className="diet-badge"
          style={{ backgroundImage: `url(${veganBadge})` }}
        />
      )}

      {dish.isVegetarian && !dish.isVegan && (
        <div
          className="diet-badge"
          style={{ backgroundImage: `url(${vegetarianBadge})` }}
        />
      )}

      <h2 className="dish-name">{dish.name}</h2>
      <p className="dish-reason">{dish.reason}</p>
    </div>
  );
}
