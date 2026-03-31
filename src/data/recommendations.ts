export const maturityLevels = [
  {
    min: 1.0,
    max: 1.5,
    label: 'Startend',
    description: 'AI speelt nog nauwelijks een rol in jullie school. Dit is een goed moment om de eerste stappen te zetten.',
  },
  {
    min: 1.6,
    max: 2.5,
    label: 'Verkennend',
    description: 'Er wordt geëxperimenteerd met AI, maar dit gebeurt nog niet schoolbreed. Individuele initiatieven vormen de basis.',
  },
  {
    min: 2.6,
    max: 3.0,
    label: 'Opbouwend',
    description: 'Er is beleid en er zijn initiatieven, maar het is nog niet volledig verankerd in de organisatie.',
  },
  {
    min: 3.1,
    max: 3.5,
    label: 'Integrerend',
    description: 'AI is structureel onderdeel van onderwijs en organisatie. De school werkt vanuit een duidelijke visie.',
  },
  {
    min: 3.6,
    max: 4.0,
    label: 'Voorlopend',
    description: 'De school loopt voorop op het gebied van AI in het onderwijs en deelt actief kennis met anderen.',
  },
]

// ─── Narratieven per dimensie × volwassenheidsniveau ────────────────────

export const dimensionNarratives: Record<string, Record<string, string>> = {
  visie: {
    startend: 'Jullie school heeft nog geen vastgesteld standpunt over AI in het onderwijs. Dit is begrijpelijk — veel scholen bevinden zich in deze fase. Maar zonder een gedeelde visie ontstaat er versnippering: individuele docenten maken hun eigen keuzes, en er is geen kader waarbinnen die keuzes passen. Het ontbreken van beleid betekent ook dat jullie kwetsbaar zijn als het gaat om de verplichtingen vanuit de EU AI Act. De eerste stap is niet een dik beleidsdocument, maar een gesprek: wat vinden wij als school van AI?',
    verkennend: 'Er wordt op jullie school over AI gesproken, en er zijn misschien informele afspraken of mondelinge richtlijnen. Dat is een goed begin, maar het blijft vrijblijvend. Zonder vastgelegd beleid is het lastig om als school eenduidig te communiceren naar docenten, leerlingen en ouders. De EU AI Act vraagt bovendien dat organisaties aantoonbaar werken aan AI-geletterdheid. Het is tijd om de gesprekken die gevoerd worden om te zetten in concrete afspraken.',
    opbouwend: 'Jullie school heeft stappen gezet richting een AI-beleid. Er zijn afspraken en richtlijnen, al zijn die misschien nog niet overal even stevig verankerd. AI wordt benoemd in plannen, maar is nog niet verweven door alle beleidsonderdelen heen. De basis is er — nu is het zaak om de visie te vertalen naar een schoolbreed gedragen aanpak en te zorgen dat ook de juridische kaders (EU AI Act, AVG) goed zijn ingebed.',
    integrerend: 'Jullie hebben een duidelijk en vastgelegd beleid rondom AI. Er zijn richtlijnen voor zowel docenten als leerlingen, en AI is als thema verankerd in het schoolplan. De school is bewust bezig met de EU AI Act en heeft concrete stappen gezet. Dit biedt een stevige basis om verder te bouwen. De volgende stap is om het beleid levend te houden: evalueer regelmatig of het nog aansluit bij de snel veranderende praktijk.',
    voorlopend: 'Jullie school heeft een vooruitstrevend en goed doordacht AI-beleid. AI is verweven door meerdere beleidsonderdelen, er zijn heldere richtlijnen, en jullie zijn proactief bezig met de EU AI Act. Dit is uitzonderlijk en plaatst jullie in een voorhoede van scholen. Overweeg om jullie aanpak te delen met andere scholen — jullie ervaring is waardevol voor het hele onderwijsveld.',
  },
  docent: {
    startend: 'De AI-vaardigheden van jullie docententeam staan nog aan het begin. De meeste docenten zijn terughoudend of hebben nog weinig ervaring met AI-tools. Dit is geen verwijt — veel scholen zitten in deze fase. Maar het betekent wel dat er een stevige professionaliseringsslag nodig is. De EU AI Act verplicht dat medewerkers AI-geletterd zijn. Zonder basiskennis en -vaardigheden bij docenten komt AI-integratie in het onderwijs niet van de grond.',
    verkennend: 'Er zijn enthousiastelingen in jullie team, maar de meerderheid is nog afwachtend. Sommige docenten experimenteren op eigen houtje, terwijl anderen AI liever vermijden. Dit verschil in tempo is normaal, maar vraagt om een gerichte aanpak: de voorlopers moeten ruimte krijgen, en de achterblijvers hebben een veilige eerste kennismaking nodig. Zonder begeleiding groeit de kloof binnen het team.',
    opbouwend: 'Een groeiend deel van jullie team ontwikkelt zich op het gebied van AI. Er wordt kennis gedeeld, er zijn gesprekken over ethiek en didactiek, en docenten beginnen AI bewust in te zetten. De uitdaging is nu om van losse initiatieven naar een structurele aanpak te gaan. Niet elke docent hoeft een expert te worden, maar iedereen moet de basis beheersen.',
    integrerend: 'Jullie docententeam is goed op weg. De meerderheid begrijpt hoe AI werkt, kan output kritisch beoordelen, en zet AI bewust in als didactisch middel. Er is een cultuur van kennisdeling en professionele ontwikkeling. Dit is een sterke positie. De volgende stap is verdieping: hoe kunnen de voorlopers in jullie team een coachende rol pakken voor collega\'s die nog groeien?',
    voorlopend: 'Jullie docententeam behoort tot de koplopers in het onderwijs als het gaat om AI-vaardigheden. Er is breed enthousiasme, kritisch gebruik, en een actieve leergemeenschap. Docenten nemen eigenaarschap over hun ontwikkeling en coachen elkaar. Dit is een unieke positie. Overweeg om jullie expertise breder in te zetten — als opleiders, als ambassadeurs, of als ontwikkelpartners voor andere scholen.',
  },
  onderwijs: {
    startend: 'AI-geletterdheid is nog geen onderdeel van het onderwijs aan jullie leerlingen. In sommige gevallen wordt AI zelfs verboden. Dit is een gemiste kans: leerlingen gebruiken AI al volop buiten school, en zonder begeleiding doen ze dat zonder kritisch bewustzijn. De vraag is niet óf leerlingen AI gaan gebruiken, maar of jullie ze leren om dat verantwoord en effectief te doen.',
    verkennend: 'Hier en daar besteden docenten aandacht aan AI in hun lessen, maar dit is nog incidenteel en afhankelijk van individueel initiatief. Leerlingen krijgen geen samenhangend beeld van wat AI is, hoe het werkt, en hoe je het verantwoord inzet. Een eerste stap is om bij één of twee vakken bewust ruimte te maken voor AI-gebruik en daar samen van te leren.',
    opbouwend: 'AI komt bij meerdere vakken aan bod en er zijn lessen of modules over AI-gebruik. Dit is een goede basis, maar het is nog geen doorlopende leerlijn. Leerlingen krijgen in het ene vak andere boodschappen over AI dan in het andere. De volgende stap is om schoolbreed af te spreken wat leerlingen wanneer moeten weten en kunnen op het gebied van AI.',
    integrerend: 'Jullie school heeft AI-geletterdheid structureel ingebed in het onderwijs. Er zijn lessen, modules en een bewuste aanpak. Leerlingen leren niet alleen met AI te werken, maar ook om er kritisch over na te denken. Dit is precies wat de toekomst vraagt. Blijf het programma evalueren en bijstellen — AI ontwikkelt zich snel en het onderwijs moet meebewegen.',
    voorlopend: 'Jullie school heeft een doorlopende leerlijn voor AI-geletterdheid bij leerlingen. Dit is uitzonderlijk en plaatst jullie leerlingen in een sterke positie voor hun vervolgopleiding en de arbeidsmarkt. De uitdaging is om voorop te blijven lopen in een veld dat zich razendsnel ontwikkelt. Overweeg om jullie aanpak te documenteren en te delen met andere scholen.',
  },
  infra: {
    startend: 'De technische en organisatorische basis voor AI is nog niet geregeld. Docenten gebruiken mogelijk eigen (gratis) accounts zonder dat de school daar zicht op heeft. Er zijn geen verwerkersovereenkomsten en geen duidelijke afspraken over privacy. Dit is een risico — zowel juridisch als praktisch. Zonder geregelde infrastructuur kan AI-gebruik niet veilig en verantwoord plaatsvinden.',
    verkennend: 'Er zijn eerste stappen gezet, maar de infrastructuur is nog niet solide. Misschien zijn er aanbevelingen voor tools, maar ontbreken licenties of verwerkersovereenkomsten. Privacy-afspraken zijn informeel. Dit is een veelvoorkomende situatie, maar vraagt om actie: de school moet weten welke tools gebruikt worden en ervoor zorgen dat dit veilig kan.',
    opbouwend: 'De school heeft licenties voor AI-tools en er zijn richtlijnen voor privacy. Maar misschien ontbreken formele verwerkersovereenkomsten, of is het aanbod nog beperkt. De basis is er — nu is het zaak om het netjes te regelen: verwerkersovereenkomsten afsluiten, een duidelijk overzicht maken van welke tool voor welk doel, en docenten informeren over wat wel en niet mag.',
    integrerend: 'De infrastructuur is goed geregeld. Er zijn licenties, verwerkersovereenkomsten, en duidelijke afspraken over privacy en dataverwerking. Docenten weten welke tools beschikbaar zijn en hoe ze die veilig kunnen gebruiken. Dit is een sterke positie die zorgt voor een veilige en betrouwbare basis voor AI-gebruik in het onderwijs.',
    voorlopend: 'Jullie infrastructuur is voorbeeldig geregeld. Er is een breed, beheerd aanbod van AI-tools met duidelijke keuzes per doel, volledige verwerkersovereenkomsten, en een doorleefd AVG-beleid. Dit geeft docenten de vrijheid om te experimenteren binnen veilige kaders. Een voorbeeld voor andere scholen.',
  },
}

