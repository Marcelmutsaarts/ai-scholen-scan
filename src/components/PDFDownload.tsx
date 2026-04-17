import { useCallback, useState } from 'react'
import jsPDF from 'jspdf'
import type { Scores, DimensionAnalysis, RecommendedProduct } from '../utils/scoring'
import { getDimensionLabel } from '../data/questions'

interface PDFDownloadProps {
  scores: Scores
  context: Record<string, string | string[]>
  maturity: { label: string; description: string }
  findings: {
    strongest: { label: string; score: number; description: string }
    weakest: { label: string; score: number; description: string }
    recommendation: string
  }
  analyses: DimensionAnalysis[]
  productRecommendations: RecommendedProduct[]
}

const tierBadgeColors: Record<string, [number, number, number]> = {
  startend: [239, 68, 68],
  verkennend: [217, 119, 6],
  opbouwend: [202, 138, 4],
  integrerend: [22, 163, 74],
  voorlopend: [16, 185, 129],
}

class PDFLayout {
  pdf: jsPDF
  y: number
  marginLeft = 15
  marginRight = 15
  pageWidth = 210
  pageHeight = 297
  contentWidth: number
  footerText: string

  constructor(pdf: jsPDF, footerText: string) {
    this.pdf = pdf
    this.y = 30
    this.contentWidth = this.pageWidth - this.marginLeft - this.marginRight
    this.footerText = footerText
  }

  checkPageBreak(neededHeight: number) {
    if (this.y + neededHeight > this.pageHeight - 20) {
      this.addFooter()
      this.pdf.addPage()
      this.y = 15
    }
  }

  addFooter() {
    this.pdf.setFontSize(7)
    this.pdf.setTextColor(121, 71, 186)
    this.pdf.text(this.footerText, this.marginLeft, this.pageHeight - 8)
    this.pdf.setTextColor(74, 85, 104)
  }

  addHeader(title: string) {
    this.pdf.setFillColor(161, 93, 245)
    this.pdf.rect(0, 0, this.pageWidth, 22, 'F')
    this.pdf.setTextColor(255, 255, 255)
    this.pdf.setFontSize(14)
    this.pdf.setFont('helvetica', 'bold')
    this.pdf.text(title, this.marginLeft, 10)
    this.pdf.setFontSize(9)
    this.pdf.setFont('helvetica', 'normal')
    this.pdf.text('AI voor Docenten — aivoordocenten.nl', this.marginLeft, 17)
    this.pdf.setTextColor(0, 0, 0)
    this.y = 30
  }

  addSectionTitle(title: string) {
    this.checkPageBreak(12)
    this.pdf.setFontSize(12)
    this.pdf.setFont('helvetica', 'bold')
    this.pdf.setTextColor(95, 55, 146)
    this.pdf.text(title, this.marginLeft, this.y)
    this.y += 7
    this.pdf.setTextColor(74, 85, 104)
    this.pdf.setFont('helvetica', 'normal')
  }

  addSubTitle(title: string, score?: string) {
    this.checkPageBreak(8)
    this.pdf.setFontSize(9)
    this.pdf.setFont('helvetica', 'bold')
    this.pdf.setTextColor(0, 0, 0)
    this.pdf.text(title, this.marginLeft, this.y)
    if (score) {
      this.pdf.setFont('helvetica', 'normal')
      this.pdf.setTextColor(121, 71, 186)
      const titleWidth = this.pdf.getTextWidth(title)
      this.pdf.text(`  ${score}`, this.marginLeft + titleWidth, this.y)
    }
    this.y += 5
    this.pdf.setTextColor(74, 85, 104)
    this.pdf.setFont('helvetica', 'normal')
  }

  addParagraph(text: string, indent = 0) {
    this.pdf.setFontSize(8)
    this.pdf.setFont('helvetica', 'normal')
    this.pdf.setTextColor(74, 85, 104)
    const lines = this.pdf.splitTextToSize(text, this.contentWidth - indent)
    for (const line of lines) {
      this.checkPageBreak(4)
      this.pdf.text(line, this.marginLeft + indent, this.y)
      this.y += 3.5
    }
    this.y += 2
  }

