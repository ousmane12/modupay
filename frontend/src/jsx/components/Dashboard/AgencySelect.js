import React from "react";
import Select from "react-select";

const AgencySelect = ({ options, onSelect }) => {
  const formattedOptions = options.map((user) => ({
    label: `${user.name}`,
    value: user._id,
  }));

  const handleChange = (selectedOption) => {
    onSelect(selectedOption ? selectedOption.value : null);
  };

  return (
    <div style={{ minHeight: "60px" }}>
      <Select
        options={formattedOptions}
        onChange={handleChange}
        isClearable={true}
      />
    </div>
  );
};

export default AgencySelect;