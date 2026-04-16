interface StatsCardProps {
  label: string;
  value: number | string;
  sub?: string;
  color?: "purple" | "pink" | "blue";
}

const colorMap = {
  purple: "bg-purple-600 text-white",
  pink: "bg-pink-500 text-white",
  blue: "bg-blue-500 text-white",
};

export default function StatsCard({ label, value, sub, color = "purple" }: StatsCardProps) {
  return (
    <div className={`rounded-2xl p-6 ${colorMap[color]}`}>
      <p className="text-sm opacity-80 mb-1">{label}</p>
      <p className="text-4xl font-bold">{value}</p>
      {sub && <p className="text-sm opacity-70 mt-1">{sub}</p>}
    </div>
  );
}
