export default function EntrepreneurCard({ person, onClick }) {
  return (
    <div
      onClick={() => onClick(person)}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition duration-300 hover:shadow-xl"
    >
      <div className="relative">
        {/* Profile Image */}
        <img
          src={person.profile_image}
          alt={person.name}
          className="h-84 w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 flex flex-col justify-start items-start p-4 text-white">
          <p className="text-sm font-medium">
            Hello there 👋
          </p>

          <h2 className="text-xl font-bold">
            Meet
          </h2>
        </div>
      </div>

      {/* Entrepreneur Information */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-slate-900">
          {person.name}
        </h3>

        {person.title && (
          <p className="text-gray-600 mt-1">
            {person.title}
          </p>
        )}

        {/* Short Bio */}
        {person.bio && (
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">
            {person.bio}
          </p>
        )}

        {/* View Profile */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClick(person);
          }}
          className="mt-4 text-sm font-semibold text-blue-700 hover:text-blue-900"
        >
          View Profile →
        </button>
      </div>
    </div>
  );
}