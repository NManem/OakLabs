import React from 'react';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter } from 'recharts';

// Your data
const data = [
  { date: '2023-07-08', rank1: 5, rank2: 3 },
  { date: '2023-07-09', rank1: 10, rank2: 7 },
  { date: '2023-07-10', rank1: 15, rank2: 11 },
  // Add as many objects as you need
];

// const CustomLegend = () => (
//   <div className="custom-legend">
//     <span>
//       <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/987.png' alt='Rank 1' style={{ height: '20px', width: '20px' }} />
//       Rank 1
//     </span>
//     <span>
//       <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10191.png' alt='Rank 2' style={{ height: '20px', width: '20px' }} />
//       Rank 2
//     </span>
//   </div>
// );



const CustomLegend = (props) => {
  const { color, payload } = props;
  return (
    <div className="custom-legend">
      {payload.map((entry, index) => (
        <span key={`item-${index}`} style={{ color: entry.color }}>
          <img src={entry.value} alt='Rank' style={{ height: '20px', width: '20px' }} />
          {entry.id}
        </span>
      ))}
    </div>
  );
};


const Graph = (props) => {

  return (
    <div >
      <h1>Graph</h1>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis type="number" domain={[0, 20]} /> // Customize your y-axis domain
        <Tooltip />
        {/* <Legend
          wrapperStyle={{
            width: '100%',
            paddingLeft: '25%', // Adjust this to center the legend
            fontFamily: 'Arial', // Adjust this to change the font
            fontSize: '1em', // Adjust this to change the font size
            boxSizing: 'border-box'
          }}
          content={<CustomLegend />}
          payload={[
            { id: 'Rank 1', value: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/987.png', type: 'line', color: '#8884d8' },
            { id: 'Rank 2', value: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10191.png', type: 'line', color: '#82ca9d' }
          ]}
        />         */}
        <Legend />
        <Line type="monotone" dataKey="rank1" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Scatter dataKey="rank1"/>
        <Line type="monotone" dataKey="rank2" stroke="#82ca9d" activeDot={{ r: 8 }} />
        <Scatter dataKey="rank2" />
      </LineChart>
    </div>
  );
}

export default Graph;
