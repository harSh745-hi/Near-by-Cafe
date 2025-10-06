function CafeList({ cafes, onSelect }) {
  return (
    <div className="sidebar">
      <h2> Cafes Nearby</h2>
      {cafes.length === 0 ? (
        <p>Loading cafes...</p>
      ) : (
        <ul>
          {cafes.map((cafe, i) => (
            <li key={i} onClick={() => onSelect(cafe)}>
              {cafe.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CafeList;
