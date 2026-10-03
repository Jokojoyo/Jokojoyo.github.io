import React,{Component,Suspense,lazy,useEffect,useRef,useState} from 'react';
import {ArrowUpRight,ArrowUp,ArrowLeft,ArrowRight,Sun,Moon,Pause,Play,List,X,GithubLogo,ArrowCounterClockwise} from '@phosphor-icons/react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const ImmersiveScene=lazy(()=>import('./ImmersiveScene.jsx'));
const github='https://github.com/Jokojoyo';
const projects=[
 {id:'senja-coffee',name:'Senja Coffee',image:'senja',type:'Coffeehouse · Brand experience',description:'A little pause, made interactive. A sculptural coffee cup, a filterable menu, and a personal brew guide.',features:['Interactive 3D','Menu filters','Brew guide']},
 {id:'forma-studio',name:'Forma',image:'forma',type:'Architecture · Studio concept',description:'An architectural study in space and restraint. Explore a project archive and an interactive model.',features:['Project archive','Interactive model','Editorial layout']},
 {id:'loom-store',name:'Loom',image:'loom',type:'Fashion · Commerce concept',description:'An editorial store with a chrome fabric sculpture. Browse the collection, inspect products, and build a saved shopping bag.',features:['Product search','Product details','Saved bag']},
 {id:'flowdesk',name:'Flowdesk',image:'flowdesk',type:'Product · Personal workspace',description:'A usable workspace behind a spatial introduction. Create tasks, move them through the board, and choose what to focus on.',features:['Editable task board','Focus timer','Local saving']},
 {id:'merchantboard',name:'MerchantBoard',image:'merchantboard',type:'Commerce · Sales workspace',description:'A storefront cockpit with a working sales dashboard. Explore the sample data, manage orders, and keep your changes on your device.',features:['Sales dashboard','Editable orders','Data export']},
 {id:'imagekit-studio',name:'ImageKit',image:'imagekit',type:'Creative tools · Image studio',description:'A tactile studio for everyday image work. Crop, resize, and convert your images, then inspect them in 3D—all in your browser.',features:['Crop & resize','PNG, JPG & WebP','Private local processing']}
];
class SceneBoundary extends Component{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 componentDidCatch(){this.props.onFallback();}
 render(){return this.state.failed?null:this.props.children;}
}
function Project({project,featured=false}){
 return <article className={`project project-${project.image}${featured?' project-featured':''}`}>
  <a className="project-preview" href={`https://jokojoyo.github.io/${project.id}/`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} live website in a new tab`}>
   <img src={`./${project.image}-preview.webp`} width="1440" height="747" loading={featured?'eager':'lazy'} decoding="async" alt={`${project.name} website preview`} />
   <span className="preview-open">Explore website <ArrowUpRight size={18}/></span>
  </a>
  <div className="project-heading"><div><h3><a href={`https://jokojoyo.github.io/${project.id}/`} target="_blank" rel="noopener noreferrer">{project.name}<ArrowUpRight size={30}/></a></h3><p className="project-type">{project.type}</p></div><span className="concept-label">Original concept</span></div>
  <p className="project-description">{project.description}</p>
  <div className="project-bottom"><ul aria-label={`${project.name} features`}>{project.features.map(feature=><li key={feature}>{feature}</li>)}</ul><a className="source-link" href={`${github}/${project.id}`} target="_blank" rel="noopener noreferrer">View source <GithubLogo size={17}/></a></div>
 </article>;
}
export default function Portfolio(){
 const page=useRef(null);const header=useRef(null);const hero=useRef(null);const stage=useRef(null);const motion=useRef({progress:0,x:0,y:0});
 const [theme,setTheme]=useState(()=>{try{return localStorage.getItem('thomas-portfolio-theme')==='light'?'light':'dark';}catch{return 'dark';}});
 const [paused,setPaused]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [angle,setAngle]=useState(0);const [menu,setMenu]=useState(false);
 const [sceneEnabled,setSceneEnabled]=useState(()=>window.matchMedia('(min-width: 761px)').matches);
 const [sceneState,setSceneState]=useState('poster');
 useEffect(()=>{document.documentElement.dataset.theme=theme;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#101112':'#ecece8');try{localStorage.setItem('thomas-portfolio-theme',theme);}catch{}},[theme]);
 useEffect(()=>{const preference=matchMedia('(prefers-reduced-motion: reduce)');const changed=event=>{if(event.matches)setPaused(true);};preference.addEventListener('change',changed);return()=>preference.removeEventListener('change',changed);},[]);
 useEffect(()=>{if(!menu)return;const key=event=>{if(event.key==='Escape'){setMenu(false);header.current?.querySelector('.menu-toggle')?.focus();}};const outside=event=>{if(!header.current?.contains(event.target))setMenu(false);};document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside);};},[menu]);
 useEffect(()=>{
  const context=gsap.context(()=>{
   if(paused){motion.current.progress=0;motion.current.x=0;motion.current.y=0;return;}
   gsap.to(motion.current,{progress:1,ease:'none',scrollTrigger:{trigger:hero.current,start:'top top',end:'bottom top',scrub:1}});
   gsap.to(stage.current,{yPercent:15,scale:.8,rotation:7,ease:'none',scrollTrigger:{trigger:hero.current,start:'top top',end:'bottom top',scrub:1}});
   gsap.utils.toArray('.project').forEach((project,index)=>{gsap.fromTo(project,{y:index===0?0:36},{y:0,ease:'none',scrollTrigger:{trigger:project,start:'top bottom',end:'top 35%',scrub:.7}});});
  },page);
  return()=>{context.revert();motion.current.progress=0;};
 },[paused]);
 useEffect(()=>{
  const region=hero.current;
  const pointer=event=>{if(paused||event.pointerType==='touch')return;const bounds=region.getBoundingClientRect();motion.current.x=((event.clientX-bounds.left)/bounds.width-.5)*2;motion.current.y=((event.clientY-bounds.top)/bounds.height-.5)*2;};
  const leave=()=>{motion.current.x=0;motion.current.y=0;};
  region.addEventListener('pointermove',pointer);region.addEventListener('pointerleave',leave);return()=>{region.removeEventListener('pointermove',pointer);region.removeEventListener('pointerleave',leave);};
 },[paused]);
 const fallback=()=>setSceneState('fallback');
 const enableScene=()=>{setSceneEnabled(true);setSceneState('loading');};
 const rotate=delta=>setAngle(value=>((value+delta+180+360)%360)-180);
 return <div className="portfolio" ref={page}>
  <a className="skip-link" href="#main">Skip to content</a>
  <header className="site-header" ref={header}>
   <a className="wordmark" href="#main">Thomas Ginting</a>
   <div className="header-right"><nav id="primary-navigation" className={menu?'navigation is-open':'navigation'} aria-label="Main navigation"><a href="#work" onClick={()=>setMenu(false)}>Work</a><a href="#about" onClick={()=>setMenu(false)}>About</a><a href={github} target="_blank" rel="noopener noreferrer">GitHub</a></nav>
    <button className="theme-toggle icon-button" aria-label={`Switch to ${theme==='dark'?'light':'dark'} theme`} onClick={()=>setTheme(value=>value==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={24} weight="light"/>:<Moon size={24} weight="light"/>}</button>
    <button className="menu-toggle icon-button" aria-label={menu?'Close navigation':'Open navigation'} aria-controls="primary-navigation" aria-expanded={menu} onClick={()=>setMenu(value=>!value)}>{menu?<X size={24}/>:<List size={24}/>}</button>
   </div>
  </header>
  <main id="main">
   <section className="hero" ref={hero} aria-labelledby="hero-title">
    <div className="ambient-word" aria-hidden="true">EXPLORE</div>
    <div className="hero-copy"><h1 id="hero-title"><span>I build</span><span>websites</span><span>that move.</span></h1><p>Original websites. Thoughtful interactions.<br className="desktop-break"/> Built to be explored.</p><div className="hero-links"><a className="text-link" href="#work">Explore the work <ArrowUpRight size={22}/></a><a className="text-link" href={github} target="_blank" rel="noopener noreferrer">GitHub <GithubLogo size={20}/></a></div></div>
    <div className={`scene-stage${sceneState==='ready'?' is-ready':''}`} ref={stage}>
     <img className="knot-poster" src="./knot-poster.webp" srcSet="./knot-poster-small.webp 640w, ./knot-poster.webp 1000w" sizes="(max-width:760px) 88vw,46vw" width="1430" height="1100" alt="Reflective silver knot sculpture" fetchPriority="high" />
     {sceneEnabled&&<SceneBoundary onFallback={fallback}><Suspense fallback={null}><ImmersiveScene paused={paused} angle={angle} motion={motion} theme={theme} onState={setSceneState}/></Suspense></SceneBoundary>}
    </div>
    <a className="scroll-cue" href="#work"><span aria-hidden="true"/>Scroll to explore</a>
    <div className="scene-controls">
     {!sceneEnabled?<button className="text-link" onClick={enableScene}>Explore in 3D <ArrowRight size={18}/></button>:sceneState==='fallback'?<span className="scene-note" role="status">Sculpture preview</span>:<>
      <span className="scene-note" role="status">{sceneState==='ready'?'Find your angle':'Loading sculpture…'}</span><button className="icon-button" aria-label="Rotate sculpture left" disabled={sceneState!=='ready'} onClick={()=>rotate(-30)}><ArrowLeft size={18}/></button><button className="icon-button" aria-label="Rotate sculpture right" disabled={sceneState!=='ready'} onClick={()=>rotate(30)}><ArrowRight size={18}/></button><button className="icon-button" aria-label="Reset sculpture angle" disabled={sceneState!=='ready'} onClick={()=>setAngle(0)}><ArrowCounterClockwise size={18}/></button>
     </>}
    </div>
   </section>
   <section className="work-section" id="work" aria-labelledby="work-title">
    <div className="featured-layout"><div className="work-intro"><h2 id="work-title">Selected <br/>work</h2><p>Six original websites, each with a distinct idea and interaction. Open a demo and try it for yourself.</p><a className="subtle-link" href={github} target="_blank" rel="noopener noreferrer">Browse all source code <ArrowUpRight size={17}/></a></div><Project project={projects[0]} featured/></div>
    <div className="project-pair"><Project project={projects[1]}/><Project project={projects[2]}/></div>
    <div className="last-project"><div className="work-aside"><p>Beyond the first impression.</p><p>A website should feel good to use, too. This one opens into a working personal task board.</p></div><Project project={projects[3]}/></div>
    <div className="project-pair project-tools"><Project project={projects[4]}/><Project project={projects[5]}/></div>
   </section>
   <section className="about-section" id="about" aria-labelledby="about-title"><div className="about-intro"><h2 id="about-title">Thoughtful<br/>in motion.<br/>Useful at rest.</h2><div className="about-copy"><p>I'm Thomas Ginting. This is a collection of original website concepts, built to explore how design and interaction can work together.</p><p>Each project has its own visual identity and something you can actually use—from a brew guide to a saved shopping bag to an editable task board.</p><a className="text-link" href={github} target="_blank" rel="noopener noreferrer">See how they're built <ArrowUpRight size={20}/></a></div></div><dl className="approach-list"><div><dt>A distinct point of view.</dt><dd>Different subjects deserve different visual worlds. Each project starts with its own composition, material, and rhythm.</dd></div><div><dt>Motion with a purpose.</dt><dd>Real-time 3D and scroll transitions guide exploration. Pause them at any time; the work stays accessible.</dd></div><div><dt>Something to interact with.</dt><dd>The demo websites go beyond a screenshot. Their controls, galleries, filters, and local features are built to be tried.</dd></div></dl></section>
   <section className="closing" aria-labelledby="closing-title"><h2 id="closing-title">Take a<br/>closer look.</h2><a className="closing-link" href={github} target="_blank" rel="noopener noreferrer">Explore my GitHub <ArrowUpRight size={40}/></a><p>Original concepts. Open source. Ready to explore.</p></section>
  </main>
  <footer className="site-footer"><span>Thomas Ginting © 2026</span><span>Built with React, Three.js & GSAP</span><a href="#main">Back to top <ArrowUp size={17}/></a></footer>
  <button className="motion-toggle" aria-pressed={paused} onClick={()=>setPaused(value=>!value)}>{paused?<Play size={16}/>:<Pause size={16}/>}<span>{paused?'Play motion':'Pause motion'}</span></button>
 </div>;
}
