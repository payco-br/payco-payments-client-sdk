"use strict";var D=Object.create;var s=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var P=Object.getOwnPropertyNames;var K=Object.getPrototypeOf,A=Object.prototype.hasOwnProperty;var z=(e,t)=>{for(var r in t)s(e,r,{get:t[r],enumerable:!0})},y=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of P(t))!A.call(e,o)&&o!==r&&s(e,o,{get:()=>t[o],enumerable:!(a=E(t,o))||a.enumerable});return e};var u=(e,t,r)=>(r=e!=null?D(K(e)):{},y(t||!e||!e.__esModule?s(r,"default",{value:e,enumerable:!0}):r,e)),S=e=>y(s({},"__esModule",{value:!0}),e);var U={};z(U,{addPageTag:()=>T,client:()=>d,getDeviceInfo:()=>G,getVisitorID:()=>j,initialize:()=>R,keyId:()=>l,sessionId:()=>g,setCustomerID:()=>$,tokenize:()=>L});module.exports=S(U);var C=u(require("valibot"));var n=u(require("valibot")),c=require("cpf-cnpj-validator"),_=(i=>(i.Mastercard="mastercard",i.Visa="visa",i.Amex="amex",i.Hipercard="hipercard",i.Elo="elo",i))(_||{}),f=n.object({holderName:n.string([n.regex(/^[a-zA-Z\s]+$/),n.minLength(2)]),holderDocument:n.string([n.custom(e=>!!(c.cpf.isValid(e)||c.cnpj.isValid(e)),"invalid document, must be a valid CPF or CNPJ")]),number:n.string([n.regex(/^\d{16}$/),n.custom(e=>{let t=e[0];return!e.split("").every(r=>r===t)},"invalid card number, must be a valid credit card number")]),cardBrand:n.enum_(_),expirationMonth:n.string([n.regex(/^(0[1-9]|1[0-2])$/)]),expirationYear:n.string([n.regex(/^\d{2}$/)]),cvv:n.string([n.regex(/^\d{3}$/)])});var x=u(require("axios"));function b({baseURL:e}){return x.default.create({baseURL:e})}var p=require("jose");async function v({card:e,publicKey:t,keyId:r,verifyCard:a}){let o=new TextEncoder().encode(JSON.stringify({card_number:e.number,brand:e.cardBrand,card_holder_name:e.holderName,expiration_month:e.expirationMonth,expiration_year:e.expirationYear,verify_card:a,security_code:e.cvv})),i=await(0,p.importSPKI)(`-----BEGIN PUBLIC KEY-----
${t}
-----END PUBLIC KEY-----`,"RSA-OAEP-256");return{encryptedCard:await new p.CompactEncrypt(o).setProtectedHeader({alg:"RSA-OAEP-256",enc:"A256GCM",kid:r}).encrypt(i)}}function I(){return{http_accept_browser_value:navigator.userAgent,http_accept_content:navigator.accept,http_browser_language:navigator.language,http_browser_java_enabled:navigator?.javaEnabled()||!1,http_browser_javascript_enabled:!0,http_browser_color_depth:window.screen.colorDepth,http_browser_screen_height:window.screen.height,http_browser_screen_width:window.screen.width,http_browser_time_difference:new Date().getTimezoneOffset().toString(),user_agent_browser_value:navigator.userAgent}}async function h({keyId:e,client:t}){try{return{publicKey:(await t.get(`api/v1/payments/card/public_key/${e}`)).data.public_key}}catch(r){throw console.error("Error getting public key",r),r}}function k({orgId:e,sessionId:t}){let r=t??window.crypto.randomUUID(),a=document.body,o=document.createElement("script");o.id="adiq",o.type="text/javascript",o.src=`https://h.online-metrix.net/fp/tags.js?org_id=${e}&session_id=adiq_br${r}`,a.appendChild(o);let i=document.createElement("script");i.type="text/javascript",i.id="kdtjs",i.async=!0,i.src="https://i.k-analytix.com/k.js",a.appendChild(i);let m=`
		<noscript>
			<iframe
				style="width: 100px; height: 100px; border: 0; position:absolute; top: -5000px;"
				src="https://h.online-metrix.net/fp/tags.js?org_id=${e}&session_id=adiq_br${r}"
			></iframe>
		</noscript>`;return a.insertAdjacentHTML("beforeend",m),r}async function w({encryptedCard:e,client:t}){try{return{token:(await t.post("/api/v1/payments/card/token",{token:e})).data.card_vault_token}}catch{throw new Error("Error trying to tokenize card data")}}function j(){return Konduto.getVisitorID()}function $(e){return Konduto.setCustomerID(e)}function T(e,t){Konduto.sendEvent(e,t)}var d,l,g;globalThis.__kdt=[];var R=async e=>{if(!e.keyId)throw new Error("keyId is required");let t=e.baseURL||"https://api.payments.payco.com.br/open";d=b({baseURL:t}),l=e.keyId;let r=e.orgId||"k8vif92e";if(e.installScripts??!0)__kdt.push({public_key:r},{post_on_load:!1}),g=k({orgId:r,sessionId:e.sessionId});else{if(!e.sessionId)throw new Error("sessionId is required when installScripts is false");g=e.sessionId}},L=async({cardData:e,verifyCard:t=!1})=>{let r=C.parse(f,e),{publicKey:a}=await h({client:d,keyId:l}),{encryptedCard:o}=await v({card:r,publicKey:a,keyId:l,verifyCard:t});return await w({encryptedCard:o,client:d})},G=()=>I();0&&(module.exports={addPageTag,client,getDeviceInfo,getVisitorID,initialize,keyId,sessionId,setCustomerID,tokenize});