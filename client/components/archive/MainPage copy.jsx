import React from 'react';
import Graph from './Graph.jsx';
import { useState, useEffect } from 'react';
import DropDownMenu from './DropDownMenu.jsx';

const MainPage = () => {
  // add pertinent state here
  console.log('Main component is rendering')
  const [graphData, setGraphData] = useState([])
  const [yaxisRange, setYaxisRange] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [dropDownData, setDropDownData] = useState([]);



  useEffect(() => {
    //& Fetch initial data from DBs
    // Get top 2 pokemon + eleki + indedee + goodra for now
    async function fetchData() {
      console.log('inside fetch data')
      try {
        //TODO: Make the fetch requests dynamic
        const responses = await Promise.all([
          fetch('/api/usage/987/0'),
          fetch('/api/usage/892/1'),
          fetch('/api/usage/876/1'),
          fetch('/api/usage/894/0'),
          fetch('/api/usage/706/1')
        ])
        // Decode JSON responses and get data

        const data = await Promise.all(responses.map(response => response.json()));

        console.log('data: ', data)
        const timestampsAndRankData = {};
        const newPokemonList = [];
        const newYaxisRange = [null, null]
        data.forEach((pokemon) => {
          const { pokeName, dexNum, formNum, rankData } = pokemon;
          newPokemonList.push({ pokeName: pokeName, dexNum: dexNum, formNum: formNum })
          rankData.forEach((timeObj) => {
            const currTimestamp = timeObj.timestamp;
            const currRank = timeObj.rank;
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

        // console.log(newGraphData)
        // console.log(newYaxisRange)
        // console.log(newPokemonList)
        setGraphData(newGraphData)
        setYaxisRange(newYaxisRange)
        setPokemonList(newPokemonList)

      }
      catch (err) {
        console.log(err)
      }
    }
    //& Fetch top 50 pokemon to pass to dropdown menu
    async function fetchTopPokemon() {
      try {
        const data = await fetch('/api/usage/50')
        const jsonData = await data.json();
        console.log('json tester here: ', jsonData)
        setDropDownData(jsonData);
      }
      catch (err) {
        console.log(err)
      }
    }
    console.log('test123')
    fetchData()
    fetchTopPokemon() //! WHY DOES THIS MESS UP MY GRAPH
  }, []);

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
        <Graph type='usage' title={'Top Usage Pokemon'} graphData={graphData} yaxisRange={yaxisRange} pokemonList={pokemonList} />
      </div>
      <div className='pokemonSelectors'>
        {/* <DropDownMenu dropDownData={dropDownData} /> */}
        {/* {[0, 1, 2, 3, 4].map((index) => (
          <DropDownMenu key={index} index={index} dropDownData={dropDownData} pokeName={pokemonList[index].pokeName} pokeObj={pokemonList[index]}  setPokemonList={setPokemonList} />
        ))} */}
      </div>
    </div>
  );
}

export default MainPage;