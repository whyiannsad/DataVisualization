import React from 'react';
import '../styles/Bar.css';

type BarProps = {
    label: string;
    front: number;
    back: number;
    db: number;
    max: number;
    isNorm?: boolean;
    barHeight?: number;
};

const barLayout = {
    minBarSegmentHeight: 16,
    maxBarHeight: 256,
};


const Bar = React.forwardRef<HTMLDivElement, BarProps>(
    ({label, front, back, db, max, isNorm = false, barHeight = barLayout.maxBarHeight}, ref) => {

        const calculateHeight = (value: number) => Math.max((value / max) * barHeight, barLayout.minBarSegmentHeight);

        const frontHeight = calculateHeight(front);
        const backHeight = calculateHeight(back);
        const dbHeight = calculateHeight(db);

        return (
            <div className="bar-container" ref={ref}>
                <div
                    className={`bar-chart ${isNorm ? 'bar-norm' : ''}`}
                    style={{height: `${barHeight}px`}}
                >
                    {!isNorm && (
                        <>
                            <div className="bar-segment bar-db" style={{height: `${dbHeight}px`}}>{db}</div>
                            <div className="bar-segment bar-back" style={{height: `${backHeight}px`}}>{back}</div>
                            <div className="bar-segment bar-front" style={{height: `${frontHeight}px`}}>{front}</div>
                        </>
                    )}
                    {isNorm && <div className="bar-norm-label">{front}</div>}
                </div>
                <h4 className="bar-title">{label}</h4>
            </div>
        );
    }
);

export default Bar;
