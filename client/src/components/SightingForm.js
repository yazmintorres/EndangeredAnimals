import { useEffect, useState } from "react";

const SightingForm = ({ setShow }) => {
  // get species information
  const [species, setSpecies] = useState([]);

  const getSpecies = async () => {
    const response = await fetch("http://localhost:8080/api/species");
    const species = await response.json();
    setSpecies(species);
  };

  // call getSpecies on first render
  useEffect(() => {
    getSpecies();
  }, []);

  // handle Input
  const handleChange = (eventProperty) => {
    return (e) => {};
  };

  return (
    <div className="modal">
      <div className="modal-content FormPage">
        <div className="modal-header">
          <h3 className="modal-title">Add Sighting Information</h3>
        </div>
        <div className="modal-body">
          <form>
            <fieldset>
              <legend>Please enter the individual information</legend>
              <div className="common-name-form">
                <label htmlFor="common-name">Select Common Name:</label>
                <select name="common-name" id="common-name">
                  {species.map((s) => (
                    <option key={s.species_id} value={s.species_id}>
                      {s.common_name}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
            <div className="modal-footer">
              <button className="btn btn-submit" onClick={() => setShow(false)}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { SightingForm };
