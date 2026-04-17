export interface Option {
  label: string
  score: number
}

export interface Question {
  id: number
  text: string
  options: Option[]
  dimension: string
  subdimension?: string
}

export interface ContextField {
  id: string
  label: string
  type: 'text' | 'select' | 'number' | 'multiselect' | 'radio'
  options?: string[]
  placeholder?: string
  required?: boolean
}

export const contextFields: ContextField[] = [
  { id: 'schoolnaam', label: 'Schoolnaam', type: 'text', placeholder: 'Naam van de school', required: true },
  { id: 'onderwijstype', label: 'Type onderwijs', type: 'select', options: ['PO', 'VO', 'MBO', 'HBO'], required: true },
  { id: 'aantalLeerlingen', label: 'Aantal leerlingen (bij benadering)', type: 'number', placeholder: 'bijv. 500' },
  { id: 'aantalDocenten', label: 'Aantal docenten (bij benadering)', type: 'number', placeholder: 'bijv. 40' },
  { id: 'aiTools', label: 'Welke AI-tools zijn beschikbaar?', type: 'multiselect', options: ['ChatGPT', 'Copilot', 'Gemini', 'Claude', 'Perplexity', 'Schoolspecifieke tool', 'Anders', 'Geen'] },
  { id: 'licenties', label: 'Zijn dit gratis of betaalde licenties?', type: 'select', options: ['Gratis', 'Betaald', 'Mix van gratis en betaald', 'Niet van toepassing'] },
  { id: 'aiKartrekker', label: 'Is er een AI-kartrekker of aanspreekpunt binnen de school?', type: 'radio', options: ['Ja', 'Nee'] },
  { id: 'invullerNaam', label: 'Naam en rol van de invuller', type: 'text', placeholder: 'bijv. Jan de Vries, ICT-coördinator' },
]