export const subdimensionNarratives: Record<string, Record<string, string>> = {
  mindset: {
    startend: 'Het team staat overwegend terughoudend of ongeïnteresseerd tegenover AI. Dit kan voortkomen uit onbekendheid, angst voor vervanging, of gewoonweg gebrek aan tijd en ruimte om zich erin te verdiepen. Zonder een open houding is elke verdere stap moeilijk. De sleutel ligt in laagdrempelige kennismaking: laat docenten ervaren wat AI kan betekenen voor hun eigen werk.',
    verkennend: 'Het team is afwachtend, met hier en daar enthousiastelingen. De meeste docenten zien AI nog als iets dat niet bij hun vak hoort. Dit is een kantelpunt: als de school nu investeert in positieve ervaringen, kan de houding snel omslaan. Wacht te lang, en de kloof tussen voorlopers en achterblijvers wordt groter.',
    opbouwend: 'Er is groeiende nieuwsgierigheid in het team. Meerdere docenten zien AI als relevant voor hun vak en experimenteren actief. De uitdaging is om deze energie vast te houden en te verbreden naar het hele team. Geef de enthousiastelingen een platform en maak hun successen zichtbaar.',
    integrerend: 'Het team staat breed positief tegenover AI. De meerderheid ziet het als onderdeel van hun professionele ontwikkeling. Dit is een sterke basis voor verdere verdieping. De volgende stap is om van enthousiasme naar doelgericht gebruik te gaan: niet alles hoeft met AI, maar waar het meerwaarde heeft, zetten docenten het bewust in.',
    voorlopend: 'Het team omarmt AI als vanzelfsprekend onderdeel van hun werk. Docenten experimenteren actief, delen ervaringen, en zien AI als kans voor beter onderwijs. Dit enthousiasme is waardevol — zorg dat het niet doorslaat in kritiekloos gebruik, maar blijf de reflectieve houding stimuleren.',
  },
  ethiek: {
    startend: 'Ethische afwegingen rond AI zijn nog niet aan de orde op jullie school. Docenten denken niet bewust na over wanneer AI wel of niet passend is, en juridische kaders (AVG, AI Act) zijn onbekend terrein. Dit is een blinde vlek die risico\'s met zich meebrengt — zowel voor de kwaliteit van het onderwijs als voor de privacy van leerlingen.',
    verkennend: 'Enkele docenten denken na over de ethische kant van AI, maar het is nog geen teambreed gesprek. Men weet globaal dat privacy een aandachtspunt is, maar concrete kennis over de AVG en AI Act ontbreekt. Het helpt om dit niet abstract te houden: bespreek concrete casussen uit de eigen praktijk.',
    opbouwend: 'Er zijn gesprekken gevoerd over ethiek en AI, en docenten vormen zich een mening. De basisregels rond privacy zijn besproken. De volgende stap is om dit te verankeren: niet alleen wéten dat er regels zijn, maar ook als team afspraken maken over hoe jullie daarmee omgaan in de dagelijkse praktijk.',
    integrerend: 'Docenten maken bewuste, beargumenteerde keuzes over AI-inzet. Er is voorlichting gegeven over juridische kaders en dit is onderdeel van het beleid. Dit is een volwassen positie die zorgt voor verantwoord AI-gebruik. Blijf dit actueel houden — de wet- en regelgeving ontwikkelt zich nog.',
    voorlopend: 'Het ethisch bewustzijn rond AI is sterk ontwikkeld in jullie team. Docenten maken genuanceerde afwegingen, kennen de juridische kaders, en dragen dit ook uit naar leerlingen. Dit is precies wat de EU AI Act beoogt. Jullie aanpak kan als voorbeeld dienen voor andere scholen.',
  },
  kennis: {
    startend: 'De meeste docenten weten niet hoe generatieve AI werkt en kunnen AI-output niet kritisch beoordelen. Dit is problematisch: zonder basiskennis kunnen docenten AI niet effectief inzetten en zijn ze niet in staat om leerlingen te begeleiden. Een korte, gerichte scholing over de basisprincipes maakt een wereld van verschil.',
    verkennend: 'Sommige docenten begrijpen globaal hoe AI werkt, maar de meerderheid niet. AI-output wordt soms klakkeloos overgenomen of juist helemaal vermeden. Beide reacties zijn begrijpelijk maar onwenselijk. Docenten hebben behoefte aan praktische kennis: hoe werkt het, wat kan het wel en niet, en hoe beoordeel je de output?',
    opbouwend: 'Een behoorlijk deel van het team begrijpt de basisprincipes van generatieve AI en een groeiende groep kan output beoordelen en bijsturen. Dit is een goede tussenstand. Focus nu op de beperkingen en valkuilen: hallucinaties, bias, en de grenzen van wat je AI kunt toevertrouwen.',
    integrerend: 'De meerderheid van jullie team begrijpt hoe generatieve AI werkt, kent de beperkingen, en gebruikt AI kritisch en iteratief. Dit is het niveau van AI-geletterdheid waar de EU AI Act op aanstuurt. De volgende stap is verdieping: hoe werken specifieke tools, wat zijn de laatste ontwikkelingen, en hoe vertaal je dat naar je eigen vakgebied?',
    voorlopend: 'Jullie team beschikt over diepgaande kennis van AI. Docenten begrijpen niet alleen hoe het werkt, maar kunnen ook nieuwe ontwikkelingen plaatsen en beoordelen. Dit maakt hen waardevolle gesprekspartners voor leerlingen én voor andere scholen. Investeer in het bijblijven — dit veld verandert snel.',
  },
  pedagogiek: {
    startend: 'AI wordt nog niet bewust ingezet als didactisch middel. Docenten gebruiken het misschien voor eigen lesvoorbereiding, maar in de les zelf speelt AI geen rol. Opdrachten en toetsing zijn niet aangepast. Dit betekent dat jullie onderwijs kwetsbaar is voor AI-misbruik door leerlingen, en dat je de kansen van AI als leermiddel laat liggen.',
    verkennend: 'Enkelen experimenteren met AI in de les, maar het is nog ad hoc. Sommige docenten hebben hun opdrachten aangepast, maar er is geen schoolbrede aanpak. Dit is de fase van uitproberen en leren — geef docenten de ruimte, maar zorg ook dat ervaringen gedeeld worden zodat niet iedereen het wiel opnieuw hoeft uit te vinden.',
    opbouwend: 'Meerdere docenten zetten AI structureel in met leerlingen en er is een schoolbrede discussie geweest over opdrachten en toetsing. Er zijn aanpassingen gedaan, maar nog niet overal. De volgende stap is om van individuele experimenten naar een schoolbreed didactisch kader te gaan: wanneer zetten we AI in, hoe dan, en hoe toetsen we?',
    integrerend: 'AI is geïntegreerd in het didactisch repertoire van veel docenten. Er is een bewust toetsbeleid dat rekening houdt met AI. Dit is een vergevorderde positie. De uitdaging is om de kwaliteit hoog te houden: niet AI inzetten om het inzetten, maar omdat het het leren versterkt.',
    voorlopend: 'Jullie school heeft AI diep verankerd in de didactiek. Opdrachten zijn herontworpen, toetsing is aangepast, en docenten zetten AI in als krachtig leermiddel. Dit is de toekomst van onderwijs. Documenteer jullie aanpak — andere scholen kunnen hier enorm van leren.',
  },
  agency: {
    startend: 'Docenten delen geen kennis over AI en nemen geen eigenaarschap over hun professionele ontwikkeling op dit gebied. Ieder doet zijn eigen ding, en de meesten wachten op aanbod van de school. Zonder een kartrekker of leergemeenschap komen initiatieven niet van de grond. De eerste stap is iemand aanwijzen die dit onderwerp trekt.',
    verkennend: 'Er wordt informeel kennis gedeeld — in de wandelgangen, bij de koffie — en enkele docenten zijn proactief in hun ontwikkeling. Maar het is nog niet georganiseerd. Dit is fragiel: als de ene enthousiaste collega vertrekt, verdwijnt de kennis mee. Maak het structureel door vaste momenten in te plannen.',
    opbouwend: 'Er zijn georganiseerde momenten voor kennisdeling (studiedag, vakgroep, PLG) en een groeiende groep zoekt actief naar mogelijkheden. Dit is een gezonde dynamiek. De volgende stap is om een echte leergemeenschap te vormen: een vast groepje dat regelmatig bij elkaar komt, ervaringen deelt, en het team meeneemt.',
    integrerend: 'Er is een actieve leergemeenschap rond AI en de meerderheid van het team ontwikkelt zichzelf. Docenten coachen elkaar en nemen eigenaarschap. Dit is precies waar professionalisering naartoe moet: van top-down aanbod naar intrinsieke ontwikkeling. Zorg dat de randvoorwaarden (tijd, middelen, ruimte) op orde blijven.',
    voorlopend: 'Jullie team is een voorbeeld van professionele leercultuur rond AI. Docenten ontwikkelen zichzelf, coachen anderen, en er is een bloeiende leergemeenschap. Dit trekt naar buiten toe: andere scholen kloppen bij jullie aan. Overweeg om deze rol te formaliseren en jullie expertise breder beschikbaar te stellen.',
  },
}

