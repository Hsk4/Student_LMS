import type { MiniSparklineProps } from '@/types/components'

export const MiniSparkline: React.FC<MiniSparklineProps> = ({ data }) => {
  if (!data.length) return null;
  const max = Math.max(...data), min = Math.min(...data);
  return (
    <div className="flex gap-0.5 mt-1 h-5 items-end">
      {data.map((val, i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: `${18 + 12 * ((val - min) / (max - min || 1))}px`,
            background: i === data.length - 1 ? "#534AB7" : "#AFA9EC",
            borderRadius: 2,
            opacity: 0.75,
          }}
          title={String(val)}
        />
      ))}
    </div>
  );
}