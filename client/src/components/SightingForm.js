import { useEffect, useState } from "react";

const SightingForm = ({ setShow }) => {
  // create a state to keep track of the species the user selects

  const [selectedSpecies, setSelectedSpecies] = useState(null);

  // get all species information
  const [species, setSpecies] = useState([]);
  const [individualsOfSpecies, setIndividualsOfSpecies] = useState([]);

  const getSpecies = async () => {
    const response = await fetch("http://localhost:8080/api/species");
    const species = await response.json();
    setSpecies(species);
  };

  // call getSpecies on first render
  useEffect(() => {
    getSpecies();
  }, []);

  // when selectedSpecies is updated, make this request
  // get all individuals of a specific species type when the selectedSpecies state is updated
  useEffect(async () => {
    const response = await fetch(
      `http://localhost:8080/api/individuals/${selectedSpecies}`
    );
    const individuals = await response.json();
    console.log(individuals);
    setIndividualsOfSpecies(individuals);
  }, [selectedSpecies]);

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
                <select name="nickName" id="nick-name">
                  <option value="null">Select One</option>
                  {individualsOfSpecies.map((ind) => (
                    <option key={ind.individual_id} value={ind.individual_id}>
                      {ind.nick_name}
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
