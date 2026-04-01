export default function EntrepreneurCard({ person, onClick }) {
  return (
    <div
      onClick={() => onClick(person)}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition"
    >
      <div className="relative">
        {/* Image */}
        <img
          src={person.image}
          className="h-84 w-full object-cover"
        />

        {/* Overlay Text */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex flex-col justify-start items-start p-4 text-white">
          <p className="text-sm font-medium">Hello there 👋</p>
          <h2 className="text-xl font-bold">Meet</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg">{person.name}</h3>
        <p className="text-gray-600">{person.title}</p>
        <p className="text-gray-600">{person.location}</p>
      </div>
    </div>
  );
}