"use strict";function checkStatus(a){if(200<=a.status&&300>a.status)return a;var b=new Error(a.statusText);throw b.res=a,b}
