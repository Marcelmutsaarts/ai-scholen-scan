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
