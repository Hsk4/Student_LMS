import React from "react";

export interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  trend?: {
    type: "up" | "down" | "none";
    value: string;
  };
  sparkData?: number[];
  children?: React.ReactNode;
  iconBgColor?: string; // New prop for custom icon background
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  trend,
  sparkData,
  children,
  iconBgColor = "bg-indigo-100",
}) => {
  // Map color class names to mockup hex colors
  const colorMap: { [key: string]: string } = {
    "bg-purple-100": "#EEEDFE",
    "bg-green-100": "#EAF3DE",
    "bg-amber-100": "#FAEEDA",
    "bg-red-100": "#FCEBEB",
  };

  const bgColorHex = colorMap[iconBgColor] || "#e0e7ff"; // fallback to indigo-100

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md hover:border-slate-200 transition-all" style={{ borderWidth: '0.5px' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-lg text-slate-700" style={{ backgroundColor: bgColorHex }}>
          {icon}
        </div>
        {trend && trend.type !== "none" && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            trend.type === "up" 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {trend.type === "up" ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
      <div className="mb-1">
        <div className="text-2xl md:text-3xl font-bold text-slate-900">{value}</div>
        <div className="text-xs md:text-sm text-slate-600 mt-1">{label}</div>
      </div>
      {children}
      {sparkData && <MiniSparkline data={sparkData} />}
    </div>
  );
};

interface MiniSparklineProps {
  data: number[];
}
export const MiniSparkline: React.FC<MiniSparklineProps> = ({ data }) => {
  if (!data.length) return null;
  const max = Math.max(...data), min = Math.min(...data);
  return (
    <div className="flex gap-1 mt-4 items-end h-8">
      {data.map((val, idx) => (
        <div
          key={idx}
          className="flex-1 rounded transition-all hover:opacity-100"
          style={{
            height: `${8 + 12 * ((val - min) / (max - min || 1))}px`,
            background: idx === data.length - 1 ? "#6366f1" : "#c7d2fe",
            opacity: 0.8,
          }}
          title={`Value: ${val}`}
        />
      ))}
    </div>
  );
};