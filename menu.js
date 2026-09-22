/* ============================================================
   Ultimate PPF — Mega-menu de veículo (injeção via GTM)
   Injeta a barra Carros/Motos/Jet Skis/Acessórios no header do
   tema Flex (desktop, hover à prova de escorregão) + CTA e drawer
   deslizante no mobile. Não depende do markup interno do tema:
   esconde a lista nativa e coloca a própria barra no lugar.
   ============================================================ */
(function(){
  "use strict";
  if (window.__PPFMenuBooted) return; window.__PPFMenuBooted = true;

  var LINKS = {
    inicio: "https://www.ultimateppf.com.br/",
    contato: "https://www.ultimateppf.com.br/contato/",
    blog: "https://www.ultimateppf.com.br/blog/"
  };
  var ICONS = {
    "Carros":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l1.6-4.6A2 2 0 0 1 6.5 7h11a2 2 0 0 1 1.9 1.4L21 13"/><path d="M3 13h18v4h-2"/><path d="M7 17H3v-4"/><circle cx="7.5" cy="17.3" r="1.7"/><circle cx="16.5" cy="17.3" r="1.7"/></svg>',
    "Motos":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="16" r="3.3"/><circle cx="18.5" cy="16" r="3.3"/><path d="M5.5 16l3.2-5H14l2 2h3"/><path d="M8 11h4.5"/></svg>',
    "Jet Skis":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16c1.4 0 1.4 1 2.9 1s1.5-1 2.9-1 1.5 1 2.9 1 1.5-1 2.9-1 1.5 1 2.9 1"/><path d="M4.5 15.5L6.5 11h6.5l3 3 2.5.4"/></svg>',
    "Acessórios":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6.2a3.8 3.8 0 0 0-5.1 5L4.4 16.7 7.3 19.6l5.5-5.5a3.8 3.8 0 0 0 5-5.1l-2.2 2.2-2-.5-.5-2z"/></svg>'
  };

  var CSS = ''
  + '#ppfm-nav{--acc:#f26b35;--cream:#f2e8c3;--bg:#18181a;--panel:#212226;--line:#33343a;--text:#f4f2ee;--muted:#a7a29a;--chip:#2a2b30;--chiph:#34353c;'
  + 'font-family:"Poppins","Sora",-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg);border-top:1px solid var(--line);border-bottom:1px solid var(--line);position:relative;z-index:60}'
  + '#ppfm-nav .ppfm-in{display:flex;align-items:center;gap:2px;padding:2px 8px;flex-wrap:nowrap;max-width:1180px;margin:0 auto;justify-content:center}'
  + '#ppfm-nav a.ppfm-link,#ppfm-nav .ppfm-tab>button{font-family:"Poppins",sans-serif;font-weight:600;font-size:14.5px;color:var(--text);text-decoration:none;padding:14px 16px;border-radius:8px;display:flex;align-items:center;gap:9px;cursor:pointer;background:none;border:0;transition:background .12s,color .12s;white-space:nowrap;line-height:1}'
  + '#ppfm-nav a.ppfm-link:hover,#ppfm-nav .ppfm-tab>button:hover,#ppfm-nav .ppfm-tab.open>button{background:var(--chip)}'
  + '#ppfm-nav .ppfm-tab.open>button{color:var(--acc)}'
  + '#ppfm-nav .ppfm-ti{width:19px;height:19px;display:inline-flex;color:var(--acc)}#ppfm-nav .ppfm-ti svg{width:100%;height:100%}'
  + '#ppfm-nav .ppfm-caret{width:6px;height:6px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg);opacity:.5;margin-top:-3px}'
  + '#ppfm-nav .ppfm-panel{position:absolute;left:10px;right:10px;top:100%;padding-top:8px;z-index:70;opacity:0;visibility:hidden;transform:translateY(6px);pointer-events:none;transition:opacity .16s,transform .16s,visibility 0s linear .16s}'
  + '#ppfm-nav.active .ppfm-panel.show{opacity:1;visibility:visible;transform:translateY(0);pointer-events:auto;transition:opacity .16s,transform .16s}'
  + '#ppfm-nav .ppfm-pin{background:var(--panel);border:1px solid var(--line);border-radius:14px;box-shadow:0 24px 60px rgba(0,0,0,.55);overflow:hidden;max-width:1180px;margin:0 auto}'
  + '#ppfm-nav .ppfm-2p{display:grid;grid-template-columns:240px 1fr;min-height:330px}'
  + '#ppfm-nav .ppfm-rail{border-right:1px solid var(--line);padding:10px;max-height:460px;overflow-y:auto}'
  + '#ppfm-nav .ppfm-rail button{font-family:"Poppins",sans-serif;all:unset;cursor:pointer;display:flex;justify-content:space-between;align-items:center;width:100%;box-sizing:border-box;padding:11px 14px;border-radius:8px;font-size:14px;font-weight:600;color:var(--text);transition:background .1s}'
  + '#ppfm-nav .ppfm-rail button .arr{opacity:0;font-size:11px;color:var(--acc)}'
  + '#ppfm-nav .ppfm-rail button:hover,#ppfm-nav .ppfm-rail button.active{background:var(--chip)}#ppfm-nav .ppfm-rail button.active{color:var(--acc)}#ppfm-nav .ppfm-rail button.active .arr{opacity:1}'
  + '#ppfm-nav .ppfm-pane{padding:18px 20px}'
  + '#ppfm-nav .ppfm-pt{font-family:"Poppins",sans-serif;font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin:0 0 15px}#ppfm-nav .ppfm-pt b{color:var(--cream);font-weight:700}'
  + '#ppfm-nav .ppfm-models{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:9px}'
  + '#ppfm-nav .ppfm-models a{font-family:"Sora",sans-serif;display:block;text-decoration:none;color:var(--text);font-size:15px;font-weight:500;line-height:1.25;background:var(--chip);border:1px solid transparent;border-radius:9px;padding:13px 15px;transition:background .12s,border-color .12s,color .12s}'
  + '#ppfm-nav .ppfm-models a:hover{background:var(--chiph);border-color:var(--acc);color:#fff}'
  + '#ppfm-nav .ppfm-grid{padding:20px}'
  + '@media(max-width:900px){#ppfm-nav{display:none}}'
  // CTA mobile
  + '#ppfm-cta{display:none}'
  + '@media(max-width:900px){#ppfm-cta{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;box-sizing:border-box;background:#f26b35;color:#18181a;font-family:"Poppins",sans-serif;font-weight:800;font-size:15px;border:0;padding:14px;cursor:pointer}}'
  + '#ppfm-cta .ppfm-ti{width:20px;height:20px;display:inline-flex}#ppfm-cta .ppfm-ti svg{width:100%;height:100%}'
  // drawer
  + '#ppfm-ov{position:fixed;inset:0;background:rgba(0,0,0,.6);opacity:0;visibility:hidden;transition:opacity .25s,visibility 0s linear .25s;z-index:99998}#ppfm-ov.open{opacity:1;visibility:visible;transition:opacity .25s}'
  + '#ppfm-dr{--acc:#f26b35;--cream:#f2e8c3;--line:#33343a;--text:#f4f2ee;--muted:#a7a29a;--chip:#2a2b30;--chiph:#34353c;position:fixed;top:0;left:0;height:100%;width:390px;max-width:88vw;background:#161a20;border-right:1px solid var(--line);z-index:99999;transform:translateX(-103%);transition:transform .28s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;font-family:"Poppins",sans-serif}'
  + '#ppfm-dr.open{transform:translateX(0)}'
  + '#ppfm-dr .dh{display:flex;align-items:center;gap:4px;padding:14px 12px;border-bottom:1px solid var(--line);min-height:60px}'
  + '#ppfm-dr .bk,#ppfm-dr .cl{cursor:pointer;display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:9px;color:var(--text);font-size:22px;background:none;border:0}'
  + '#ppfm-dr .bk{opacity:0;pointer-events:none;transition:opacity .18s}#ppfm-dr.deep .bk{opacity:1;pointer-events:auto}'
  + '#ppfm-dr .cr{flex:1;min-width:0;font-weight:700;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text)}#ppfm-dr .cr .dim{color:var(--muted);font-weight:500}'
  + '#ppfm-dr .sw{flex:1;overflow:hidden;position:relative}#ppfm-dr .st{display:flex;height:100%;transition:transform .28s cubic-bezier(.4,0,.2,1)}'
  + '#ppfm-dr .col{flex:0 0 100%;height:100%;overflow-y:auto;padding:8px;box-sizing:border-box}'
  + '#ppfm-dr .row{cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:10px;box-sizing:border-box;width:100%;padding:15px 16px;border-radius:10px;color:var(--text);font-size:16px;font-weight:600;background:none;border:0;text-align:left;font-family:"Poppins",sans-serif;text-decoration:none}'
  + '#ppfm-dr .row:active{background:var(--chip)}#ppfm-dr .row .ico{margin-right:auto;display:flex;align-items:center;gap:12px}#ppfm-dr .row .ti{width:20px;height:20px;color:var(--acc)}#ppfm-dr .row .ti svg{width:100%;height:100%}'
  + '#ppfm-dr .row .chev{color:var(--muted)}#ppfm-dr .row.leaf{font-weight:500;font-family:"Sora",sans-serif}'
  + '#ppfm-dr .row.sep{margin-top:6px;border-top:1px solid var(--line);border-radius:0;padding-top:16px}'
  + '#ppfm-dr .ct{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);padding:12px 16px 6px}';

  function el(tag, cls, html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}

  function build(DATA){
    if(!DATA||!DATA.length) return false;
    var host = document.querySelector('.js-nav-desktop-list');
    if(!host) return false;                       // tema ainda não montou
    if(document.getElementById('ppfm-nav')) return true; // já injetado

    // estilos
    if(!document.getElementById('ppfm-style')){var s=el('style');s.id='ppfm-style';s.textContent=CSS;document.head.appendChild(s);}

    /* ---------- DESKTOP: barra própria no lugar da lista nativa ---------- */
    host.style.setProperty('display','none','important'); // esconde o menu nativo (desktop) — vence o d-md-flex !important do tema
    var nav=el('nav','','');nav.id='ppfm-nav';nav.setAttribute('aria-label','Menu principal');
    var inner=el('div','ppfm-in');nav.appendChild(inner);

    function mkLink(t,u){var a=el('a','ppfm-link',t);a.href=u;return a;}
    inner.appendChild(mkLink('Início',LINKS.inicio));

    DATA.forEach(function(tp){
      var tab=el('div','ppfm-tab');
      var btn=el('button',null,'<span class="ppfm-ti">'+(ICONS[tp.tipo]||'')+'</span>'+tp.tipo+'<span class="ppfm-caret"></span>');btn.type='button';
      var panel=el('div','ppfm-panel');var pin=el('div','ppfm-pin');
      var marcas=tp.marcas||[];
      if(marcas.length>1){
        pin.className='ppfm-pin ppfm-2p';
        var rail=el('div','ppfm-rail');var pane=el('div','ppfm-pane');
        var pt=el('p','ppfm-pt');var models=el('div','ppfm-models');
        pane.appendChild(pt);pane.appendChild(models);
        var show=function(mc){
          rail.querySelectorAll('button').forEach(function(b){b.classList.toggle('active',b.dataset.n===mc.n);});
          pt.innerHTML='Modelos <b>'+mc.n+'</b>';models.innerHTML='';
          var lst=(mc.modelos&&mc.modelos.length)?mc.modelos:[{n:'Ver '+mc.n,u:mc.u}];
          lst.forEach(function(md){var a=el('a',null,md.n);a.href=md.u;models.appendChild(a);});
        };
        marcas.forEach(function(mc){var b=el('button',null,mc.n+'<span class="arr">▶</span>');b.type='button';b.dataset.n=mc.n;b.addEventListener('mouseenter',function(){show(mc);});rail.appendChild(b);});
        pin.appendChild(rail);pin.appendChild(pane);panel._init=function(){show(marcas[0]);};
      } else {
        pin.className='ppfm-pin ppfm-grid';
        var g=el('div','ppfm-models');var mc=marcas[0];
        var lst=(mc&&mc.modelos&&mc.modelos.length)?mc.modelos:(mc?[{n:'Ver '+mc.n,u:mc.u}]:[]);
        lst.forEach(function(md){var a=el('a',null,md.n);a.href=md.u;g.appendChild(a);});
        pin.appendChild(g);panel._init=function(){};
      }
      panel.appendChild(pin);tab.appendChild(btn);tab.appendChild(panel);inner.appendChild(tab);
    });
    inner.appendChild(mkLink('Contato',LINKS.contato));
    inner.appendChild(mkLink('Blog',LINKS.blog));
    host.parentNode.insertBefore(nav, host.nextSibling);

    var ct=null,ot=null;
    function openT(t){clearTimeout(ct);if(ot&&ot!==t)closeT(ot);t.classList.add('open');var p=t.querySelector('.ppfm-panel');p.classList.add('show');if(p._init)p._init();nav.classList.add('active');ot=t;}
    function closeT(t){t.classList.remove('open');var p=t.querySelector('.ppfm-panel');p.classList.remove('show');if(ot===t)ot=null;if(!ot)nav.classList.remove('active');}
    inner.querySelectorAll('.ppfm-tab').forEach(function(t){t.addEventListener('mouseenter',function(){openT(t);});});
    nav.addEventListener('mouseenter',function(){clearTimeout(ct);});
    nav.addEventListener('mouseleave',function(){clearTimeout(ct);ct=setTimeout(function(){if(ot)closeT(ot);},320);});

    /* ---------- MOBILE: CTA + drawer deslizante ---------- */
    buildMobile(DATA);
    return true;
  }

  function buildMobile(DATA){
    if(document.getElementById('ppfm-cta')) return;
    var header=document.querySelector('header')||document.body;
    var cta=el('button','', '<span class="ppfm-ti">'+ICONS['Carros']+'</span> Encontre pelo seu veículo');
    cta.id='ppfm-cta';cta.type='button';
    header.parentNode.insertBefore(cta, header.nextSibling);

    var ov=el('div');ov.id='ppfm-ov';
    var dr=el('div');dr.id='ppfm-dr';
    dr.innerHTML='<div class="dh"><button class="bk" aria-label="Voltar">‹</button><div class="cr">Menu</div><button class="cl" aria-label="Fechar">×</button></div><div class="sw"><div class="st"></div></div>';
    document.body.appendChild(ov);document.body.appendChild(dr);
    var stage=dr.querySelector('.st'),crumb=dr.querySelector('.cr');

    function node(label,children,href,icone){return {label:label,children:children,href:href,icone:icone};}
    var rootKids=[];
    DATA.forEach(function(tp){
      var marcas=tp.marcas||[];
      if(marcas.length===1){
        var mc=marcas[0];var mods=(mc.modelos&&mc.modelos.length)?mc.modelos:[{n:mc.n,u:mc.u}];
        rootKids.push(node(tp.tipo, mods.map(function(md){return node(md.n,null,md.u);}), null, tp.tipo));
      } else {
        rootKids.push(node(tp.tipo, marcas.map(function(mc){return node(mc.n,(mc.modelos&&mc.modelos.length)?mc.modelos.map(function(md){return node(md.n,null,md.u);}):[node('Ver '+mc.n,null,mc.u)]);}), null, tp.tipo));
      }
    });
    var extra=[node('Início',null,LINKS.inicio),node('Contato',null,LINKS.contato),node('Blog',null,LINKS.blog)];extra[0]._sep=true;
    var RAIZ=node('Menu', rootKids.concat(extra));
    var pilha=[];
    function coluna(nd){
      var col=el('div','col');
      if(nd!==RAIZ && nd.children.every(function(c){return !c.children;})){col.appendChild(el('div','ct','Modelos '+nd.label));}
      nd.children.forEach(function(ch){
        if(ch.children){var b=el('button','row','<span class="ico">'+(ch.icone?'<span class="ti">'+(ICONS[ch.icone]||'')+'</span>':'')+ch.label+'</span><span class="chev">›</span>');b.type='button';b.addEventListener('click',function(){pilha.push(ch);render();});col.appendChild(b);}
        else{var a=el('a','row leaf'+(ch._sep?' sep':''),ch.label);a.href=ch.href||'#';col.appendChild(a);}
      });
      return col;
    }
    function render(){
      while(stage.children.length<pilha.length)stage.appendChild(coluna(pilha[stage.children.length]));
      while(stage.children.length>pilha.length)stage.removeChild(stage.lastChild);
      var a=pilha.length-1;stage.style.transform='translateX(-'+(a*100)+'%)';
      var at=pilha[a],pa=pilha[a-1];crumb.innerHTML=pa?'<span class="dim">'+pa.label+' › </span>'+at.label:at.label;
      dr.classList.toggle('deep',pilha.length>1);
    }
    function abrir(){pilha=[RAIZ];stage.style.transition='none';render();requestAnimationFrame(function(){stage.style.transition='';});dr.classList.add('open');ov.classList.add('open');}
    function fechar(){dr.classList.remove('open');ov.classList.remove('open');}
    cta.addEventListener('click',abrir);
    dr.querySelector('.bk').addEventListener('click',function(){if(pilha.length>1){pilha.pop();render();}});
    dr.querySelector('.cl').addEventListener('click',fechar);
    crumb.addEventListener('click',function(){if(pilha.length>1){pilha.pop();render();}});
    ov.addEventListener('click',fechar);
    document.addEventListener('keydown',function(e){if(e.key==='Escape')fechar();});
  }

  function boot(DATA){
    if(build(DATA)) return;
    var tries=0, iv=setInterval(function(){tries++;if(build(DATA)||tries>40)clearInterval(iv);},300);
  }

  // Fonte dos dados: window.__PPF_DATA__ (teste) ou fetch do categorias.json
  if (window.__PPF_DATA__) { boot(window.__PPF_DATA__); }
  else {
    fetch('https://cdn.jsdelivr.net/gh/Ultimateppf/vetor-site@main/categorias.json',{cache:'no-cache'})
      .then(function(r){return r.json();}).then(boot)
      .catch(function(e){ if(window.console) console.warn('[PPF menu] categorias.json falhou', e); });
  }
})();
