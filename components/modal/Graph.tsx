import { get } from "http";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Graph = ({ data }) => {
  if (!data || !data.length) return <div>No chart data provided</div>;
  // Array of keys to be used for the graph
  const keys = Object.keys(data[0]).filter((key) => key !== "timestamp");

  function getDarkColor() {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys.map((key, index) => {
          const randomColor = getDarkColor();
          return (
            <Line
              key={key + index}
              type="monotone"
              dataKey={key}
              stroke={randomColor}
              activeDot={index === 0 ? { r: 8 } : undefined}
            />
          );
        })}
        ;
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
