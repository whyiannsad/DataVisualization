import React, {useMemo} from "react";

type LabelProps = {
    x: number;
    y: number;
    diff: number;
    shadowColor?: string;
};

const Label: React.FC<LabelProps> = ({x, y, diff, shadowColor = "var(--shadow-label-color)"}) => {

    const labelLayout = {
        labelHeight: 24,
        labelWidth: 48,
    };

    const text = useMemo(() => (diff > 0 ? `↑ +${diff}` : diff < 0 ? `↓ ${diff}` : `${diff}`), [diff]);
    const color = useMemo(() => (diff > 0 ? "var(--arrow-positive)" : diff < 0 ? "var(--arrow-negative)" : "var(--text-gray)"), [diff]);

    const width = useMemo(() => labelLayout.labelWidth + (text.length - 3) * 8, [text.length]);
    const offset = useMemo(() => (labelLayout.labelWidth - width) / 2, [width]);

    return (
        <g transform={`translate(${x}, ${y})`}>
            <rect
                x={-2 + offset}
                y="-2"
                width={width + 4}
                height={labelLayout.labelHeight + 4}
                rx={labelLayout.labelHeight / 2}
                ry={labelLayout.labelHeight / 2}
                fill={shadowColor}
            />
            <rect
                x={offset}
                y="0"
                width={width}
                height={labelLayout.labelHeight}
                rx={labelLayout.labelHeight / 2}
                ry={labelLayout.labelHeight / 2}
                fill={color}
            />
            <text
                x={width / 2 + offset}
                y={labelLayout.labelHeight / 2 + 5}
                fill="white"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
            >
                {text}
            </text>
        </g>
    );
};

export default Label;
