import React, { FC } from "react";
import { Form } from "react-bootstrap";

interface FilterDropdownProps {
  options: string[];
  placeholderText: string;
}

const FilterDropdown: FC<FilterDropdownProps> = ({ options, placeholderText }) => {
  return (
    <Form.Select>
      <option>{placeholderText}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
};

export default FilterDropdown;
