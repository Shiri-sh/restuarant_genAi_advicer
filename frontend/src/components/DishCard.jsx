export default function DishCard({ dish }) {
    return (
      <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition transform">
        <img src={dish.image_url} alt={dish.name} className="h-40 w-full object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold text-orange-700">{dish.name}</h2>
          <p className="text-gray-600 mt-2">{dish.description}</p>
          <p className="text-orange-800 font-semibold mt-2">{dish.price} ₪</p>
          <p className="text-gray-500 italic mt-1">{dish.reason}</p>
        </div>
      </div>
  );
}
