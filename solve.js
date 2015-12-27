"use strict";var r=process.argv,t=r[r.length-1],S={
    1:{
        a:function(d){var f=0;d.split("").forEach(e=>f+={"(":1,")":-1}[e]);return f;},
        b:function(d){for(var i=0,f=0;i<d.length;i++){f+={"(":1,")":-1}[d[i]];if(f<0)return i+1}}
    },
    2:{
        a:function(d){var r=0;d.split("\n").map(e=>e.split("x")).forEach(e=>{var x=e[0]*e[1],y=e[1]*e[2],z=e[2]*e[0];r+=2*(x+y+z)+(x<y?x<z?x:z:y<z?y:z)||0;});return r;},
        b:function(d){var r=0;d.split("\n").map(e=>e.split("x")).forEach(e=>{var l=e[0]|0,w=e[1]|0,h=e[2]|0;r+=2*(l>w?l>h?w+h:w+l:w>h?l+h:w+l)+l*w*h||0;});return r;}
    },
    3:{
        a:function(d){var m={"0,0":1},x=0,y=0;d.split("").forEach(e=>{y+={"^":1,"v":-1}[e]||0;x+={">":1,"<":-1}[e]||0;m[x+","+y]=m[x+","+y]+1||1;});return Object.keys(m).length;},
        b:function(d){var m={"0,0":2},s=[0,0,0,0],q;d.split("").forEach((e,i)=>{q=(s[i%2?0:2]+={">":1,"<":-1}[e]||0)+","+(s[i%2?1:3]+={"^":1,"v":-1}[e]||0);m[q]=m[q]+1||1;});return Object.keys(m).length;}
    },
    4:{
        a:function(d){var i=1;while(require('crypto').createHash('md5').update(d+i).digest("hex").indexOf("00000")!=0){i++}return i;},
        b:function(d){var i=1;while(require('crypto').createHash('md5').update(d+i).digest("hex").indexOf("000000")!=0){i++}return i;}
    },
    5:{
        a:function(d){var c=0;d.split("\n").forEach(e=>c+=e.match(/[aeiou].*[aeiou].*[aeiou]/g)&&e.match(/(.)\1/g)&&!e.match(/ab|cd|pq|xy/g)?1:0);return c;},
        b:function(d){var c=0;d.split("\n").forEach(e=>c+=e.match(/(..).*?\1/g)&&e.match(/(.).\1/g)?1:0);return c;}
    },
    6:{
        a:function(d){var m=[],c=0,o=",",i,j,a;d.split("\n").map(e=>e.split(/ (?!o)/g).map(e=>e.indexOf(o)>-1?e.split(o):e)).forEach(e=>{if(e[0]){for(i=e[1][1]|0;i<(e[3][1]|0)+1;i++){for(j=e[1][0]|0;j<(e[3][0]|0)+1;j++){m[i+o+j]=e[0]=="toggle"?!m[i+o+j]:e[0]=="turn on";}}}});for(a in m){c+=m[a]?1:0;}return c;},
        b:function(d){var m=[],c=0,o=",",i,j,a,v;d.split("\n").map(e=>e.split(/ (?!o)/g).map(e=>e.indexOf(o)>-1?e.split(o):e)).forEach(e=>{if(e[0]){for(i=e[1][1]|0;i<(e[3][1]|0)+1;i++){for(j=e[1][0]|0;j<(e[3][0]|0)+1;j++){v=m[i+o+j];m[i+o+j]=e[0]=="toggle"?(v|0)+2:e[0]=="turn on"?(v|0)+1:v>0?(v|0)-1:0;}}}});for(a in m){c+=m[a];}return c;}
    },
    7:{
        a:function(d){
            var s={},f,c=1,E,A,O,e,m=0x0000ffff;function u(a){return(a===undefined);}
            d.split("\n").map(e=>e.split(/ \-> /g)).forEach(e=>{
                if(e[0]){f=e[0].split(' ');if(!s[e[1]])s[e[1]]={v:undefined,o:[]};
                    if(f.length===1){if(isNaN(f[0])&&!s[f[0]])s[f[0]]={v:undefined,o:[]};
                        if(isNaN(f[0])){E=function(a,c){a=isNaN(a)?s[a].v:a;if(!u(a))s[c].v=a;}.bind(null,f[0],e[1]);
                            s[f[0]].o.push(E);}else{s[e[1]].v=f[0];}
                    }else if(f.length===2){if(!s[f[1]])s[f[1]]={v:undefined,o:[]};
                        s[f[1]].o.push(function(a,c){if(u(s[c].v)&&!u(s[a].v))s[c].v=~s[a].v&m;
                        }.bind(null,f[1],e[1]));
                    }else if(f.length===3){if(isNaN(f[0])&&!s[f[0]])s[f[0]]={v:undefined,o:[]};switch(f[1]){
                        case"AND":if(isNaN(f[2])&&!s[f[2]])s[f[2]]={v:undefined,o:[]};
                            A=function(a,b,c){a=!isNaN(a)?a:s[a].v;b=!isNaN(b)?b:s[b].v;if(!u(a)&&!u(b))s[c].v=a&b;
                            }.bind(null,f[0],f[2],e[1]);
                            if(isNaN(f[0]))s[f[0]].o.push(A);if(isNaN(f[2]))s[f[2]].o.push(A);break;
                        case"OR":if(isNaN(f[2])&&!s[f[2]])s[f[2]]={v:undefined,o:[]};O=function(a,b,c){
                            a=!isNaN(a)?a:s[a].v;b=!isNaN(b)?b:s[b].v;if(!u(a)&&!u(b))s[c].v=a|b;
                        }.bind(null,f[0],f[2],e[1]);
                            if(isNaN(f[0]))s[f[0]].o.push(O);if(isNaN(f[2]))s[f[2]].o.push(O);break;
                        case"LSHIFT":s[f[0]].o.push(function(a,b,c){
                                if(!u(s[a].v))s[c].v=s[a].v<<b&m;}.bind(null,f[0],f[2],e[1]));break;
                        case"RSHIFT":s[f[0]].o.push(function(a,b,c){
                                if(!u(s[a].v))s[c].v=s[a].v>>b;}.bind(null,f[0],f[2],e[1]));
            }}}});while(c>0){c=0;for(e in s){if(u(s[e].v))c++;s[e].o.forEach(f=>f());}}return s.a.v;
        },
        b:function(d){
            var s={},f,c=1,E,A,O,e,m=0x0000ffff;function u(a){return(a===undefined);}
            d.split("\n").map(e=>e.split(/ \-> /g)).forEach(e=>{
                if(e[0]){
                    f=e[0].split(' ');if(!s[e[1]])s[e[1]]={v:undefined,o:[]};
                    if(f.length===1){
                        if(isNaN(f[0])&&!s[f[0]])s[f[0]]={v:undefined,o:[]};
                        if(isNaN(f[0])){E=function(a,c){a=isNaN(a)?s[a].v:a;if(!u(a))s[c].v=a;}.bind(null,f[0],e[1]);
                            s[f[0]].o.push(E);}else{s[e[1]].v=f[0];}
                    }else if(f.length===2){if(!s[f[1]])s[f[1]]={v:undefined,o:[]};
                        s[f[1]].o.push(function(a,c){if(u(s[c].v)&&!u(s[a].v))s[c].v=~s[a].v&m;
                        }.bind(null,f[1],e[1]));
                    }else if(f.length===3){if(isNaN(f[0])&&!s[f[0]])s[f[0]]={v:undefined,o:[]};switch(f[1]){
                        case"AND":if(isNaN(f[2])&&!s[f[2]])s[f[2]]={v:undefined,o:[]};
                            A=function(a,b,c){a=!isNaN(a)?a:s[a].v;b=!isNaN(b)?b:s[b].v;if(!u(a)&&!u(b))s[c].v=a&b;
                            }.bind(null,f[0],f[2],e[1]);
                            if(isNaN(f[0]))s[f[0]].o.push(A);if(isNaN(f[2]))s[f[2]].o.push(A);break;
                        case"OR":if(isNaN(f[2])&&!s[f[2]])s[f[2]]={v:undefined,o:[]};O=function(a,b,c){
                            a=!isNaN(a)?a:s[a].v;b=!isNaN(b)?b:s[b].v;if(!u(a)&&!u(b))s[c].v=a|b;
                        }.bind(null,f[0],f[2],e[1]);
                            if(isNaN(f[0]))s[f[0]].o.push(O);if(isNaN(f[2]))s[f[2]].o.push(O);break;
                        case"LSHIFT":s[f[0]].o.push(function(a,b,c){
                            if(!u(s[a].v))s[c].v=s[a].v<<b&m;}.bind(null,f[0],f[2],e[1]));break;
                        case"RSHIFT":s[f[0]].o.push(function(a,b,c){
                                if(!u(s[a].v))s[c].v=s[a].v>>b;}.bind(null,f[0],f[2],e[1]));
                    }}}});s.b.v=S[7].a(d);
            while(c>0){c=0;for(e in s){if(u(s[e].v))c++;s[e].o.forEach(f=>f());}}return s.a.v;
        }
    },
    8:{
        a:function(d){var x=0;d.split("\n").forEach(e=>{x+=e.length-e.replace(/\\\\|\\"|\\x../g,"X").replace(/"/g,"").length;});return x;},
        b:function(d){}
    },
    9:{
        a:function(d){},
        b:function(d){}
    },
    10:{
        a:function(d){},
        b:function(d){}
    },
    11:{
        a:function(d){},
        b:function(d){}
    },
    12:{
        a:function(d){},
        b:function(d){}
    },
    13:{
        a:function(d){},
        b:function(d){}
    },
    14:{
        a:function(d){},
        b:function(d){}
    },
    15:{
        a:function(d){},
        b:function(d){}
    },
    16:{
        a:function(d){},
        b:function(d){}
    },
    17:{
        a:function(d){},
        b:function(d){}
    },
    18:{
        a:function(d){},
        b:function(d){}
    },
    19:{
        a:function(d){},
        b:function(d){}
    },
    20:{
        a:function(d){},
        b:function(d){}
    },
    21:{
        a:function(d){},
        b:function(d){}
    },
    22:{
        a:function(d){},
        b:function(d){}
    },
    23:{
        a:function(d){},
        b:function(d){}
    },
    24:{
        a:function(d){},
        b:function(d){}
    },
    25:{
        a:function(d){},
        b:function(d){}
    }
};
console.log(S[t.substr(0,t.length-1)][t.substr(-1)](require('fs').readFileSync("input/"+t[0]+".txt","UTF-8")));
