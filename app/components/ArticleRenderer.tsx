'use client'

/**
 * ArticleRenderer – renders structured article content with support for:
 * - ## Headings (h2)
 * - **bold text**
 * - | Markdown tables |
 * - - Unordered lists
 * - 1. Ordered lists
 * - Regular paragraphs
 * - --- Horizontal rules
 */

function processInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const regex = /\*\*(.+?)\*\*/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(<strong key={match.index} className="text-white font-medium">{match[1]}</strong>)
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

function isTableBlock(lines: string[]): boolean {
  return lines.length >= 2 && lines[0].includes('|') && lines[1].includes('---')
}

function renderTable(lines: string[]): React.ReactNode {
  const parseRow = (line: string) =>
    line.split('|').map(c => c.trim()).filter(c => c.length > 0)

  const headers = parseRow(lines[0])
  const rows = lines.slice(2).filter(l => l.includes('|')).map(parseRow)

  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse font-body text-sm">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="text-left py-3 px-4 text-brand-gold border-b border-brand-border font-medium">
                {processInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-brand-card/30' : ''}>
              {row.map((cell, ci) => (
                <td key={ci} className="py-2.5 px-4 text-brand-text border-b border-brand-border/50">
                  {processInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ArticleRenderer({ contenu }: { contenu: string }) {
  const lines = contenu.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Empty line – skip
    if (line.trim() === '') {
      i++
      continue
    }

    // Horizontal rule
    if (line.trim() === '---') {
      elements.push(<hr key={i} className="border-brand-border my-8" />)
      i++
      continue
    }

    // H2 heading
    if (line.startsWith('## ')) {
      const text = line.slice(3)
      const id = text.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      elements.push(
        <h2 key={i} id={id} className="font-display text-xl md:text-2xl text-white mt-12 mb-4 font-light">
          {processInline(text)}
        </h2>
      )
      i++
      continue
    }

    // Table block
    if (line.includes('|') && i + 1 < lines.length && lines[i + 1].includes('---')) {
      const tableLines: string[] = []
      while (i < lines.length && (lines[i].includes('|') || lines[i].includes('---'))) {
        tableLines.push(lines[i])
        i++
      }
      if (isTableBlock(tableLines)) {
        elements.push(<div key={`table-${i}`}>{renderTable(tableLines)}</div>)
      }
      continue
    }

    // Unordered list
    if (line.match(/^- /)) {
      const items: string[] = []
      while (i < lines.length && lines[i].match(/^- /)) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2">
          {items.map((item, j) => (
            <li key={j} className="font-body text-brand-text text-[17px] leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-1.5 before:bg-brand-gold/60 before:rounded-full">
              {processInline(item)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Ordered list
    if (line.match(/^\d+\. /)) {
      const items: string[] = []
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ''))
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-4 space-y-2 list-decimal list-inside">
          {items.map((item, j) => (
            <li key={j} className="font-body text-brand-text text-[17px] leading-relaxed marker:text-brand-gold">
              {processInline(item)}
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="font-body text-brand-text text-[17px] leading-relaxed">
        {processInline(line)}
      </p>
    )
    i++
  }

  return <div className="space-y-4">{elements}</div>
}