// ─── AI voor Docenten producten ──────────────────────────────────────────

export interface Product {
  id: string
  name: string
  description: string
  format: string
  targetAudience: string
}

export const products: Product[] = [
  {
    id: 'webinar-basis',
    name: 'Webinarserie AI-geletterdheid Basis',
    description: 'Een reeks van online sessies waarin docenten de basisprincipes van AI leren: hoe generatieve AI werkt, hoe je output beoordeelt, en hoe je AI verantwoord kunt inzetten. Praktisch, laagdrempelig, en direct toepasbaar in de eigen lespraktijk.',
    format: 'Online webinarserie (meerdere sessies)',
    targetAudience: 'Docenten die weinig tot geen ervaring hebben met AI',
  },
  {
    id: 'webinar-gevorderd',
    name: 'Webinarserie AI-geletterdheid Gevorderd',
    description: 'Voor docenten die de basis beheersen en klaar zijn voor de volgende stap. Verdieping in prompt engineering, AI-didactiek, en het coachen van collega\'s. Ideaal voor AI-kartrekkers en pioniers die een voortrekkersrol willen pakken.',
    format: 'Online webinarserie (meerdere sessies)',
    targetAudience: 'Docenten met basiservaring die willen doorgroeien tot kartrekker',
  },
  {
    id: 'workshop',
    name: 'In-company Workshop',
    description: 'Een hands-on teamsessie op locatie, volledig afgestemd op jullie context en behoeften. Docenten gaan direct aan de slag met AI-tools, ontwerpen opdrachten, en maken samen afspraken. Effectief voor teams die een gezamenlijke stap willen zetten.',
    format: 'Workshop op locatie (halve of hele dag)',
    targetAudience: 'Teams die samen willen leren en afspraken willen maken',
  },
  {
    id: 'keynote',
    name: 'Keynote & Inspiratiesessie',
    description: 'Een inspirerende presentatie die het team wakker schudt en enthousiasmeert over de mogelijkheden van AI in het onderwijs. Ideaal als aftrap van een studiedag of als startpunt voor een verandertraject.',
    format: 'Presentatie (45-90 minuten)',
    targetAudience: 'Hele teams, managementteams, of schoolbrede bijeenkomsten',
  },
  {
    id: 'begeleiding',
    name: 'Begeleidingstraject',
    description: 'Een meermaandelijks traject waarin we jullie school begeleiden van visievorming tot implementatie. Met workshops, coaching, en tussentijdse evaluaties. Voor scholen die AI structureel willen inbedden in hun onderwijs en organisatie.',
    format: 'Traject over meerdere maanden',
    targetAudience: 'Scholen die een structurele verandering willen realiseren',
  },
  {
    id: 'leerlingen-vo',
    name: 'Programma AI-vaardigheid Leerlingen (VO)',
    description: 'Een programma waarmee leerlingen leren om AI verantwoord en effectief in te zetten. Met lessen, opdrachten en een doorlopende leerlijn. Specifiek ontwikkeld voor het voortgezet onderwijs.',
    format: 'Lesprogramma met materialen',
    targetAudience: 'VO-scholen die AI-geletterdheid willen opnemen in het curriculum',
  },
]

