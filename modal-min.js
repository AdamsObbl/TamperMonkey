const createModal=(e,t,n=document.body,o=!0)=>{const d=document.createElement("div");let s,r,l=e||"Modal",a=t,i=200,c=!1;const u=e=>{c=!0,Object.assign(e.target.style,{cursor:"grabbing"}),s=e.clientX-d.getBoundingClientRect().left,r=e.clientY-d.getBoundingClientRect().top,document.body.style.userSelect="none"},p=e=>{c&&(d.style.left=e.clientX-s+"px",d.style.top=e.clientY-r+"px",d.style.transform="")},m=()=>{c=!1,document.body.style.userSelect="auto"},g=e=>{d.contains(e.target)||o&&(d.style.display="none")},b=()=>{d.style.display="none",document.removeEventListener("mousedown",g),document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",m)};return Object.assign(d.style,{position:"fixed",display:"none",flexDirection:"column",top:"50%",left:"50%",transform:"translate(-50%, -50%)",backgroundColor:"white",boxShadow:"2px 2px 5px black",borderRadius:"5px",overflow:"hidden",zIndex:2147483647}),Object.assign(n.appendChild(d),{show:()=>{d.style.display="flex",document.addEventListener("mousedown",g),document.addEventListener("mousemove",p),document.addEventListener("mouseup",m)},hide:b,titleBar:(()=>{const e=document.createElement("div");return Object.assign(e.style,{display:"flex",justifyContent:"space-between",cursor:"grab",background:"hsl(196, 100%, 29%)",background:`linear-gradient(90deg, hsla(${i}, 100%, 29%,1) 0%, hsla(${i}, 86%, 25%,1) 35%, hsla(${i}, 100%, 39%,1) 100%)`}),Object.defineProperty(d,"colorBar",{get:()=>i,set:t=>{i=t,e.style.background=`linear-gradient(90deg, hsla(${i}, 100%, 29%,1) 0%, hsla(${i}, 86%, 25%,1) 35%, hsla(${i}, 100%, 39%,1) 100%)`}}),e.addEventListener("mousedown",u),e.addEventListener("mouseup",(e=>{e.target.style.cursor="grab"})),e.titleText=(()=>{const e=document.createElement("span");return Object.assign(e.style,{color:"white",fontSize:"medium",padding:"5px",display:"flex",alignItems:"center"}),Object.defineProperty(d,"Title",{get:()=>l,set:t=>{l=t,e.innerText=l}}),e.innerText=l,d.appendChild(e)})(),e.appendChild(e.titleText),e.closeModal=(()=>{const e=document.createElement("input");return Object.assign(e.style,{color:"white",backgroundColor:"transparent",fontSize:"medium",cursor:"pointer",border:"none",padding:"8px 15px"}),e.type="button",e.value="x",e.addEventListener("mouseenter",(()=>{e.style.backgroundColor="#E81123"})),e.addEventListener("mouseleave",(()=>{e.style.backgroundColor="transparent"})),e.addEventListener("click",b),d.appendChild(e)})(),e.appendChild(e.closeModal),d.appendChild(e)})(),body:(()=>{const e=document.createElement("div");return Object.assign(e.style,{color:"black",minHeight:"35px",padding:"5px"}),Object.defineProperty(d,"Content",{get:()=>a,set:t=>{a=t,e.innerText=a}}),a&&(e.innerText=a),d.appendChild(e)})(),footer:(()=>{const e=document.createElement("div");return Object.assign(e.style,{color:"black",fontSize:"0.75em",padding:"5px"}),d.appendChild(e)})()})};