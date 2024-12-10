import React, {useEffect, useRef, useState} from 'react';
import '../styles/Chart.css';
import Bar from './Bar';
import Arrow from './Arrow';
import EllipsisIcon from '../assets/Ellipsis.svg';

type Data = {
    title: string;
    dev: { front: number; back: number; db: number };
    test: { front: number; back: number; db: number };
    prod: { front: number; back: number; db: number };
    norm: number;
};

const Chart: React.FC = () => {
    const urls = [
        { id: 1, url: 'https://rcslabs.ru/ttrp1.json', label: 'OS Doors' },
        { id: 2, url: 'https://rcslabs.ru/ttrp2.json', label: 'OS Bombuntu' },
        { id: 3, url: 'https://rcslabs.ru/ttrp3.json', label: 'Mibre Office' },
        { id: 4, url: 'https://rcslabs.ru/ttrp4.json', label: 'LoWtEx' },
        { id: 5, url: 'https://rcslabs.ru/ttrp5.json', label: 'W$ POS' },
    ];
    const [data, setData] = useState<Data | null>(null);
    const [selectedUrl, setSelectedUrl] = useState(urls[0].url);
    const [menuOpen, setMenuOpen] = useState(false);
    const devRef = useRef(null);
    const testRef = useRef(null);
    const prodRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(selectedUrl);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        };

        fetchData();
    }, [selectedUrl]);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleOptionClick = (url: string) => {
        setSelectedUrl(url);
        setMenuOpen(false);
    };

    if (!data) return <p>Загрузка данных...</p>;

    const devTotal = data.dev.front + data.dev.back + data.dev.db;
    const testTotal = data.test.front + data.test.back + data.test.db;
    const prodTotal = data.prod.front + data.prod.back + data.prod.db;
    const maxInstanceTotal = Math.max(devTotal, testTotal, prodTotal, 1);

    const chartLayout = {
        maxBarHeight: 256,
        minBarHeight: 56,
    };

    const calculateHeight = (value: number) => Math.max((value / maxInstanceTotal) * chartLayout.maxBarHeight, chartLayout.minBarHeight);

    const devHeight = calculateHeight(devTotal);
    const testHeight = calculateHeight(testTotal);
    const prodHeight = calculateHeight(prodTotal);
    const normHeight = calculateHeight(data.norm);

    const devToTestDiff = testTotal - devTotal;
    const testToProdDiff = prodTotal - testTotal;

    return (
        <div className="chart-container">
            <h2 className="chart-title">Количество пройденных тестов "{data.title}"</h2>
            <img src={EllipsisIcon} alt="Menu" className="data-menu" onClick={handleMenuToggle}/>
            <div className={`data-options ${menuOpen ? 'active' : ''}`}>
                {urls.map((item) => (
                    <div
                        key={item.id}
                        className="data-option"
                        onClick={() => handleOptionClick(item.url)}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
            <div id="wrapper" className="chart-wrapper">
                <div id="chart" className="chart-bars">
                    <Bar ref={devRef} label="Dev" front={data.dev.front} back={data.dev.back} db={data.dev.db}
                         max={devTotal}
                         barHeight={devHeight}/>
                    <Bar ref={testRef} label="Test" front={data.test.front} back={data.test.back} db={data.test.db}
                         max={testTotal}
                         barHeight={testHeight}/>
                    <Bar ref={prodRef} label="Prod" front={data.prod.front} back={data.prod.back} db={data.prod.db}
                         max={prodTotal}
                         barHeight={prodHeight}/>
                    <Bar label="Норматив" front={data.norm} back={0} db={0} max={maxInstanceTotal} isNorm={true}
                         barHeight={normHeight}/>
                </div>
                <Arrow devRef={devRef} testRef={testRef} prodRef={prodRef} devToTestDiff={devToTestDiff}
                       testToProdDiff={testToProdDiff}/>
            </div>
            <div className="legend">
                <div className="legend-item">
                    <div className="legend-color" style={{background: 'var(--bar-front-color)'}}></div>
                    <div className="legend-label">Клиентская часть</div>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{background: 'var(--bar-back-color)'}}></div>
                    <div className="legend-label">Серверная часть</div>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{background: 'var(--bar-db-color)'}}></div>
                    <div className="legend-label">База данных</div>
                </div>
            </div>
        </div>
    );
};

export default Chart;
