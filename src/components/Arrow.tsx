import React, { useEffect, useState, useCallback } from 'react';
import Label from "./Label.tsx";
import ArrowIcon from '../assets/Arrow.svg';

type ArrowProps = {
    devRef: React.RefObject<HTMLDivElement>;
    testRef: React.RefObject<HTMLDivElement>;
    prodRef: React.RefObject<HTMLDivElement>;
    devToTestDiff: number;
    testToProdDiff: number;
};

type PathData = {
    devToTestPath: string;
    testToProdPath: string;
    devToTestLabelPosition: { x: number; y: number };
    testToProdLabelPosition: { x: number; y: number };
};

const Arrow: React.FC<ArrowProps> = ({ devRef, testRef, prodRef, devToTestDiff, testToProdDiff }) => {

    const arrowLayout = {
        marginTop: 122,
        arrowMinHeight: 70,
        labelHeight: 24,
        labelWidth: 48,
    };

    const [pathData, setPathData] = useState<PathData>({
        devToTestPath: "",
        testToProdPath: "",
        devToTestLabelPosition: { x: 0, y: 0 },
        testToProdLabelPosition: { x: 0, y: 0 },
    });

    const calculatePosition = useCallback(() => {
        if (devRef.current && testRef.current && prodRef.current) {
            const parentRect = devRef.current.parentElement?.getBoundingClientRect();
            if (!parentRect) return;

            const devRect = devRef.current.getBoundingClientRect();
            const testRect = testRef.current.getBoundingClientRect();
            const prodRect = prodRef.current.getBoundingClientRect();

            const devX =  devRect.left + devRect.width / 2 - parentRect.left;
            const devY = arrowLayout.marginTop + devRect.top - parentRect.top;
            const devToTestX = testRect.left + testRect.width / 3 - parentRect.left;
            const testToProdX = testRect.left + testRect.width * 2 / 3 - parentRect.left;
            const testY = arrowLayout.marginTop + testRect.top - parentRect.top;
            const prodX = prodRect.left + prodRect.width / 2 - parentRect.left;
            const prodY = arrowLayout.marginTop + prodRect.top - parentRect.top;

            const devToTestPath = `
                M ${devX} ${devY}
                V ${arrowLayout.arrowMinHeight}
                H ${devToTestX}
                V ${testY}
            `;

            const testToProdPath = `
                M ${testToProdX} ${testY}
                V ${arrowLayout.arrowMinHeight}
                H ${prodX}
                V ${prodY}
            `;

            setPathData({
                devToTestPath,
                testToProdPath,
                devToTestLabelPosition: {
                    x: (devX + devToTestX - arrowLayout.labelWidth) / 2,
                    y: arrowLayout.arrowMinHeight - arrowLayout.labelHeight / 2
                },
                testToProdLabelPosition: {
                    x: (testToProdX + prodX - arrowLayout.labelWidth) / 2,
                    y: arrowLayout.arrowMinHeight - arrowLayout.labelHeight / 2
                }
            });
        }
    }, [devRef, testRef, prodRef, devToTestDiff, testToProdDiff]);

    useEffect(() => {
        calculatePosition();
        const observer = new ResizeObserver(calculatePosition);
        if (devRef.current) observer.observe(devRef.current);
        if (testRef.current) observer.observe(testRef.current);
        if (prodRef.current) observer.observe(prodRef.current);
        window.addEventListener("resize", calculatePosition);

        return () => {
            window.removeEventListener("resize", calculatePosition);
            observer.disconnect();
        };
    }, [calculatePosition]);

    return (
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
            <defs>
                <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
                    <image href={ArrowIcon} width="7" height="4" transform="rotate(-90 3.5 3.5)"/>
                </marker>
            </defs>
            <path d={pathData.devToTestPath} style={{stroke: 'var(--text-gray)' }} fill="none" markerEnd="url(#arrowhead)" />
            <Label x={pathData.devToTestLabelPosition.x} y={pathData.devToTestLabelPosition.y} diff={devToTestDiff} />
            <path d={pathData.testToProdPath} style={{ stroke: 'var(--text-gray)' }} fill="none" markerEnd="url(#arrowhead)" />
            <Label x={pathData.testToProdLabelPosition.x} y={pathData.testToProdLabelPosition.y} diff={testToProdDiff} />
        </svg>
    );
};

export default Arrow;