  addCaption(text: string, indent = 0) {
    this.checkPageBreak(4)
    this.pdf.setFontSize(7)
    this.pdf.setFont('helvetica', 'italic')
    this.pdf.setTextColor(150, 150, 150)
    this.pdf.text(text, this.marginLeft + indent, this.y)
    this.y += 4
    this.pdf.setFont('helvetica', 'normal')
    this.pdf.setTextColor(74, 85, 104)
  }

  addScoreBar(label: string, score: number) {
    this.checkPageBreak(8)
    this.pdf.setFontSize(8)
    this.pdf.setTextColor(74, 85, 104)
    this.pdf.text(label, this.marginLeft, this.y)
    this.pdf.text(`${score.toFixed(1)}/4.0`, this.marginLeft + this.contentWidth - 15, this.y)

    const barX = this.marginLeft + 90
    const barWidth = this.contentWidth - 110
    this.y += 1.5
    this.pdf.setFillColor(235, 223, 255)
    this.pdf.roundedRect(barX, this.y - 2, barWidth, 3, 1.5, 1.5, 'F')

    this.pdf.setFillColor(161, 93, 245)
    const fillWidth = (score / 4) * barWidth
    if (fillWidth > 0) {
      this.pdf.roundedRect(barX, this.y - 2, fillWidth, 3, 1.5, 1.5, 'F')
    }

    this.y += 4
  }

  addAnalysisCard(label: string, score: number, tier: string, tierLabel: string, narrative: string, compact = false) {
    const indent = compact ? 5 : 0
    const fontSize = compact ? 8 : 9
    const pad = compact ? 3 : 4
    const textLines = this.pdf.splitTextToSize(narrative, this.contentWidth - indent - 2 * pad)
    const height = pad * 2 + 6 + textLines.length * 3.5
    this.checkPageBreak(height + 2)

    // background tint by tier
    const bg: Record<string, [number, number, number]> = {
      startend: [254, 242, 242],
      verkennend: [255, 251, 235],
      opbouwend: [254, 252, 232],
      integrerend: [240, 253, 244],
      voorlopend: [236, 253, 245],
    }
    const [r, g, b] = bg[tier] || [249, 250, 251]
    this.pdf.setFillColor(r, g, b)
    this.pdf.roundedRect(this.marginLeft + indent, this.y, this.contentWidth - indent, height, 2, 2, 'F')

    // left accent
    const [br, bg2, bb] = tierBadgeColors[tier] || [161, 93, 245]
    this.pdf.setFillColor(br, bg2, bb)
    this.pdf.rect(this.marginLeft + indent, this.y, 1.2, height, 'F')

    // label + tier + score on one row
    this.pdf.setFontSize(fontSize)
    this.pdf.setFont('helvetica', 'bold')
    this.pdf.setTextColor(0, 0, 0)
    this.pdf.text(label, this.marginLeft + indent + pad, this.y + pad + 2)

    const rightText = `${tierLabel} · ${score.toFixed(1)}/4.0`
    this.pdf.setFont('helvetica', 'normal')
    this.pdf.setTextColor(br, bg2, bb)
    const rightW = this.pdf.getTextWidth(rightText)
    this.pdf.text(rightText, this.marginLeft + this.contentWidth - rightW - pad, this.y + pad + 2)

    // narrative text
    this.pdf.setFont('helvetica', 'normal')
    this.pdf.setFontSize(compact ? 7.5 : 8)
    this.pdf.setTextColor(74, 85, 104)
    let ty = this.y + pad + 7
    for (const line of textLines) {
      this.pdf.text(line, this.marginLeft + indent + pad, ty)
      ty += 3.5
    }

    this.y += height + 2
  }

