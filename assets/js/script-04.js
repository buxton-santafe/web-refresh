
(function(){
const depts=[
['Airport','Aeropuerto','Transportation','Transporte','Manages the Santa Fe Regional Airport, including airport facilities, airfield operations and aviation-related services.','Instalaciones aeroportuarias, operaciones y servicios de aviación.'],
["City Attorney’s Office",'Oficina del Abogado Municipal','Government','Gobierno','Provides legal advice and representation to City officials, departments and municipal operations.','Servicios y asesoramiento jurídico para el gobierno municipal.'],
['City Clerk / Community Engagement','Secretaría Municipal / Participación Comunitaria','Government','Gobierno','Maintains official City records, supports public meetings and elections, and helps residents participate in local government.','Reuniones públicas, registros, información electoral y participación ciudadana.'],
["City Manager’s Office",'Oficina de la Gerencia Municipal','Government','Gobierno','Oversees day-to-day City operations, coordinates departments and carries out municipal policies and priorities.','Administración municipal, coordinación institucional y operaciones.'],
['Community Services','Servicios Comunitarios','Community','Comunidad','Coordinates community programs and resources that support residents, families and neighborhood well-being.','Programas, instalaciones y recursos para residentes de Santa Fe.'],
['Economic Development','Desarrollo Económico','Community','Comunidad','Supports local businesses, job creation and economic opportunities through programs and partnerships.','Apoyo empresarial, iniciativas económicas locales y oportunidades.'],
['Emergency Management','Manejo de Emergencias','Safety','Seguridad','Helps the community prepare for emergencies and coordinates planning and response with public safety partners.','Preparación ante emergencias, coordinación de respuesta y resiliencia comunitaria.'],
['Finance Department','Departamento de Finanzas','Government','Gobierno','Manages the City budget, accounting, financial reporting and stewardship of public funds.','Presupuestos, operaciones financieras e información fiscal municipal.'],
['Fire Department','Departamento de Bomberos','Safety','Seguridad','Provides fire suppression, emergency medical response, rescue services and fire prevention education.','Respuesta a incendios, prevención y programas de seguridad pública.'],
['Human Resources','Recursos Humanos','Government','Gobierno','Manages City recruitment, employment policies, employee benefits and workforce support.','Empleos municipales, contratación y recursos para empleados.'],
['Information Technology (ITT)','Tecnología de la Información (ITT)','Government','Gobierno','Maintains municipal technology, information systems and digital infrastructure used to deliver City services.','Sistemas tecnológicos y apoyo digital para operaciones municipales.'],
['Land Use / Planning','Uso del Suelo / Planificación','Development','Desarrollo','Guides land use and development, reviews plans and supports building permitting and inspections.','Planificación, construcción, uso del suelo y servicios de desarrollo.'],
['Metropolitan Redevelopment','Reurbanización Metropolitana','Development','Desarrollo','Coordinates redevelopment efforts and reinvestment initiatives in designated areas of the city.','Planificación de reurbanización e iniciativas de inversión en vecindarios.'],
['Police Department','Departamento de Policía','Safety','Seguridad','Provides law enforcement, crime prevention, investigations and community-oriented public safety services.','Seguridad pública, servicios policiales y recursos comunitarios.'],
['Public Utilities','Servicios Públicos','Infrastructure','Infraestructura','Operates and maintains essential utility systems, including water and wastewater services.','Agua, aguas residuales y otros servicios públicos municipales.'],
['Public Works','Obras Públicas','Infrastructure','Infraestructura','Maintains streets and public infrastructure and manages construction and maintenance projects.','Calles, infraestructura de transporte e instalaciones públicas.'],
['Tourism','Turismo','Community','Comunidad','Promotes Santa Fe as a destination and connects visitors with local attractions, events and travel information.','Información para visitantes y programas relacionados con el turismo.'],
['Homelessness Services','Servicios para Personas sin Hogar','Community','Comunidad','Coordinates programs and partnerships addressing homelessness, outreach and access to housing-related support.','Programas y coordinación relacionados con la falta de vivienda.'],
['Affordable Housing','Vivienda Asequible','Community','Comunidad','Supports programs and partnerships that expand access to housing affordable to Santa Fe residents.','Programas de vivienda asequible y recursos habitacionales.'],
['Arts & Culture','Arte y Cultura','Community','Comunidad','Supports public art, local artists, cultural programming and opportunities to participate in the arts.','Arte público, programas culturales y oportunidades artísticas comunitarias.'],
['Press Inquiries','Consultas de Prensa','Government','Gobierno','Connects journalists and media organizations with City information, statements and appropriate contacts.','Consultas de medios de comunicación y contactos de información pública.'],
['Community Development','Desarrollo Comunitario','Development','Desarrollo','Supports neighborhood improvement, community investment and programs that strengthen local communities.','Programas de desarrollo comunitario e iniciativas vecinales.']
];
let filter='all',search='',selected=null;
const getLang=()=>document.querySelector('[data-lang="es"]')?.getAttribute('aria-pressed')==='true'?'es':'en';
const E=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
function build(){const host=document.getElementById('nav-view');if(!host||host.hidden)return;const title=host.querySelector('h1');if(!title||!['Departments','Departamentos'].includes(title.textContent))return;
const old=host.querySelector('.nav-cards');if(old)old.remove();const note=host.querySelector('.nav-demo-note');if(note)note.remove();host.querySelector('.department-directory')?.remove();const es=getLang()==='es';const section=E('section','department-directory');section.setAttribute('aria-label',es?'Directorio de departamentos':'Department directory');
const intro=E('p','',es?'Encuentra oficinas y servicios municipales. Selecciona un departamento para abrir su página.':'Find City offices and services. Select a department to open its page.');section.append(intro);
const toolbar=E('div','dept-toolbar');const searchLabel=E('label','',es?'Buscar departamentos':'Search departments');const inp=E('input');inp.type='search';inp.placeholder=es?'Nombre o servicio':'Name or service';inp.value=search;inp.oninput=()=>{search=inp.value;selected=null;drawList()};searchLabel.append(inp);const categoryLabel=E('label','',es?'Área de servicio':'Service area');const select=E('select');[['all',es?'Todas las áreas':'All areas'],['Government',es?'Gobierno':'Government'],['Community',es?'Comunidad':'Community'],['Development',es?'Desarrollo':'Development'],['Infrastructure',es?'Infraestructura':'Infrastructure'],['Safety',es?'Seguridad':'Public safety'],['Transportation',es?'Transporte':'Transportation']].forEach(([v,t])=>{const o=E('option','',t);o.value=v;select.append(o)});select.value=filter;select.onchange=()=>{filter=select.value;selected=null;drawList()};categoryLabel.append(select);toolbar.append(searchLabel,categoryLabel);section.append(toolbar);const count=E('p','dept-count');count.setAttribute('aria-live','polite');const grid=E('div','dept-grid');const detail=E('div');detail.id='dept-detail-slot';section.append(count,grid,detail);host.append(section);const route=location.hash.match(/^#department-(\d+)$/);if(route)setTimeout(()=>showDepartment(Number(route[1])),0);
function drawList(){const es=getLang()==='es';const items=depts.map((d,i)=>({d,i})).filter(({d})=>(filter==='all'||d[2]===filter)&&[...d].join(' ').toLowerCase().includes(search.toLowerCase()));count.textContent=items.length+' '+(es?'departamentos y áreas de servicio':'departments and service areas');grid.replaceChildren();items.forEach(({d,i})=>{const btn=E('button','dept-tile');btn.type='button';btn.setAttribute('aria-label',(es?d[1]:d[0])+(es?', abrir página del departamento':', open department page'));btn.append(E('span','dept-tag',es?d[3]:d[2]),E('strong','',es?d[1]:d[0]),E('span','dept-summary',es?d[5]:d[4]),E('span','dept-arrow','↗'));btn.onclick=()=>{location.hash='department-'+i;showDepartment(i)};grid.append(btn)});if(!items.length)grid.append(E('p','dept-empty',es?'No se encontraron resultados.':'No matching departments.'));detail.replaceChildren();}drawList();}
const serviceData=[
['Airport operations','Flight and terminal information','Airport business and development'],
['Legal guidance for City government','Ordinances and legal review','Public legal information'],
['Public records requests','Council agendas and minutes','Public meeting participation'],
['City administration','Strategic initiatives','Contact the City Manager'],
['Community programs','Youth and senior services','Recreation and facilities'],
['Business support','Economic development programs','Business resources'],
['Emergency preparedness','Emergency alerts','Community readiness resources'],
['Budget and financial reports','City payments','Purchasing and procurement'],
['Fire prevention and permits','Home fire safety','Emergency response information'],
['City jobs','Employee benefits','Recruitment information'],
['Technology and digital services','Website support','Information systems'],
['Building permits','Planning and zoning','Inspections and development review'],
['Redevelopment projects','Development incentives','Community revitalization'],
['Police reports and records','Community policing','Public safety information'],
['Water and wastewater','Utility billing','Conservation programs'],
['Street maintenance','Road construction updates','Infrastructure projects'],
['Visitor information','Tourism programs','Local attractions'],
['Homelessness resources','Outreach and referrals','Community service coordination'],
['Affordable housing programs','Housing assistance resources','Housing partnerships'],
['Public art programs','Community Gallery','Arts opportunities'],
['Media requests','Press releases','Official City statements'],
['Neighborhood programs','Community investment','Development resources']
];
const serviceEs=[
['Operaciones aeroportuarias','Información de vuelos y terminal','Desarrollo aeroportuario'],
['Asesoría jurídica municipal','Ordenanzas y revisión legal','Información jurídica pública'],
['Solicitudes de registros públicos','Agendas y actas del Concejo','Participación en reuniones públicas'],
['Administración municipal','Iniciativas estratégicas','Contactar a la gerencia municipal'],
['Programas comunitarios','Servicios para jóvenes y mayores','Recreación e instalaciones'],
['Apoyo a negocios','Programas de desarrollo económico','Recursos empresariales'],
['Preparación para emergencias','Alertas de emergencia','Recursos de preparación'],
['Presupuestos e informes financieros','Pagos municipales','Compras y adquisiciones'],
['Prevención de incendios y permisos','Seguridad contra incendios en el hogar','Información de respuesta a emergencias'],
['Empleos municipales','Beneficios laborales','Información de contratación'],
['Tecnología y servicios digitales','Asistencia con el sitio web','Sistemas de información'],
['Permisos de construcción','Planificación y zonificación','Inspecciones y revisión de proyectos'],
['Proyectos de reurbanización','Incentivos de desarrollo','Revitalización comunitaria'],
['Informes y registros policiales','Policía comunitaria','Información de seguridad pública'],
['Agua y aguas residuales','Facturación de servicios','Programas de conservación'],
['Mantenimiento de calles','Actualizaciones de obras viales','Proyectos de infraestructura'],
['Información para visitantes','Programas turísticos','Atracciones locales'],
['Recursos para personas sin hogar','Orientación y referencias','Coordinación de servicios comunitarios'],
['Programas de vivienda asequible','Recursos de asistencia de vivienda','Colaboraciones de vivienda'],
['Programas de arte público','Galería Comunitaria','Oportunidades artísticas'],
['Solicitudes de prensa','Comunicados de prensa','Declaraciones oficiales'],
['Programas vecinales','Inversión comunitaria','Recursos de desarrollo']
];
function showDepartment(i){
 const host=document.getElementById('nav-view');if(!host||host.hidden)return;
 const d=depts[i];if(!d)return;const es=getLang()==='es';
 const directory=host.querySelector('.department-directory');if(!directory){build();return}
 directory.hidden=true;host.querySelector('.dept-subpage')?.remove();
 const page=E('article','dept-subpage dept-service-page');page.setAttribute('aria-label',es?d[1]:d[0]);
 const back=E('button','dept-subpage-back',es?'← Todos los departamentos':'← All departments');
 back.onclick=()=>{history.pushState(null,'',location.pathname+location.search+'#departments');showDirectory()};
 const kicker=E('p','dept-tag',es?d[3]:d[2]);
 const title=E('h2','dept-subpage-title',es?d[1]:d[0]);title.tabIndex=-1;
 const intro=E('p','dept-subpage-lead',es?d[5]:d[4]);
 page.append(back,kicker,title,intro);
 const disclaimer=E('p','dept-demo-note',es?'PROTOTIPO · Los servicios, eventos, cargos y enlaces son ejemplos de estructura, no registros oficiales.':'PROTOTYPE · Services, events, roles and links are illustrative, not verified official records.');page.append(disclaimer);
 const section=(heading,klass)=>{const sec=E('section','dept-section '+(klass||''));sec.append(E('h3','dept-section-heading',heading));page.append(sec);return sec};
 const topLayout=E('div','dept-top-layout');page.append(topLayout);
 const services=E('section','dept-section dept-primary');services.append(E('h3','dept-section-heading',es?'Servicios principales':'Primary services'));topLayout.append(services);
 const booking=E('aside','dept-booking');booking.setAttribute('aria-label',es?'Programar una cita':'Schedule an appointment');
 booking.append(E('p','dept-booking-eyebrow',es?'Citas del departamento':'Department appointments'));
 booking.append(E('h3','',es?'Reserva una cita con '+d[1]:'Book a time with '+d[0]));
 booking.append(E('p','',es?'¿Necesitas hablar con nuestro equipo? Consulta las opciones para solicitar una cita.':'Need to speak with our team? Explore how to request an appointment.'));
 const bookingBtn=E('button','',es?'Solicitar una cita ↗':'Request an appointment ↗');bookingBtn.type='button';
 bookingBtn.onclick=()=>{let msg=booking.querySelector('.dept-booking-feedback');if(!msg){msg=E('p','dept-booking-feedback');msg.setAttribute('role','status');booking.append(msg)}msg.textContent=es?'Demostración: el sistema de citas de este departamento aún no está conectado. No se ha reservado ninguna cita.':'Demo only: this department’s scheduling system is not connected. No appointment has been booked.'};
 booking.append(bookingBtn);topLayout.append(booking);
 const serviceGrid=E('div','dept-service-grid');(es?serviceEs[i]:serviceData[i]).forEach((name,j)=>{const btn=E('button','dept-service-action');btn.type='button';btn.append(E('span','dept-service-num','0'+(j+1)),E('strong','',name),E('span','dept-service-arrow','↗'));btn.onclick=()=>{const n=E('p','dept-inline-note',es?'Esta opción se conectará con la página oficial del servicio cuando esté disponible.':'This will link to the verified service page when available.');serviceGrid.querySelector('.dept-inline-note')?.remove();serviceGrid.append(n)};serviceGrid.append(btn)});services.append(serviceGrid);
 const mid=E('div','dept-mid-grid');page.append(mid);
 function midSection(heading){const sec=E('section','dept-section');sec.append(E('h3','dept-section-heading',heading));mid.append(sec);return sec}
 const activity=midSection(es?'Próximos eventos y participación pública':'Upcoming events & public input');
 activity.append(E('p','dept-supporting',es?'Consulta el calendario municipal y las oportunidades para participar. Los eventos específicos de este departamento se mostrarán aquí cuando estén verificados.':'Find City meetings and ways to participate. Department-specific events will appear here once verified.'));
 const eventBtn=E('button','dept-inline-link',es?'Ver calendario de eventos ↗':'View City events calendar ↗');eventBtn.onclick=()=>{document.getElementById('things-open')?.click()};activity.append(eventBtn);
 const inputBtn=E('button','dept-inline-link',es?'Explorar participación ciudadana ↗':'Explore civic participation ↗');inputBtn.onclick=()=>{document.querySelector('[data-feature-destination="civic"]')?.click()};activity.append(inputBtn);
 const frequent=midSection(es?'Enlaces más consultados':'Frequently used links');
 const frequentLinks=E('div','dept-link-stack');(es?serviceEs[i]:serviceData[i]).slice(0,2).forEach(name=>{const btn=E('button','dept-inline-link',name+' ↗');btn.onclick=()=>{const n=frequent.querySelector('.dept-inline-note')||E('p','dept-inline-note');n.textContent=es?'Enlace de demostración: se agregará la dirección oficial verificada.':'Demo link: a verified official destination will be added.';frequent.append(n)};frequentLinks.append(btn)});const cityLink=E('a','dept-inline-link',es?'Sitio web oficial de la Ciudad ↗':'Official City website ↗');cityLink.href='https://santafenm.gov/';cityLink.target='_blank';cityLink.rel='noopener noreferrer';frequentLinks.append(cityLink);frequent.append(frequentLinks);
 const lower=E('div','dept-lower-grid');page.append(lower);
 function lowerSection(heading){const sec=E('section','dept-section');sec.append(E('h3','dept-section-heading',heading));lower.append(sec);return sec}
 const contacts=lowerSection(es?'Contacto del departamento':'Department contacts');
 contacts.append(E('p','dept-supporting',es?'Punto de contacto general del departamento':'General department point of contact'));
 contacts.append(E('p','dept-contact-placeholder',es?'Información de contacto pendiente de verificación':'Contact details pending verification'));
 const leadership=lowerSection(es?'Liderazgo':'Leadership');
 leadership.append(E('p','dept-supporting',es?'Dirección del departamento y personal de liderazgo':'Department director and leadership staff'));
 leadership.append(E('p','dept-contact-placeholder',es?'Nombres y cargos pendientes de verificación':'Names and titles pending verification'));
 const partners=section(es?'Socios comunitarios y ayuda externa':'Community partners & external assistance','dept-partners');
 partners.append(E('p','dept-supporting',es?'Los recursos y socios pertinentes se mostrarán aquí con enlaces verificados.':'Relevant partner organizations and assistance resources will appear here with verified links.'));
 const partnerLink=E('a','dept-inline-link',es?'Consultar recursos municipales ↗':'Browse City resources ↗');partnerLink.href='https://santafenm.gov/';partnerLink.target='_blank';partnerLink.rel='noopener noreferrer';partners.append(partnerLink);
 host.append(page);title.focus({preventScroll:true});page.scrollIntoView({block:'start'});
}
function showDirectory(){const host=document.getElementById('nav-view');host?.querySelector('.dept-subpage')?.remove();const dir=host?.querySelector('.department-directory');if(dir)dir.hidden=false;}
window.addEventListener('hashchange',()=>{const m=location.hash.match(/^#department-(\d+)$/);if(m)showDepartment(Number(m[1]));else showDirectory()});
const observer=new MutationObserver(()=>{const h=document.querySelector('#nav-view h1');if(h&&['Departments','Departamentos'].includes(h.textContent)&&!document.querySelector('#nav-view .department-directory'))build()});observer.observe(document.getElementById('nav-view'),{childList:true,subtree:false});document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setTimeout(build,0)));

})();
