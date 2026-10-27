
const page = document.body.dataset.page || 'home';
const navItems = [
  ['index.html','Home','home'],['browse.html','Explore products','browse'],['how-it-works.html','How it works','how'],['for-sellers.html','For sellers','sellers'],['about.html','Our approach','about']
];
const logo = `<a class="brand" href="index.html" aria-label="MarketBridge Badagry home"><span class="brand-mark">M</span><span>MarketBridge<small>Badagry · Local discovery</small></span></a>`;
const header = document.getElementById('site-header');
if(header){
 header.innerHTML = `<div class="topbar">A more considered way to discover local products · Badagry</div><div class="nav-wrap"><nav class="nav">${logo}<button class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-label="Open navigation">Menu ☰</button><div class="nav-links" id="nav-links">${navItems.map(([href,label,key])=>`<a class="${page===key?'active':''}" href="${href}">${label}</a>`).join('')}<a class="button small" href="request.html">Request a product</a></div></nav></div>`;
 const toggle=document.getElementById('menu-toggle'); const links=document.getElementById('nav-links');
 toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Close ×':'Menu ☰'});
}
const footer = document.getElementById('site-footer');
if(footer){footer.innerHTML=`<footer class="footer"><div class="container"><div class="footer-grid"><div>${logo}<p>Thoughtful local discovery, connecting Badagry buyers with participating sellers through clearer product information and direct communication.</p><span class="small-note">An early-stage marketplace concept. Listings are published only with seller permission.</span></div><div><h4>Explore</h4><div class="footer-links"><a href="browse.html">Browse offers</a><a href="request.html">Request a product</a><a href="how-it-works.html">How it works</a></div></div><div><h4>For business</h4><div class="footer-links"><a href="for-sellers.html">Join as a seller</a><a href="trust.html">Trust & safety</a><a href="about.html">Our approach</a></div></div><div><h4>Get in touch</h4><div class="footer-links"><a href="contact.html">Contact</a><a href="seller-form.html">Seller interest form</a><a href="privacy.html">Privacy notice</a></div></div></div><div class="footer-bottom"><span>© <span id="year"></span> MarketBridge Badagry · Working brand name</span><span>Prices and availability must be confirmed with the seller.</span></div></div></footer>`;document.getElementById('year').textContent=new Date().getFullYear();}
const toast=document.getElementById('toast');
function showToast(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),4500)}
document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(form).entries());const subject=encodeURIComponent(form.dataset.subject||'MarketBridge enquiry');const body=encodeURIComponent(Object.entries(data).map(([k,v])=>`${k}: ${v}`).join('\n')+'\n\nPlease confirm the details above.');const email=form.dataset.email;if(email){window.location.href=`mailto:${email}?subject=${subject}&body=${body}`;showToast('Your email app will open with the enquiry prepared.')}else{showToast('Demo only: no information was sent or stored. Connect a secure form service before launch.')}}));
const listings=[
 {id:'sample1',name:'Phone accessories request matching',category:'Accessories',price:'Price confirmed by seller',description:'Request a charger, cable, case or earphones. We will seek an available local offer.',icon:'⌁',status:'Request-based'},
 {id:'sample2',name:'Phone repair enquiry',category:'Repair services',price:'Quote required',description:'Describe the phone model and issue to request a repair quote from a participating provider.',icon:'⚒',status:'Request-based'},
 {id:'sample3',name:'Laptop and computer accessories',category:'Computing',price:'Price confirmed by seller',description:'Ask about compatible accessories or computer-related products before making a trip.',icon:'▣',status:'Request-based'}
];
const listingGrid=document.getElementById('listing-grid');
function renderListings(){
 if(!listingGrid)return;
 const query=(document.getElementById('listing-search')?.value||'').toLowerCase();
 const cat=document.getElementById('listing-category')?.value||'All';
 const filtered=listings.filter(x=>(cat==='All'||x.category===cat)&&(x.name+' '+x.description+' '+x.category).toLowerCase().includes(query));
 listingGrid.innerHTML=filtered.length?filtered.map(x=>`<article class="listing"><div class="listing-art" aria-hidden="true">${x.icon}</div><div class="listing-body"><span class="tag">${x.status}</span><h3 style="margin-top:13px">${x.name}</h3><p>${x.description}</p><div class="listing-price">${x.price}</div><small>Illustrative service category · No specific stock or seller is claimed.</small><p style="margin-top:16px"><a class="button small" href="request.html?category=${encodeURIComponent(x.category)}">Request this</a></p></div></article>`).join(''):`<div class="empty-state"><h3>No matching categories</h3><p>Try a different search, or submit a request and tell us what you need.</p><a class="button small" href="request.html">Request a product</a></div>`;
}
document.getElementById('listing-search')?.addEventListener('input',renderListings);
document.getElementById('listing-category')?.addEventListener('change',renderListings);
renderListings();
const requestCategory=document.getElementById('request-category');
if(requestCategory){const params=new URLSearchParams(location.search);if(params.get('category'))requestCategory.value=params.get('category')}
document.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(btn.dataset.copy);showToast('Copied.')}catch(e){showToast(btn.dataset.copy)}}));
