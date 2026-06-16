import { STAT_DISPLAY, STAT_ORDER } from "@/lib/stats";
import type { Stat } from "@/types/sheet";

type Point = {
  x: number;
  y: number;
};

export function StatRadarChart({ stats }: { stats: Record<Stat, number> }) {
  const center = 150;
  const radius = 92;
  const maxStat = Math.max(10, ...STAT_ORDER.map((stat) => stats[stat]));
  const ringLevels = [0.25, 0.5, 0.75, 1];
  const axisPoints = STAT_ORDER.map((_, index) => pointAt(index, radius, center));
  const statPoints = STAT_ORDER.map((stat, index) =>
    pointAt(index, radius * (stats[stat] / maxStat), center),
  );

  return (
    <div className="mt-4">
      <svg
        viewBox="0 0 300 300"
        role="img"
        aria-label="แผนภูมิหกเหลี่ยมแสดงค่าสถานะ"
        className="mx-auto aspect-square w-full max-w-[340px]"
      >
        {ringLevels.map((level) => (
          <polygon
            key={level}
            points={STAT_ORDER.map((_, index) =>
              pointString(pointAt(index, radius * level, center)),
            ).join(" ")}
            fill="none"
            stroke="#d8c9a6"
            strokeWidth="1"
          />
        ))}

        {axisPoints.map((point, index) => (
          <line
            key={STAT_ORDER[index]}
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="#eadfca"
            strokeWidth="1"
          />
        ))}

        <polygon
          points={statPoints.map(pointString).join(" ")}
          fill="rgba(15, 118, 110, 0.22)"
          stroke="#0f766e"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {statPoints.map((point, index) => (
          <circle
            key={`${STAT_ORDER[index]}-point`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#0f766e"
            stroke="#ffffff"
            strokeWidth="2"
          />
        ))}

        {STAT_ORDER.map((stat, index) => {
          const labelPoint = pointAt(index, radius + 30, center);
          return (
            <g key={stat}>
              <text
                x={labelPoint.x}
                y={labelPoint.y - 4}
                textAnchor="middle"
                className="fill-[#25303b] text-[13px] font-bold"
              >
                {stat}
              </text>
              <text
                x={labelPoint.x}
                y={labelPoint.y + 13}
                textAnchor="middle"
                className="fill-[#6b7280] text-[11px] font-semibold"
              >
                {stats[stat]}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {STAT_ORDER.map((stat) => (
          <div key={stat} className="rounded-lg border border-[#eadfca] bg-[#fffaf0] p-3">
            <p className="text-sm font-bold text-[#25303b]">
              {stat} <span className="text-[#0f766e]">{stats[stat]}</span>
            </p>
            <p className="mt-1 text-xs leading-5 text-[#5b6470]">{STAT_DISPLAY[stat]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function pointAt(index: number, valueRadius: number, center: number): Point {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / STAT_ORDER.length;
  return {
    x: center + valueRadius * Math.cos(angle),
    y: center + valueRadius * Math.sin(angle),
  };
}

function pointString(point: Point) {
  return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
}
