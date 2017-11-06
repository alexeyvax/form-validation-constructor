!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=7)}([function(t,e,n){"use strict";n.d(e,"s",function(){return r}),n.d(e,"h",function(){return i}),n.d(e,"p",function(){return a}),n.d(e,"j",function(){return o}),n.d(e,"o",function(){return u}),n.d(e,"n",function(){return s}),n.d(e,"m",function(){return c}),n.d(e,"f",function(){return l}),n.d(e,"k",function(){return f}),n.d(e,"l",function(){return d}),n.d(e,"i",function(){return m}),n.d(e,"g",function(){return p}),n.d(e,"e",function(){return h}),n.d(e,"c",function(){return v}),n.d(e,"b",function(){return g}),n.d(e,"d",function(){return y}),n.d(e,"r",function(){return E}),n.d(e,"q",function(){return b}),n.d(e,"a",function(){return C});var r="\n  input[type=text],\n  input[type=number],\n  input[type=email],\n  input[type=password],\n  input[type=file],\n  input[type=search],\n  input[type=tel],\n  input[type=url],\n  input[type=checkbox],\n  input[type=radio]\n",i="isNonEmpty",a="onlyLetters",o="isValidNumber",u="minMax",s="min",c="max",l="isEmailCorrect",f="isValidTel",d="isValidUrl",m="isRequired",p="isEmptyGroup",h="en",v="show",g="message",y="tooltip",E={SUBMIT:"submit",INPUT:"input",CHANGE:"change"},b="radio",C="checkbox"},function(t,e,n){"use strict";var r=n(0),i=n(9),a=n(5),o=function(){function t(){this.storeCreateElements=new Map,this.errorNotificationElement=Object.create(null)}return t.prototype.outputWarningToConsole=function(t){console.error(t)},t.prototype.sortMessages=function(t){var e=this;t.forEach(function(t,n){t?(e.addElement(n,t),e.changeElement(n,t)):e.storeCreateElements.has(n)&&e.removeElement(n)})},t.prototype.addElement=function(t,e){this.storeCreateElements.has(t)||(this.errorNotificationElement={createdElement:Object(i.a)(t,e),message:e},this.storeCreateElements.set(t,this.errorNotificationElement))},t.prototype.changeElement=function(t,e){var n=this.storeCreateElements.get(t);n.message!==e&&(n.createdElement.firstElementChild.textContent=e,n.message=e,Object(a.a)(n.createdElement,r.c))},t.prototype.removeElement=function(t){var e=this.storeCreateElements.get(t);e.createdElement.firstElementChild.textContent="",e.message="",Object(a.b)(e.createdElement,r.c)},t}();e.a=new o},function(t,e,n){"use strict";var r=n(1),i=function(){function t(){this.errors=new Map}return t.prototype.getMessage=function(){r.a.sortMessages(this.errors)},t.prototype.getErrors=function(){return this.errors},t.prototype.setErrors=function(t,e){this.errors.set(t,e)},t.prototype.getCurrentLanguage=function(){return this.lang},t.prototype.setCurrentLanguage=function(t){this.lang=t},t}(),a=new i;e.a=a},function(t,e,n){"use strict";var r={en:{isNonEmpty:"This field can not be empty.",onlyLetters:'value can only be the letters "a" to "z".',isValidNumber:"value can only be a number, such as 1, 3.14 or 2010",minMax:"value can only be a number no less and no more than min max",min:"value can only be a number not less than min",max:"value can only be a number not more than max",isEmailCorrect:"enter a valid email",isValidTel:"enter a valid phone",isValidUrl:"enter a valid url",isRequired:"for to continue activate a mandatory field",isEmptyGroup:"you need to select at least one item"},ru:{isNonEmpty:"это поле не может быть пустым.",onlyLetters:'значением может быть только буквы от "а" до "я".',isValidNumber:"значением может быть только число­, например 1, 3.14 или 2010",minMax:"значением может быть только число не меньше min и не больше max",min:"значением может быть только число не меньше min",max:"значением может быть только число не больше max",isEmailCorrect:"введите корректный email",isValidTel:"введите корректный телефон",isValidUrl:"введите корректный url",isRequired:"для продолжения активируйте обязательное поле",isEmptyGroup:"необходимо выбрать хоть один пункт"}};e.a=r},function(t,e,n){"use strict";var r={isNonEmpty:{validate:function(t){return""!==t.value}},onlyLetters:{validate:function(t){return!/[^a-zа-яё ]/gi.test(t.value)}},isValidNumber:{validate:function(t){return!isNaN(Number(t.value))}},minMax:{validate:function(t){var e=Number(t.min),n=Number(t.max),r=Number(t.value);return e>r||r>n}},min:{validate:function(t){return Number(t.min)>Number(t.value)}},max:{validate:function(t){var e=Number(t.max);return Number(t.value)>e}},isEmailCorrect:{validate:function(t){return/^.+@.+$/.test(t.value)}},isValidTel:{validate:function(t){return!/[^0-9 .()*+-]/g.test(t.value)}},isValidUrl:{validate:function(t){return/^(https?|s?ftp|file):\/\/[a-zа-яё_-]+[\a-zа-яё\.]{2,6}\??([a-zа-яё_-]+)\#?([a-zа-яё_-]+)/g.test(t.value)}},isRequired:{validate:function(t){return t.checked}},isEmptyGroup:{validate:function(t){return t.some(function(t){return t.checked})}}};e.a=r},function(t,e,n){"use strict";n.d(e,"a",function(){return r}),n.d(e,"b",function(){return i});var r=function(t,e){return t.classList.add(e)},i=function(t,e){return t.classList.remove(e)}},function(t,e,n){"use strict";var r=n(0),i={text:[r.h,r.p],number:[r.h,r.j,r.o,r.n,r.m],email:[r.h,r.f],password:[r.h],file:[r.h],search:[r.h,r.p],tel:[r.h,r.k],url:[r.h,r.l],checkbox:[r.i,r.g],radio:[r.i,r.g]};e.a=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(8);e.default=r.a},function(t,e,n){"use strict";var r=n(1),i=n(2),a=n(10),o=n(0),u=n(17),s=function(t){if(void 0===t&&(t={}),"undefined"==typeof window)return void r.a.outputWarningToConsole("Sorry but this library is designed to work in the browser!");"lang"in t?i.a.setCurrentLanguage(t.lang):i.a.setCurrentLanguage(document.documentElement.lang||o.e),"listOfChecks"in t&&Object(u.a)(t),Array.prototype.forEach.call(document.querySelectorAll("form[data-validation=true]"),function(t){return new a.a(t)})};e.a=s},function(t,e,n){"use strict";var r=n(0),i=n(5),a=function(t,e){var n=document.createElement("div"),a=document.createElement("span");return Object(i.a)(a,r.b),Object(i.a)(n,r.d),setTimeout(function(){return Object(i.a)(n,r.c)},100),a.textContent=e,n.appendChild(a),t.parentElement.insertBefore(n,t),n};e.a=a},function(t,e,n){"use strict";var r=n(0),i=n(11),a=n(12),o=n(13),u=n(14),s=n(15),c=n(16),l=n(2),f=function(){function t(t){var e=this;this.form=t,this.listInputElement=t.querySelectorAll(r.s),this.dataSimpleInput=[],this.dataGroupElements=[],this.isFormRegisterHandler=!1,this.boundFormInputHandler=Object(u.a)(function(t){return e.validation(t)},100,!0),this.boundFormChangeHandler=Object(u.a)(function(t){return e.validation(t)},100,!0),this.registerHandlers()}return t.prototype.registerHandlers=function(){var t=this;this.init(),this.form.addEventListener(r.r.SUBMIT,function(e){return t.validation(e)})},t.prototype.formRegisterHandlers=function(){this.isFormRegisterHandler||(this.form.addEventListener(r.r.INPUT,this.boundFormInputHandler),this.form.addEventListener(r.r.CHANGE,this.boundFormChangeHandler),this.isFormRegisterHandler=!0)},t.prototype.formUnRegisterHandlers=function(){this.form.removeEventListener(r.r.INPUT,this.boundFormInputHandler),this.form.removeEventListener(r.r.CHANGE,this.boundFormChangeHandler),this.isFormRegisterHandler=!1},t.prototype.init=function(){var t=this,e=[];Array.prototype.forEach.call(this.listInputElement,function(n){var a=n.dataset.options;if(a){var o=a.split(" ");if(n.type===r.q||n.type===r.a||o.some(i.a))return void e.push(n);var u={inputElement:n,name:n.name,config:Object(s.a)(n,o)};t.dataSimpleInput.push(u)}}),this.dataGroupElements=Object(c.a)(e)},t.prototype.validation=function(t){var e=this,n=!1;t.preventDefault(),Object(a.a)(this.dataSimpleInput),Object(o.a)(this.dataGroupElements),l.a.getMessage(),l.a.getErrors().forEach(function(t){""!==t&&(n=!0,e.formRegisterHandlers())}),n||t.type!==r.r.SUBMIT||(this.formUnRegisterHandlers(),this.form.submit())},t}();e.a=f},function(t,e,n){"use strict";var r=n(0),i=function(t){return t===r.g};e.a=i},function(t,e,n){"use strict";var r=n(2),i=n(3),a=n(4),o=function(t,e){var n="",o=r.a.getCurrentLanguage().toLowerCase();return t.some(function(t){var r=a.a[t];return!!r&&(!r.validate(e)&&(n=i.a[o][t],!0))}),n},u=function(t){if(!t.length)return r.a.getErrors();t.forEach(function(t){var e=t.inputElement,n=t.config,i=o(n,e);r.a.setErrors(e,i)})};e.a=u},function(t,e,n){"use strict";var r=n(2),i=n(0),a=n(3),o=n(4),u=function(t){var e="";if(!t.length)return e;var n=r.a.getCurrentLanguage().toLowerCase();return t.some(function(){var r=o.a[i.g];return!!r&&(!r.validate(t)&&(e=a.a[n][i.g],!0))}),e},s=function(t){if(!t.length)return r.a.getErrors();t.forEach(function(t){var e=u(t);r.a.setErrors(t[0],e)})};e.a=s},function(t,e,n){"use strict";function r(t,e,n){void 0===e&&(e=100),void 0===n&&(n=!1);var r;return function(){for(var i=this,a=[],o=0;o<arguments.length;o++)a[o]=arguments[o];r?clearTimeout(r):n&&t.apply(this,a),r=setTimeout(function(){n||t.apply(i,a),r=0},e)}}e.a=r},function(t,e,n){"use strict";var r=n(1),i=n(6),a=function(t,e){var n=t.name,a=t.type,o=[];return e.length?(e.forEach(function(t){return i.a[a].includes(t)?o.push(t):r.a.outputWarningToConsole('Warning: field named "'+n+'" with type="'+a+'".\n      data-options can not contain check to "'+t+'"')}),o):o};e.a=a},function(t,e,n){"use strict";var r=n(1),i=n(0),a=function(t,e,n){var i="";return n?i=n:(e.includes(t)||(e.push(t),r.a.outputWarningToConsole("Please enter valid groupname for input with name "+t+' and type="checkbox"')),i)},o=function(t,e){var n=t.type,r=t.name,o=t.dataset,u="";return n===i.q?u=r:n===i.a&&(u=o.groupname?a(r,e,o.groupname):""),u},u=function(t,e,n){var r=[];return e.forEach(function(e){var i=o(e,n);t===i&&r.push(e)}),r},s=function(t){var e=[],n=[],r=[];return t.forEach(function(i){var a=o(i,r);if(!n.includes(a)){var s=u(a,t,r);n.push(a),e.push(s)}}),e};e.a=s},function(t,e,n){"use strict";var r=n(6),i=n(4),a=n(3),o=function(t){t.listOfChecks.map(function(t){i.a[t.name]={validate:t.validate},t.typeField.forEach(function(e){return r.a[e].push(t.name)}),Object.keys(t.instructions).map(function(e){var n=t.instructions[e];Object.keys(n).map(function(t){if(e in a.a)return void(a.a[e][t]=n[t]);a.a[e]=(r={},r[t]=n[t],r);var r})})})};e.a=o}])});