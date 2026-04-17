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

    const barX = this.marginLeft + 75
    const barWidth = this.contentWidth - 95
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

      // ── Pagina 1: Header & overzicht ──────────────────────
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

      // Maturity level
      pdf.setFillColor(245, 237, 255)
      pdf.roundedRect(layout.marginLeft, layout.y - 2, layout.contentWidth, 16, 3, 3, 'F')
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(95, 55, 146)
      pdf.text(`Volwassenheidsniveau: ${maturity.label}`, layout.marginLeft + 4, layout.y + 4)
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`${scores.total.toFixed(1)}/4.0 — EU AI Act Readiness: ${scores.euReadiness}%`, layout.marginLeft + 4, layout.y + 10)
      layout.y += 20

      // Score bars - hoofddimensies
      layout.addSectionTitle('Scores per dimensie')
      layout.addScoreBar(getDimensionLabel('visie', onderwijstype), scores.visie)
      layout.addScoreBar(getDimensionLabel('docent', onderwijstype), scores.docent)
      layout.addScoreBar(getDimensionLabel('onderwijs', onderwijstype), scores.onderwijs)
      layout.addScoreBar(getDimensionLabel('infra', onderwijstype), scores.infra)
      layout.y += 2

      // Docent subdimensies (Raamwerk A-E)
      layout.addSubTitle('AI-geletterdheid docenten — vijf domeinen')
      layout.addScoreBar('  A: Mensgerichte AI-mindset', scores.subdimensions.mindset)
      layout.addScoreBar('  B: Ethiek en verantwoord gebruik', scores.subdimensions.ethiek)
      layout.addScoreBar('  C: AI-kennis en vaardigheden', scores.subdimensions.kennis)
      layout.addScoreBar('  D: AI-pedagogiek en didactiek', scores.subdimensions.pedagogiek)
      layout.addScoreBar('  E: Digital agency', scores.subdimensions.agency)
      layout.addCaption('Raamwerk AI-geletterdheid voor docenten (aivoordocenten.nl)')
      layout.y += 2

      // Onderwijs subdimensies (KIES)
      layout.addSubTitle(`${getDimensionLabel('onderwijs', onderwijstype)} — KIES`)
      layout.addScoreBar('  K: Kiezen', scores.kiesSubdimensions.kiezen)
      layout.addScoreBar('  I: Instrueren', scores.kiesSubdimensions.instrueren)
      layout.addScoreBar('  E: Evalueren', scores.kiesSubdimensions.evalueren)
      layout.addScoreBar('  S: Spelregels', scores.kiesSubdimensions.spelregels)
      layout.addCaption('Raamwerk KIES (aivoordocenten.nl)')
      layout.y += 3

      // Key findings summary
      layout.addSectionTitle('Kernbevindingen')
      layout.addParagraph(`Sterkste dimensie: ${findings.strongest.label} (${findings.strongest.score.toFixed(1)}) — ${findings.strongest.description}`)
      layout.addParagraph(`Grootste groeikans: ${findings.weakest.label} (${findings.weakest.score.toFixed(1)}) — ${findings.weakest.description}`)
      layout.y += 2

      // ── Dimensie-analyse ──────────────────────────────────
      layout.addSectionTitle('Analyse per dimensie')

      for (const analysis of analyses) {
        const prefix = analysis.isSubdimension ? '  ' : ''
        const scoreStr = `(${analysis.score.toFixed(1)} — ${analysis.tierLabel})`
        layout.addSubTitle(`${prefix}${analysis.label}`, scoreStr)
        layout.addParagraph(analysis.narrative, analysis.isSubdimension ? 3 : 0)
      }

      // ── Hoe verder ───────────────────────────────────────
      if (productRecommendations.length > 0) {
        layout.addSectionTitle('Hoe verder?')
        for (const rec of productRecommendations) {
          layout.addParagraph(rec.reason)
          pdf.setFontSize(7)
          pdf.setTextColor(180, 180, 180)
          layout.checkPageBreak(4)
          pdf.text(`AI voor Docenten — ${rec.name}`, layout.marginLeft, layout.y)
          layout.y += 4
          pdf.setTextColor(74, 85, 104)
        }
      }

      // ── Afsluiting ────────────────────────────────────────
      layout.y += 3
      layout.checkPageBreak(28)
      pdf.setFillColor(245, 237, 255)
      pdf.roundedRect(layout.marginLeft, layout.y, layout.contentWidth, 22, 3, 3, 'F')
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(95, 55, 146)
      pdf.text('Laten we even samen kijken?', layout.marginLeft + 4, layout.y + 6)
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(74, 85, 104)
      const ctaText = 'Stuur dit rapport naar info@aivoordocenten.nl en we plannen vrijblijvend een half uur in om samen naar de uitkomsten te kijken.'
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
