import React from 'react';
import { useState } from 'react';

const DropDownMenu = (props) => {
  // const { dropDownData, index, pokeName, pokeObj, setPokemonList } = props;
  const { dropDownData, setGraphState, index, menuValue, setMenuValues, setPokemon } = props


  const handleChange = (event) => {
    console.log(event.target.value)
    const selectedPokemonName = event.target.value;
    const selectedPokemon = dropDownData.find(pokemon => pokemon.pokeName === selectedPokemonName);
    console.log(selectedPokemon)
    if (setMenuValues !== undefined) {
      setMenuValues(prevMenuValues => {
        const newMenuValues = [...prevMenuValues];
        newMenuValues[index] = selectedPokemon.pokeName;
        return newMenuValues;
      });
    }
    if (setGraphState !== undefined) {
      setGraphState(prevState => {
        const newState = [...prevState]; // clone the previous state
        newState[index] = [selectedPokemon.dexNum, selectedPokemon.formNum]; // update the index
        return newState;
      });
    }
    if (setPokemon !== undefined) {
      setPokemon({ pokeName: selectedPokemon.pokeName, dexNum: selectedPokemon.dexNum, formNum: selectedPokemon.formNum })
    }

  }


  return (

    <div className="dropdown">
      <select className='dropdown-menu' value={menuValue} onChange={handleChange}>
        {dropDownData.map((pokemon, index) => (
          <option key={index} index={index} value={pokemon.pokeName}>
            {pokemon.pokeName}
          </option>
        ))}
      </select>
    </div>
  );
};


export default DropDownMenu;