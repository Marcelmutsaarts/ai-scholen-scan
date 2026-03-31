import { useCallback, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import type { Scores } from '../utils/scoring'

interface PDFDownloadProps {
  scores: Scores
  context: Record<string, string | string[]>
  maturity: { label: string; description: string }
  findings: {
    strongest: { label: string; score: number; description: string }
    weakest: { label: string; score: number; description: string }
    recommendation: string
  }
}

export default function PDFDownload({ scores, context, maturity, findings }: PDFDownloadProps) {
  const [generating, setGenerating] = useState(false)

  const generatePDF = useCallback(async () => {
    setGenerating(true)
    try {
      const content = document.getElementById('results-content')
      if (!content) return

      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f8fafc',
        logging: false,
      })

      const imgWidth = 190
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      const pdf = new jsPDF('p', 'mm', 'a4')

      // Header with brand color
      pdf.setFillColor(161, 93, 245)
      pdf.rect(0, 0, 210, 25, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('AI Maturity Scan', 10, 12)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text('AI voor Docenten', 10, 19)

      // School name and date
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(12)
      const schoolName = (context.schoolnaam as string) || 'School'
      const dateStr = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
      pdf.text(`${schoolName} — ${dateStr}`, 10, 35)

      // Maturity level
      pdf.setFontSize(10)
      pdf.setTextColor(121, 71, 186)
      pdf.text(`Volwassenheidsniveau: ${maturity.label} (${scores.total.toFixed(1)}/4.0)`, 10, 43)
      pdf.text(`EU AI Act Readiness: ${scores.euReadiness}%`, 10, 49)

      // Scores
      pdf.setTextColor(74, 85, 104)
      pdf.setFontSize(9)
      const dims = [
        ['Visie & Beleid', scores.visie],
        ['Docentvaardigheden', scores.docent],
        ['Onderwijs aan leerlingen', scores.onderwijs],
        ['Infrastructuur', scores.infra],
      ] as const
      let y = 57
      for (const [label, score] of dims) {
        pdf.text(`${label}: ${score.toFixed(1)}/4.0`, 10, y)
        y += 5
      }

      // Charts image
      const imgData = canvas.toDataURL('image/png')
      const chartStartY = y + 3
      const availableHeight = 297 - chartStartY - 30
      const finalHeight = Math.min(imgHeight, availableHeight)
      const finalWidth = (finalHeight / imgHeight) * imgWidth

      pdf.addImage(imgData, 'PNG', 10, chartStartY, finalWidth, finalHeight)

      // If content overflows, add second page
      if (imgHeight > availableHeight) {
        pdf.addPage()
        const remainingOffset = availableHeight
        // Draw remaining content on page 2
        pdf.addImage(imgData, 'PNG', 10, 10 - remainingOffset, imgWidth, imgHeight)

        // Footer on page 2
        pdf.setFontSize(8)
        pdf.setTextColor(121, 71, 186)
        pdf.text('AI voor Docenten — aivoordocenten.nl — info@aivoordocenten.nl', 10, 287)
      }

      // Findings text at bottom
      const findingsY = Math.min(chartStartY + finalHeight + 8, 250)
      pdf.setFontSize(9)
      pdf.setTextColor(0, 0, 0)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Kernbevindingen', 10, findingsY)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(74, 85, 104)

      const splitText = (text: string, maxWidth: number) => pdf.splitTextToSize(text, maxWidth)

      let fY = findingsY + 6
      pdf.text(splitText(`Sterkste: ${findings.strongest.label} (${findings.strongest.score.toFixed(1)}) — ${findings.strongest.description}`, 180), 10, fY)
      fY += 10
      pdf.text(splitText(`Groeikans: ${findings.weakest.label} (${findings.weakest.score.toFixed(1)}) — ${findings.weakest.description}`, 180), 10, fY)
      fY += 10
      pdf.text(splitText(`Eerste stap: ${findings.recommendation}`, 180), 10, fY)

      // Footer
      pdf.setFontSize(8)
      pdf.setTextColor(121, 71, 186)
      pdf.text('AI voor Docenten — aivoordocenten.nl — info@aivoordocenten.nl', 10, 287)

      pdf.save(`AI-Maturity-Scan-${schoolName.replace(/\s+/g, '-')}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setGenerating(false)
    }
  }, [scores, context, maturity, findings])

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
