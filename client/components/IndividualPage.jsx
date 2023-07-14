import React from 'react';
import { useState, useEffect } from 'react';
import Graph from './Graph.jsx';
import DropDownMenuIP from './DropDownMenuIP.jsx';
import DropDownMenu from './DropDownMenu.jsx';
import PokemonImage from './PokemonImage.jsx';

const IndividualPage = () => {
  const [graphData, setGraphData] = useState([])
  const [pokemon, setPokemon] = useState({})
  const [moveState, setMoveState] = useState([])
  const [moveDropDownData, setMoveDropDownData] = useState([]);
  const [moveMenuValues, setMoveMenuValues] = useState([]);
  const [pokemonDropDownData, setPokemonDropDownData] = useState([]);
  const [pokemonMenuValues, setPokemonMenuValues] = useState('');
  // No Yaxis range, default 0 to 100?

  //& set pokemon to default, set moveState to default top 5 moves, set up dropDownData for move and pokemon
  useEffect(() => {


    async function fetchTopMoves() {
      try {

        //Set pokemon to info on pokemon
        const newPokemon = [987, 0]
        // setPokemon(newPokemon)
        const tester = await fetch(`api/usage/987/0`)
        const { pokeName, dexNum, formNum } = await tester.json()
        setPokemon({ pokeName: pokeName, dexNum: dexNum, formNum: formNum })

        const data = await fetch(`/api/moves/${newPokemon[0]}/${newPokemon[1]}`)
        const jsonData = await data.json();
        // console.log('dropdownmenu: ', jsonData)
        setMoveDropDownData(jsonData)

        //Slice to top 5
        //Set the states of each of the dropdowns
        const temp = jsonData.slice(0, 5)
        const newMoveState = []
        const newMoveMenuValues = []
        temp.forEach((moveObj) => {
          newMoveState.push(moveObj)
          newMoveMenuValues.push(moveObj.moveName)
        })
        setMoveState(newMoveState)
        setMoveMenuValues(newMoveMenuValues)


        // Set drop down where user can select with pokemon to show
        const data2 = await fetch('/api/usage/50')
        const jsonData2 = await data2.json();
        const newPokemonDropDownData = []
        jsonData2.forEach((pokemon) => {
          const { pokemonId, pokeName, dexNum, formNum } = pokemon
          newPokemonDropDownData.push({ pokeName: pokeName, pokemonId: pokemonId, dexNum: dexNum, formNum: formNum })
        });
        setPokemonDropDownData(newPokemonDropDownData)



        // console.log(newPokemon)
        // console.log(newMoveState)
        // console.log(newPokemonDropDownData)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchTopMoves()

  }, []);


  //& Method used for below useEffects
  //& takes in a pokemon object and updates graphData and moveMenuValues
  const fetchData = async (pokemon) => {
    try {
      // get dexNum and formNum of pokemon
      let dexNum;
      let formNum;
      if (pokemon.dexNum === undefined) {
        dexNum = 987;
        formNum = 0;
      }
      else {
        formNum = pokemon.formNum
        dexNum = pokemon.dexNum
      }
      console.log(dexNum, formNum)
      console.log(moveState)
      console.log({ moves: moveState.map(object => object.moveId) })
      const response = await fetch(`/api/moves/graph/${dexNum}/${formNum}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moves: moveState.map(object => object.moveId) }),
      });

      const newGraphData = await response.json()
      console.log('newGraphData:', newGraphData)
      setGraphData(newGraphData)

    }
    catch (err) {
      console.log(err)
    }
  }

  //& if pokemon  state changes
  //& refresh: moveState, moveDropDownData, moveMenuValues, pokemonMenuValues. also whatever is mentioned in below method
  useEffect(() => {
    // If pokemon hasnt been defined, skip this useEffect
    if (pokemon.pokeName === undefined) return

    const newPokemonRefresh = async function() {
      const { pokeName, dexNum, formNum } = pokemon;

      //~ Pull new moves for moveDropDownData
      const data = await fetch(`/api/moves/${dexNum}/${formNum}`)
      const jsonData = await data.json();
      // console.log('dropdownmenu: ', jsonData)
      setMoveDropDownData(jsonData)

      //~ Updates moveState with top 5 moves
      //~ Also sets move menu values
      //Slice to top 5
      //Set the states of each of the dropdowns
      console.log('jsondata: ', jsonData)
      const temp = jsonData.slice(0, 5)
      const newMoveState = []
      const newMoveMenuValues = []
      temp.forEach((moveObj) => {
        newMoveState.push(moveObj)
        newMoveMenuValues.push(moveObj.moveName)
      })
      setMoveState(newMoveState)
      setMoveMenuValues(newMoveMenuValues)

      //~ Changes pokemon menu value
      setPokemonMenuValues(pokeName)

    }
    newPokemonRefresh()
    fetchData(pokemon)

  }, [pokemon]);


  //& if moveState changes
  //& refresh: graphData, moveMenuValues
  useEffect(() => {
    // if move state hasnt been assigned, skip this
    if(moveState.length === 0) return
    fetchData(pokemon)
  }, [moveState]);


  return (
    <div >
      <div className='pokemon-dropdown'>
        <PokemonImage dexNum={pokemon.dexNum}/>
      <DropDownMenu dropDownData={pokemonDropDownData} key={1} index={1} menuValue={pokemonMenuValues} setPokemon={setPokemon} />
      </div>
      <div className='graphOuter'>
        <h1>{`Stats for ${pokemon.pokeName}`}</h1>
        <Graph graphData={graphData} xAxisList={moveState.map(object => object.moveName)} />
      </div>
      <div className='pokemonSelectors'>
        {moveMenuValues.map((menuValue, index) => (
          <div className='dropdown-container' key={index}>
            <DropDownMenuIP dropDownData={moveDropDownData} key={index} index={index} setMoveMenuValues={setMoveMenuValues} menuValue={menuValue} setMoveState={setMoveState} />
          </div>
        ))}
      </div>
    </div>

  );
}

export default IndividualPage