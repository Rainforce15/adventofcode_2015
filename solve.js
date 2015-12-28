"use strict";var R=process.argv,T=R[R.length-1],S={
    1:{
        a:d=>{var f=0;d.split("").forEach(e=>f+={"(":1,")":-1}[e]);return f;},
        b:d=>{for(var i=0,f=0;i<d.length;i++){f+={"(":1,")":-1}[d[i]];if(f<0)return i+1}}
    },
    2:{
        a:d=>{var r=0;d.split("\n").map(e=>e.split("x")).forEach(e=>{var x=e[0]*e[1],y=e[1]*e[2],z=e[2]*e[0];r+=2*(x+y+z)+(x<y?x<z?x:z:y<z?y:z)||0;});return r;},
        b:d=>{var r=0;d.split("\n").map(e=>e.split("x")).forEach(e=>{var l=e[0]|0,w=e[1]|0,h=e[2]|0;r+=2*(l>w?l>h?w+h:w+l:w>h?l+h:w+l)+l*w*h||0;});return r;}
    },
    3:{
        a:d=>{var m={"0,0":1},x=0,y=0;d.split("").forEach(e=>{y+={"^":1,"v":-1}[e]||0;x+={">":1,"<":-1}[e]||0;m[x+","+y]=m[x+","+y]+1||1;});return Object.keys(m).length;},
        b:d=>{var m={"0,0":2},s=[0,0,0,0],q;d.split("").forEach((e,i)=>{q=(s[i%2?0:2]+={">":1,"<":-1}[e]||0)+","+(s[i%2?1:3]+={"^":1,"v":-1}[e]||0);m[q]=m[q]+1||1;});return Object.keys(m).length;}
    },
    4:{
        a:d=>{var i=1;while(require('crypto').createHash('md5').update(d+i).digest("hex").indexOf("00000")!=0){i++}return i;},
        b:d=>{var i=1;while(require('crypto').createHash('md5').update(d+i).digest("hex").indexOf("000000")!=0){i++}return i;}
    },
    5:{
        a:d=>{var c=0;d.split("\n").forEach(e=>c+=e.match(/[aeiou].*[aeiou].*[aeiou]/g)&&e.match(/(.)\1/g)&&!e.match(/ab|cd|pq|xy/g)?1:0);return c;},
        b:d=>{var c=0;d.split("\n").forEach(e=>c+=e.match(/(..).*?\1/g)&&e.match(/(.).\1/g)?1:0);return c;}
    },
    6:{
        a:d=>{var m=[],c=0,o=",",i,j,a;d.split("\n").map(e=>e.split(/ (?!o)/g).map(e=>e.indexOf(o)>-1?e.split(o):e)).forEach(e=>{if(e[0]){for(i=e[1][1]|0;i<(e[3][1]|0)+1;i++){for(j=e[1][0]|0;j<(e[3][0]|0)+1;j++){m[i+o+j]=e[0]=="toggle"?!m[i+o+j]:e[0]=="turn on";}}}});for(a in m){c+=m[a]?1:0;}return c;},
        b:d=>{var m=[],c=0,o=",",i,j,a,v;d.split("\n").map(e=>e.split(/ (?!o)/g).map(e=>e.indexOf(o)>-1?e.split(o):e)).forEach(e=>{if(e[0]){for(i=e[1][1]|0;i<(e[3][1]|0)+1;i++){for(j=e[1][0]|0;j<(e[3][0]|0)+1;j++){v=m[i+o+j];m[i+o+j]=e[0]=="toggle"?(v|0)+2:e[0]=="turn on"?(v|0)+1:v>0?(v|0)-1:0;}}}});for(a in m){c+=m[a];}return c;}
    },
    7:{
        a:d=>{
            var s={},f,c=1,E,A,O,e,m=0x0000ffff,u=a=>{return(a===undefined);};
            d.split("\n").map(e=>e.split(/ \-> /g)).forEach(e=>{
                if(e[0]){f=e[0].split(' ');if(!s[e[1]])s[e[1]]={v:undefined,o:[]};if(f.length===1){
                    if(isNaN(f[0])&&!s[f[0]])s[f[0]]={v:undefined,o:[]};
                        if(isNaN(f[0])){E=((a,c)=>{a=isNaN(a)?s[a].v:a;if(!u(a))s[c].v=a;}).bind(null,f[0],e[1]);
                            s[f[0]].o.push(E);}else{s[e[1]].v=f[0];}
                    }else if(f.length===2){if(!s[f[1]])s[f[1]]={v:undefined,o:[]};
                        s[f[1]].o.push(((a,c)=>{if(u(s[c].v)&&!u(s[a].v))s[c].v=~s[a].v&m;}).bind(null,f[1],e[1]));
                    }else if(f.length===3){if(isNaN(f[0])&&!s[f[0]])s[f[0]]={v:undefined,o:[]};switch(f[1]){
                        case"AND":if(isNaN(f[2])&&!s[f[2]])s[f[2]]={v:undefined,o:[]};
                            A=((a,b,c)=>{a=!isNaN(a)?a:s[a].v;b=!isNaN(b)?b:s[b].v;if(!u(a)&&!u(b))s[c].v=a&b;}).bind(null,f[0],f[2],e[1]);
                            if(isNaN(f[0]))s[f[0]].o.push(A);if(isNaN(f[2]))s[f[2]].o.push(A);break;
                        case"OR":if(isNaN(f[2])&&!s[f[2]])s[f[2]]={v:undefined,o:[]};O=((a,b,c)=>{
                            a=!isNaN(a)?a:s[a].v;b=!isNaN(b)?b:s[b].v;if(!u(a)&&!u(b))s[c].v=a|b;
                        }).bind(null,f[0],f[2],e[1]);if(isNaN(f[0]))s[f[0]].o.push(O);if(isNaN(f[2]))s[f[2]].o.push(O);break;
                        case"LSHIFT":s[f[0]].o.push(((a,b,c)=>{if(!u(s[a].v))s[c].v=s[a].v<<b&m;}).bind(null,f[0],f[2],e[1]));break;
                        case"RSHIFT":s[f[0]].o.push(((a,b,c)=>{if(!u(s[a].v))s[c].v=s[a].v>>b;}).bind(null,f[0],f[2],e[1]));
            }}}});while(c>0){c=0;for(e in s){if(u(s[e].v))c++;s[e].o.forEach(f=>f());}}return s.a.v;
        },
        b:d=>{
            var s={},f,c=1,E,A,O,e,m=0x0000ffff,u=a=>{return(a===undefined);};
            d.split("\n").map(e=>e.split(/ \-> /g)).forEach(e=>{
                if(e[0]){f=e[0].split(' ');if(!s[e[1]])s[e[1]]={v:undefined,o:[]};if(f.length===1){
                        if(isNaN(f[0])&&!s[f[0]])s[f[0]]={v:undefined,o:[]};
                        if(isNaN(f[0])){E=((a,c)=>{a=isNaN(a)?s[a].v:a;if(!u(a))s[c].v=a;}).bind(null,f[0],e[1]);
                            s[f[0]].o.push(E);}else{s[e[1]].v=f[0];}
                    }else if(f.length===2){if(!s[f[1]])s[f[1]]={v:undefined,o:[]};
                        s[f[1]].o.push(((a,c)=>{if(u(s[c].v)&&!u(s[a].v))s[c].v=~s[a].v&m;}).bind(null,f[1],e[1]));
                    }else if(f.length===3){if(isNaN(f[0])&&!s[f[0]])s[f[0]]={v:undefined,o:[]};switch(f[1]){
                        case"AND":if(isNaN(f[2])&&!s[f[2]])s[f[2]]={v:undefined,o:[]};
                            A=((a,b,c)=>{a=!isNaN(a)?a:s[a].v;b=!isNaN(b)?b:s[b].v;if(!u(a)&&!u(b))s[c].v=a&b;}).bind(null,f[0],f[2],e[1]);
                            if(isNaN(f[0]))s[f[0]].o.push(A);if(isNaN(f[2]))s[f[2]].o.push(A);break;
                        case"OR":if(isNaN(f[2])&&!s[f[2]])s[f[2]]={v:undefined,o:[]};O=((a,b,c)=>{
                            a=!isNaN(a)?a:s[a].v;b=!isNaN(b)?b:s[b].v;if(!u(a)&&!u(b))s[c].v=a|b;}).bind(null,f[0],f[2],e[1]);
                            if(isNaN(f[0]))s[f[0]].o.push(O);if(isNaN(f[2]))s[f[2]].o.push(O);break;
                        case"LSHIFT":s[f[0]].o.push(((a,b,c)=>{if(!u(s[a].v))s[c].v=s[a].v<<b&m;}).bind(null,f[0],f[2],e[1]));break;
                        case"RSHIFT":s[f[0]].o.push(((a,b,c)=>{if(!u(s[a].v))s[c].v=s[a].v>>b;}).bind(null,f[0],f[2],e[1]));
                    }}}});s.b.v=S[7].a(d);
            while(c>0){c=0;for(e in s){if(u(s[e].v))c++;s[e].o.forEach(f=>f());}}return s.a.v;
        }
    },
    8:{
        a:d=>{var x=0;d.split("\n").forEach(e=>{x+=e&&e.length-e.replace(/\\\\|\\"|\\x../g,"X").length+2;});return x;},
        b:d=>{var x=0;d.split("\n").forEach(e=>{x+=e&&e.replace(/\\|"/g,"XX").length+2-e.length;});return x;}
    },
    9:{
        a:d=>{
            var n={},p,l,z=0,i,k,c,
            Y=(a,b)=>{if(!n[l[a]])n[l[a]]={};n[l[a]][l[b]]=l[2]|0;},
            X=b=>{if(p.length<k.length){var o=Object.keys(n[b]);for(var j=0;j<o.length;j++){if(p.indexOf(o[j])<0){p.push(o[j]);X(o[j]);p.pop();}}}else{c=0;for(var m=0;m<p.length-1;m++){c+=n[p[m]][p[m+1]];}if(c<z||z==0)z=c;}};
            d.split("\n").forEach(e=>{if(e){l=e.split(/ to | = /g);Y(0,1);Y(1,0);}});
            k=Object.keys(n);for(i=0;i<k.length;i++){p=[k[i]];X(p[0]);}return z;
        },
        b:d=>{
            var n={},p,l,z=0,i,k,c,
            Y=(a,b)=>{if(!n[l[a]])n[l[a]]={};n[l[a]][l[b]]=l[2]|0;},
            X=b=>{if(p.length<k.length){var o=Object.keys(n[b]);for(var j=0;j<o.length;j++){if(p.indexOf(o[j])<0){p.push(o[j]);X(o[j]);p.pop();}}}else{c=0;for(var m=0;m<p.length-1;m++){c+=n[p[m]][p[m+1]];}if(c>z)z=c;}};
            d.split("\n").forEach(e=>{if(e){l=e.split(/ to | = /g);Y(0,1);Y(1,0);}});
            k=Object.keys(n);for(i=0;i<k.length;i++){p=[k[i]];X(p[0]);}return z;
        }
    },
    10:{
        a:d=>{
            var c,n,r,x=(s,j)=>{n=1;r="";c=s[0];for(var i=0;i<s.length;i++){if(!c||i==s.length-1||c!=s[i+1]){r+=c?n+""+c:"";c=s[i+1];n=1;}else n++;}return j>1?x(r,j-1):r;};
            return x(d,40).length;
        },
        b:d=>{
            var c,n,r,x=(s,j)=>{n=1;r="";c=s[0];for(var i=0;i<s.length;i++){if(!c||i==s.length-1||c!=s[i+1]){r+=c?n+""+c:"";c=s[i+1];n=1;}else n++;}return j>1?x(r,j-1):r;};
            return x(d,50).length;
        }
    },
    11:{
        a:d=>{},
        b:d=>{}
    },
    12:{
        a:d=>{},
        b:d=>{}
    },
    13:{
        a:d=>{},
        b:d=>{}
    },
    14:{
        a:d=>{},
        b:d=>{}
    },
    15:{
        a:d=>{},
        b:d=>{}
    },
    16:{
        a:d=>{},
        b:d=>{}
    },
    17:{
        a:d=>{},
        b:d=>{}
    },
    18:{
        a:d=>{},
        b:d=>{}
    },
    19:{
        a:d=>{},
        b:d=>{}
    },
    20:{
        a:d=>{},
        b:d=>{}
    },
    21:{
        a:d=>{},
        b:d=>{}
    },
    22:{
        a:d=>{},
        b:d=>{}
    },
    23:{
        a:d=>{},
        b:d=>{}
    },
    24:{
        a:d=>{},
        b:d=>{}
    },
    25:{
        a:d=>{},
        b:d=>{}
    }
};
console.log(S[T.substr(0,T.length-1)][T.substr(-1)](require('fs').readFileSync("input/"+T.substr(0,T.length-1)+".txt","UTF-8")));