export const questions: Question[] = [
  // ── Visie en Beleid (4) ────────────────────────────────────────────────
  {
    id: 1,
    text: 'Heeft jullie school een vastgesteld standpunt over AI in het onderwijs?',
    dimension: 'visie',
    options: [
      { label: 'Nee, dit is nog niet besproken', score: 1 },
      { label: 'Er wordt over gepraat maar er is niets vastgelegd', score: 2 },
      { label: 'Er zijn informele afspraken of richtlijnen', score: 3 },
      { label: 'Er is een formeel beleidsdocument', score: 4 },
    ],
  },
  {
    id: 2,
    text: 'Zijn er richtlijnen voor leerlingen of studenten over AI-gebruik?',
    dimension: 'visie',
    options: [
      { label: 'Nee', score: 1 },
      { label: 'Mondeling, verschilt per docent', score: 2 },
      { label: 'Schoolbreed afgesproken maar niet vastgelegd', score: 3 },
      { label: 'Vastgelegd in schoolreglement of studiewijzer', score: 4 },
    ],
  },
  {
    id: 3,
    text: 'Wordt AI expliciet benoemd in het schoolplan of jaarplan?',
    dimension: 'visie',
    options: [
      { label: 'Nee', score: 1 },
      { label: 'Zijdelings, als onderdeel van ICT of innovatie', score: 2 },
      { label: 'Als apart thema of speerpunt', score: 3 },
      { label: 'Verweven door meerdere beleidsonderdelen', score: 4 },
    ],
  },
  {
    id: 4,
    text: 'Is de school op de hoogte van de EU AI Act verplichting rondom AI-geletterdheid?',
    dimension: 'visie',
    options: [
      { label: 'Nee, niet van gehoord', score: 1 },
      { label: 'Wel van gehoord maar nog niet mee bezig', score: 2 },
      { label: 'We zijn aan het inventariseren wat dit voor ons betekent', score: 3 },
      { label: 'We hebben concrete stappen gezet om hieraan te voldoen', score: 4 },
    ],
  },

  // ── AI-geletterdheid docenten (10) — raamwerk A-E ─────────────────────
  // A: Mensgerichte AI-mindset
  {
    id: 5,
    text: 'Hoe zou je de houding van het team tegenover AI omschrijven?',
    dimension: 'docent',
    subdimension: 'mindset',
    options: [
      { label: 'Overwegend terughoudend of ongeïnteresseerd', score: 1 },
      { label: 'Afwachtend, "ik wacht wel af"', score: 2 },
      { label: 'Nieuwsgierig, er zijn enthousiastelingen', score: 3 },
      { label: 'Breed enthousiasme, docenten experimenteren actief', score: 4 },
    ],
  },
  {
    id: 6,
    text: 'Kunnen docenten hun eigen rol scherp houden naast AI (wat doet AI, wat doe ik als docent)?',
    dimension: 'docent',
    subdimension: 'mindset',
    options: [
      { label: 'Nee, hier wordt niet over nagedacht', score: 1 },
      { label: 'Sommigen denken hier bewust over na', score: 2 },
      { label: 'Een groeiende groep kan dit onderscheid maken en onderbouwen', score: 3 },
      { label: 'De meerderheid maakt bewuste keuzes vanuit eigen professionele waarden', score: 4 },
    ],
  },
  // B: Ethiek en verantwoord gebruik
  {
    id: 7,
    text: 'Kunnen docenten een bewuste afweging maken over wanneer AI wel of niet passend is in hun onderwijs?',
    dimension: 'docent',
    subdimension: 'ethiek',
    options: [
      { label: 'Dit is nog niet aan de orde', score: 1 },
      { label: 'Enkelen denken hier bewust over na', score: 2 },
      { label: 'Er zijn gesprekken over geweest, docenten vormen zich een mening', score: 3 },
      { label: 'Docenten maken bewuste, beargumenteerde keuzes', score: 4 },
    ],
  },
  {
    id: 8,
    text: 'Zijn docenten op de hoogte van de juridische kaders rond AI (AVG, AI Act) en de privacy-afwegingen bij AI-tools?',
    dimension: 'docent',
    subdimension: 'ethiek',
    options: [
      { label: 'Nee, niet specifiek voor AI', score: 1 },
      { label: 'Globaal, ze weten dat privacy een aandachtspunt is', score: 2 },
      { label: 'Redelijk, de basisregels zijn besproken', score: 3 },
      { label: 'Goed, er is voorlichting gegeven en het is onderdeel van het beleid', score: 4 },
    ],
  },
  // C: AI-kennis en vaardigheden
  {
    id: 9,
    text: 'Begrijpen docenten op hoofdlijnen hoe generatieve AI werkt (trainingsdata, hallucinaties, beperkingen)?',
    dimension: 'docent',
    subdimension: 'kennis',
    options: [
      { label: 'Nee, de meesten weten niet wat er achter de schermen gebeurt', score: 1 },
      { label: 'Sommigen begrijpen het globaal', score: 2 },
      { label: 'Een behoorlijk deel begrijpt de basisprincipes', score: 3 },
      { label: 'De meerderheid begrijpt hoe het werkt en kent de beperkingen', score: 4 },
    ],
  },
  {
    id: 10,
    text: 'Kunnen docenten AI effectief aansturen (prompten) en de output kritisch beoordelen?',
    dimension: 'docent',
    subdimension: 'kennis',
    options: [
      { label: 'Nee, de meesten nemen output klakkeloos over of vermijden AI', score: 1 },
      { label: 'Enkelen zijn kritisch, de meesten niet', score: 2 },
      { label: 'Een groeiende groep kan output beoordelen en bijsturen', score: 3 },
      { label: 'De meerderheid gebruikt AI kritisch en iteratief', score: 4 },
    ],
  },
  // D: AI-pedagogiek en didactiek
  {
    id: 11,
    text: 'Zetten docenten AI bewust in als didactisch middel (niet alleen voor eigen voorbereiding)?',
    dimension: 'docent',
    subdimension: 'pedagogiek',
    options: [
      { label: 'Nee, of alleen voor eigen lesvoorbereiding', score: 1 },
      { label: 'Enkelen experimenteren met AI in de les', score: 2 },
      { label: 'Meerdere docenten zetten AI structureel in met leerlingen of studenten', score: 3 },
      { label: 'AI is geïntegreerd in het didactisch repertoire van veel docenten', score: 4 },
    ],
  },
  {
    id: 12,
    text: 'Zijn opdrachten en toetsing aangepast op het bestaan van AI?',
    dimension: 'docent',
    subdimension: 'pedagogiek',
    options: [
      { label: 'Nee, alles is hetzelfde gebleven', score: 1 },
      { label: 'Ad hoc, sommige docenten hebben aanpassingen gedaan', score: 2 },
      { label: 'Er is een schoolbrede discussie over geweest, er zijn aanpassingen', score: 3 },
      { label: 'Er is een bewust toetsbeleid dat rekening houdt met AI', score: 4 },
    ],
  },
  // E: Digital agency
  {
    id: 13,
    text: 'Delen docenten actief kennis en ervaring over AI met collega\'s?',
    dimension: 'docent',
    subdimension: 'agency',
    options: [
      { label: 'Nee, ieder doet zijn eigen ding', score: 1 },
      { label: 'Informeel, in de wandelgangen', score: 2 },
      { label: 'Via georganiseerde momenten (studiedag, vakgroep, PLG)', score: 3 },
      { label: 'Structureel, er is een actieve leergemeenschap rond AI', score: 4 },
    ],
  },
  {
    id: 14,
    text: 'Nemen docenten eigenaarschap over hun professionele ontwikkeling op het gebied van AI?',
    dimension: 'docent',
    subdimension: 'agency',
    options: [
      { label: 'Nee, ze wachten op aanbod van de school', score: 1 },
      { label: 'Enkelen zijn proactief, de meesten niet', score: 2 },
      { label: 'Een groeiende groep zoekt actief naar mogelijkheden', score: 3 },
      { label: 'De meerderheid ontwikkelt zichzelf en coacht anderen', score: 4 },
    ],
  },

  // ── AI-vaardigheid leerlingen/studenten (8) — KIES-raamwerk ───────────
  // K: Kiezen
  {
    id: 15,
    text: 'Leren leerlingen of studenten bewust te kiezen wanneer ze AI wel of niet inzetten bij een taak?',
    dimension: 'onderwijs',
    subdimension: 'kiezen',
    options: [
      { label: 'Nee, dit komt niet aan bod', score: 1 },
      { label: 'Incidenteel, bij een enkel vak of project', score: 2 },
      { label: 'Bij meerdere vakken wordt dit expliciet besproken', score: 3 },
      { label: 'Schoolbreed, leerlingen wegen per opdracht af hoe ze AI inzetten', score: 4 },
    ],
  },
  {
    id: 16,
    text: 'Wordt besproken welke rol AI in een opdracht kan spelen (zoals tutor, coach, schrijver of samenvatter)?',
    dimension: 'onderwijs',
    subdimension: 'kiezen',
    options: [
      { label: 'Nee', score: 1 },
      { label: 'Soms, afhankelijk van de docent', score: 2 },
      { label: 'Structureel bij meerdere vakken', score: 3 },
      { label: 'Schoolbreed, met gedeeld vocabulaire over AI-rollen', score: 4 },
    ],
  },
  // I: Instrueren
  {
    id: 17,
    text: 'Krijgen leerlingen of studenten expliciet instructie over het aansturen van AI (prompten, rol en context meegeven)?',
    dimension: 'onderwijs',
    subdimension: 'instrueren',
    options: [
      { label: 'Nee', score: 1 },
      { label: 'Sommige docenten besteden er aandacht aan', score: 2 },
      { label: 'Er zijn lessen of modules over effectief AI-gebruik', score: 3 },
      { label: 'Er is een doorlopende leerlijn waarin dit terugkomt', score: 4 },
    ],
  },
  {
    id: 18,
    text: 'Leren leerlingen of studenten dat de manier waarop ze AI aansturen invloed heeft op de kwaliteit van de output?',
    dimension: 'onderwijs',
    subdimension: 'instrueren',
    options: [
      { label: 'Nee, hier wordt niet bij stilgestaan', score: 1 },
      { label: 'Enkele docenten maken dit bespreekbaar', score: 2 },
      { label: 'Meerdere docenten oefenen dit in hun lessen', score: 3 },
      { label: 'Leerlingen oefenen dit structureel en iteratief', score: 4 },
    ],
  },
  // E: Evalueren
  {
    id: 19,
    text: 'Leren leerlingen of studenten AI-output kritisch te beoordelen op juistheid, bias en hallucinaties?',
    dimension: 'onderwijs',
    subdimension: 'evalueren',
    options: [
      { label: 'Nee', score: 1 },
      { label: 'Incidenteel, vooral bij een enkel vak', score: 2 },
      { label: 'Structureel bij meerdere vakken', score: 3 },
      { label: 'Het is onderdeel van het curriculum en wordt geoefend', score: 4 },
    ],
  },
  {
    id: 20,
    text: 'Oefenen leerlingen of studenten eigenaarschap over AI-output (begrijpen wat er staat, bijsturen, zelf verantwoorden)?',
    dimension: 'onderwijs',
    subdimension: 'evalueren',
    options: [
      { label: 'Nee, output wordt vaak klakkeloos overgenomen', score: 1 },
      { label: 'Enkelen doen dit bewust, de meesten niet', score: 2 },
      { label: 'Meerdere vakken stellen dit expliciet als eis', score: 3 },
      { label: 'Schoolbreed verwacht en geoefend in opdrachten en toetsing', score: 4 },
    ],
  },
  // S: Spelregels
  {
    id: 21,
    text: 'Zijn er voor leerlingen of studenten heldere afspraken over wanneer AI wel of niet gebruikt mag worden?',
    dimension: 'onderwijs',
    subdimension: 'spelregels',
    options: [
      { label: 'Nee', score: 1 },
      { label: 'Informeel, verschilt per docent', score: 2 },
      { label: 'Schoolbreed afgesproken per vak of opdrachttype', score: 3 },
      { label: 'Vastgelegd en herkenbaar voor leerlingen over alle vakken heen', score: 4 },
    ],
  },
  {
    id: 22,
    text: 'Wordt met leerlingen of studenten gesproken over bredere vragen rond AI (privacy, duurzaamheid, invloed op eigen denken)?',
    dimension: 'onderwijs',
    subdimension: 'spelregels',
    options: [
      { label: 'Nee', score: 1 },
      { label: 'Incidenteel, afhankelijk van een docent', score: 2 },
      { label: 'Bij meerdere vakken structureel aan de orde', score: 3 },
      { label: 'Verweven in het curriculum als reflectieve laag', score: 4 },
    ],
  },

  // ── Infrastructuur (3) ─────────────────────────────────────────────────
  {
    id: 23,
    text: 'Zijn er afspraken over privacy en dataverwerking bij AI-tools (AVG, verwerkersovereenkomsten)?',
    dimension: 'infra',
    options: [
      { label: 'Nee', score: 1 },
      { label: 'Informeel ("gebruik geen leerlinggegevens")', score: 2 },
      { label: 'Er zijn richtlijnen maar geen verwerkersovereenkomsten', score: 3 },
      { label: 'Volledig geregeld met verwerkersovereenkomsten en AVG-beleid', score: 4 },
    ],
  },
  {
    id: 24,
    text: 'Kunnen docenten en leerlingen ergens terecht met vragen of problemen rond AI-tools?',
    dimension: 'infra',
    options: [
      { label: 'Nee, iedereen zoekt het zelf uit', score: 1 },
      { label: 'Informeel, via een enthousiaste collega', score: 2 },
      { label: 'Er is een vast aanspreekpunt of helpdesk', score: 3 },
      { label: 'Er is actieve ondersteuning, inclusief begeleiding bij gebruik', score: 4 },
    ],
  },
  {
    id: 25,
    text: 'Is er structureel budget en tijd gereserveerd voor scholing en ontwikkeling op AI?',
    dimension: 'infra',
    options: [
      { label: 'Nee', score: 1 },
      { label: 'Incidenteel, op projectbasis', score: 2 },
      { label: 'Jaarlijks budget, maar beperkt', score: 3 },
      { label: 'Structureel budget én tijd voor docenten', score: 4 },
    ],
  },
]

