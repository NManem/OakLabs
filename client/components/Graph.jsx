import React from 'react';
import { useState, useEffect } from 'react';
import { ScatterChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter, Label } from 'recharts';

//^ Data format
// Array of objects
// Each object is the data for that given date
// date: date, Pokemon Name: data for that pkmn, pokemon name: data for that pkmn, etc.

// Your data
// const data = [
//   { date: '2023-07-08', rank1: 5, rank2: 3 },
//   { date: '2023-07-09', rank1: 10, rank2: 7 },
//   { date: '2023-07-10', rank1: 15, rank2: 11 },
//   // Add as many objects as you need
// ];

const colors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#0088fe",
  "#00c49f",
  "#ffbb28",
  "#ff8042",
  "#6610f2",
  "#6f42c1",
  "#e83e8c"
];

//TODO: add Icons to the charts
const Graph = (props) => {

  const { title, graphData, yaxisRange, pokemonList, type } = props;

  // convert date to timestamps for graph to read it
  graphData.forEach(dataObj => {
    // store timestamp instead of date string
    dataObj.date = new Date(dataObj.date).getTime();
  });

  // Get all pokemon names in an array
  const dataKeys = [];
  pokemonList.forEach((pokemonObj) => {
    dataKeys.push(pokemonObj.pokeName);
  });

  // default ticker function
  var tick = {
    func: function (t) {
      return t
    }
  }

  // If usage chart, need to reverse the ranks so it appears correctly
  if (type === 'usage') {
    console.log('YIPEEE')
    for (let dataobj of graphData) {
      // console.log(dataobj)
      for (let key in dataobj) {
        // console.log(key)
        if (key !== 'date') dataobj[key] *= -1
        // console.log(dataobj[key])
      }
    }

    //change axis for chart
    yaxisRange[0] *= -1
    yaxisRange[1] *= -1

    // change function
    tick.func = function (t) {
      return -1 * t
    }

  }
  // console.log('updated data: ', graphData)


  return (
    <div className='graph'>
      <ScatterChart
        width={500}
        height={300}
        data={graphData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        {/* <Label value={title} position="top" /> */}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" type="number" domain={['dataMin', 'dataMax']} tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()} name='date' />


        {/* <YAxis type="number" domain={[0, 20]} tickFormatter={(tickItem) => 20 - tickItem} /> // Customize your y-axis domain */}
        <YAxis type="number" domain={[-1, -20]} tickFormatter={(tickItem) => tick.func(tickItem)} /> // Customize your y-axis domain
        <Tooltip />
        <Legend />
        {/* <Line type="monotone" dataKey="rank1" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Scatter dataKey="rank1"/>
        <Line type="monotone" dataKey="rank2" stroke="#82ca9d" activeDot={{ r: 8 }} />
        <Scatter dataKey="rank2" /> */}
        {/* {dataKeys.map((key, index) => (
          <>
            <Line type="monotone" dataKey={key} key={key + "line"} stroke={colors[index % colors.length]} activeDot={{ r: 8 }} />
            <Scatter dataKey={key} key={key + "scatter"} fill={colors[index % colors.length]} />
          </>
        ))} */}
        {dataKeys.map((key, index) => (
          <>
            <Scatter name={key} dataKey={key} fill={colors[index % colors.length]} shape="circle" key={key} line />
            {/* <Line type="monotone" dataKey={key} stroke={colors[index % colors.length]} dot={false} /> */}
          </>
        ))}



      </ScatterChart>
    </div>
  );
}

export default Graph;
