import React from 'react';
import { useState } from 'react';

const DropDownMenuIP = (props) => {
  // const { dropDownData, index, pokeName, pokeObj, setPokemonList } = props;
  const { dropDownData, setGraphState, index, menuValue, setMoveState, setMoveMenuValues } = props


  const handleChange = (event) => {
    console.log('finally here world')
    console.log(event.target.value)
    const selectedPokemonMove = event.target.value;
    const selectedMove = dropDownData.find(move => move.moveName === selectedPokemonMove);
    console.log(selectedMove)
    setMoveState(prevMoveValues => {
      const newMoveValues = [...prevMoveValues];
      newMoveValues[index] = selectedMove;
      return newMoveValues;
    });
    setMoveMenuValues(prevMoveMenuValues => {
      const newMoveMenuValues = [...prevMoveMenuValues];
      newMoveMenuValues[index] = selectedMove.moveName;
      return newMoveMenuValues;
    });  //   setGraphState(prevState => {
  //     const newState = [...prevState]; // clone the previous state
  //     newState[index] = [selectedPokemon.dexNum, selectedPokemon.formNum]; // update the index
  //     return newState;
  //   });
  }

  return (

    <div className="dropdown">
      <select className='dropdown-menu' value={menuValue} onChange={handleChange}>
        {dropDownData.map((move, index) => (
          <option key={index} index={index} value={move.moveName}>
            {move.moveName}
          </option>
        ))}
      </select>
    </div>
  );
};


export default DropDownMenuIP;