export const BINARY_VALUES: { binary: string; decimal: number }[] = [
  { binary: '1101', decimal: 13 },
  { binary: '0001', decimal: 1 },
  { binary: '1111', decimal: 15 },
  { binary: '0011', decimal: 3 },
]

export const NUMBER_TO_CHAR: Record<number, string> = {
  0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H',
  8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P',
  16: 'Q', 17: 'R', 18: 'S', 19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X',
  24: 'Y', 25: 'Z', 26: '0', 27: '1', 28: '2', 29: '3', 30: '4', 31: '5',
  32: '6', 33: '7', 34: '8', 35: '9',
}

export function solvePuzzle1(): string {
  const sorted = [...BINARY_VALUES].sort((a, b) => a.decimal - b.decimal)
  // sorted: 1, 3, 13, 15
  const code1 = sorted[0].decimal + sorted[1].decimal   // 1+3 = 4  → E
  const code2 = sorted[2].decimal + sorted[3].decimal   // 13+15 = 28 → 2
  const code3 = sorted.reduce((s, v) => s + v.decimal, 0) // 1+3+13+15 = 32 → 6
  const code4 = code3 / code1                           // 32/4 = 8  → I
  return [code1, code2, code3, code4]
    .map((n) => NUMBER_TO_CHAR[n] ?? '')
    .join('')
}

export const PUZZLE1_ANSWER = solvePuzzle1() // 'E26I'

export function caesarDecrypt(text: string, shift: number): string {
  return text
    .toUpperCase()
    .split('')
    .map((ch) => {
      if (ch >= 'A' && ch <= 'Z') {
        return String.fromCharCode(((ch.charCodeAt(0) - 65 - shift + 26) % 26) + 65)
      }
      return ch
    })
    .join('')
}

export const PUZZLE2_ENCRYPTED = 'KXQG'
export const PUZZLE2_SHIFT = 3
export const PUZZLE2_ANSWER = caesarDecrypt(PUZZLE2_ENCRYPTED, PUZZLE2_SHIFT) // 'HUND'

export function checkAnswer(input: string, answer: string): boolean {
  return input.trim().toUpperCase() === answer.toUpperCase()
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
