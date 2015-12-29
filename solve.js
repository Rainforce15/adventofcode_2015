"use strict";var R=process.argv,L=e=>e.length,T=R[L(R)-1],U=undefined,E="",B=isNaN,N="\n",K=Object.keys,Q=require,I=T.substr(0,L(T)-1),S={
    1:{
        a:d=>{var f=0;d.split(E).forEach(e=>f+={"(":1,")":-1}[e]);return f;},
        b:d=>{for(var i=0,f=0;i<L(d);i++){f+={"(":1,")":-1}[d[i]];if(f<0)return i+1}}
    },
    2:{
        a:d=>{var r=0;d.split(N).map(e=>e.split("x")).forEach(e=>{var x=e[0]*e[1],y=e[1]*e[2],z=e[2]*e[0];r+=2*(x+y+z)+(x<y?x<z?x:z:y<z?y:z)||0;});return r;},
        b:d=>{var r=0;d.split(N).map(e=>e.split("x")).forEach(e=>{var l=e[0]|0,w=e[1]|0,h=e[2]|0;r+=2*(l>w?l>h?w+h:w+l:w>h?l+h:w+l)+l*w*h||0;});return r;}
    },
    3:{
        a:d=>{var m={"0,0":1},x=0,y=0;d.split(E).forEach(e=>{y+={"^":1,"v":-1}[e]||0;x+={">":1,"<":-1}[e]||0;m[x+","+y]=m[x+","+y]+1||1;});return L(K(m));},
        b:d=>{var m={"0,0":2},s=[0,0,0,0],q;d.split(E).forEach((e,i)=>{q=(s[i%2?0:2]+={">":1,"<":-1}[e]||0)+","+(s[i%2?1:3]+={"^":1,"v":-1}[e]||0);m[q]=m[q]+1||1;});return L(K(m));}
    },
    4:{
        a:d=>S[4].c(d),b:d=>S[4].c(d,1),
        c:(d,t)=>{var i=1;while(Q('crypto').createHash('md5').update(d+i).digest("hex").indexOf("00000"+(t?"0":E))!=0){i++}return i;}
    },
    5:{
        a:d=>{var c=0;d.split(N).forEach(e=>c+=e.match(/[aeiou].*[aeiou].*[aeiou]/g)&&e.match(/(.)\1/g)&&!e.match(/ab|cd|pq|xy/g)?1:0);return c;},
        b:d=>{var c=0;d.split(N).forEach(e=>c+=e.match(/(..).*?\1/g)&&e.match(/(.).\1/g)?1:0);return c;}
    },
    6:{
        a:d=>S[6].c(d),b:d=>S[6].c(d,1),
        c:(d,t)=>{
            var m=[],c=0,o=",",i,j,a,v;d.split(N).map(e=>e.split(/ (?!o)/g).map(e=>e.indexOf(o)>-1?e.split(o):e)).forEach(e=>{if(e[0]){for(i=e[1][1]|0;i<(e[3][1]|0)+1;i++){for(j=e[1][0]|0;j<(e[3][0]|0)+1;j++){
                v=m[i+o+j];m[i+o+j]=e[0]=="toggle"?t?(v|0)+2:!m[i+o+j]:t?e[0]=="turn on"?(v|0)+1:v>0?(v|0)-1:0:e[0]=="turn on";}}}});for(a in m){c+=t?m[a]:m[a]?1:0;}return c;}
    },
    7:{
        a:d=>S[7].c(d),b:d=>S[7].c(d,1),
        c:(d,t)=>{
            var s={},f,c=1,E,A,O,e,m=0x0000ffff,u=a=>{return(a==U);};
            d.split(N).map(e=>e.split(/ \-> /g)).forEach(e=>{
                if(e[0]){f=e[0].split(' ');if(!s[e[1]])s[e[1]]={v:U,o:[]};if(L(f)==1){
                    if(B(f[0])&&!s[f[0]])s[f[0]]={v:U,o:[]};
                    if(B(f[0])){E=((a,c)=>{a=B(a)?s[a].v:a;if(!u(a))s[c].v=a;}).bind(null,f[0],e[1]);
                        s[f[0]].o.push(E);}else{s[e[1]].v=f[0];}
                }else if(L(f)==2){if(!s[f[1]])s[f[1]]={v:U,o:[]};
                    s[f[1]].o.push(((a,c)=>{if(u(s[c].v)&&!u(s[a].v))s[c].v=~s[a].v&m;}).bind(null,f[1],e[1]));
                }else if(L(f)==3){if(B(f[0])&&!s[f[0]])s[f[0]]={v:U,o:[]};switch(f[1]){
                    case"AND":if(B(f[2])&&!s[f[2]])s[f[2]]={v:U,o:[]};
                        A=((a,b,c)=>{a=!B(a)?a:s[a].v;b=!B(b)?b:s[b].v;if(!u(a)&&!u(b))s[c].v=a&b;}).bind(null,f[0],f[2],e[1]);
                        if(B(f[0]))s[f[0]].o.push(A);if(B(f[2]))s[f[2]].o.push(A);break;
                    case"OR":if(B(f[2])&&!s[f[2]])s[f[2]]={v:U,o:[]};O=((a,b,c)=>{
                        a=!B(a)?a:s[a].v;b=!B(b)?b:s[b].v;if(!u(a)&&!u(b))s[c].v=a|b;
                    }).bind(null,f[0],f[2],e[1]);if(B(f[0]))s[f[0]].o.push(O);if(B(f[2]))s[f[2]].o.push(O);break;
                    case"LSHIFT":s[f[0]].o.push(((a,b,c)=>{if(!u(s[a].v))s[c].v=s[a].v<<b&m;}).bind(null,f[0],f[2],e[1]));break;
                    case"RSHIFT":s[f[0]].o.push(((a,b,c)=>{if(!u(s[a].v))s[c].v=s[a].v>>b;}).bind(null,f[0],f[2],e[1]));
                }}}});if(t){s.b.v=S[7].c(d);}
            while(c>0){c=0;for(e in s){if(u(s[e].v))c++;s[e].o.forEach(f=>f());}}return s.a.v;
        }
    },
    8:{
        a:d=>S[8].c(d),b:d=>S[8].c(d,1),
        c:(d,t)=>{var x=0;d.split(N).forEach(e=>{x+=e&&L(t?e.replace(/\\|"/g,"XX"):e)-L(t?e:e.replace(/\\\\|\\"|\\x../g,"X"))+2;});return x;}
    },
    9:{
        a:d=>S[9].c(d),b:d=>S[9].c(d,1),
        c:(d,t)=>{
            var n={},p,l,z=0,i,k,c,
            Y=(a,b)=>{if(!n[l[a]])n[l[a]]={};n[l[a]][l[b]]=l[2]|0;},
            X=b=>{if(L(p)<L(k)){var o=K(n[b]);for(var j=0;j<L(o);j++)
                if(p.indexOf(o[j])<0){p.push(o[j]);X(o[j]);p.pop();}}else{c=0;for(var m=0;m<L(p)-1;m++)c+=n[p[m]][p[m+1]];if(t?c>z:c<z||z==0)z=c;}};
            d.split(N).forEach(e=>{if(e){l=e.split(/ to | = /g);Y(0,1);Y(1,0);}});k=K(n);for(i=0;i<L(k);i++){p=[k[i]];X(p[0]);}return z;
        }
    },
    10:{
        a:d=>S[10].c(d,40),b:d=>S[10].c(d,50),
        c:(d,a)=>{var c,n,i,r,x=(s,j)=>{n=1;r=E;c=s[0];for(i=0;i<L(s);i++){if(!c||i==L(s)-1||c!=s[i+1]){r+=c?n+E+c:E;c=s[i+1];n=1;}else n++;}return j>1?x(r,j-1):r;};return L(x(d,a));}
    },
    11:{
        a:d=>{
            var h=i=>d.charCodeAt(i),i,u=i=>{if(i>=0){var c=d[i].charCodeAt(0);d[i]=String.fromCharCode(c<122?c+1:(u(i-1)||97));}},p=e=>{d=d.split(E);u(7);d=d.join(E);},
                a=e=>{for(i=0;i<L(d)-2;i++)if(h(i+1)-1==h(i)&&h(i+2)-2==h(i))return true;},b=e=>L(d.match(/i|l|o/g)||E),
                c=e=>L(d.match(/(.)\1(?!.*\1\1).*(.)\2/g)||E);p();while(!a()||b()||!c())p();return d;
        },
        b:d=>S[11].a(S[11].a(d))
    },
    12:{
        a:d=>S[12].c(d,1),b:d=>S[12].c(d),
        c:(d,t)=>{
            d=JSON.parse(d);var c=0,f=e=>{if(typeof e=="object"){if(e.constructor==Array){e.forEach(e=>f(e));}
            else{var v=1;for(var k in e)if(e[k]=="red")v=0;if(v||t)for(var k in e)f(e[k]);}}else if(typeof e=="number"){c+=e;}};f(d);return c;
        }
    },
    13:{
        a:d=>S[13].c(d),b:d=>S[13].c(d,1),
        c:(d,t)=>{var n={},p,l,z=0,i,k,c,o={}, Y=(a,b)=>c+=n[a][b]+n[b][a], X=b=>{if(L(p)<L(k)){var o=K(n[b]);
                for(var j=0;j<L(o);j++)if(p.indexOf(o[j])<0){p.push(o[j]);X(o[j]);p.pop();}}else{c=0;for(var m=0;m<L(p)-1;m++)Y(p[m],p[m+1]);Y(p[L(p)-1],p[0]);if(c>z)z=c;}};
            d.split(N).forEach(e=>{if(e){l=e.split(/ would | happiness units by sitting next to |\./g);l[1]=l[1].split(" ");if(!n[l[0]])n[l[0]]={};n[l[0]][l[2]]=(l[1][1]|0)*(l[1][0]=="gain"?1:-1);}});
            if(t){k=K(n);for(i=0;i<L(k);i++){o[k[i]]=0;n[k[i]].X=0;}n.X=o;}k=K(n);for(i=0;i<L(k);i++){p=[k[i]];X(p[0]);}return z;
        }
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
console.log(S[I][T.substr(-1)](Q('fs').readFileSync("input/"+I+".txt","UTF-8")));
