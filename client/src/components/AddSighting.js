import { useState } from "react";
import { SightingForm } from "./SightingForm";

function AddSighting() {
  const [show, setShow] = useState(false);

  const handleAddClick = () => setShow(!show);

  return (
    <>
      <button onClick={handleAddClick} className="btn btn-add">
        Add Sighting
      </button>
      {show ? <SightingForm setShow={setShow} /> : null}
    </>
  );
}

export default AddSighting;