  addKeyFindingBlock(color: [number, number, number], title: string, body: string) {
    const pad = 4
    const titleFontSize = 9
    const bodyFontSize = 8
    this.pdf.setFontSize(bodyFontSize)
    const bodyLines = this.pdf.splitTextToSize(body, this.contentWidth - 2 * pad)
    const height = pad * 2 + 5 + bodyLines.length * 3.5
    this.checkPageBreak(height + 2)

    const [r, g, b] = color
    // light bg
    this.pdf.setFillColor(Math.min(255, r + 200), Math.min(255, g + 200), Math.min(255, b + 200))
    this.pdf.roundedRect(this.marginLeft, this.y, this.contentWidth, height, 2, 2, 'F')

    this.pdf.setFontSize(titleFontSize)
    this.pdf.setFont('helvetica', 'bold')
    this.pdf.setTextColor(r, g, b)
    this.pdf.text(title, this.marginLeft + pad, this.y + pad + 2)

    this.pdf.setFont('helvetica', 'normal')
    this.pdf.setFontSize(bodyFontSize)
    this.pdf.setTextColor(74, 85, 104)
    let ty = this.y + pad + 6
    for (const line of bodyLines) {
      this.pdf.text(line, this.marginLeft + pad, ty)
      ty += 3.5
    }

    this.y += height + 3
  }
}

