function SightingRow({
  commonName,
  isHealthy,
  lastSeen,
  location,
  nickName,
  scientificName,
}) {
  return (
    <tr>
      <td>{nickName}</td>
      <td>{commonName}</td>
      <td>{isHealthy ? "Healthy" : "Unhealthy"}</td>
      <td>{location}</td>
      <td>{new Date(lastSeen).toLocaleString()}</td>
      <td>
        <button className="btn btn-details">Details</button>
      </td>
      <td>
        <button className="btn btn-delete">Delete</button>
      </td>
    </tr>
  );
}

export default SightingRow;