// ─── Logica voor productaanbevelingen ────────────────────────────────────

export interface ProductRule {
  productId: string
  condition: (scores: { visie: number; docent: number; onderwijs: number; infra: number; total: number; subdimensions: { mindset: number; ethiek: number; kennis: number; pedagogiek: number; agency: number } }, context: Record<string, string | string[]>) => boolean
  reason: (scores: { visie: number; docent: number; onderwijs: number; infra: number; total: number; subdimensions: { mindset: number; ethiek: number; kennis: number; pedagogiek: number; agency: number } }) => string
  priority: number // lower = more important
}

export const productRules: ProductRule[] = [
  {
    productId: 'webinar-basis',
    priority: 1,
    condition: (s) => s.subdimensions.kennis <= 2.5 || s.subdimensions.mindset <= 2.0,
    reason: (s) => {
      if (s.subdimensions.kennis <= 2.0 && s.subdimensions.mindset <= 2.0) {
        return 'Jullie team mist zowel de basiskennis over AI als de mindset om ermee aan de slag te gaan. De Webinarserie Basis biedt een laagdrempelige en praktische kennismaking die beide aspecten adresseert.'
      }
      if (s.subdimensions.kennis <= 2.5) {
        return `De kennisscore van jullie team (${s.subdimensions.kennis.toFixed(1)}) laat zien dat de basisprincipes van AI nog niet breed worden begrepen. De Webinarserie Basis helpt docenten om AI te begrijpen, output te beoordelen, en het verantwoord in te zetten.`
      }
      return `Met een mindset-score van ${s.subdimensions.mindset.toFixed(1)} is er nog terughoudendheid in het team. De Webinarserie Basis biedt een veilige en laagdrempelige eerste kennismaking met AI.`
    },
  },
  {
    productId: 'webinar-gevorderd',
    priority: 3,
    condition: (s) => {
      const hasEnthusiasts = s.subdimensions.mindset >= 2.5
      const hasRoom = s.docent <= 3.5 && s.docent >= 2.0
      const someSubsHigher = Object.values(s.subdimensions).some(v => v >= 2.5)
      return hasEnthusiasts && hasRoom && someSubsHigher
    },
    reason: (s) => `Er zijn docenten in jullie team die al enthousiast zijn (mindset: ${s.subdimensions.mindset.toFixed(1)}) en de basis beheersen. De Webinarserie Gevorderd helpt hen om door te groeien naar een kartrekkers- of coachrol, zodat zij het team kunnen meenemen.`,
  },
  {
    productId: 'workshop',
    priority: 2,
    condition: (s) => s.subdimensions.pedagogiek <= 2.5 || s.subdimensions.agency <= 2.5,
    reason: (s) => {
      if (s.subdimensions.pedagogiek <= 2.5 && s.subdimensions.agency <= 2.5) {
        return `Zowel de didactische inzet van AI (${s.subdimensions.pedagogiek.toFixed(1)}) als de kennisdeling in het team (${s.subdimensions.agency.toFixed(1)}) vragen om aandacht. Een in-company workshop brengt het hele team samen om hands-on aan de slag te gaan.`
      }
      if (s.subdimensions.pedagogiek <= 2.5) {
        return `AI wordt nog weinig bewust ingezet in de didactiek (score: ${s.subdimensions.pedagogiek.toFixed(1)}). Een in-company workshop helpt docenten om samen opdrachten te herontwerpen en AI als leermiddel te verkennen.`
      }
      return `Kennisdeling en eigenaarschap in het team scoren laag (agency: ${s.subdimensions.agency.toFixed(1)}). Een workshop op locatie helpt om samen afspraken te maken en een gedeelde aanpak te ontwikkelen.`
    },
  },
  {
    productId: 'keynote',
    priority: 4,
    condition: (s) => s.subdimensions.mindset <= 2.0,
    reason: () => 'Het team is nog overwegend terughoudend tegenover AI. Een inspirerende keynote kan het bewustzijn vergroten en de eerste vonk aanwakkeren. Ideaal als aftrap van een studiedag of verandertraject.',
  },
  {
    productId: 'begeleiding',
    priority: 5,
    condition: (s) => {
      const lowDims = [s.visie, s.docent, s.onderwijs, s.infra].filter(v => v <= 2.5).length
      return lowDims >= 3 || (s.total >= 2.0 && s.total <= 3.0)
    },
    reason: (s) => {
      const lowDims = [s.visie, s.docent, s.onderwijs, s.infra].filter(v => v <= 2.5).length
      if (lowDims >= 3) {
        return `Met ${lowDims} van de 4 dimensies onder de 2.5 is een losse workshop of webinar niet genoeg. Een begeleidingstraject helpt jullie school om stap voor stap een solide basis op te bouwen — van visie tot implementatie.`
      }
      return `Jullie school scoort gemiddeld ${s.total.toFixed(1)} en zit in de fase van verkenning of opbouw. Een begeleidingstraject helpt om de stap te zetten naar structurele integratie van AI in jullie onderwijs en organisatie.`
    },
  },
  {
    productId: 'leerlingen-vo',
    priority: 2,
    condition: (s, ctx) => {
      const isVO = ctx.onderwijstype === 'VO'
      return isVO && s.onderwijs <= 2.5
    },
    reason: (s) => `De score op onderwijs aan leerlingen (${s.onderwijs.toFixed(1)}) laat zien dat AI-geletterdheid nog geen vast onderdeel is van jullie curriculum. Ons programma voor AI-vaardigheid bij leerlingen biedt een kant-en-klare leerlijn die aansluit bij het VO.`,
  },
]

