// Traducciones de las oraciones: oraTr(idioma,{id:[título, texto, origen, nota de milagros]})
function oraTr(l,M){for(const p of ORA){const r=M[p.id];if(!r)continue;const [t,x,o,m]=r;
 if(t)p.t[l]=t;if(x&&p.x)p.x[l]=x;if(o)p.o[l]=o;if(m&&p.m)p.m[1][l]=m}}
