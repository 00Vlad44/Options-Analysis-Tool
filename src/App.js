import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import OptionSwitch from './Switch'
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    delta: '',
    theta: '',
    gammma: '',
    vega: '',
    rho: '',
    Price: '',
    Strike_Price: '',
    IV: '',
    Stock_Price: ''
  });
  let navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };
  const handleSubmit = () => {
    navigate('/report', { state: formData });
  };
  return (
    <div>
      <header className="App-header">
      
      
    
      <div className='table'>
        <div style={{paddingLeft : '34.5%'}}>
          <OptionSwitch></OptionSwitch>
        </div>
        <div className='row'>
          <TextField id ="delta" onChange = {handleChange} label="Δ Delta" 
            variant= "standard" InputLabelProps={{ className: 'text_field'}} sx ={{ input: { color: 'white', width: '150%' }} }/>

          <TextField id ="theta" onChange = {handleChange} label="θ Theta" 
            variant= "standard" InputLabelProps={{ className: 'text_field'}} sx ={{ input: { color: 'white', width: '150%' }} }/>
            
          <TextField id ="gamme" onChange = {handleChange} label="Γ Gamma" 
            variant= "standard" InputLabelProps={{ className: 'text_field'}} sx ={{ input: { color: 'white', width: '150%' }} }/>
        </div>

        <div className='row'>        
          <TextField id ="gamma" onChange = {handleChange} label="𝜈 Vega" 
            variant= "standard" InputLabelProps={{ className: 'text_field'}} sx ={{ input: { color: 'white', width: '150%' }} }/>
                    
          <TextField id ="rho" onChange = {handleChange} label="Rho" 
            variant= "standard" InputLabelProps={{ className: 'text_field'}} sx ={{ input: { color: 'white', width: '150%' }} }/>

          <TextField id ="Strike_Price" onChange = {handleChange} label="Strike Price" 
            variant= "standard" InputLabelProps={{ className: 'text_field'}} sx ={{ input: { color: 'white', width: '150%' }} }/>
        </div>

        <div className='row'>
          <TextField id ="Price" onChange = {handleChange} label="Price per Contract" 
            variant= "standard" InputLabelProps={{ className: 'text_field'}} sx ={{ input: { color: 'white' , width: '150%' }} }/>

          <TextField id ="IV" onChange = {handleChange} label="Implied Volatitly" 
                  variant= "standard" InputLabelProps={{ className: 'text_field'}} sx ={{ input: { color: 'white', width: '150%' }} }/>
                  
          <TextField id ="Stock_Price" onChange = {handleChange} label="Stock Price" 
                  variant= "standard" InputLabelProps={{ className: 'text_field'}} sx ={{ input: { color: 'white', width: '150%' }} }/>
        </div>

      </div>   
      </header>
      <div className='spacing'>
        <Button variant="contained" onClick={handleSubmit}>Run Report</Button>
      </div>   
    </div>   
  );
}

export default App;