export const dimensionLabels: Record<string, string> = {
  visie: 'Visie & Beleid',
  docent: 'AI-geletterdheid docenten',
  onderwijs: 'AI-vaardigheid leerlingen',
  infra: 'Infrastructuur',
}

// Dynamisch: "leerlingen" of "studenten" op basis van onderwijstype
export function getDimensionLabel(key: string, onderwijstype?: string): string {
  if (key === 'onderwijs') {
    const isStudent = onderwijstype === 'MBO' || onderwijstype === 'HBO'
    return isStudent ? 'AI-vaardigheid studenten' : 'AI-vaardigheid leerlingen'
  }
  return dimensionLabels[key] || key
}

export function getLerendenLabel(onderwijstype?: string): string {
  return (onderwijstype === 'MBO' || onderwijstype === 'HBO') ? 'studenten' : 'leerlingen'
}

export const subdimensionLabels: Record<string, string> = {
  // Docentvaardigheden (Raamwerk AI-geletterdheid A-E)
  mindset: 'Mensgerichte AI-mindset',
  ethiek: 'Ethiek en verantwoord gebruik',
  kennis: 'AI-kennis en vaardigheden',
  pedagogiek: 'AI-pedagogiek en didactiek',
  agency: 'Digital agency',
  // AI-vaardigheid leerlingen/studenten (KIES)
  kiezen: 'Kiezen',
  instrueren: 'Instrueren',
  evalueren: 'Evalueren',
  spelregels: 'Spelregels',
}