// ─── Actiestap-templates ─────────────────────────────────────────────────

export interface ActionStepTemplate {
  dimension: string
  subdimension?: string
  minScore: number
  maxScore: number
  action: string
  productId?: string
  priority: number
}

export const actionStepTemplates: ActionStepTemplate[] = [
  // Visie & Beleid
  { dimension: 'visie', minScore: 1.0, maxScore: 2.0, action: 'Plan een teambijeenkomst van 2 uur waarin jullie samen een eerste AI-visie formuleren. Begin simpel: wat willen we wel, wat willen we niet, en wie gaat dit trekken?', priority: 1 },
  { dimension: 'visie', minScore: 2.1, maxScore: 3.0, action: 'Zet de informele afspraken over AI om in een kort beleidsdocument. Leg vast wat jullie positie is, welke richtlijnen er gelden, en hoe jullie omgaan met de EU AI Act.', priority: 2 },
  { dimension: 'visie', minScore: 3.1, maxScore: 4.0, action: 'Evalueer jullie AI-beleid halfjaarlijks. Sluit het nog aan bij de praktijk? Zijn de richtlijnen werkbaar? Is iedereen op de hoogte?', priority: 5 },

  // Docent - Mindset
  { dimension: 'docent', subdimension: 'mindset', minScore: 1.0, maxScore: 2.0, action: 'Organiseer een laagdrempelige kennismaking. Laat docenten in tweetallen 15 minuten experimenteren met een AI-tool voor hun eigen vak.', productId: 'keynote', priority: 1 },
  { dimension: 'docent', subdimension: 'mindset', minScore: 2.1, maxScore: 3.0, action: 'Geef enthousiastelingen een podium: laat 2-3 docenten op een teambijeenkomst vertellen hoe zij AI inzetten. Succesverhalen werken aanstekelijk.', priority: 3 },

  // Docent - Ethiek
  { dimension: 'docent', subdimension: 'ethiek', minScore: 1.0, maxScore: 2.0, action: 'Bespreek in een teamoverleg twee concrete casussen: een leerling die AI gebruikt voor een werkstuk, en een docent die AI gebruikt voor beoordelingen. Wat vinden jullie daar als team van?', priority: 2 },
  { dimension: 'docent', subdimension: 'ethiek', minScore: 2.1, maxScore: 3.0, action: 'Organiseer een sessie over de AVG en AI Act specifiek voor jullie school. Maak het concreet: wat mag wel, wat mag niet, en wat moeten jullie regelen?', priority: 3 },

  // Docent - Kennis
  { dimension: 'docent', subdimension: 'kennis', minScore: 1.0, maxScore: 2.0, action: 'Plan een sessie (45 min) waarin iemand met AI-ervaring laat zien hoe generatieve AI werkt. Focus op de beperkingen, niet op de trucjes.', productId: 'webinar-basis', priority: 1 },
  { dimension: 'docent', subdimension: 'kennis', minScore: 2.1, maxScore: 3.0, action: 'Verdiep de kennis: laat docenten in groepjes AI-output analyseren en beoordelen. Wat klopt er? Wat niet? Hoe check je dat?', productId: 'webinar-basis', priority: 2 },

  // Docent - Pedagogiek
  { dimension: 'docent', subdimension: 'pedagogiek', minScore: 1.0, maxScore: 2.0, action: 'Daag drie docenten uit om een bestaande opdracht te herontwerpen zodat AI er een rol in speelt. Bespreek de resultaten in de vakgroep.', productId: 'workshop', priority: 2 },
  { dimension: 'docent', subdimension: 'pedagogiek', minScore: 2.1, maxScore: 3.0, action: 'Maak een schoolbrede inventarisatie: welke opdrachten en toetsen moeten worden aangepast nu AI beschikbaar is? Prioriteer en verdeel het werk.', productId: 'workshop', priority: 3 },

  // Docent - Agency
  { dimension: 'docent', subdimension: 'agency', minScore: 1.0, maxScore: 2.0, action: 'Wijs een AI-kartrekker aan met minimaal 2 uur per week tijd. Zonder iemand die het trekt, blijft het bij losse initiatieven.', priority: 1 },
  { dimension: 'docent', subdimension: 'agency', minScore: 2.1, maxScore: 3.0, action: 'Richt een AI-werkgroep op van 4-6 docenten die maandelijks bij elkaar komt. Geef hen een duidelijke opdracht en rapportagelijn naar het MT.', productId: 'webinar-gevorderd', priority: 2 },

  // Onderwijs aan leerlingen
  { dimension: 'onderwijs', minScore: 1.0, maxScore: 2.0, action: 'Kies één vak of project waarin leerlingen bewust met AI werken. Evalueer na afloop wat ze ervan leerden en wat beter kan.', productId: 'leerlingen-vo', priority: 2 },
  { dimension: 'onderwijs', minScore: 2.1, maxScore: 3.0, action: 'Breid de AI-lessen uit naar meerdere vakken en maak afspraken over een doorlopende leerlijn: wat leren leerlingen wanneer over AI?', productId: 'leerlingen-vo', priority: 3 },

  // Infrastructuur
  { dimension: 'infra', minScore: 1.0, maxScore: 2.0, action: 'Inventariseer welke AI-tools docenten nu al gebruiken en maak een overzicht van wat de school officieel ondersteunt. Regel verwerkersovereenkomsten voor de meest gebruikte tools.', priority: 1 },
  { dimension: 'infra', minScore: 2.1, maxScore: 3.0, action: 'Sluit verwerkersovereenkomsten af voor alle AI-tools die de school aanbiedt. Maak een helder overzicht: welke tool voor welk doel, en wat zijn de privacyregels?', priority: 2 },
]

