import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";

export const ChartFertilizer = () => {
  const data = [
    { name: "Mon", val: 20 },
    { name: "Tue", val: 45 },
    { name: "Wed", val: 30 },
    { name: "Thu", val: 80 },
    { name: "Fri", val: 40 },
  ];
  return (
    <div className="h-24 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="val"
            stroke="#16a34a"
            fillOpacity={1}
            fill="url(#colorGreen)"
            strokeWidth={3}
          />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
