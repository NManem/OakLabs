import React from 'react';
import { VictoryLine, VictoryChart, VictoryScatter, VictoryTheme, VictoryAxis } from 'victory';

// Your data
const data = [
  { date: new Date(2023, 7, 8), rank: 5 },
  { date: new Date(2023, 7, 9), rank: 10 },
  { date: new Date(2023, 7, 10), rank: 15 },
  // Add as many objects as you need
];

// Custom component for scatter point (icon)
const Point = (props) => {
  const { x, y } = props;
  return <image xlinkHref="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10191.png" x={x - 10} y={y - 10} height="20" width="20" />;
};

const GraphTwo = () => (
  <VictoryChart theme={VictoryTheme.material}>
    <VictoryAxis
      scale="time"
      standalone={false}
    />
    <VictoryAxis
      dependentAxis
      domain={[0, 20]} // Customize your y-axis domain
      standalone={false}
    />
    <VictoryLine
      data={data}
      x="date"
      y="rank"
    />
    <VictoryScatter
      data={data}
      x="date"
      y="rank"
      size={7}
      dataComponent={<Point />}
    />
  </VictoryChart>
);

export default GraphTwo;
