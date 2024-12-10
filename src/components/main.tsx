import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Chart  from '../components/Chart.js'
import '../styles/index.css'

const setCSSVariables = () => {
    document.documentElement.style.setProperty('--text-gray', '#898290');
    document.documentElement.style.setProperty('--bar-front-color', '#4AB6E8');
    document.documentElement.style.setProperty('--bar-back-color', '#AA6FAC');
    document.documentElement.style.setProperty('--bar-db-color', '#E85498');
    document.documentElement.style.setProperty('--bar-norm-gradient', '#4AB6E8');
    document.documentElement.style.setProperty('--bg-color', '#f3f4f6');
    document.documentElement.style.setProperty('--shadow-color', '0 4px 8px rgba(0, 0, 0, 0.1)');
    document.documentElement.style.setProperty('--legend-label-color', '#898290');
    document.documentElement.style.setProperty('--hover-color', '#555');
    document.documentElement.style.setProperty('--menu-color', '#333');
    document.documentElement.style.setProperty('--line-color', '#A1A1A1');
    document.documentElement.style.setProperty('--arrow-positive', '#00CC99');
    document.documentElement.style.setProperty('--arrow-negative', '#FC440F');
};

setCSSVariables();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Chart  />
  </StrictMode>,
)
