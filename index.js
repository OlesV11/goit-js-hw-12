import{a as d,S as m,i as c}from"./assets/vendor-CrlV4O_2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const y="50347591-5bd4b47a011c37c1e11104459",g="https://pixabay.com/api/";async function h(i){try{return(await d.get(g,{params:{key:y,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}catch(r){throw new Error("Не вдалося отримати зображення: "+r.message)}}const l=document.querySelector(".gallery"),u=document.querySelector(".loader"),b=new m(".gallery a",{captionsData:"alt",captionDelay:250});function L(i){const r=i.map(({webformatURL:a,largeImageURL:o,tags:e,likes:t,views:n,comments:p,downloads:f})=>`
      <li class="gallery-item">
        <a href="${o}">
          <img src="${a}" alt="${e}" />
          <div class="info">
            <p><b>Likes</b> ${t}</p>
            <p><b>Views</b> ${n}</p>
            <p><b>Comments</b> ${p}</p>
            <p><b>Downloads</b> ${f}</p>
          </div>
        </a>
      </li>
    `).join("");l.insertAdjacentHTML("beforeend",r),b.refresh()}function v(){l.innerHTML=""}function w(){u.classList.add("visible")}function S(){u.classList.remove("visible")}const q=document.querySelector(".form");q.addEventListener("submit",async i=>{i.preventDefault();const r=i.currentTarget.elements["search-text"],a=r.value.trim();if(!a){c.error({title:"Помилка",message:"Будь ласка, введіть пошуковий запит!",position:"topRight"});return}try{w(),v();const o=await h(a);if(o.hits.length===0){c.info({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ff0000"});return}L(o.hits)}catch(o){c.error({title:"Error",message:o.message,position:"topRight",s})}finally{S(),r.value=""}});
//# sourceMappingURL=index.js.map
