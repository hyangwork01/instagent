import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Orb } from './effects.jsx';
import { AuthorBlock, ResourceLinks, Film, Citation, Results, Architecture } from './components.jsx';
import './base.css';
import './styles.css';

const stages = [
  {title:'Allocate', subtitle:'Bind the team', line:'A goal becomes a collaboration program.', text:'The Agent composes a behavior tree from the goal, current context, and eligible experience. The Coordinator binds actions to the robot interfaces.', detail:'G1 · guidance / Go2 · transport / ALOHA · loading', image:'g1.jpg'},
  {title:'Execute', subtitle:'Check the handoff', line:'One robot’s output is another’s condition.', text:'Go2 must arrive and stop before ALOHA loads. The Executive uses current observations to tick the tree and reports execution feedback.', detail:'Arrival → stopped → loading → verified handoff', image:'go2.jpg'},
  {title:'Diagnose', subtitle:'Follow the evidence', line:'A finished action can still miss the goal.', text:'In the manuscript’s service case, a tester reports missing cola. The Agent retrieves historical observations to diagnose the missing payload.', detail:'Historical memory supplies context; check the current state.', image:'robot-team.jpg'},
  {title:'Revise', subtitle:'Repair the program', line:'Put the check at the point of transfer.', text:'The revision adds basket-content checks by ALOHA before return navigation and G1 before delivery. A failed check routes the task back to reloading.', detail:'Structure / interfaces / safety / handoff admission checks', image:'aloha.jpg'},
  {title:'Reuse', subtitle:'Retain the correction', line:'The next task starts with verified experience.', text:'After successful execution and physical-goal verification, the revised subtree and its applicability document enter the procedural library for later retrieval and adaptation.', detail:'Validated subtree + context + revision rationale', image:'robot-team.jpg'}
];

function App() {
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px)').matches);
  useEffect(() => { const query = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px)'); const update=()=>setReduced(query.matches);query.addEventListener('change',update);return()=>query.removeEventListener('change',update); }, []);
  const selected = stages[stage];
  return <div className="orbital-site">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="orbital-nav"><a className="brand" href="#main">InstAgent<span aria-hidden="true">/</span></a><nav aria-label="Research navigation"><a href="#mission">Mission</a><a href="#research">Research</a><a href="#results">Evidence</a><a href="#resources">Resources</a></nav><button className="motion-control" disabled={reduced} aria-pressed={paused || reduced} onClick={()=>setPaused(!paused)}>{reduced ? 'Motion reduced' : paused ? 'Resume orbit' : 'Pause orbit'}</button></header>
    <main id="main">
      <section className="orbital-hero" aria-labelledby="hero-title"><div className="hero-light" aria-hidden="true">{!paused && !reduced && <Orb hue={35} hoverIntensity={0.2} backgroundColor="#0b1020" />}</div><div className="hero-coordinate" aria-hidden="true"><span>G1</span><span>GO2</span><span>ALOHA</span></div><div className="hero-type"><p className="eyebrow">Heterogeneous robot collaboration</p><h1 id="hero-title">InstAgent<span className="title-satellite" aria-hidden="true">+</span></h1><p className="formal-title">A Recursively Self-Improving Agent Operating System<br /> for Heterogeneous Robot Collaboration</p></div><div className="hero-paper"><AuthorBlock /><ResourceLinks /></div><div className="mission-intro"><p>Different bodies.<br /> <strong>A shared executable plan.</strong></p><p>Capabilities, observations, and feedback connect through behavior trees. Verified revisions become procedures the team can use again.</p></div></section>

      <section className="mission-section" id="mission" aria-labelledby="mission-title"><div className="section-top"><div><p className="eyebrow">The mission, grounded in footage</p><h2 id="mission-title">Watch the team.<br /> <span>Explore the logic.</span></h2></div><p>The project film is the central evidence. The five stations around it explain the manuscript’s collaboration-and-revision process.</p></div><div className={`orbital-stage phase-${stage}`}><div className="orbit-ring orbit-outer" aria-hidden="true"></div><div className="orbit-ring orbit-inner" aria-hidden="true"></div><div className="orbit-cross cross-one" aria-hidden="true">+</div><div className="orbit-cross cross-two" aria-hidden="true">+</div><div className="orbit-film"><Film id="film" /></div><div className="orbit-stations" role="group" aria-label="Choose a research process stage">{stages.map((item,index)=><button key={item.title} className={`station station-${index}`} aria-pressed={stage===index} onClick={()=>setStage(index)}><span className="station-number">0{index+1}</span><span><strong>{item.title}</strong><small>{item.subtitle}</small></span></button>)}</div></div><div className="mission-reader" aria-live="polite"><div className="reader-index"><span>STATION</span><strong>0{stage+1}</strong><span>OF 05</span></div><div className="reader-copy"><p className="eyebrow">{selected.title} / {selected.subtitle}</p><h3>{selected.line}</h3><p>{selected.text}</p><div className="reader-detail">{selected.detail}</div></div><button className="next-station" aria-label="Next process station" onClick={()=>setStage((stage+1)%stages.length)}>Next station <span aria-hidden="true">→</span></button></div><p className="mission-caveat">The stations are manuscript-based explanation, not live telemetry or a claim that the film records the failure-and-revision episode.</p></section>

      <section className="principles-section page-width" id="research"><div className="principle-heading"><p className="eyebrow">What changes across tasks</p><h2>The program evolves.<br /> <span>The skills stay fixed.</span></h2><p>InstAgent’s recursive self-improvement revises executable collaboration procedures. Foundation-model parameters, atomic skills, and low-level controllers remain fixed.</p></div><div className="principle-orbits"><article><span>01 / ENVIRONMENT</span><h3>Shared observations</h3><p>SMAR-T records images, captions, position, time, and source robot. Retrieval supplies context for planning and diagnosis.</p><small>Historical context ≠ current physical state</small></article><article><span>02 / PROCEDURE</span><h3>Retained experience</h3><p>Validated subtrees preserve roles, handoff conditions, and recovery branches. Linked documents record applicability and revision rationale.</p><small>Executable subtree + supporting document</small></article></div></section>

      <section className="architecture-section page-width" id="architecture"><div className="section-top"><div><p className="eyebrow">The operating layer</p><h2>Connected through<br /> <span>explicit conditions.</span></h2></div><p>The Agent composes and revises. The Coordinator binds capabilities. The Executive runs the behavior tree and returns feedback.</p></div><Architecture /></section>

      <section className="results-section" id="results"><div className="page-width"><div className="section-top"><div><p className="eyebrow">The measured comparison</p><h2>Experience<br /> <span>under evaluation.</span></h2></div><p>20 heterogeneous multi-robot tasks, repeated twice for each of three models and four configurations. 480 real-robot runs.</p></div><Results /></div></section>

      <section className="resources-section page-width" id="resources"><div className="resource-heading"><p className="eyebrow">Continue the investigation</p><h2>InstAgent<span aria-hidden="true">↗</span></h2><p>A Recursively Self-Improving Agent Operating System for Heterogeneous Robot Collaboration</p></div><ResourceLinks /><Citation id="citation" /></section>
    </main><footer className="page-width"><a className="brand" href="#main">InstAgent /</a><span>ShanghaiTech University · InstAdapt</span><a href="#main">Back to top ↑</a></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);




