function Card({ title }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 cursor-pointer border">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

      <p className="text-gray-500 mt-2 text-sm">
        View detailed analytics and AI-generated insights.
      </p>
    </div>
  );
}

export default Card;
