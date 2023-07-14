import React from 'react';
import Graph from './Graph.jsx';
import { useState, useEffect } from 'react';
import DropDownMenu from './DropDownMenu.jsx';
import PokemonImage from './PokemonImage.jsx';

const MainPage = () => {
  // add pertinent state here
  console.log('Main component is rendering')
  const [graphData, setGraphData] = useState([])
  const [yaxisRange, setYaxisRange] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [graphState, setGraphState] = useState([])
  const [dropDownData, setDropDownData] = useState([]);
  const [menuValues, setMenuValues] = useState([]);
  const [imageStates, setImageStates] = useState([]);


  //& sets default values of state on start up
  useEffect(() => {
    const newGraphState = [[987, 0], [892, 1], [641, 0], [1002, 0], [149, 0]];
    setGraphState(newGraphState)

    async function fetchTopPokemon() {
      try {
        const data = await fetch('/api/usage/50')
        const jsonData = await data.json();
        // console.log('json tester here: ', jsonData)
        // set the data so key is pokemon name and value is object with values
        const res = []
        jsonData.forEach((pokemon) => {
          const { pokemonId, pokeName, dexNum, formNum } = pokemon
          res.push({ pokeName: pokeName, pokemonId: pokemonId, dexNum: dexNum, formNum: formNum })
        });
        // console.log(res)
        setDropDownData(res)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchTopPokemon()

  }, [])

  //& updated graph data and axis when graphState changes
  useEffect(() => {
    //console.log('we inside baby')
    if (graphState.length === 0) return
    //console.log('inside: ', graphState)
    async function fetchData() {

      // Fetches data for each state in graphState
      const fetchArray = graphState.map(([dexNum, formNum]) =>
        fetch(`/api/usage/${dexNum}/${formNum}`)
      );
      const responses = await Promise.all(fetchArray);
      const data = await Promise.all(responses.map(response => response.json()));

      // console.log('data: ', data)
      const timestampsAndRankData = {};
      const newPokemonList = [];
      const newYaxisRange = [null, null]
      const newMenuValues = []
      data.forEach((pokemon) => {
        const { pokeName, dexNum, formNum, rankData } = pokemon;
        newPokemonList.push({ pokeName: pokeName, dexNum: dexNum, formNum: formNum })
        newMenuValues.push(pokeName)
        rankData.forEach((timeObj) => {
          const currTimestamp = timeObj.timestamp;
          const currRank = timeObj.rank * -1;
          //Set Yaxis Range
          if (newYaxisRange[0] === null || currRank < newYaxisRange[0]) newYaxisRange[0] = currRank;
          if (newYaxisRange[1] === null || currRank > newYaxisRange[1]) newYaxisRange[1] = currRank;
          //Add to timestampsAndRankData
          if (currTimestamp in timestampsAndRankData === false) {
            timestampsAndRankData[currTimestamp] = {};
            timestampsAndRankData[currTimestamp].date = currTimestamp
          }
          timestampsAndRankData[currTimestamp][pokeName] = currRank;

        })
      });

      // convert timestampsAndRankData to an array so graph can read it
      const newGraphData = [];
      for (let timestamp in timestampsAndRankData) {
        newGraphData.push(timestampsAndRankData[timestamp]);
      }

      // inverse the range cuz graph us weird for ranks
      yaxisRange[0] *= -1
      yaxisRange[1] *= -1


      // console.log(newGraphData)
      // console.log(newYaxisRange)
      // console.log(newPokemonList)
      console.log(newMenuValues)
      setGraphData(newGraphData)
      setYaxisRange(newYaxisRange)
      setPokemonList(newPokemonList)
      setMenuValues(newMenuValues)


    }
    try {
      fetchData()
    }
    catch (err) {
      console.log(err)
    }

  }, [graphState])

  // console.log(pokemonList)
  //~ may need to delete
  // const handleDropDownChange = (index, value) => {
  //   setSelectedOptions((prevOptions) => {
  //     const newOptions = [...prevOptions];
  //     newOptions[index] = value;
  //     return newOptions;
  //   });
  // };

  return (
    <div>
      <div className='graphOuter'>
        <h1>Top Usage Pokemon</h1>
        {/* <p>{JSON.stringify(data)}</p> */}
        <Graph type='usage' graphData={graphData} yaxisRange={yaxisRange} xAxisList={pokemonList.map(object => object.pokeName)} />
      </div>
      <div className='pokemonSelectors'>
        {menuValues.map((menuValue, index) => (
          <div className='dropdown-container' key={index}>
            <PokemonImage dexNum={graphState[index][0]} />
            <DropDownMenu dropDownData={dropDownData} key={index} index={index} menuValue={menuValue} setMenuValues={setMenuValues} setGraphState={setGraphState} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;