export const sectionOrder = ['context', 'visie', 'docent', 'onderwijs', 'infra'] as const
export type SectionKey = typeof sectionOrder[number]

export interface SectionMeta {
  title: string
  subtitle: string
  questionIds: number[]
  footnote?: string
}

export function getSectionMeta(section: string, onderwijstype?: string): SectionMeta {
  const lerenden = getLerendenLabel(onderwijstype)
  const dimLabel = getDimensionLabel(section, onderwijstype)

  const meta: Record<string, SectionMeta> = {
    visie: {
      title: 'Visie en Beleid',
      subtitle: 'Hoe is AI verankerd in de schoolvisie en het beleid?',
      questionIds: [1, 2, 3, 4],
    },
    docent: {
      title: dimLabel,
      subtitle: 'Hoe staat het team ervoor op de vijf domeinen van het Raamwerk AI-geletterdheid?',
      questionIds: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      footnote: 'Gebaseerd op het Raamwerk AI-geletterdheid voor docenten (aivoordocenten.nl).',
    },
    onderwijs: {
      title: dimLabel,
      subtitle: `In hoeverre leren ${lerenden} bewust en verantwoord met AI om te gaan?`,
      questionIds: [15, 16, 17, 18, 19, 20, 21, 22],
      footnote: `Gebaseerd op het raamwerk KIES voor AI-vaardigheid van ${lerenden} (aivoordocenten.nl).`,
    },
    infra: {
      title: 'Infrastructuur',
      subtitle: 'Hoe zijn privacy, ondersteuning en budget georganiseerd?',
      questionIds: [23, 24, 25],
    },
  }
  return meta[section]
}

// Backwards-compat export (gebruikt door oudere code; geen dynamiek nodig)
export const sectionMeta: Record<string, { title: string; subtitle: string; questionIds: number[] }> = {
  visie: getSectionMeta('visie'),
  docent: getSectionMeta('docent'),
  onderwijs: getSectionMeta('onderwijs'),
  infra: getSectionMeta('infra'),
}

export const TOTAL_QUESTIONS = questions.length
