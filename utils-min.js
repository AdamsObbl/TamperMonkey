const sleep=e=>new Promise((t=>setTimeout(t,e))),waitForElAll=async(e,t)=>(await sleep(t),document.querySelectorAll(e).length?document.querySelectorAll(e):waitForElAll(e,t)),waitForEl=async(e,t)=>(await sleep(t),document.querySelector(e)||waitForEl(e,t)),element={select:(e,t,n)=>{const a=document.createElement("select");Object.assign(a.style,n);const c=document.createElement("option");return c.selected=!0,c.disabled=!0,c.value=-1,c.innerText="wybierz..",a.appendChild(c),e.forEach((e=>{const{value:t,text:n}=e,c=document.createElement("option");c.value=t||e,c.innerText=n||t||e,a.appendChild(c)})),a.addEventListener("change",t),a},checkbox:(e,t,n)=>{const a=document.createElement("div");return e.forEach((e=>{const{value:c,text:r,checked:o}=e,l=document.createElement("label");l.innerText=r||""===r?r:c||e;const s=document.createElement("input");Object.assign(s.style,n),s.value=c||e,s.type="checkbox",s.checked=o,s.addEventListener("change",t),l.prepend(s),a.appendChild(l)})),a},radio:(e,t,n)=>{const a=document.createElement("div");return e.forEach((c=>{const{value:r,text:o}=c,l=document.createElement("label");l.innerText=o||r||c;const s=document.createElement("input");Object.assign(s.style,n),s.value=r||c,s.type="radio",s.name=e.map((e=>e?.value||e)),s.addEventListener("change",t),l.prepend(s),a.appendChild(l)})),a},btn:(e,t,n)=>{const a=document.createElement("input");return Object.assign(a.style,n),a.value=e||"",a.type="button",a.addEventListener("click",t),a},txt:(e,t,n,a)=>{const c=document.createElement("label");c.innerText=t||"";const r=document.createElement("input");return r.value=e,Object.assign(r.style,a),r.addEventListener("input",n),c.appendChild(r),c}},polishChars={"ą":"a","ć":"c","ę":"e","ł":"l","ń":"n","ó":"o","ś":"s","ź":"z","ż":"z","Ą":"A","Ć":"C","Ę":"E","Ł":"L","Ń":"N","Ó":"O","Ś":"S","Ź":"Z","Ż":"Z"},replacePolish=e=>e.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g,(e=>polishChars[e]||e)),stringToHTML=e=>(new DOMParser).parseFromString(e,"text/html"),bufferFromISO=e=>new TextDecoder("ISO-8859-2").decode(e),urlSearchParamsISOString=e=>{const t=new URLSearchParams(e).toString(),n={"%C4%85":"%B1","%C4%87":"%E6","%C4%99":"%EA","%C5%82":"%B3","%C5%84":"%F1","%C3%B3":"%F3","%C5%9B":"%B6","%C5%BA":"%BC","%C5%BC":"%BF","%C4%84":"%A1","%C4%86":"%C6","%C4%98":"%CA","%C5%81":"%A3","%C5%83":"%D1","%C3%93":"%D3","%C5%9A":"%A6","%C5%B9":"%AC","%C5%BB":"%AF"};return t.replace(/%[0-9A-Fa-f]{2}%[0-9A-Fa-f]{2}/g,(e=>n[e]||e))},_oldCopyToClipBoard=e=>{const t=document.createElement("textarea");Object.assign(t.style,{position:"fixed",opacity:0}),t.value=e,document.body.prepend(t),t.select(),document.execCommand?.("copy"),t.remove()},copyToClipBoard=async e=>{try{await navigator.clipboard.writeText(text)}catch(t){_oldCopyToClipBoard(e)}};