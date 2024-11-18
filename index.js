import{a as L,S as v}from"./assets/vendor-Kt0AZ5QJ.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(r){if(r.ep)return;r.ep=!0;const t=s(r);fetch(r.href,t)}})();const w="47115642-a97741713bebc955e7d8d0e17",S="https://pixabay.com/api/";async function m(e,o=1,s=15){try{return(await L.get(S,{params:{key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:s}})).data}catch(n){throw console.error("Error fetching images:",n),n}}const p=document.querySelector(".gallery");let q=new v(".gallery a");function h(e){const o=e.map(({webformatURL:s,largeImageURL:n,tags:r,likes:t,views:c,comments:y,downloads:b})=>`
        <div class="gallery__item">
          <a href="${n}">
            <img src="${s}" alt="${r}" loading="lazy" />
          </a>
          <div class="photo-info">
            <p><b>Likes:</b> ${t}</p>
            <p><b>Views:</b> ${c}</p>
            <p><b>Comments:</b> ${y}</p>
            <p><b>Downloads:</b> ${b}</p>
          </div>
        </div>
      `).join("");p.insertAdjacentHTML("beforeend",o),q.refresh()}function E(){p.innerHTML=""}function d(e){e.classList.add("is-hidden")}function g(e){e.classList.remove("is-hidden")}function P(){const{height:e}=document.querySelector(".gallery").getBoundingClientRect();window.scrollBy({top:e*.7,behavior:"smooth"})}const M=document.querySelector("#search-form"),i=document.querySelector("#load-more-btn");let l="",a=1;const u=15;let f=0;M.addEventListener("submit",$);i.addEventListener("click",B);async function $(e){if(e.preventDefault(),l=e.currentTarget.elements.searchQuery.value.trim(),!!l){a=1,E(),d(i);try{const{hits:o,totalHits:s}=await m(l,a,u);if(f=s,o.length===0){alert("No images found. Please try another query.");return}h(o),a*u<f&&g(i)}catch(o){console.error("Error loading images:",o)}}}async function B(){a+=1,d(i);try{const{hits:e}=await m(l,a,u);h(e),a*u>=f?(d(i),alert("We're sorry, but you've reached the end of search results.")):(g(i),P())}catch(e){console.error("Error loading more images:",e)}}
//# sourceMappingURL=index.js.map
