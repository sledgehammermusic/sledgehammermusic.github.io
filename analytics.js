/* Sledge Hammer Music — GoatCounter integration.
   Set the PUBLIC_SITE_CODE after creating the GoatCounter account.
   Never store account passwords or private API tokens here.
   Enable "Allow adding visitor counts on your website" in GoatCounter settings.
*/
(()=>{
"use strict";
const PUBLIC_SITE_CODE="sledgehammermusic"; // e.g. "sledgehammermusic" from https://sledgehammermusic.goatcounter.com
const count=document.getElementById("shm-real-visitors");
if(!PUBLIC_SITE_CODE){if(count)count.textContent="Coming soon";return;}
if(!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(PUBLIC_SITE_CODE)){if(count)count.textContent="Not available";return;}
const url="https://"+PUBLIC_SITE_CODE+".goatcounter.com";
const script=document.createElement("script");
script.src="https://gc.zgo.at/count.js";
script.async=true;
script.setAttribute("data-goatcounter",url+"/count");
document.head.appendChild(script);
if(count){
fetch(url+"/counter/TOTAL.json",{cache:"no-store"})
.then(r=>{if(!r.ok)throw Error("Counter unavailable");return r.json()})
.then(data=>{count.textContent=typeof data.count==="string"?data.count:String(data.count??"—")})
.catch(()=>{count.textContent="Unavailable"});
}
})();