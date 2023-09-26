import React, { useState, useEffect } from 'react';

function YearDropdown(props) {
  const [years, setYears] = useState([]);

  const  {onChange} = props
  
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearArray = Array.from({ length: currentYear - 1899 }, (_, index) => 1900 + index);
    setYears(yearArray);
  }, []);

  return (
    <div>
      <select name="year" onChange={onChange}>
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default YearDropdown;
