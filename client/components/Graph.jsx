import React from 'react';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter } from 'recharts';


const Graph = (props) => {

  // Custom scatter shape (icon)
  const renderIcon = (props) => {
    const { cx, cy } = props;
    return <image xlinkHref="icon-url" x={cx} y={cy} height={20} width={20} />;
  };


  return (
    <div >
      <h1>Graph</h1>
      {/* <p>{JSON.stringify(data)}</p> */}
    </div>
  );
}

export default Graph;