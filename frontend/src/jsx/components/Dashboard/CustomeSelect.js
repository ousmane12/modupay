import React from "react";
import Select from "react-select";

const CustomSelect = ({ options, onSelect }) => {
  const formattedOptions = options.map((user) => ({
    label: `${user.firstName} ${user.lastName} ---- ${user.phoneNumber}`,
    value: user._id,
  }));

  const handleChange = (selectedOption) => {
    onSelect(selectedOption ? selectedOption.value : null);
  };

  return (
    <div style={{ minHeight: "80px" }}>
      <Select
        options={formattedOptions}
        onChange={handleChange}
        isClearable={true}
      />
    </div>
  );
};

export default CustomSelect;