import React from 'react';
import { useState } from 'react';

const DropDownMenu = (props) => {
    const { dropDownData, index, pokeName, pokeObj, setPokemonList } = props;
    //TODO: Need to change below line so that it also works for moves
  
    // Fetch new data for new value
    // setPokemonList
    // TODO: SEE HOW TO UPDATE GRAPH DATA
    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    return (
      <select value={selectedOption} onChange={handleChange}>
        {dropDownData.map((option) => (
          <option key={option._id} value={option.pokeName}>
            {option.pokeName}
          </option>
        ))}
      </select>
    );
  };
  

export default DropDownMenu;