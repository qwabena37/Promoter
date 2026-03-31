export default function EntrepreneurCard({ person, onClick }) {
  return (
    <div
      onClick={() => onClick(person)}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition"
    >
      <img src={person.image} className="h-84 w-full object-cover" />

      <div className="p-4">
        <h3 className="font-bold text-lg">{person.name}</h3>
        <p className="text-gray-600">{person.title}</p>
        <p className="text-gray-600">{person.location}</p>
      </div>
    </div>
  );
}