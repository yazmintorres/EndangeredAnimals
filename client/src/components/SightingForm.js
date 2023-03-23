import { useEffect, useState } from "react";

const SightingForm = ({ setShow }) => {
  // create a state to keep track of the species and specific individual the user selects --> these are id numbers
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [selectedIndividual, setSelectedIndividual] = useState(null);

  // get all species and individuals of a certain species information --> these are arrays
  const [species, setSpecies] = useState([]);
  const [individualsOfSpecies, setIndividualsOfSpecies] = useState([]);

  // get species on first render
  const getSpecies = async () => {
    const response = await fetch("http://localhost:8080/api/species");
    const species = await response.json();
    setSpecies(species);
  };

  useEffect(() => {
    getSpecies();
  }, []);

  // when selectedSpecies is updated, make this request
  // get all individuals of a specific species type when the selectedSpecies state is updated
  useEffect(async () => {
    if (selectedSpecies) {
      const response = await fetch(
        `http://localhost:8080/api/individuals/${selectedSpecies}`
      );
      const individuals = await response.json();
      console.log(individuals);
      setIndividualsOfSpecies(individuals);
    }
  }, [selectedSpecies]);

  useEffect(() => {
    console.log(selectedIndividual);
  }, [selectedIndividual]);

  // handle Input
  const handleChange = (eventProperty) => {
    return (e) => {
      console.log(e.target);
    };
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
                <select
                  name="commonName"
                  id="common-name"
                  onChange={(e) => setSelectedSpecies(e.target.value)}
                >
                  <option value="null">Select One</option>
                  {species.map((s) => (
                    <option key={s.species_id} value={s.species_id}>
                      {s.common_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="nick-name-form">
                <label htmlFor="nick-name">Nick Name:</label>
                <select
                  name="nickName"
                  id="nick-name"
                  onChange={(e) => setSelectedIndividual(e.target.value)}
                >
                  <option value="null">Select One</option>
                  {individualsOfSpecies.map((ind) => (
                    <option key={ind.individual_id} value={ind.individual_id}>
                      {ind.nick_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="health-form">
                <label htmlFor="health">Health Status</label>
                <select name="health" id="health">
                  <option value="null">Select One</option>
                  <option value="healthy">Healthy</option>
                  <option value="unhealthy">Unhealthy</option>
                </select>
              </div>

              {/* INPUT OF TYPE DATETIME-LOCAL */}
              <div className="date-time-form">
                <label htmlFor="date-time">Date and time of last seen</label>
                <input
                  type="datetime-local"
                  // how do i restrict user from inputting a time later than the current time?
                  max={new Date().toISOString().slice(0, -8)}
                />
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
