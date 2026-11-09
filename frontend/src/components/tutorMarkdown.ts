const multiColumnSeparator = String.raw`\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+`

function tightenMarkers(line: string) {
  return line
    .replace(/\*\*\s+([^*\n]+?)\s+\*\*/g, '**$1**')
    .replace(/__\s+([^_\n]+?)\s+__/g, '__$1__')
    .replace(/(^|[^\w*])\*\s+([^*\n]+?)\s+\*(?!\*)/g, '$1*$2*')
}

function isDashRule(line: string) {
  const trimmed = line.trim()
  if (new RegExp(`^\\|?${multiColumnSeparator}\\|?$`).test(trimmed)) return true
  return /^[|\s:-]+$/.test(trimmed) && (trimmed.match(/-/g)?.length ?? 0) >= 3
}

function cellsFrom(line: string) {
  return line
    .trim()
    .replace(/^#{1,6}\s+/, '')
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

function containsTableMarkup(line: string) {
  return line.includes('|') && (isDashRule(line) || new RegExp(multiColumnSeparator).test(line) || /\|\s*-{3,}\s*\|/.test(line))
}

function liftInlineTable(line: string) {
  if (!containsTableMarkup(line)) return line
  const start = line.indexOf('|')
  const prose = line.slice(0, start).trimEnd()
  const rows = line
    .slice(start)
    .trim()
    .split(/\|(?=\s*\|)/)
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => {
      const withStart = row.startsWith('|') ? row : `| ${row}`
      return withStart.endsWith('|') ? withStart : `${withStart} |`
    })
  if (!rows.some((row) => isDashRule(row))) return line
  return [...(prose ? [prose, ''] : []), ...rows].join('\n')
}

function tableMarkdown(header: string[], rows: string[][]) {
  const width = Math.max(header.length, ...rows.map((row) => row.length))
  const toRow = (cells: string[]) => `| ${Array.from({ length: width }, (_, index) => cells[index] ?? '').join(' | ')} |`
  return [
    toRow(header),
    `| ${Array.from({ length: width }, () => '---').join(' | ')} |`,
    ...rows.map(toRow),
  ].join('\n')
}

function readTable(lines: string[], start: number) {
  const headerLine = lines[start]
  if (!headerLine.includes('|') || isDashRule(headerLine)) return null
  let cursor = start + 1
  while (cursor < lines.length && lines[cursor].trim() === '') cursor += 1
  if (cursor >= lines.length || !isDashRule(lines[cursor])) return null
  const header = cellsFrom(headerLine).filter((cell) => cell.length > 0)
  if (header.length < 2) return null
  cursor += 1
  while (cursor < lines.length && (lines[cursor].trim() === '' || isDashRule(lines[cursor]))) cursor += 1
  const rows: string[][] = []
  while (cursor < lines.length) {
    const rowLine = lines[cursor]
    if (rowLine.trim() === '' || isDashRule(rowLine) || !rowLine.includes('|')) break
    const cells = cellsFrom(rowLine).filter((cell) => cell.length > 0)
    if (cells.length < 2) break
    rows.push(cells)
    cursor += 1
  }
  if (rows.length === 0) return null
  return { markdown: tableMarkdown(header, rows), next: cursor }
}

export function normalizeTutorMarkdown(source: string) {
  let inCode = false
  const lifted = source.replace(/\r\n/g, '\n').split('\n').flatMap((line) => {
    if (line.trim().startsWith('```')) {
      inCode = !inCode
      return [line]
    }
    if (inCode) return [line]
    return liftInlineTable(tightenMarkers(line)).split('\n')
  })

  const output: string[] = []
  inCode = false
  for (let index = 0; index < lifted.length; index += 1) {
    const line = lifted[index]
    if (line.trim().startsWith('```')) {
      inCode = !inCode
      output.push(line)
      continue
    }
    if (!inCode) {
      const table = readTable(lifted, index)
      if (table) {
        output.push(table.markdown, '')
        index = table.next - 1
        continue
      }
    }
    output.push(line)
  }
  return output.join('\n')
}
