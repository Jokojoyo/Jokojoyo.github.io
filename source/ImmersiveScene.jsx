import {useEffect,useRef} from 'react';
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
export default function ImmersiveScene({paused,angle,motion,theme,onState}){
 const host=useRef(null);const state=useRef({paused,angle,theme});state.current={paused,angle,theme};
 useEffect(()=>{
  const node=host.current;let renderer,env,room,pmrem,geometry,material,frame=0,resizeObserver,intersection;let disposed=false,visible=true,contextLost;
  const dispose=()=>{disposed=true;cancelAnimationFrame(frame);resizeObserver?.disconnect();intersection?.disconnect();if(renderer){renderer.domElement.removeEventListener('webglcontextlost',contextLost);renderer.dispose();renderer.domElement.remove();}geometry?.dispose();material?.dispose();env?.dispose();room?.dispose();pmrem?.dispose();};
  try{
   renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
   renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.9;renderer.setClearColor(0x000000,0);
   node.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
   const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(33,1,.1,40);camera.position.set(0,0,9.8);
   pmrem=new THREE.PMREMGenerator(renderer);room=new RoomEnvironment();
   room.traverse(object=>{if(object.material?.isMeshStandardMaterial)object.material.color.set(0x131416);});
   env=pmrem.fromScene(room,.035);scene.environment=env.texture;
   geometry=new THREE.TorusKnotGeometry(1.42,.48,240,40,2,3);geometry.computeVertexNormals();
   material=new THREE.MeshPhysicalMaterial({color:0xe1e2e3,metalness:1,roughness:.17,clearcoat:.4,clearcoatRoughness:.12,envMapIntensity:1.6});
   const sculpture=new THREE.Mesh(geometry,material);sculpture.rotation.set(.8,-.2,-.72);scene.add(sculpture);
   const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(-3,6,5);scene.add(key);const fill=new THREE.DirectionalLight(0xe7eaed,1.4);fill.position.set(5,-1,3);scene.add(fill);scene.add(new THREE.HemisphereLight(0xffffff,0x171819,.5));
   let dirty=true,last=0,idle=0,smoothX=0,smoothY=0,lastAngle=NaN,lastTheme='',lastProgress=NaN;
   const resize=()=>{const {width,height}=node.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();dirty=true;};
   resizeObserver=new ResizeObserver(resize);resizeObserver.observe(node);resize();intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;dirty=true;},{rootMargin:'60px'});intersection.observe(node);
   contextLost=event=>{event.preventDefault();onState('fallback');cancelAnimationFrame(frame);};renderer.domElement.addEventListener('webglcontextlost',contextLost);
   const render=time=>{
    if(disposed)return;frame=requestAnimationFrame(render);if(!visible||document.hidden)return;const controls=state.current;const active=!controls.paused;
    if(time-last<1000/30&&!dirty)return;
    if(active){const delta=Math.min((time-last)/1000,.08);idle+=delta*.12;smoothX+=(motion.current.x-smoothX)*.075;smoothY+=(motion.current.y-smoothY)*.075;dirty=true;}
    if(controls.angle!==lastAngle||controls.theme!==lastTheme||motion.current.progress!==lastProgress)dirty=true;
    if(dirty){const progress=controls.paused?0:motion.current.progress;sculpture.rotation.set(.8+smoothY*.13+progress*.52,-.2+controls.angle*Math.PI/180+Math.sin(idle)*.22+smoothX*.2+progress*2.4,-.72+progress*.25);sculpture.scale.set(1.08-progress*.1,.94-progress*.1,1-progress*.1);camera.position.z=9.8+progress*.35;renderer.toneMappingExposure=controls.theme==='light'?.88:1.02;renderer.render(scene,camera);lastAngle=controls.angle;lastTheme=controls.theme;lastProgress=motion.current.progress;dirty=false;last=time;}
   };
   renderer.render(scene,camera);frame=requestAnimationFrame(render);onState('ready');
  }catch{dispose();onState('fallback');}
  return dispose;
 },[motion,onState]);
 return <div className="sculpture-canvas" ref={host} aria-hidden="true"/>;
}
