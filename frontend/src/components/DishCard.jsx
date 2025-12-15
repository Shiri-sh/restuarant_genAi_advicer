export default function DishCard({ dish }) {
  return (
    <div className="dish-card">
      <h2 className="dish-name">{dish.name}</h2>
      <p className="dish-reason">{dish.reason}</p>
    </div>
  );
}