import React from "react";
import Select from "react-select";

const CustomSelect = ({ options, onSelect, value }) => {
  const formattedOptions = options.map((user) => ({
    label: `${user.name} ---- ${user.phoneNumber} ---- ${user.role}`,
    value: user._id,
  }));

  const handleChange = (selectedOption) => {
    onSelect(selectedOption ? selectedOption.value : null);
  };

  // Trouver l'option correspondant à la valeur par défaut
  const defaultOption = formattedOptions.find((option) => option.value === value);

  return (
    <div style={{ minHeight: "80px" }}>
      <Select
        options={formattedOptions}
        onChange={handleChange}
        isClearable={true}
        value={defaultOption} // Utilise l'option correspondante comme valeur par défaut
      />
    </div>
  );
};

export default CustomSelect;