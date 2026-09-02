document.addEventListener('DOMContentLoaded', () => {
  const animals = [
    { name: 'Tigre', img: 'img/tigre_img.png', boxImg: 'img/tigre_caja.png', age: '15 yr', size: '70 cm', range: '96 km', desc: 'El león es un mamífero carnívoro y uno de los depredadores más emblemáticos de África. Se distingue por su gran tamaño, su cuerpo fuerte y musculoso y, en el caso de los machos, por su imponente melena, que simboliza poder y dominio. Habita principalmente en sabanas y praderas abiertas, donde vive en manadas organizadas con una estructura social bien definida. Las leonas se encargan de la mayor parte de la caza, mientras que los machos protegen el territorio y al grupo.' },
    { name: 'Cebra', img: 'img/zebra_img.png', boxImg: 'img/zebra_caja.png', age: '20 yr', size: '140 cm', range: '60 km', desc: 'La cebra es un mamífero herbívoro que habita principalmente en las sabanas y praderas de África. Se caracteriza por su llamativo pelaje blanco con rayas negras, un patrón único en cada individuo que le sirve como método de protección frente a los depredadores. Vive en grupos numerosos, lo que le permite mantenerse alerta y defenderse mejor ante posibles amenazas. Se alimenta principalmente de pasto y pasa gran parte del día desplazándose en busca de alimento y agua.' },
    { name: 'León', img: 'img/leon_img.png', boxImg: 'img/leon_caja.png', age: '14 yr', size: '120 cm', range: '80 km', desc: 'El león es un mamífero carnívoro y uno de los depredadores más importantes del continente africano. Se distingue por su gran tamaño, su cuerpo musculoso y, en el caso de los machos, por su imponente melena que representa fuerza y liderazgo. Vive en manadas organizadas donde cada miembro cumple un rol específico, siendo las leonas las principales cazadoras. Es conocido por su poderoso rugido, el cual puede escucharse a varios kilómetros de distancia.' },
    { name: 'Hipopótamo', img: 'img/hipopotamo_img.png', boxImg: 'img/hipopotamo_e.png', age: '40 yr', size: '150 cm', range: '50 km', desc: 'El hipopótamo es un mamífero herbívoro de gran tamaño que habita en ríos, lagos y zonas húmedas de África. Pasa la mayor parte del día dentro del agua para proteger su piel del sol y mantener su cuerpo fresco. Posee un cuerpo robusto, mandíbulas fuertes y una piel gruesa que le brinda protección natural. Aunque suele parecer tranquilo, es un animal muy territorial y puede volverse extremadamente agresivo si se siente amenazado.' },
    { name: 'Mono', img: 'img/mono_img.png', boxImg: 'img/mono_caja.png', age: '12 yr', size: '45 cm', range: '30 km', desc: 'El mono es un mamífero inteligente y sociable que vive principalmente en selvas y bosques tropicales. Se caracteriza por su gran agilidad, su habilidad para trepar árboles y su comportamiento curioso. Vive en grupos donde establece fuertes vínculos sociales y se comunica mediante sonidos, gestos y expresiones faciales. Gracias a su capacidad de adaptación, puede habitar distintos tipos de entornos y alimentarse de frutas, hojas y pequeños animales.' }
  ];

  const title = document.querySelector('.hero-carousel .carousel-title');
  const slides = document.querySelectorAll('.hero-carousel .slide');
  const dots = document.querySelectorAll('.hero-carousel .dot');
  const prev = document.querySelector('.hero-carousel .prev');
  const next = document.querySelector('.hero-carousel .next');
  const infoBtn = document.querySelector('.hero-carousel .info-button');
  let current = 0; 
  let currentLang = 'es';

  
  const modal = document.getElementById('animal-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalAge = document.getElementById('modal-age');
  const modalSize = document.getElementById('modal-size');
  const modalRange = document.getElementById('modal-range');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.querySelector('.modal-close');

  
  slides.forEach((s, i) => {
    const img = s.querySelector('img');
    const animal = animals[i] || animals[0];
    img.dataset.index = i;
    img.src = animal.img;
    
    img.alt = animal.name;
    img.addEventListener('error', () => { img.src = animals[0].img; img.alt = animals[0].name; });
  });
  
  function updateUI(n){
    const animal = animals[n];
    
    const tAnimal = (translations && translations[currentLang] && translations[currentLang].animals && translations[currentLang].animals[n]) ? translations[currentLang].animals[n] : { name: animal.name, desc: animal.desc };
    title.textContent = tAnimal.name || animal.name;
    infoBtn.dataset.animal = tAnimal.name || animal.name;
    
    const slideImg = slides[n]?.querySelector('img');
    if(slideImg) slideImg.alt = tAnimal.name || animal.name;
  }

  function goTo(index){
    const n = (index + slides.length) % slides.length;
    slides.forEach((s,i) => s.classList.toggle('active', i === n));
    dots.forEach((d,i) => d.classList.toggle('active', i === n));
    current = n;
    updateUI(n);
  }

  
  prev.setAttribute('type', 'button');
  next.setAttribute('type', 'button');

  
  function pressBtn(btn){
    btn.classList.add('press');
    setTimeout(()=> btn.classList.remove('press'), 140);
  }

  prev.addEventListener('click', (e) => { e.preventDefault(); pressBtn(prev); goTo(current - 1); });
  next.addEventListener('click', (e) => { e.preventDefault(); pressBtn(next); goTo(current + 1); });

  
  const prevIcon = prev.querySelector('.icon-fa');
  const nextIcon = next.querySelector('.icon-fa');

  
  if(prevIcon){
    prevIcon.setAttribute('role','button');
    prevIcon.setAttribute('tabindex','0');
    prevIcon.style.cursor = 'pointer';
    prevIcon.addEventListener('click', (e)=>{ e.preventDefault(); pressBtn(prev); goTo(current - 1); });
    prevIcon.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pressBtn(prev); goTo(current - 1); } });
  }

  if(nextIcon){
    nextIcon.setAttribute('role','button');
    nextIcon.setAttribute('tabindex','0');
    nextIcon.style.cursor = 'pointer';
    nextIcon.addEventListener('click', (e)=>{ e.preventDefault(); pressBtn(next); goTo(current + 1); });
    nextIcon.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pressBtn(next); goTo(current + 1); } });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', ()=> goTo(parseInt(dot.dataset.index)));
  });

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev.click();
    if (e.key === 'ArrowRight') next.click();
  });

  
  function openModalByIndex(index){
    const animal = animals[index] || animals[0];
    const tAnimal = (translations && translations[currentLang] && translations[currentLang].animals && translations[currentLang].animals[index]) ? translations[currentLang].animals[index] : { name: animal.name, desc: animal.desc };
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    
    if(animal && animal.big){
      modal.classList.add('large-img');
    } else {
      modal.classList.remove('large-img');
    }
    modalTitle.textContent = tAnimal.name || animal.name;
    
    modalImg.src = animal.boxImg || animal.img;
    modalImg.alt = tAnimal.name || animal.name;
    
    modalAge.textContent = (tAnimal && tAnimal.age) ? tAnimal.age : animal.age;
    modalSize.textContent = (tAnimal && tAnimal.size) ? tAnimal.size : animal.size;
    modalRange.textContent = (tAnimal && tAnimal.range) ? tAnimal.range : animal.range;
    modalDesc.textContent = tAnimal.desc || animal.desc;
    
    modalImg.addEventListener('error', ()=>{ modalImg.src = (animals[0].boxImg || animals[0].img); modalImg.alt = animals[0].name; });
    modalClose.focus();
  }

  function closeModal(){
    modal.classList.remove('open');
    modal.classList.remove('large-img');
    modal.setAttribute('aria-hidden','true');
    infoBtn.focus();
  }
  
  infoBtn.addEventListener('click', ()=>{
    openModalByIndex(current);
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  
  const langToggle = document.getElementById('lang-toggle');
  const langMenu = document.getElementById('lang-menu');
  const langItems = document.querySelectorAll('.lang-item');

  const translations = {
    es: {
      info: 'Informacion', age: 'Edad', size: 'Tamaño', range: 'Rango',
      animals: [
        { name: 'Tigre', desc: animals[0].desc, age: '15 años', size: '70 cm', range: '96 km' },
        { name: 'Cebra', desc: animals[1].desc, age: '20 años', size: '140 cm', range: '60 km' },
        { name: 'León', desc: animals[2].desc, age: '14 años', size: '120 cm', range: '80 km' },
        { name: 'Hipopótamo', desc: animals[3].desc, age: '40 años', size: '150 cm', range: '50 km' },
        { name: 'Mono', desc: animals[4].desc, age: '12 años', size: '45 cm', range: '30 km' }
      ]
    },
    en: {
      info: 'Information', age: 'Age', size: 'Size', range: 'Range',
      animals: [
        { name: 'Tiger', desc: 'The tiger (Panthera tigris) is a powerful solitary predator found across parts of Asia in forests, grasslands, and wetlands. An adult tiger relies on stealth and strength to ambush large prey such as deer and wild boar; it is an excellent swimmer and often rests near water. Tigers maintain large territories, use scent marking and vocalizations to communicate, and are under severe threat from habitat loss and poaching; conservation efforts focus on habitat corridors and anti-poaching patrols.', age: '15 years', size: '70 cm', range: '96 km' },
        { name: 'Zebra', desc: 'Zebras are social, grazing mammals native to Africa’s savannas and open woodlands. Their black-and-white stripes are unique to each individual and may help with camouflage, thermoregulation, and group recognition. Zebras live in small family groups that join into larger herds during migrations; they travel long distances to find fresh pasture and water and use coordinated vigilance to avoid predators.', age: '20 years', size: '140 cm', range: '60 km' },
        { name: 'Lion', desc: 'Lions live in social groups called prides composed of related females, their offspring, and a coalition of males. Female lions often hunt cooperatively for medium to large ungulates, while males primarily defend territory and cubs. Social behavior includes cooperative care of young, territorial scent marking, and powerful vocalizations (roars) that can be heard over long distances; human encroachment and habitat fragmentation threaten many populations.', age: '14 years', size: '120 cm', range: '80 km' },
        { name: 'Hippopotamus', desc: 'The hippopotamus is a large, mainly nocturnal herbivore that spends daylight hours submerged in rivers or lakes to keep cool. Hippos feed on grass at night and have a social structure centered on dominant males that control stretches of water. Despite their herbivorous diet, hippos have strong jaws and are highly territorial in water; they can be dangerous to humans and vessels that enter their space.', age: '40 years', size: '150 cm', range: '50 km' },
        { name: 'Monkey', desc: 'Monkeys refer to many diverse primate species with variable diets, social systems and habitats. Most are highly social and live in troops with structured hierarchies, using vocalizations and gestures to communicate. Many species are arboreal and display advanced problem-solving and tool-use behaviors; they play important ecological roles as seed dispersers and are studied for their complex cognition.', age: '12 years', size: '45 cm', range: '30 km' }
      ]
    },
    pt: {
      info: 'Informação', age: 'Idade', size: 'Tamanho', range: 'Alcance',
      animals: [
        { name: 'Tigre', desc: 'O tigre (Panthera tigris) é um predador solitário e poderoso que habita florestas, zonas húmidas e savanas na Ásia. Alimenta-se de grandes ungulados e usa furtividade e força para emboscar as presas; é também um nadador eficiente. Populações estão ameaçadas por perda de habitat e caça furtiva; programas de conservação concentram-se na proteção de habitat e corredores entre populações.', age: '15 anos', size: '70 cm', range: '96 km' },
        { name: 'Zebra', desc: 'As zebras são mamíferos pastadores, sociais, nativas das savanas africanas. As suas riscas pretas e brancas são únicas e podem ajudar na camuflagem e reconhecimento social. Vivem em grupos familiares que se juntam em grandes manadas migratórias à procura de pasto e água, exibindo comportamentos cooperativos de vigilância.', age: '20 anos', size: '140 cm', range: '60 km' },
        { name: 'Leão', desc: 'Os leões vivem em grupos sociais chamados alcateias, onde fêmeas relacionadas caçam em conjunto e machos defendem o território. Exibem comportamentos complexos de cooperação, cuidados com os filhotes e comunicação sonora como o rugido. As populações sofrem com perda de habitat e conflitos com atividades humanas.', age: '14 anos', size: '120 cm', range: '80 km' },
        { name: 'Hipopótamo', desc: 'O hipopótamo é um grande herbívoro semi-aquático que passa grande parte do dia dentro de rios e lagos para se manter fresco. É territorial na água e pode ser agressivo quando sente ameaça; à noite alimenta-se de ervas nos arredores.', age: '40 anos', size: '150 cm', range: '50 km' },
        { name: 'Macaco', desc: 'Termo genérico para várias espécies de primatas, os macacos são frequentemente sociais e adaptáveis. Muitos são arborícolas, ágeis e demonstram comportamentos complexos de comunicação e aprendizagem social.', age: '12 anos', size: '45 cm', range: '30 km' }
      ]
    },

    fr: {
      info: 'Information', age: 'Âge', size: 'Taille', range: 'Zone',
      animals: [
        { name: 'Tigre', desc: 'Le tigre (Panthera tigris) est un grand prédateur solitaire présent en Asie, dans divers habitats allant des forêts denses aux prairies. Il chasse de grands ongulés en s’appuyant sur la furtivité et la force, et aime se reposer près de points d’eau. De nombreuses sous‑populations sont menacées ; la conservation met l’accent sur la protection des habitats et la lutte contre le braconnage.', age: '15 ans', size: '70 cm', range: '96 km' },
        { name: 'Zèbre', desc: 'Le zèbre est un herbivore grégaire des savanes africaines, reconnaissable à ses rayures uniques. Ces rayures pourraient aider à la reconnaissance sociale et à la protection contre les insectes et les prédateurs. Les zèbres participent à de longues migrations à la recherche d’eau et de pâturages et utilisent des comportements collectifs pour se défendre.', age: '20 ans', size: '140 cm', range: '60 km' },
        { name: 'Lion', desc: 'Le lion vit en groupes appelés prides, où les lionnes chassent en coopération et les mâles protègent le territoire. Les lions présentent des comportements sociaux complexes, prennent soin des petits et communiquent par des rugissements puissants. Les menaces comprennent la fragmentation de l’habitat et les conflits avec l’homme.', age: '14 ans', size: '120 cm', range: '80 km' },
        { name: 'Hippopotame', desc: 'L’hippopotame est un grand herbivore semi‑aquatique qui passe la journée dans l’eau pour protéger sa peau, puis pâture la nuit. Il est territorial dans l’eau et peut se montrer extrêmement agressif si on s’approche trop près. Les mâles dominants contrôlent des tronçons de rivière et le comportement social est centré autour de ces zones.', age: '40 ans', size: '150 cm', range: '50 km' },
        { name: 'Singe', desc: 'Le terme « singe » englobe de nombreuses espèces de primates, souvent sociales et très agiles. Beaucoup vivent dans la canopée, utilisent des gestes et des vocalisations complexes et manifestent des capacités cognitives élevées, comme l’utilisation d’outils et la mémoire sociale.', age: '12 ans', size: '45 cm', range: '30 km' }
      ]
    },

    it: {
      info: 'Informazioni', age: 'Età', size: 'Dimensione', range: 'Raggio',
      animals: [
        { name: 'Tigre', desc: 'La tigre è un predatore solitario che vive in habitat vari, dalle foreste alle praterie umide. Caccia prede di grandi dimensioni usando furtività e forza; è anche un buon nuotatore e spesso frequenta corsi d’acqua. La specie è minacciata dalla perdita di habitat e dalla caccia illegale, e gli sforzi di conservazione mirano a proteggere aree chiave e collegamenti tra popolazioni.', age: '15 anni', size: '70 cm', range: '96 km' },
        { name: 'Zebra', desc: 'Le zebre sono erbivore sociali delle savane africane, famose per le strisce bianche e nere uniche per ogni individuo. Le strisce possono aiutare nel riconoscimento sociale e nella difesa contro i predatori; le zebre migrano periodicamente alla ricerca di pascolo e acqua.', age: '20 anni', size: '140 cm', range: '60 km' },
        { name: 'Leone', desc: 'I leoni vivono in gruppi chiamati branchi, dove le femmine collaborano per la caccia e i maschi difendono il territorio. Mostrano comportamenti sociali complessi e comunicazioni vocali potenti; le popolazioni sono minacciate dalla frammentazione dell’habitat e dai conflitti con le attività umane.', age: '14 anni', size: '120 cm', range: '80 km' },
        { name: 'Ippopotamo', desc: 'L’ippopotamo è un grande mammifero semiacquatico che passa gran parte della giornata immerso nell’acqua per proteggere la pelle. È molto territoriale in acqua e può diventare aggressivo se provocato; durante la notte pascola erba sulle rive.', age: '40 anni', size: '150 cm', range: '50 km' },
        { name: 'Scimmia', desc: 'Il termine scimmia comprende molte specie diverse di primati; la maggior parte è sociale e vive in gruppi con gerarchie. Molte specie sono arboricole e mostrano abilità cognitive notevoli, come l’uso di strumenti e comportamenti sociali complessi.', age: '12 anni', size: '45 cm', range: '30 km' }
      ]
    },

    ru: {
      info: 'Информация', age: 'Возраст', size: 'Размер', range: 'Диапазон',
      animals: [
        { name: 'Тигр', desc: 'Тигр — могущественный одиночный хищник, обитающий в лесах и влажных зонах Азии. Взрослые особи охотятся на крупных копытных, используя силу и скрытность, и часто встречаются у водоёмов. Популяции тигров подвергаются рискам из‑за потери среды обитания и браконьерства; охранные мероприятия направлены на сохранение коридоров и борьбу с браконьерством.', age: '15 лет', size: '70 см', range: '96 км' },
        { name: 'Зебра', desc: 'Зебры — стадные травоядные, живущие в саваннах Африки и отличающиеся чёрно‑белыми полосами. Эти полосы уникальны и, вероятно, помогают в распознавании особей, отпугивании насекомых и маскировке при движении в группе. Зебры мигрируют в поисках пастбищ и воды и используют коллективную бдительность для защиты от хищников.', age: '20 лет', size: '140 см', range: '60 км' },
        { name: 'Лев', desc: 'Львы живут в социальных группах — прайдах, где самки совместно охотятся, а самцы защищают территорию. Социальные взаимодействия включают совместный уход за молодью, охоту и громкие вокализации (рычание). Многочисленные популяции находятся под угрозой из‑за дробления среды и конфликтов с людьми.', age: '14 лет', size: '120 см', range: '80 км' },
        { name: 'Бегемот', desc: 'Бегемоты — крупные полуводные травоядные, которые проводят день в воде, защищая кожу от солнца, а ночью пастись на береговой растительности. Они чрезвычайно территориальны в воде и могут проявлять агрессию при угрозе; доминирующие самцы контролируют участки реки.', age: '40 лет', size: '150 см', range: '50 км' },
        { name: 'Обезьяна', desc: 'Термин «обезьяна» охватывает множество видов приматов — от мелких до крупных — часто обладающих сложным социальным поведением и высокой ловкостью. Многие виды живут на деревьях, используют жесты и вокализации для общения и проявляют продвинутые когнитивные способности.', age: '12 лет', size: '45 см', range: '30 км' }
      ]
    },

    zh: {
      info: '信息', age: '年龄', size: '大小', range: '范围',
      animals: [
        { name: '虎', desc: '虎是一种强壮的孤独掠食者，分布于亚洲的森林、草地和湿地。成年虎以鹿、野猪等大型食草动物为食，依靠埋伏和力量捕猎，且善于游泳，常在水边休憩。由于栖息地丧失与偷猎，虎的许多种群正面临威胁，保护工作侧重于维护栖息地与防止偷猎。', age: '15岁', size: '70 厘米', range: '96 公里' },
        { name: '斑马', desc: '斑马是非洲草原上的群居食草动物，黑白相间的条纹在个体间独一无二，可能有助于识别和防御。斑马通常以小家庭单位为基础，合并成更大的群体进行迁徙以寻找水和牧草，并通过集体警戒来防御捕食者。', age: '20岁', size: '140 厘米', range: '60 公里' },
        { name: '狮子', desc: '狮子以群体形式（狮群）生活，雌狮通常合作狩猎并照顾幼崽，而雄狮负责保卫领地。狮群具有复杂的社会结构，成员间存在分工与合作，咆哮可以传很远，起到宣示领地与交流的作用。栖息地破碎化与人类冲突是主要威胁。', age: '14岁', size: '120 厘米', range: '80 公里' },
        { name: '河马', desc: '河马是大型半水生食草动物，白天多在水中度过以保护皮肤，夜间上岸觅食。河马在水域中有强烈的领地性，若受到威胁可能会表现出攻击性，且雄性常控制特定河段。', age: '40岁', size: '150 厘米', range: '50 公里' },
        { name: '猴子', desc: '“猴子”一词涵盖多种灵长类，许多物种高度社交，具备复杂的行为与沟通方式。多数猴子擅长攀爬，生活在树林中，食谱包括水果、叶片与小动物，并在生态系统中扮演重要角色。', age: '12岁', size: '45 厘米', range: '30 公里' }
      ]
    }
  };

  function applyLanguage(code){
    const t = translations[code] || translations.es;
    currentLang = code;
    
    document.documentElement.lang = code;
    
    if(infoBtn) infoBtn.textContent = t.info;
    
    const activeFlag = document.getElementById('active-flag');
    if(activeFlag){
      
      const flagMap = { es: 'img/flag_es.png', en: 'img/flag_us.png', pt: 'img/flag_br.png', fr: 'img/flag_fr.png', it: 'img/flag_it.png', ru: 'img/flag_ru.png', zh: 'img/flag_cn.png' };
      const flagSrc = flagMap[code] || flagMap.es;
      activeFlag.src = flagSrc;
      activeFlag.alt = code.toUpperCase();
    }
    
    const ageSpan = document.querySelector('#modal-age')?.nextElementSibling;
    const sizeSpan = document.querySelector('#modal-size')?.nextElementSibling;
    const rangeSpan = document.querySelector('#modal-range')?.nextElementSibling;
    if(ageSpan) ageSpan.textContent = t.age;
    if(sizeSpan) sizeSpan.textContent = t.size;
    if(rangeSpan) rangeSpan.textContent = t.range;
    
    try{ localStorage.setItem('zoodom_lang', code); }catch(e){}
    
    updateUI(current);
    
    try{ const prev = document.querySelector('.lang-item.selected'); if(prev) prev.classList.remove('selected'); const sel = document.querySelector('.lang-item[data-lang="'+code+'"]'); if(sel) sel.classList.add('selected'); }catch(e){} 
    
    if(modal && modal.classList.contains('open')){
      try{
        const tAnimal = (translations && translations[code] && translations[code].animals && translations[code].animals[current]) ? translations[code].animals[current] : null;
        if(tAnimal){
          modalTitle.textContent = tAnimal.name;
          modalDesc.textContent = tAnimal.desc;
          
          modalImg.alt = tAnimal.name;
          
          try{ modalAge.textContent = tAnimal.age || modalAge.textContent; modalSize.textContent = tAnimal.size || modalSize.textContent; modalRange.textContent = tAnimal.range || modalRange.textContent; }catch(e){}
        }
      }catch(e){}
    }
  }

  console.debug('Zoodom: initializing language menu');
  
  function toggleLangMenu(){
    if(!langMenu) return;
    const open = langMenu.classList.toggle('open');
    
    const btn = document.getElementById('lang-toggle') || document.querySelector('.lang-toggle');
    if(btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    langMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    
    try{
      langMenu.style.display = open ? 'block' : 'none';
      langMenu.style.zIndex = '2000';
    }catch(e){}
    console.debug('Zoodom: lang menu toggled ->', open, 'langMenu.display=', langMenu.style.display, 'zIndex=', langMenu.style.zIndex);
    if(open){
      const first = langMenu.querySelector('.lang-item');
      if(first) first.focus();
    }
  }
  
  const langToggleBtn = document.getElementById('lang-toggle') || document.querySelector('.lang-toggle');
  if(langToggleBtn){
    langToggleBtn.addEventListener('click', (e)=>{ e.preventDefault(); toggleLangMenu(); });
    langToggleBtn.setAttribute('type','button');
  } else {
    console.warn('Zoodom: lang toggle button not found');
  }

  
  const langIcon = document.querySelector('.lang-icon');
  if(langIcon){
    langIcon.setAttribute('role','button');
    langIcon.setAttribute('tabindex','0');
    langIcon.style.cursor = 'pointer';
    langIcon.addEventListener('click', (e)=>{ e.preventDefault(); toggleLangMenu(); });
    langIcon.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLangMenu(); } });
  }

  
  document.addEventListener('click', (e)=>{
    try{
      const target = e.target;
      if(target && (target.closest && (target.closest('#lang-toggle') || target.closest('.lang-icon')))){
        e.preventDefault();
        toggleLangMenu();
      }
    }catch(err){}
  });

  document.addEventListener('keydown', (e)=>{ if(e.key === 'l' || e.key === 'L'){ console.debug('Zoodom: L key pressed - toggling lang menu'); toggleLangMenu(); } });

  
  function selectLangItem(item){
    const code = item.dataset.lang;
    console.debug('Zoodom: language selected ->', code);
    applyLanguage(code);
    
    try{ langMenu.classList.remove('open'); langMenu.style.display = 'none'; langMenu.setAttribute('aria-hidden','true'); langToggle.setAttribute('aria-expanded','false'); }catch(e){}
    langToggle.focus();
  }
  langItems.forEach(item => {
    item.setAttribute('tabindex','0');
    item.addEventListener('click', ()=> selectLangItem(item));
    item.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectLangItem(item); } });
  });

  
  document.addEventListener('click', (e)=>{
    if(!langMenu.contains(e.target) && !langToggle.contains(e.target)){
      langMenu.classList.remove('open');
      langMenu.setAttribute('aria-hidden','true');
      langToggle.setAttribute('aria-expanded','false');
    }
  });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ langMenu.classList.remove('open'); langMenu.setAttribute('aria-hidden','true'); langToggle.setAttribute('aria-expanded','false'); } });

  
  const savedLang = (function(){ try{ return localStorage.getItem('zoodom_lang'); }catch(e){ return null; } })();
  if(savedLang) applyLanguage(savedLang);

  
  updateUI(current);
});