// ─── Bestaande exports (backward compatible) ─────────────────────────────

export const dimensionDescriptions: Record<string, { high: string; low: string }> = {
  visie: {
    high: 'Jullie hebben een duidelijke visie en beleid rondom AI. Dit biedt een stevige basis voor verdere ontwikkeling.',
    low: 'Er is nog weinig vastgelegd over AI in het schoolbeleid. Een gedeelde visie helpt om richting te geven aan initiatieven.',
  },
  docent: {
    high: 'Het team heeft sterke AI-vaardigheden. Docenten experimenteren en delen kennis met elkaar.',
    low: 'De AI-vaardigheden van het team verdienen aandacht. Professionalisering kan het verschil maken.',
  },
  onderwijs: {
    high: 'Leerlingen krijgen structureel aandacht voor AI-geletterdheid. Dit bereidt hen goed voor op de toekomst.',
    low: 'AI-geletterdheid is nog geen vast onderdeel van het onderwijs aan leerlingen.',
  },
  infra: {
    high: 'De technische en organisatorische basis is goed geregeld. Privacy en tools zijn geborgd.',
    low: 'De infrastructuur rondom AI verdient aandacht. Denk aan licenties, privacy en verwerkersovereenkomsten.',
  },
}

export const firstStepRecommendations: Record<string, string> = {
  visie: 'Plan een teambijeenkomst van 2 uur waarin jullie samen een eerste AI-visie formuleren. Begin simpel: wat willen we wel, wat willen we niet, en wie gaat dit trekken?',
  docent: 'Begin met een kleine groep van 3-5 docenten die in 6 weken elk één AI-toepassing uitprobeert in hun les. Deel de ervaringen in een korte bijeenkomst.',
  mindset: 'Organiseer een laagdrempelige kennismaking. Laat docenten in tweetallen 15 minuten experimenteren met ChatGPT of Copilot voor hun eigen vak. Ervaring werkt beter dan overtuigen.',
  ethiek: 'Bespreek in een teamoverleg twee concrete casussen: een leerling die AI gebruikt voor een werkstuk, en een docent die AI gebruikt voor beoordelingen. Wat vinden jullie daar als team van?',
  kennis: 'Plan een korte sessie (45 min) waarin iemand met AI-ervaring laat zien hoe generatieve AI werkt. Focus op de beperkingen, niet op de trucjes.',
  pedagogiek: 'Daag drie docenten uit om een bestaande opdracht te herontwerpen zodat AI er een rol in speelt. Bespreek de resultaten in de vakgroep.',
  agency: 'Wijs een AI-kartrekker aan met minimaal 2 uur per week tijd. Zonder iemand die het trekt, blijft het bij losse initiatieven.',
  onderwijs: 'Kies één vak of project waarin leerlingen bewust met AI werken. Evalueer na afloop wat ze ervan leerden en wat beter kan.',
  infra: 'Inventariseer welke tools docenten nu al gebruiken (vaak meer dan je denkt) en maak een overzicht van wat de school officieel ondersteunt. Regel verwerkersovereenkomsten voor de meest gebruikte tools.',
}
