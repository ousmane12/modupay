import React from "react";
import Select from "react-select";

const CustomSelectCountry = ({ options, onSelect }) => {
  const formattedOptions = options.map((country) => ({
    label: `${country?.name}`,
    value: country._id,
  }));

  const handleChange = (selectedOption) => {
    onSelect(selectedOption ? selectedOption.value : null);
  };

  return (
    <div style={{ minHeight: "90px" }} className="form-group">
      <Select
        options={formattedOptions}
        onChange={handleChange}
        isClearable={true}
      />
    </div>
  );
};

export default CustomSelectCountry;