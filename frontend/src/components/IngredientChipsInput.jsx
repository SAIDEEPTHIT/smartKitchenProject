import React, { useState } from "react";

const IngredientChipsInput = ({ onChange }) => {
  const [value, setValue] = useState("");
  const [chips, setChips] = useState([]);

  const addChip = () => {
    const v = value.trim().toLowerCase();
    if (!v || chips.includes(v)) return;

    const updated = [...chips, v];
    setChips(updated);
    onChange(updated);
    setValue("");
  };

  const removeChip = (chip) => {
    const updated = chips.filter((c) => c !== chip);
    setChips(updated);
    onChange(updated);
  };

  return (
    <div className="chips-input">
      <div className="chips-row">
        {chips.map((chip) => (
          <span className="chip" key={chip}>
            {chip}
            <button className="chip-close" onClick={() => removeChip(chip)}>
              ×
            </button>
          </span>
        ))}

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addChip()}
          placeholder="Add ingredients…"
          className="chips-text"
        />

        <button className="btn btn-small" onClick={addChip}>Add</button>
      </div>
    </div>
  );
};

export default IngredientChipsInput;
