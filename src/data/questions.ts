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
  // Deel 2: Visie en Beleid
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
    text: 'Zijn er richtlijnen voor leerlingen over AI-gebruik?',
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
  // Deel 3: Docentvaardigheden - Mindset
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
    text: 'Zien docenten AI als iets dat bij hun vak hoort?',
    dimension: 'docent',
    subdimension: 'mindset',
    options: [
      { label: 'Nee, het wordt gezien als iets technisch of apart', score: 1 },
      { label: 'Sommigen zien het verband, de meesten niet', score: 2 },
      { label: 'Een groeiende groep ziet het als relevant voor hun vak', score: 3 },
      { label: 'De meerderheid ziet AI als onderdeel van hun professionele ontwikkeling', score: 4 },
    ],
  },
  // Ethiek
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
    text: 'Zijn docenten op de hoogte van de juridische kaders rond AI (AVG, AI Act)?',
    dimension: 'docent',
    subdimension: 'ethiek',
    options: [
      { label: 'Nee, niet specifiek voor AI', score: 1 },
      { label: 'Globaal, ze weten dat privacy een aandachtspunt is', score: 2 },
      { label: 'Redelijk, de basisregels zijn besproken', score: 3 },
      { label: 'Goed, er is voorlichting gegeven en het is onderdeel van het beleid', score: 4 },
    ],
  },
  // Kennis
  {
    id: 9,
    text: 'Begrijpen docenten op hoofdlijnen hoe generatieve AI werkt?',
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
    text: 'Kunnen docenten AI-output kritisch beoordelen op juistheid en bruikbaarheid?',
    dimension: 'docent',
    subdimension: 'kennis',
    options: [
      { label: 'Nee, de meesten nemen output klakkeloos over of vermijden AI', score: 1 },
      { label: 'Enkelen zijn kritisch, de meesten niet', score: 2 },
      { label: 'Een groeiende groep kan output beoordelen en bijsturen', score: 3 },
      { label: 'De meerderheid gebruikt AI kritisch en iteratief', score: 4 },
    ],
  },
  // Pedagogiek & Didactiek
  {
    id: 11,
    text: 'Zetten docenten AI bewust in als didactisch middel (niet alleen voor eigen voorbereiding)?',
    dimension: 'docent',
    subdimension: 'pedagogiek',
    options: [
      { label: 'Nee, of alleen voor eigen lesvoorbereiding', score: 1 },
      { label: 'Enkelen experimenteren met AI in de les', score: 2 },
      { label: 'Meerdere docenten zetten AI structureel in met leerlingen', score: 3 },
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
  // Agency
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
  // Deel 4: Onderwijs aan leerlingen
  {
    id: 15,
    text: 'Wordt AI-geletterdheid expliciet onderwezen aan leerlingen?',
    dimension: 'onderwijs',
    options: [
      { label: 'Nee', score: 1 },
      { label: 'Incidenteel, bij een enkel vak of project', score: 2 },
      { label: 'Structureel bij meerdere vakken', score: 3 },
      { label: 'Schoolbreed geïntegreerd met een doorlopende leerlijn', score: 4 },
    ],
  },
  {
    id: 16,
    text: 'Leren leerlingen hoe ze AI verantwoord en effectief kunnen inzetten?',
    dimension: 'onderwijs',
    options: [
      { label: 'Nee, of het wordt alleen verboden', score: 1 },
      { label: 'Sommige docenten besteden er aandacht aan', score: 2 },
      { label: 'Er zijn lessen of modules over AI-gebruik', score: 3 },
      { label: 'Er is een gestructureerd programma', score: 4 },
    ],
  },
  // Deel 5: Infrastructuur
  {
    id: 17,
    text: 'Welke AI-tools zijn beschikbaar en hoe zijn ze geregeld?',
    dimension: 'infra',
    options: [
      { label: 'Geen, of docenten gebruiken eigen gratis accounts', score: 1 },
      { label: 'De school heeft gratis tools geadviseerd maar niets geregeld', score: 2 },
      { label: 'De school heeft licenties voor één of meer AI-tools', score: 3 },
      { label: 'Er is een breed, beheerd aanbod met duidelijke keuzes per doel', score: 4 },
    ],
  },
  {
    id: 18,
    text: 'Zijn er afspraken over privacy en dataverwerking bij AI-tools?',
    dimension: 'infra',
    options: [
      { label: 'Nee', score: 1 },
      { label: 'Informeel ("gebruik geen leerlinggegevens")', score: 2 },
      { label: 'Er zijn richtlijnen maar geen verwerkersovereenkomsten', score: 3 },
      { label: 'Volledig geregeld met verwerkersovereenkomsten en AVG-beleid', score: 4 },
    ],
  },
]

export const dimensionLabels: Record<string, string> = {
  visie: 'Visie & Beleid',
  docent: 'Docentvaardigheden',
  onderwijs: 'Onderwijs aan leerlingen',
  infra: 'Infrastructuur',
}

export const subdimensionLabels: Record<string, string> = {
  mindset: 'Mindset',
  ethiek: 'Ethiek',
  kennis: 'Kennis',
  pedagogiek: 'Pedagogiek & Didactiek',
  agency: 'Agency',
}

export const sectionOrder = ['context', 'visie', 'docent', 'onderwijs', 'infra'] as const
export type SectionKey = typeof sectionOrder[number]

export const sectionMeta: Record<string, { title: string; subtitle: string; questionIds: number[] }> = {
  visie: {
    title: 'Visie en Beleid',
    subtitle: 'Hoe is AI verankerd in de schoolvisie en het beleid?',
    questionIds: [1, 2, 3, 4],
  },
  docent: {
    title: 'Docentvaardigheden',
    subtitle: 'Hoe staan jullie docenten ervoor op het gebied van AI-geletterdheid?',
    questionIds: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  },
  onderwijs: {
    title: 'Onderwijs aan leerlingen',
    subtitle: 'In hoeverre leren leerlingen over en met AI?',
    questionIds: [15, 16],
  },
  infra: {
    title: 'Infrastructuur',
    subtitle: 'Hoe is de technische en organisatorische basis geregeld?',
    questionIds: [17, 18],
  },
}
