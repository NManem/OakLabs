import React from 'react';
import Graph from './Graph.jsx';
import { useState, useEffect } from 'react';


const MainPage = () => {
  // add pertinent state here
  console.log('Main component is rendering')
  const [data, setData] = useState({})
  const [pokemonList, setPokemonList] = useState([]);
  const [usageData, setUsageData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    // Get top 2 pokemon + eleki + indedee + goodra for now
    async function fetchData() {
      console.log('inside fetch data')
      try {
        const responses = await Promise.all([
          // fetch('/api/usage/987/0'),
          // fetch('/api/usage/892/1'),
          // fetch('/api/usage/876/1'),
          // fetch('/api/usage/894/0'),
          fetch('/api/usage/706/1')
        ])
        // Decode JSON responses and get data

        const data = await Promise.all(responses.map(response => response.json()));

        console.log('data: ', data)
        const newPokemonList = [];
        const newUsageData = [];
        const newTimestamps = [];
        data.forEach( (pokemon) => {
          const {pokeName, dexNum, formNum, rankData} = pokemon;
          newPokemonList.push({pokeName: pokeName, dexNum: dexNum, formNum: formNum})
          newUsageData.push(rankData)
          rankData.forEach( (timeObj) => {
            if (!newTimestamps.includes(timeObj.timestamp)) newTimestamps.push(timeObj.timestamp)
          })
        })
        newTimestamps.sort()
        console.log(newPokemonList)
        console.log(newUsageData)
        console.log(newTimestamps)
      }
      catch (err) {
        console.log(err)
      }
    }
    console.log('test123')
    fetchData()
  }, []);

  return (
    <div >
      <h1>Main Page</h1>
      <Graph />
    </div>
  );
}

export default MainPage;