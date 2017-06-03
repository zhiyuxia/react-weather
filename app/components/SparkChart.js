import React from "react";
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

export const SparkChart = ({ data, color, units }) => {
  const average = (array) => {
    let sum = array.reduce((acc, cur) => acc + cur, 0);
    return Math.round(sum / (array.length));
  };
  return (
    <div>
      <Sparklines data={data} width={40} height={30} margin={1}>
        <SparklinesLine color={color} />
        <SparklinesReferenceLine type="avg" />
      </Sparklines>
      <div>
        平均值为: {average(data)}{units}
      </div>
    </div>

  );
};