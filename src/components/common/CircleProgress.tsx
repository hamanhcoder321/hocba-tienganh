import { useId } from 'react';

type Props = {
  percent: number;
  size?: number;
  strokeWidth?: number;
  startColor?: string;
  endColor?: string;
};

export default function CircleProgress({
  percent,
  size = 160,
  strokeWidth = 12,
  startColor = '#fbbf24',
  endColor = '#dc2626',
}: Props) {
  const id = useId();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size}>
        <defs>
          <linearGradient id={`gradient-${id}`} x1="100%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>

        <circle stroke="#eee" fill="transparent" strokeWidth={strokeWidth} r={radius} cx={size / 2} cy={size / 2} />

        <circle
          stroke={`url(#gradient-${id})`}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: 'stroke-dashoffset 0.5s ease',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>

      {/* Text */}
      <div className="absolute text-[38px] font-black text-[#C13737]">&gt;{percent}%</div>
    </div>
  );
}
