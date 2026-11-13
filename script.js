const select=document.getElementById('firmware');
const result=document.getElementById('result');
const langBtn=document.getElementById('langBtn');
const versions=['9.00','9.03','9.04','9.50','9.51','9.60','10.00','10.01','10.50','10.70','10.71','11.00','11.02','11.50','11.52','12.00','12.02','12.50','12.52','13.00','13.02','13.50'];
versions.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;select.appendChild(o)});
let lang='ar';
const text={ar:{waiting:'بانتظار اختيار الإصدار',waitingText:'اختر إصدار النظام لعرض بطاقة المعلومات.',selected:'تم اختيار إصدار النظام',selectedText:v=>`الإصدار المحدد: ${v}. راجع مصادر موثوقة خاصة بهذا الإصدار لمعرفة التوافق. هذه الصفحة لا تشغّل ثغرات أو ملفات تنفيذية.`,lang:'English'},en:{waiting:'WAITING FOR SELECTION',waitingText:'Select a firmware version to show its information card.',selected:'FIRMWARE SELECTED',selectedText:v=>`Selected version: ${v}. Check trusted sources for compatibility with this exact version. This page does not run exploits or executable payloads.`,lang:'العربية'}};
function update(){const v=select.value,c=text[lang];result.querySelector('strong').textContent=v?c.selected:c.waiting;result.querySelector('p').textContent=v?c.selectedText(v):c.waitingText}
select.addEventListener('change',update);
langBtn.addEventListener('click',()=>{lang=lang==='ar'?'en':'ar';document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';langBtn.textContent=text[lang].lang;document.querySelectorAll('[data-ar][data-en]').forEach(el=>el.textContent=el.dataset[lang]);update()});