export default function PDFDownload(props: PDFDownloadProps) {
  const { scores, context, maturity, findings, analyses, productRecommendations } = props
  const [generating, setGenerating] = useState(false)

  const generatePDF = useCallback(async () => {
    setGenerating(true)
    try {
      const pdf = new jsPDF('p', 'mm', 'a4')
      const schoolName = (context.schoolnaam as string) || 'School'
      const dateStr = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
      const footer = 'AI voor Docenten — aivoordocenten.nl — info@aivoordocenten.nl'
      const layout = new PDFLayout(pdf, footer)
      const onderwijstype = context.onderwijstype as string | undefined

      // ── Header ─────────────────────────────────────────────
      layout.addHeader('AI Maturity Scan — Analyserapport')

      // School info
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(0, 0, 0)
      pdf.text(schoolName, layout.marginLeft, layout.y)
      layout.y += 5
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(74, 85, 104)
      const invuller = context.invullerNaam as string || ''
      pdf.text(`${onderwijstype ? onderwijstype + ' | ' : ''}${dateStr}${invuller ? ' | ' + invuller : ''}`, layout.marginLeft, layout.y)
      layout.y += 8

      // ── Volwassenheidsniveau ──────────────────────────────
      pdf.setFillColor(245, 237, 255)
      const maturityHeight = 24
      pdf.roundedRect(layout.marginLeft, layout.y, layout.contentWidth, maturityHeight, 3, 3, 'F')
      pdf.setFontSize(7)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(161, 93, 245)
      pdf.text('VOLWASSENHEIDSNIVEAU', layout.marginLeft + 4, layout.y + 5)
      pdf.setFontSize(13)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(95, 55, 146)
      pdf.text(maturity.label, layout.marginLeft + 4, layout.y + 11)
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(121, 71, 186)
      const scoreText = `${scores.total.toFixed(1)} / 4.0`
      pdf.text(scoreText, layout.marginLeft + 4, layout.y + 16)

      pdf.setFontSize(8)
      pdf.setTextColor(74, 85, 104)
      const matDescLines = pdf.splitTextToSize(maturity.description, layout.contentWidth - 8)
      let mdY = layout.y + 21
      for (const line of matDescLines.slice(0, 1)) {
        pdf.text(line, layout.marginLeft + 4, mdY)
        mdY += 3.5
      }
      // If description is longer, continue below the box
      layout.y += maturityHeight + 2
      if (matDescLines.length > 1) {
        pdf.setTextColor(74, 85, 104)
        for (const line of matDescLines.slice(1)) {
          layout.checkPageBreak(4)
          pdf.text(line, layout.marginLeft + 4, layout.y)
          layout.y += 3.5
        }
        layout.y += 2
      }

      // ── EU AI Act Readiness ───────────────────────────────
      layout.checkPageBreak(22)
      pdf.setDrawColor(229, 231, 235)
      pdf.setFillColor(255, 255, 255)
      pdf.roundedRect(layout.marginLeft, layout.y, layout.contentWidth, 22, 3, 3, 'FD')

      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(0, 0, 0)
      pdf.text('EU AI Act Readiness', layout.marginLeft + 4, layout.y + 6)
      pdf.setFontSize(14)
      pdf.setTextColor(95, 55, 146)
      const pctText = `${scores.euReadiness}%`
      const pctWidth = pdf.getTextWidth(pctText)
      pdf.text(pctText, layout.marginLeft + layout.contentWidth - pctWidth - 4, layout.y + 8)

      pdf.setFontSize(7.5)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(74, 85, 104)
      const euText = `De EU AI Act (Artikel 4) verplicht sinds februari 2025 dat organisaties zorgen voor AI-geletterdheid bij medewerkers. Op basis van jullie scores schatten wij de huidige readiness op ${scores.euReadiness}%.`
      const euLines = pdf.splitTextToSize(euText, layout.contentWidth - 8)
      let euY = layout.y + 11
      for (const line of euLines) {
        pdf.text(line, layout.marginLeft + 4, euY)
        euY += 3.5
      }
      layout.y += 22 + 4

      // ── Scores per dimensie ───────────────────────────────
      layout.addSectionTitle('Scores per dimensie')
      layout.addScoreBar(getDimensionLabel('visie', onderwijstype), scores.visie)
      layout.addScoreBar(getDimensionLabel('docent', onderwijstype), scores.docent)
      layout.addScoreBar(getDimensionLabel('onderwijs', onderwijstype), scores.onderwijs)
      layout.addScoreBar(getDimensionLabel('infra', onderwijstype), scores.infra)
      layout.y += 3

      // Docent subdimensies
      layout.addSubTitle('AI-geletterdheid docenten — vijf domeinen')
      layout.addScoreBar('  A: Mensgerichte AI-mindset', scores.subdimensions.mindset)
      layout.addScoreBar('  B: Ethiek en verantwoord gebruik', scores.subdimensions.ethiek)
      layout.addScoreBar('  C: AI-kennis en vaardigheden', scores.subdimensions.kennis)
      layout.addScoreBar('  D: AI-pedagogiek en didactiek', scores.subdimensions.pedagogiek)
      layout.addScoreBar('  E: Digital agency', scores.subdimensions.agency)
      layout.addCaption('Raamwerk AI-geletterdheid voor docenten (aivoordocenten.nl)')
      layout.y += 2

      // KIES subdimensies
      layout.addSubTitle(`${getDimensionLabel('onderwijs', onderwijstype)} — KIES`)
      layout.addScoreBar('  K: Kiezen', scores.kiesSubdimensions.kiezen)
      layout.addScoreBar('  I: Instrueren', scores.kiesSubdimensions.instrueren)
      layout.addScoreBar('  E: Evalueren', scores.kiesSubdimensions.evalueren)
      layout.addScoreBar('  S: Spelregels', scores.kiesSubdimensions.spelregels)
      layout.addCaption('Raamwerk KIES (aivoordocenten.nl)')
      layout.y += 4

      // ── Analyse per dimensie ──────────────────────────────
      layout.addSectionTitle('Analyse per dimensie')

      const mainAnalyses = analyses.filter(a => !a.isSubdimension)
      const footnoteByDim: Record<string, string> = {
        docent: 'Onderverdeling op basis van het Raamwerk AI-geletterdheid voor docenten (aivoordocenten.nl).',
        onderwijs: 'Onderverdeling op basis van het raamwerk KIES (aivoordocenten.nl).',
      }
      for (const dim of mainAnalyses) {
        layout.addAnalysisCard(dim.label, dim.score, dim.tier, dim.tierLabel, dim.narrative)
        const subs = analyses.filter(a => a.isSubdimension && a.parentDimension === dim.key)
        for (const sub of subs) {
          layout.addAnalysisCard(sub.label, sub.score, sub.tier, sub.tierLabel, sub.narrative, true)
        }
        const footnote = footnoteByDim[dim.key]
        if (footnote) {
          layout.addCaption(footnote, 5)
        }
      }

      // ── Kernbevindingen ───────────────────────────────────
      layout.y += 2
      layout.addSectionTitle('Kernbevindingen')
      layout.addKeyFindingBlock(
        [22, 101, 52],
        `Sterkste dimensie: ${findings.strongest.label} (${findings.strongest.score.toFixed(1)})`,
        findings.strongest.description,
      )
      layout.addKeyFindingBlock(
        [146, 64, 14],
        `Grootste groeikans: ${findings.weakest.label} (${findings.weakest.score.toFixed(1)})`,
        findings.weakest.description,
      )
      layout.addKeyFindingBlock(
        [95, 55, 146],
        'Aanbevolen eerste stap',
        findings.recommendation,
      )

      // ── Hoe verder? ───────────────────────────────────────
      if (productRecommendations.length > 0) {
        layout.y += 2
        layout.addSectionTitle('Hoe verder?')
        layout.addParagraph('Op basis van jullie profiel zien wij de volgende mogelijkheden om de AI-geletterdheid te versterken.')

        for (const rec of productRecommendations) {
          const firstDot = rec.reason.indexOf('. ')
          const diagnose = firstDot > 0 ? rec.reason.substring(0, firstDot + 1) : rec.reason
          const recept = firstDot > 0 ? rec.reason.substring(firstDot + 2) : ''

          // Bold diagnose + normal recept in one paragraph
          pdf.setFontSize(8)
          pdf.setFont('helvetica', 'bold')
          pdf.setTextColor(55, 65, 81)
          const diagLines = pdf.splitTextToSize(diagnose, layout.contentWidth)
          for (const line of diagLines) {
            layout.checkPageBreak(4)
            pdf.text(line, layout.marginLeft, layout.y)
            layout.y += 3.5
          }

          if (recept) {
            pdf.setFont('helvetica', 'normal')
            pdf.setTextColor(74, 85, 104)
            const recLines = pdf.splitTextToSize(recept, layout.contentWidth)
            for (const line of recLines) {
              layout.checkPageBreak(4)
              pdf.text(line, layout.marginLeft, layout.y)
              layout.y += 3.5
            }
          }

          pdf.setFontSize(7)
          pdf.setTextColor(156, 163, 175)
          layout.checkPageBreak(4)
          pdf.text(`AI voor Docenten — ${rec.name}`, layout.marginLeft, layout.y)
          layout.y += 6
          pdf.setTextColor(74, 85, 104)
        }
      }

      // ── Afsluiting ────────────────────────────────────────
      layout.y += 3
      layout.checkPageBreak(30)
      pdf.setFillColor(245, 237, 255)
      pdf.roundedRect(layout.marginLeft, layout.y, layout.contentWidth, 26, 3, 3, 'F')
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(95, 55, 146)
      pdf.text('Laten we even samen kijken?', layout.marginLeft + 4, layout.y + 6)
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(74, 85, 104)
      const ctaText = 'Stuur dit rapport naar info@aivoordocenten.nl en we plannen vrijblijvend een half uur in om samen naar de uitkomsten te kijken. Geen verplichtingen, geen verkooppraatje — we denken mee en waar het past vertellen we wat we kunnen betekenen.'
      const ctaLines = pdf.splitTextToSize(ctaText, layout.contentWidth - 8)
      let ctaY = layout.y + 11
      for (const line of ctaLines) {
        pdf.text(line, layout.marginLeft + 4, ctaY)
        ctaY += 3.5
      }

      layout.addFooter()

      pdf.save(`AI-Maturity-Scan-${schoolName.replace(/\s+/g, '-')}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setGenerating(false)
    }
  }, [scores, context, maturity, findings, analyses, productRecommendations])

  return (
    <div className="text-center">
      <button
        onClick={generatePDF}
        disabled={generating}
        className="gradient-btn text-white font-medium px-8 py-3 rounded-lg transition-all hover:shadow-lg cursor-pointer disabled:opacity-50"
      >
        {generating ? 'PDF wordt gegenereerd...' : 'Download als PDF'}
      </button>
    </div>
  )
}
