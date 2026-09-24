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
  var EMPTY_IC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13l1.6-4.6A2 2 0 0 1 6.5 7h11a2 2 0 0 1 1.9 1.4L21 13"/><path d="M3 13h18v4h-2"/><path d="M7 17H3v-4"/><circle cx="7.5" cy="17.3" r="1.6"/><circle cx="16.5" cy="17.3" r="1.6"/></svg>';

  var CSS = ''
  + "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Sora:wght@400;500;600;700&display=swap');"
  // paleta da marca — preto quente, creme, laranja
  + '#ppfm-nav{--acc:#ff6a2a;--acc2:#f26b35;--cream:#f2e8c3;--bg:#141317;--panel:#1b191d;--panel2:#221f24;--line:rgba(242,232,195,.11);--line2:rgba(242,232,195,.06);--text:#f3efe7;--muted:#a49b8d;--chip:#252027;--chiph:#302a31;'
  + 'font-family:"Poppins","Sora",-apple-system,BlinkMacSystemFont,sans-serif;background:radial-gradient(120% 200% at 50% -60%,rgba(255,106,42,.07),transparent 55%),var(--bg);border-top:1px solid var(--line);border-bottom:1px solid var(--line);position:relative;z-index:60}'
  + '#ppfm-nav .ppfm-in{display:flex;align-items:center;gap:2px;padding:3px 8px;flex-wrap:nowrap;max-width:1180px;margin:0 auto;justify-content:center}'
  + '#ppfm-nav a.ppfm-link,#ppfm-nav .ppfm-tab>button{position:relative;font-family:"Poppins",sans-serif;font-weight:600;font-size:14.5px;letter-spacing:.01em;color:var(--text);text-decoration:none;padding:15px 17px;border-radius:9px;display:flex;align-items:center;gap:9px;cursor:pointer;background:none;border:0;transition:background .14s,color .14s;white-space:nowrap;line-height:1}'
  + '#ppfm-nav a.ppfm-link:hover,#ppfm-nav .ppfm-tab>button:hover,#ppfm-nav .ppfm-tab.open>button{background:var(--chip)}'
  + '#ppfm-nav .ppfm-tab.open>button{color:var(--acc)}'
  // indicador laranja sob a aba aberta
  + '#ppfm-nav .ppfm-tab>button::after{content:"";position:absolute;left:17px;right:17px;bottom:7px;height:2px;border-radius:2px;background:linear-gradient(90deg,var(--acc),var(--acc2));transform:scaleX(0);transform-origin:center;transition:transform .2s cubic-bezier(.4,0,.2,1)}'
  + '#ppfm-nav .ppfm-tab.open>button::after{transform:scaleX(1)}'
  + '#ppfm-nav .ppfm-ti{width:19px;height:19px;display:inline-flex;color:var(--acc)}#ppfm-nav .ppfm-ti svg{width:100%;height:100%}'
  + '#ppfm-nav .ppfm-caret{width:6px;height:6px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg);opacity:.45;margin-top:-3px;transition:transform .2s}'
  + '#ppfm-nav .ppfm-tab.open .ppfm-caret{transform:rotate(-135deg);opacity:.8;margin-top:3px}'
  + '#ppfm-nav .ppfm-panel{position:absolute;left:10px;right:10px;top:100%;padding-top:10px;z-index:70;opacity:0;visibility:hidden;transform:translateY(8px);pointer-events:none;transition:opacity .18s,transform .18s,visibility 0s linear .18s}'
  + '#ppfm-nav.active .ppfm-panel.show{opacity:1;visibility:visible;transform:translateY(0);pointer-events:auto;transition:opacity .18s,transform .18s}'
  + '#ppfm-nav .ppfm-pin{position:relative;background:linear-gradient(180deg,var(--panel2),var(--panel));border:1px solid var(--line);border-radius:16px;box-shadow:0 34px 90px -24px rgba(0,0,0,.78),0 10px 28px rgba(0,0,0,.42);overflow:hidden;max-width:1180px;margin:0 auto}'
  // linha-assinatura laranja no topo do painel
  + '#ppfm-nav .ppfm-pin::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--acc) 22%,var(--acc2) 50%,var(--acc) 78%,transparent);opacity:.9;z-index:2}'
  + '#ppfm-nav .ppfm-2p{display:grid;grid-template-columns:248px 1fr;min-height:336px}'
  + '#ppfm-nav .ppfm-rail{border-right:1px solid var(--line);padding:14px 12px;max-height:468px;overflow-y:auto}'
  + '#ppfm-nav .ppfm-rail-h{font-family:"Poppins",sans-serif;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);padding:2px 14px 12px}'
  + '#ppfm-nav .ppfm-rail button{position:relative;font-family:"Poppins",sans-serif;all:unset;cursor:pointer;display:flex;justify-content:space-between;align-items:center;width:100%;box-sizing:border-box;padding:11px 14px;border-radius:9px;font-size:14px;font-weight:600;color:var(--text);transition:background .12s,color .12s}'
  + '#ppfm-nav .ppfm-rail button::before{content:"";position:absolute;left:0;top:50%;height:56%;width:3px;border-radius:0 3px 3px 0;background:linear-gradient(180deg,var(--acc),var(--acc2));transform:translateY(-50%) scaleY(0);transform-origin:center;transition:transform .16s cubic-bezier(.4,0,.2,1)}'
  + '#ppfm-nav .ppfm-rail button .arr{opacity:0;font-size:10px;color:var(--acc);transform:translateX(-3px);transition:opacity .14s,transform .14s}'
  + '#ppfm-nav .ppfm-rail button:hover,#ppfm-nav .ppfm-rail button.active{background:var(--chip)}'
  + '#ppfm-nav .ppfm-rail button.active{color:var(--acc)}#ppfm-nav .ppfm-rail button.active::before{transform:translateY(-50%) scaleY(1)}'
  + '#ppfm-nav .ppfm-rail button.active .arr,#ppfm-nav .ppfm-rail button:hover .arr{opacity:1;transform:translateX(0)}'
  + '#ppfm-nav .ppfm-rail::-webkit-scrollbar{width:9px}#ppfm-nav .ppfm-rail::-webkit-scrollbar-thumb{background:rgba(255,106,42,.35);border-radius:9px;border:3px solid transparent;background-clip:padding-box}#ppfm-nav .ppfm-rail::-webkit-scrollbar-thumb:hover{background:rgba(255,106,42,.6);background-clip:padding-box}'
  + '#ppfm-nav .ppfm-pane{padding:20px 22px}'
  + '#ppfm-nav .ppfm-pt{font-family:"Poppins",sans-serif;font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:0 0 16px;font-weight:700}#ppfm-nav .ppfm-pt b{color:var(--cream);font-weight:700}'
  + '#ppfm-nav .ppfm-models{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:10px}'
  + '#ppfm-nav .ppfm-models a{font-family:"Sora",sans-serif;display:block;text-decoration:none;color:var(--text);font-size:15px;font-weight:500;line-height:1.25;background:var(--chip);border:1px solid var(--line2);border-radius:11px;padding:13px 16px;transition:transform .15s cubic-bezier(.4,0,.2,1),background .14s,border-color .14s,box-shadow .15s,color .14s;animation:ppfmIn .3s both}'
  + '#ppfm-nav .ppfm-models a:hover{background:var(--chiph);border-color:var(--acc);color:#fff;transform:translateY(-2px);box-shadow:0 12px 24px -12px rgba(255,106,42,.55)}'
  + '@keyframes ppfmIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}'
  // estado vazio (nenhuma marca selecionada)
  + '#ppfm-nav .ppfm-empty{grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;min-height:250px;gap:15px;padding:20px;animation:ppfmIn .3s both}'
  + '#ppfm-nav .ppfm-empty svg{width:44px;height:44px;color:var(--acc);opacity:.8}'
  + '#ppfm-nav .ppfm-empty p{margin:0;font-family:"Poppins",sans-serif;font-size:14.5px;font-weight:600;color:var(--cream);letter-spacing:.01em}'
  + '#ppfm-nav .ppfm-empty p span{display:block;font-weight:400;font-size:12.5px;color:var(--muted);margin-top:5px;letter-spacing:.02em}'
  + '#ppfm-nav .ppfm-grid{padding:22px}'
  + '@media(max-width:900px){#ppfm-nav{display:none}}'
  // CTA mobile
  + '#ppfm-cta{display:none}'
  + '@media(max-width:900px){#ppfm-cta{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;box-sizing:border-box;background:#f26b35;color:#18181a;font-family:"Poppins",sans-serif;font-weight:800;font-size:15px;border:0;padding:14px;cursor:pointer}}'
  + '#ppfm-cta .ppfm-ti{width:20px;height:20px;display:inline-flex}#ppfm-cta .ppfm-ti svg{width:100%;height:100%}'
  // drawer mobile
  + '#ppfm-ov{position:fixed;inset:0;background:rgba(0,0,0,.6);opacity:0;visibility:hidden;transition:opacity .25s,visibility 0s linear .25s;z-index:99998}#ppfm-ov.open{opacity:1;visibility:visible;transition:opacity .25s}'
  + '#ppfm-dr{--acc:#ff6a2a;--cream:#f2e8c3;--line:rgba(242,232,195,.11);--text:#f3efe7;--muted:#a49b8d;--chip:#252027;--chiph:#302a31;position:fixed;top:0;left:0;height:100%;width:390px;max-width:88vw;background:#141317;border-right:1px solid var(--line);z-index:99999;transform:translateX(-103%);transition:transform .28s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;font-family:"Poppins",sans-serif}'
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
        rail.appendChild(el('div','ppfm-rail-h','Marcas'));
        var show=function(mc){
          rail.querySelectorAll('button').forEach(function(b){b.classList.toggle('active',b.dataset.n===mc.n);});
          pt.innerHTML='Modelos <b>'+mc.n+'</b>';models.innerHTML='';
          var lst=(mc.modelos&&mc.modelos.length)?mc.modelos:[{n:'Ver '+mc.n,u:mc.u}];
          lst.forEach(function(md,i){var a=el('a',null,md.n);a.href=md.u;a.style.animationDelay=(i*22)+'ms';models.appendChild(a);});
        };
        var empty=function(){
          rail.querySelectorAll('button').forEach(function(b){b.classList.remove('active');});
          pt.innerHTML='Modelos';
          models.innerHTML='<div class="ppfm-empty">'+EMPTY_IC+'<p>Passe o mouse sobre uma marca<span>para ver os modelos disponíveis</span></p></div>';
        };
        marcas.forEach(function(mc){var b=el('button',null,mc.n+'<span class="arr">▶</span>');b.type='button';b.dataset.n=mc.n;b.addEventListener('mouseenter',function(){show(mc);});rail.appendChild(b);});
        pin.appendChild(rail);pin.appendChild(pane);panel._init=function(){empty();};
      } else {
        pin.className='ppfm-pin ppfm-grid';
        var g=el('div','ppfm-models');var mc=marcas[0];
        var lst=(mc&&mc.modelos&&mc.modelos.length)?mc.modelos:(mc?[{n:'Ver '+mc.n,u:mc.u}]:[]);
        lst.forEach(function(md,i){var a=el('a',null,md.n);a.href=md.u;a.style.animationDelay=(i*22)+'ms';g.appendChild(a);});
        pin.appendChild(g);panel._init=function(){};
      }
      panel.appendChild(pin);tab.appendChild(btn);tab.appendChild(panel);inner.appendChild(tab);
    });
    inner.appendChild(mkLink('Contato',LINKS.contato));
    inner.appendChild(mkLink('Blog',LINKS.blog));
    host.parentNode.insertBefore(nav, host.nextSibling);

    var ot=null;
    function openT(t){if(ot===t)return;if(ot)closeT(ot);t.classList.add('open');var p=t.querySelector('.ppfm-panel');p.classList.add('show');if(p._init)p._init();nav.classList.add('active');ot=t;}
    function closeT(t){t.classList.remove('open');var p=t.querySelector('.ppfm-panel');p.classList.remove('show');if(ot===t)ot=null;if(!ot)nav.classList.remove('active');}
    inner.querySelectorAll('.ppfm-tab').forEach(function(t){
      t.addEventListener('mouseenter',function(){openT(t);});
      var b=t.querySelector('button');
      if(b)b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();openT(t);});
    });
    // Passa o mouse -> abre e PERMANECE aberto (sem efeito escorregão).
    // Fecha somente ao clicar fora do menu ou pressionar Esc.
    document.addEventListener('click',function(e){if(ot&&!nav.contains(e.target))closeT(ot);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ot)closeT(ot);});

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
