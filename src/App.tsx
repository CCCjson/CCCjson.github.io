import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useReveal } from './hooks/useReveal';
import Home from './pages/Home';
import WorldQuant from './pages/projects/WorldQuant';
import QuantCpp from './pages/projects/QuantCpp';
import Fin from './pages/projects/Fin';
import Numerai from './pages/projects/Numerai';
import DayTrade from './pages/projects/DayTrade';
import MiningAgents from './pages/projects/MiningAgents';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // wait a frame so the target section exists after navigation
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  useReveal(pathname);
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/worldquant-brain-miner" element={<WorldQuant />} />
        <Route path="/projects/quant-cpp-engines" element={<QuantCpp />} />
        <Route path="/projects/fin" element={<Fin />} />
        <Route path="/projects/numerai" element={<Numerai />} />
        <Route path="/projects/day-trade-assistant" element={<DayTrade />} />
        <Route path="/projects/mining-agents" element={<MiningAgents />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
