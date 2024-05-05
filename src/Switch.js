import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function OptionSwitch() {
  const [isPutOption, setIsPutOption] = useState(false); 

  const handleChange = (event) => {
    setIsPutOption(event.target.checked);
  };

  // Define label dynamically based on the switch state
  const label = isPutOption ? 'Put Options' : 'Call Options';
  // Dynamically set label placement based on the label
  const label_placement = label === 'Call Options' ? 'start' : 'end';
  // Change color
  const swith_color = label == 'Call Options' ? '#4CAF50' : '#F44336';

  return (
    <div>
      <FormControlLabel
        control = {<Switch checked={isPutOption} onChange={handleChange} />}
        label = {label}
        labelPlacement ={label_placement}
        sx = {{color : swith_color}}
      />
    </div>
  );
}

export default OptionSwitch;
