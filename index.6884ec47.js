var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};var n={},e=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,r=/^0o[0-7]+$/i,a=parseInt,u="object"==typeof t&&t&&t.Object===Object&&t,c="object"==typeof self&&self&&self.Object===Object&&self,f=u||c||Function("return this")(),l=Object.prototype.toString,s=Math.max,p=Math.min,v=function(){return f.Date.now()};function b(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function d(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==l.call(t)}(t))return NaN;if(b(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=b(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(e,"");var u=i.test(t);return u||r.test(t)?a(t.slice(2),u?2:8):o.test(t)?NaN:+t}n=function(t,n,e){var o,i,r,a,u,c,f=0,l=!1,g=!1,m=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function y(n){var e=o,r=i;return o=i=void 0,f=n,a=t.apply(r,e)}function h(t){return f=t,u=setTimeout(w,n),l?y(t):a}function j(t){var e=t-c;return void 0===c||e>=n||e<0||g&&t-f>=r}function w(){var t=v();if(j(t))return $(t);u=setTimeout(w,function(t){var e=n-(t-c);return g?p(e,r-(t-f)):e}(t))}function $(t){return u=void 0,m&&o?y(t):(o=i=void 0,a)}function x(){var t=v(),e=j(t);if(o=arguments,i=this,c=t,e){if(void 0===u)return h(c);if(g)return u=setTimeout(w,n),y(c)}return void 0===u&&(u=setTimeout(w,n)),a}return n=d(n)||0,b(e)&&(l=!!e.leading,r=(g="maxWait"in e)?s(d(e.maxWait)||0,n):r,m="trailing"in e?!!e.trailing:m),x.cancel=function(){void 0!==u&&clearTimeout(u),f=0,o=c=i=u=void 0},x.flush=function(){return void 0===u?a:$(v())},x};const g=document.querySelector("#search-box"),m=document.querySelector(".country-list");g.addEventListener("input",n((()=>{var t;console.log("Hello"),(t=g.value,fetch(`https://restcountries.com/v3.1/name/${t}?fields=name,capital,population,flags,languages`).then((t=>{if(!t.ok)throw new Error(t.status);return t.json()}))).then((t=>function(t){console.log(t);const n=t.map((t=>`\n        <li class="country-list__item">\n        <div class="flag-box">\n        <img class="flag-box__image" src="${t.flags.svg}" alt="country flag" width="90" height="60">\n          <p class="flag-box__country-name">${t.name.official}</p>\n        </div>\n        \n          <p><b>capital</b>: ${t.capital}</p>\n          <p><b>population</b>: ${t.population}</p>\n          <p><b>languages</b>: ${Object.values(t.languages).map((t=>" "+t))}</p>\n        </li>\n      `)).join("");m.innerHTML=n}(t))).catch((t=>console.log(t)))}),300));
//# sourceMappingURL=index.6884ec47.js.map
