"use strict";var R=process.argv,L=e=>e.length,T=R[L(R)-1],U=undefined,E="",B=isNaN,P=(s,c)=>s.split(c),N=s=>P(s,"\n"),K=Object.keys,Q=require,I=T.substr(0,L(T)-1),F=(a,f)=>a.forEach(f),S={
    1:{
        a:d=>{var f=0;F(P(d,E),e=>f+={"(":1,")":-1}[e]);return f;},
        b:d=>{for(var i=0,f=0;i<L(d);i++){f+={"(":1,")":-1}[d[i]];if(f<0)return i+1}}
    },
    2:{
        a:d=>{var r=0;F(N(d).map(e=>P(e,"x")),e=>{var x=e[0]*e[1],y=e[1]*e[2],z=e[2]*e[0];r+=2*(x+y+z)+(x<y?x<z?x:z:y<z?y:z)||0;});return r;},
        b:d=>{var r=0;F(N(d).map(e=>P(e,"x")),e=>{var l=+e[0],w=+e[1],h=+e[2];r+=2*(l>w?l>h?w+h:w+l:w>h?l+h:w+l)+l*w*h||0;});return r;}
    },
    3:{
        a:d=>{var m={"0,0":1},x=0,y=0;F(P(d,E),e=>{y+={"^":1,"v":-1}[e]||0;x+={">":1,"<":-1}[e]||0;m[x+","+y]=m[x+","+y]+1||1;});return L(K(m));},
        b:d=>{var m={"0,0":2},s=[0,0,0,0],q;F(P(d,E),(e,i)=>{q=(s[i%2?0:2]+={">":1,"<":-1}[e]||0)+","+(s[i%2?1:3]+={"^":1,"v":-1}[e]||0);m[q]=m[q]+1||1;});return L(K(m));}
    },
    4:{
        a:d=>S[4].c(d),b:d=>S[4].c(d,1),
        c:(d,t)=>{var i=1;while(Q('crypto').createHash('md5').update(d+i).digest("hex").indexOf("00000"+(t?"0":E))!=0){i++}return i;}
    },
    5:{
        a:d=>{var c=0;F(N(d),e=>c+=e.match(/[aeiou].*[aeiou].*[aeiou]/g)&&e.match(/(.)\1/g)&&!e.match(/ab|cd|pq|xy/g)?1:0);return c;},
        b:d=>{var c=0;F(N(d),e=>c+=e.match(/(..).*?\1/g)&&e.match(/(.).\1/g)?1:0);return c;}
    },
    6:{
        a:d=>S[6].c(d),b:d=>S[6].c(d,1),
        c:(d,t)=>{
            var m=[],c=0,o=",",i,j,a,v;F(N(d).map(e=>P(e,/ (?!o)/g).map(e=>e.indexOf(o)>-1?P(e,o):e)),e=>{if(e[0]){for(i=+e[1][1];i<+e[3][1]+1;i++){for(j=+e[1][0];j<+e[3][0]+1;j++){
                v=m[i+o+j];m[i+o+j]=e[0]=="toggle"?t?(v|0)+2:!m[i+o+j]:t?e[0]=="turn on"?(v|0)+1:v>0?(v|0)-1:0:e[0]=="turn on";}}}});for(a in m){c+=t?m[a]:m[a]?1:0;}return c;}
    },
    7:{
        a:d=>S[7].c(d),b:d=>S[7].c(d,1),
        c:(d,t)=>{
            var s={},f,c=1,E,A,O,e,m=0xffff,u=a=>{return(a==U);};
            F(N(d).map(e=>P(e,/ -> /g)),e=>{
                if(e[0]){f=P(e[0],' ');if(!s[e[1]])s[e[1]]={v:U,o:[]};if(L(f)==1){
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
            while(c>0){c=0;for(e in s){if(u(s[e].v))c++;F(s[e].o,f=>f());}}return s.a.v;
        }
    },
    8:{
        a:d=>S[8].c(d),b:d=>S[8].c(d,1),
        c:(d,t)=>{var x=0;F(N(d),e=>{x+=e&&L(t?e.replace(/\\|"/g,"XX"):e)-L(t?e:e.replace(/\\\\|\\"|\\x../g,"X"))+2;});return x;}
    },
    9:{
        a:d=>S[9].c(d),b:d=>S[9].c(d,1),
        c:(d,t)=>{
            var n={},p,l,z=0,i,k,c,
            Y=(a,b)=>{if(!n[l[a]])n[l[a]]={};n[l[a]][l[b]]=+l[2];},
            X=b=>{if(L(p)<L(k)){var o=K(n[b]);for(var j=0;j<L(o);j++)
                if(p.indexOf(o[j])<0){p.push(o[j]);X(o[j]);p.pop();}}else{c=0;for(var m=0;m<L(p)-1;m++)c+=n[p[m]][p[m+1]];if(t?c>z:c<z||z==0)z=c;}};
            F(N(d),e=>{if(e){l=P(e,/ to | = /g);Y(0,1);Y(1,0);}});k=K(n);for(i=0;i<L(k);i++){p=[k[i]];X(p[0]);}return z;
        }
    },
    10:{
        a:d=>S[10].c(d,40),b:d=>S[10].c(d,50),
        c:(d,a)=>{var c,n,i,r,x=(s,j)=>{n=1;r=E;c=s[0];for(i=0;i<L(s);i++){if(!c||i==L(s)-1||c!=s[i+1]){r+=c?n+E+c:E;c=s[i+1];n=1;}else n++;}return j>1?x(r,j-1):r;};return L(x(d,a));}
    },
    11:{
        a:d=>{
            var h=i=>d.charCodeAt(i),i,u=i=>{if(i>=0){var c=d[i].charCodeAt(0);d[i]=String.fromCharCode(c<122?c+1:(u(i-1)||97));}},p=e=>{d=P(d,E);u(7);d=d.join(E);},
                a=e=>{for(i=0;i<L(d)-2;i++)if(h(i+1)-1==h(i)&&h(i+2)-2==h(i))return 1;},b=e=>L(d.match(/i|l|o/g)||E),
                c=e=>L(d.match(/(.)\1(?!.*\1\1).*(.)\2/g)||E);p();while(!a()||b()||!c())p();return d;
        },
        b:d=>S[11].a(S[11].a(d))
    },
    12:{
        a:d=>S[12].c(d,1),b:d=>S[12].c(d),
        c:(d,t)=>{
            d=JSON.parse(d);var c=0,f=e=>{if(typeof e=="object"){if(e.constructor==Array)F(e,e=>f(e));
            else{var v=1;for(var k in e)if(e[k]=="red")v=0;if(v||t)for(var l in e)f(e[l]);}}else if(typeof e=="number")c+=e;};f(d);return c;
        }
    },
    13:{
        a:d=>S[13].c(d),b:d=>S[13].c(d,1),
        c:(d,t)=>{var n={},p,l,z=0,i,k,c,o={}, Y=(a,b)=>c+=n[a][b]+n[b][a], X=b=>{if(L(p)<L(k)){var o=K(n[b]);
                for(var j=0;j<L(o);j++)if(p.indexOf(o[j])<0){p.push(o[j]);X(o[j]);p.pop();}}else{c=0;for(var m=0;m<L(p)-1;m++)Y(p[m],p[m+1]);Y(p[L(p)-1],p[0]);if(c>z)z=c;}};
            F(N(d),e=>{if(e){l=P(e,/ .*?d | h.*?o |\./g);l[1]=P(l[1]," ");if(!n[l[0]])n[l[0]]={};n[l[0]][l[2]]=+l[1][1]*(l[1][0]=="gain"?1:-1);}});
            if(t){k=K(n);for(i=0;i<L(k);i++){o[k[i]]=0;n[k[i]].X=0;}n.X=o;}k=K(n);for(i=0;i<L(k);i++){p=[k[i]];X(p[0]);}return z;
        }
    },
    14:{
        a:d=>S[14].c(d),b:d=>S[14].c(d,1),
        c:(d,t)=>{
            var c,g,h,i,n={},p={};for(i=0;i<2503;i++) {F(N(d),e=>{
                if(e){e=P(e,/ .*?y | .*?r | /g);if(i%(+e[2]+(+e[3]))<+e[2])n[e[0]]=n[e[0]]?(n[e[0]]+(+e[1])):(+e[1]);}});
                c=0;h=0;F(K(n),e=>{g=0;F(K(n),f=>{if(n[f]>n[e])g++;});if(!g)p[e]=p[e]?p[e]+1:1;if(n[e]>c)c=n[e];if(p[e]>h)h=p[e];});
            }return t?h:c;
        }
    },
    15:{
        a:d=>S[15].c(d,1),b:d=>S[15].c(d),
        c:(d,t)=>{
            var f={},g,s=0,i,b=1,c,n,h,k,v,w,x,y,z,l=100;F(N(d),e=>{if(e){g=P(e,/: |, | /g);f[g[0]]=[+g[2],+g[4],+g[6],+g[8],+g[10],0];}});k=K(f);
            c=e=>{w=x=y=z=0;F(k,e=>{w+=f[e][0]*f[e][5];x+=f[e][1]*f[e][5];y+=f[e][2]*f[e][5];z+=f[e][3]*f[e][5];});return (w>=0?w:0)*(x>=0?x:0)*(y>=0?y:0)*(z>=0?z:0);};
            h=e=>{i=0;F(k,g=>{i+=f[g][4]*f[g][5];});return i==500;};
            n=i=>{f[k[i]][5]++;if(f[k[i]][5]>l){f[k[i]][5]=0;if(f[k[L(k)-1]][5]==l)b=0;else n(i+1);}};
            v=e=>{i=0;F(k,g=>{i+=f[g][5];});return i==l;};while(b){if(v()&&(t||h())&&c()>s)s=c();n(0);}return s;
        }
    },
    16:{
        a:d=>S[16].c(d),b:d=>S[16].c(d,1),
        c:(d,t)=>{
            var f,s={children:3,cats:7,samoyeds:2,pomeranians:3,akitas:0,vizslas:0,goldfish:5,trees:3,cars:2,perfumes:1};
            F(N(d),e=>{if(e&&!f){e=P(e,/Sue |: |, /g);f=e[1];for (var i=2;i<e.length;i+=2) {if(t){if((e[i]=="cats"||e[i]=="trees")){if(s[e[i]]>=e[i+1])f=0;}
            else if((e[i]=="pomeranians"||e[i]=="goldfish")){if(s[e[i]]<=e[i+1])f=0;}else if(s[e[i]]!=e[i+1])f=0;} else if(s[e[i]]!=e[i+1])f=0;}}});return f;
        }
    },
    17:{
        a:d=>S[17].c(d),b:d=>S[17].c(d,1),
        c:(d,t)=>{
            d=N(d);var m=[],c=0,s,b=1,i,j,k,n=i=>{if(!~m.indexOf(0))b=0;else{m[i]++;if(m[i]>1){m[i]=0;n(i+1);}}};F(d,e=>{if(e)m.push(0);});
            while(b){s=0;F(m,(e,i)=>{s+=e*+d[i]});if(s==150){k=m.filter(e=>e).length;if(k==i)j++;if(!i||k<i){i=k;j=1;}c++;}n(0);}return t?j:c;
        }
    },
    18:{
        a:d=>S[18].c(d),b:d=>S[18].c(d,1),
        c:(d,t)=>{
            var l=[],n,z=[-1,0,1],c=0,r=(x,y,a)=>t&&(y==0||y==L(l)-1)&&(x==0||x==L(a)-1),u,s=c=>{
                u=[];F(l,(a,y)=>{u.push([]);F(a,(e,x)=>{
                    n=0;F(z,v=>{F(z,w=>{n+=(v||w)&&x+v>-1&&y+w>-1&&x+v<L(a)&&y+w<L(l)&&l[y+w][x+v]=="#"?1:0;})});
                    u[L(u)-1].push([".","#"][+(r(x,y,a)||(l[y][x]=="#"&&n>1&&n<4)||(l[y][x]=="."&&n==3))]);
                });});
                l=u;if(c>1)s(c-1);
            };F(N(d),e=>e&&l.push(P(e,E)));F(l,(a,y)=>{F(a,(e,x)=>{if(r(x,y,a))l[y][x]="#";});});
            s(100);F(l,e=>F(e,e=>{c+=+(e=="#");}));return c;
        }
    },
    19:{
        a:d=>S[19].c(d), b:d=>S[19].c(d,1),
        c:(d,t)=>{
            var a=P(d,"\n\n"),b=a[1].match(/[A-Z][a-z]*/g),f={};if(t){f=-1;F(b,e=>{f+={Rn:1,Y:-1,Ar:-1}[e]||1;});return f;}
            F(b,(c,i)=>{F(N(a[0]).map(e=>P(e," => ")),h=>{if(c==h[0])f[b.slice(0,i).concat(h[1],b.slice(i+1)).join("")]=1;});});
            return L(K(f));
        }
    },
    20:{
        a:d=>S[20].c(d),b:d=>S[20].c(d,1),
        c:(d,t)=>{var i=0,r=0,j,x;while(r*(t?11:10)<d){i++;r=i+1;x=Math.sqrt(i);if(i%x==0)r+=x;for(j=2;j<(t?51:x);j++){if(i%j==0){r+=j+i/j;}}}return i;}
    },
    21:{
        a:d=>S[21].c(d,0), b:d=>S[21].c(d,1),
        c:(d,t)=>{
            var m=d.match(/([0-9]+)/g),h,g=+m[1],f=+m[2],i,j,q,k=t?0:10000,z=[0,0,0],r=[z,[25,1,0],[50,2,0],[100,3,0],[20,0,1],[40,0,2],[80,0,3]],
                s=[[[8,4,0],[10,5,0],[25,6,0],[40,7,0],[74,8,0]],[z,[13,0,1],[31,0,2],[53,0,3],[75,0,4],[102,0,5]],r,r],e=[0,0,0,0],a,b=(n,c)=>s[n][e[n]][c];
            while(e[0]<s[0].length){h=[100,+m[0]];for(i=1;h[0]>0&&h[1]>0;i++){if(i%2)a=b(0,1)+b(2,1)+b(3,1)-f;else a=g-b(1,2)-b(2,2)-b(3,2);h[i%2]-=a>1?a:1;}
                q=b(0,0)+b(1,0)+b(2,0)+b(3,0);if((q<k^t)&&h[t]>0)k=q;e[3]++;for(j=3;j>0;j--){if(e[2]==e[3])e[3]++;if(e[j]==s[j].length){e[j]=0;e[j-1]++;}}}
            return k;
        }
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
