(self.webpackChunkbarbershop=self.webpackChunkbarbershop||[]).push([[7779],{78273:function(n,r){"use strict";function t(n){return"/"===n.charAt(0)}function e(n,r){for(var t=r,e=t+1,f=n.length;e<f;t+=1,e+=1)n[t]=n[e];n.pop()}r.Z=function(n,r){void 0===r&&(r="");var f,h=n&&n.split("/")||[],i=r&&r.split("/")||[],o=n&&t(n),s=r&&t(r),u=o||s;if(n&&t(n)?i=h:h.length&&(i.pop(),i=i.concat(h)),!i.length)return"/";if(i.length){var a=i[i.length-1];f="."===a||".."===a||""===a}else f=!1;for(var l=0,p=i.length;p>=0;p--){var c=i[p];"."===c?e(i,p):".."===c?(e(i,p),l++):l&&(e(i,p),l--)}if(!u)for(;l--;l)i.unshift("..");!u||""===i[0]||i[0]&&t(i[0])||i.unshift("");var b=i.join("/");return f&&"/"!==b.substr(-1)&&(b+="/"),b}}}]);