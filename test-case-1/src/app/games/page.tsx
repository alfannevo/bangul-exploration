'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────

const COLS = 10
const ROWS = 20
const CELL = 28 // px per cell

// Using Bangul palette for piece colors
const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]],                        color: '#0074db' }, // info blue
  O: { shape: [[1, 1], [1, 1]],                       color: '#b65c00' }, // warning
  T: { shape: [[0, 1, 0], [1, 1, 1]],                color: '#535353' }, // neutral-700
  S: { shape: [[0, 1, 1], [1, 1, 0]],                color: '#1baa56' }, // brand-hover
  Z: { shape: [[1, 1, 0], [0, 1, 1]],                color: '#da3438' }, // error
  J: { shape: [[1, 0, 0], [1, 1, 1]],                color: '#008742' }, // brand-primary
  L: { shape: [[0, 0, 1], [1, 1, 1]],                color: '#6ecf91' }, // brand-light
} as const

const SCORE_TABLE = [0, 100, 300, 500, 800]
const DROP_SPEEDS = [800, 700, 600, 500, 400, 300, 250, 200, 150, 100] // ms per level

// ─── Types ────────────────────────────────────────────────────────────────────

type PieceKey = keyof typeof TETROMINOES
type Shape = ReadonlyArray<ReadonlyArray<number>>
type Board = (string | null)[][]
type GameStatus = 'idle' | 'playing' | 'paused' | 'over'

interface Piece {
  shape: number[][]
  color: string
  type: PieceKey
  x: number
  y: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function createBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null))
}

function randomPiece(): Piece {
  const keys = Object.keys(TETROMINOES) as PieceKey[]
  const key = keys[Math.floor(Math.random() * keys.length)]
  const tet = TETROMINOES[key]
  return {
    type: key,
    color: tet.color,
    shape: (tet.shape as ReadonlyArray<ReadonlyArray<number>>).map(r => [...r]),
    x: Math.floor((COLS - tet.shape[0].length) / 2),
    y: 0,
  }
}

function rotateCW(shape: number[][]): number[][] {
  return shape[0].map((_, i) => shape.map(row => row[i]).reverse())
}

function isValid(board: Board, shape: number[][], x: number, y: number): boolean {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue
      const nr = y + r, nc = x + c
      if (nc < 0 || nc >= COLS || nr >= ROWS) return false
      if (nr >= 0 && board[nr][nc]) return false
    }
  }
  return true
}

function stampPiece(board: Board, piece: Piece): Board {
  const next = board.map(row => [...row])
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (piece.shape[r][c] && piece.y + r >= 0) {
        next[piece.y + r][piece.x + c] = piece.color
      }
    }
  }
  return next
}

function sweepLines(board: Board): { board: Board; count: number } {
  const kept = board.filter(row => row.some(cell => cell === null))
  const count = ROWS - kept.length
  const empty = Array.from({ length: count }, () => Array(COLS).fill(null))
  return { board: [...empty, ...kept], count }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GamesPage() {
  const [board, setBoard] = useState<Board>(createBoard)
  const [current, setCurrent] = useState<Piece>(randomPiece)
  const [next, setNext] = useState<Piece>(randomPiece)
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [level, setLevel] = useState(0)
  const [status, setStatus] = useState<GameStatus>('idle')

  // Stable ref always mirrors latest state — lets stable callbacks read fresh values
  const snap = useRef({ board, current, next, score, lines, level, status })
  useEffect(() => { snap.current = { board, current, next, score, lines, level, status } })

  // ── Lock piece + advance state ──────────────────────────────────────────────
  const lock = useCallback((
    piece: Piece, brd: Board, nxt: Piece,
    sc: number, ln: number, lv: number,
  ) => {
    const stamped = stampPiece(brd, piece)
    const { board: cleared, count } = sweepLines(stamped)
    const newLines = ln + count
    const newLevel = Math.floor(newLines / 10)
    const newScore = sc + SCORE_TABLE[count] * (newLevel + 1)
    const newNext = randomPiece()

    if (!isValid(cleared, nxt.shape, nxt.x, nxt.y)) {
      setBoard(cleared)
      setStatus('over')
      return
    }
    setBoard(cleared)
    setCurrent(nxt)
    setNext(newNext)
    setScore(newScore)
    setLines(newLines)
    setLevel(newLevel)
  }, [])

  // ── Gravity tick ────────────────────────────────────────────────────────────
  const step = useCallback(() => {
    const { status, current, board, next, score, lines, level } = snap.current
    if (status !== 'playing') return
    if (isValid(board, current.shape, current.x, current.y + 1)) {
      setCurrent(p => ({ ...p, y: p.y + 1 }))
    } else {
      lock(current, board, next, score, lines, level)
    }
  }, [lock])

  // ── Game loop ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (status !== 'playing') return
    const speed = DROP_SPEEDS[Math.min(level, DROP_SPEEDS.length - 1)]
    const id = setInterval(step, speed)
    return () => clearInterval(id)
  }, [status, level, step])

  // ── Keyboard controls ───────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { status, current, board, next, score, lines, level } = snap.current

      if (status === 'paused') {
        if (e.key === 'p' || e.key === 'P') setStatus('playing')
        return
      }
      if (status !== 'playing') return

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          if (isValid(board, current.shape, current.x - 1, current.y))
            setCurrent(p => ({ ...p, x: p.x - 1 }))
          break

        case 'ArrowRight':
          e.preventDefault()
          if (isValid(board, current.shape, current.x + 1, current.y))
            setCurrent(p => ({ ...p, x: p.x + 1 }))
          break

        case 'ArrowDown':
          e.preventDefault()
          step()
          break

        case 'ArrowUp':
        case 'x':
        case 'X': {
          e.preventDefault()
          const rotated = rotateCW(current.shape)
          // Wall-kick: try center ±1 ±2
          for (const dx of [0, -1, 1, -2, 2]) {
            if (isValid(board, rotated, current.x + dx, current.y)) {
              setCurrent(p => ({ ...p, shape: rotated, x: p.x + dx }))
              break
            }
          }
          break
        }

        case ' ': {
          e.preventDefault()
          let ny = current.y
          while (isValid(board, current.shape, current.x, ny + 1)) ny++
          const dropped = { ...current, y: ny }
          lock(dropped, board, next, score, lines, level)
          break
        }

        case 'p':
        case 'P':
          e.preventDefault()
          setStatus(s => s === 'playing' ? 'paused' : 'playing')
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step, lock])

  // ── Start / restart ─────────────────────────────────────────────────────────
  const startGame = () => {
    setBoard(createBoard())
    setCurrent(randomPiece())
    setNext(randomPiece())
    setScore(0)
    setLines(0)
    setLevel(0)
    setStatus('playing')
  }

  // ── Build display board (board + ghost + active piece) ──────────────────────
  const displayBoard: (string | null)[][] = (() => {
    if (status === 'idle') return board

    // Ghost position
    let gy = current.y
    while (isValid(board, current.shape, current.x, gy + 1)) gy++

    const display = board.map(r => [...r])

    for (let r = 0; r < current.shape.length; r++) {
      for (let c = 0; c < current.shape[r].length; c++) {
        if (!current.shape[r][c]) continue
        const row = gy + r, col = current.x + c
        if (row >= 0 && row < ROWS && col >= 0 && col < COLS && !display[row][col])
          display[row][col] = '__ghost__'
      }
    }
    for (let r = 0; r < current.shape.length; r++) {
      for (let c = 0; c < current.shape[r].length; c++) {
        if (!current.shape[r][c]) continue
        const row = current.y + r, col = current.x + c
        if (row >= 0 && row < ROWS && col >= 0 && col < COLS)
          display[row][col] = current.color
      }
    }
    return display
  })()

  // ── Next piece preview (4×4 grid) ───────────────────────────────────────────
  const nextGrid: (string | null)[][] = (() => {
    const g: (string | null)[][] = Array.from({ length: 4 }, () => Array(4).fill(null))
    const or = Math.floor((4 - next.shape.length) / 2)
    const oc = Math.floor((4 - next.shape[0].length) / 2)
    for (let r = 0; r < next.shape.length; r++)
      for (let c = 0; c < next.shape[r].length; c++)
        if (next.shape[r][c]) g[or + r][oc + c] = next.color
    return g
  })()

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ fontFamily: 'Lato, sans-serif', color: '#404040', minHeight: '100vh', background: '#fafafa' }}>

      {/* Navbar */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e8e8e8', padding: '0 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="/" className="bg-c-link bg-c-link--medium-naked">
            <span className="bg-c-text bg-c-text--body-2">← Beranda</span>
          </a>
          <span style={{ width: 1, height: 20, background: '#e8e8e8', display: 'inline-block' }} />
          <span className="bg-c-text bg-c-text--heading-5" style={{ margin: 0 }}>Mamikos Games</span>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>

        {/* Page title */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 className="bg-c-text bg-c-text--heading-2" style={{ marginBottom: 6 }}>Tetris</h1>
          <p className="bg-c-text bg-c-text--body-3" style={{ color: '#757575' }}>
            ← → Geser &nbsp;·&nbsp; ↑ / X Rotasi &nbsp;·&nbsp; ↓ Turun pelan &nbsp;·&nbsp; Spasi Hard drop &nbsp;·&nbsp; P Pause
          </p>
        </div>

        {/* Game area */}
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Board */}
          <div className="bg-c-card bg-c-card--md bg-c-card--shadow" style={{ padding: 12 }}>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
                  gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
                  background: '#1a1a1a',
                  border: '2px solid #dadada',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                {displayBoard.flatMap((row, r) =>
                  row.map((cell, c) => (
                    <div
                      key={`${r}-${c}`}
                      style={{
                        width: CELL,
                        height: CELL,
                        background:
                          cell === '__ghost__'
                            ? 'rgba(255,255,255,0.10)'
                            : cell ?? 'transparent',
                        border:
                          cell && cell !== '__ghost__'
                            ? '1px solid rgba(255,255,255,0.22)'
                            : '1px solid rgba(255,255,255,0.04)',
                        borderRadius: cell && cell !== '__ghost__' ? 2 : 0,
                        boxSizing: 'border-box',
                      }}
                    />
                  ))
                )}
              </div>

              {/* Status overlay */}
              {status !== 'playing' && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(26,26,26,0.88)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                    borderRadius: 4,
                  }}
                >
                  {status === 'idle' && (
                    <>
                      <img
                        src="https://static-nanas-asset.kerupux.com/assets/bangul/illustrations/feature-coming-soon.svg"
                        alt="Mulai bermain"
                        style={{ width: 120 }}
                      />
                      <p className="bg-c-text bg-c-text--title-3" style={{ color: '#ffffff' }}>
                        Siap bermain Tetris?
                      </p>
                      <button
                        className="bg-c-button bg-c-button--primary bg-c-button--lg"
                        onClick={startGame}
                      >
                        Mulai Game
                      </button>
                    </>
                  )}

                  {status === 'paused' && (
                    <>
                      <p className="bg-c-text bg-c-text--heading-3" style={{ color: '#ffffff' }}>
                        PAUSE
                      </p>
                      <button
                        className="bg-c-button bg-c-button--primary bg-c-button--lg"
                        onClick={() => setStatus('playing')}
                      >
                        Lanjutkan
                      </button>
                      <button
                        className="bg-c-button bg-c-button--destructive bg-c-button--md"
                        onClick={startGame}
                      >
                        Mulai Ulang
                      </button>
                    </>
                  )}

                  {status === 'over' && (
                    <>
                      <p className="bg-c-text bg-c-text--heading-3" style={{ color: '#da3438' }}>
                        GAME OVER
                      </p>
                      <div className="bg-c-card bg-c-card--md bg-c-card--line" style={{ textAlign: 'center', minWidth: 140 }}>
                        <p className="bg-c-text bg-c-text--label-3" style={{ color: '#949494', marginBottom: 2 }}>Skor Akhir</p>
                        <p className="bg-c-text bg-c-text--title-1" style={{ color: '#008742' }}>
                          {score.toLocaleString('id-ID')}
                        </p>
                        <p className="bg-c-text bg-c-text--label-3" style={{ color: '#949494', marginTop: 8 }}>
                          Level {level + 1} · {lines} baris
                        </p>
                      </div>
                      <button
                        className="bg-c-button bg-c-button--primary bg-c-button--lg"
                        onClick={startGame}
                      >
                        Main Lagi
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 148 }}>

            {/* Next piece */}
            <div className="bg-c-card bg-c-card--md bg-c-card--line">
              <p className="bg-c-text bg-c-text--label-3" style={{ color: '#757575', marginBottom: 8 }}>
                BERIKUTNYA
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 20px)',
                  gridTemplateRows: 'repeat(4, 20px)',
                  background: '#1a1a1a',
                  borderRadius: 4,
                  margin: '0 auto',
                  width: 80,
                }}
              >
                {nextGrid.flatMap((row, r) =>
                  row.map((cell, c) => (
                    <div
                      key={`n-${r}-${c}`}
                      style={{
                        width: 20,
                        height: 20,
                        background: cell ?? 'transparent',
                        border: cell ? '1px solid rgba(255,255,255,0.22)' : '1px solid transparent',
                        borderRadius: cell ? 2 : 0,
                        boxSizing: 'border-box',
                      }}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-c-card bg-c-card--md bg-c-card--line">
              <p className="bg-c-text bg-c-text--label-3" style={{ color: '#757575', marginBottom: 2 }}>SKOR</p>
              <p className="bg-c-text bg-c-text--title-2" style={{ color: '#008742' }}>
                {score.toLocaleString('id-ID')}
              </p>
            </div>

            <div className="bg-c-card bg-c-card--md bg-c-card--line" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p className="bg-c-text bg-c-text--label-3" style={{ color: '#757575', marginBottom: 2 }}>LEVEL</p>
                <p className="bg-c-text bg-c-text--title-3">{level + 1}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="bg-c-text bg-c-text--label-3" style={{ color: '#757575', marginBottom: 2 }}>BARIS</p>
                <p className="bg-c-text bg-c-text--title-3">{lines}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {status === 'playing' && (
                <button
                  className="bg-c-button bg-c-button--secondary bg-c-button--md bg-c-button--block"
                  onClick={() => setStatus('paused')}
                >
                  Pause (P)
                </button>
              )}
              {status === 'paused' && (
                <button
                  className="bg-c-button bg-c-button--primary bg-c-button--md bg-c-button--block"
                  onClick={() => setStatus('playing')}
                >
                  Lanjut (P)
                </button>
              )}
              {(status === 'playing' || status === 'paused') && (
                <button
                  className="bg-c-button bg-c-button--destructive bg-c-button--md bg-c-button--block"
                  onClick={startGame}
                >
                  Restart
                </button>
              )}
              {status === 'idle' && (
                <button
                  className="bg-c-button bg-c-button--primary bg-c-button--md bg-c-button--block"
                  onClick={startGame}
                >
                  Mulai
                </button>
              )}
              {status === 'over' && (
                <button
                  className="bg-c-button bg-c-button--primary bg-c-button--md bg-c-button--block"
                  onClick={startGame}
                >
                  Main Lagi
                </button>
              )}
            </div>

            {/* Controls cheatsheet */}
            <div className="bg-c-card bg-c-card--md bg-c-card--line">
              <p className="bg-c-text bg-c-text--label-3" style={{ color: '#757575', marginBottom: 8 }}>
                KONTROL
              </p>
              {[
                ['← →', 'Geser'],
                ['↑ / X', 'Rotasi'],
                ['↓', 'Turun'],
                ['Spasi', 'Hard drop'],
                ['P', 'Pause'],
              ].map(([key, label]) => (
                <div
                  key={key}
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, gap: 4 }}
                >
                  <span
                    className="bg-c-text bg-c-text--label-3"
                    style={{ fontWeight: 700, color: '#303030', flexShrink: 0 }}
                  >
                    {key}
                  </span>
                  <span className="bg-c-text bg-c-text--label-3" style={{ color: '#757575', textAlign: 'right' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Piece legend */}
            <div className="bg-c-card bg-c-card--md bg-c-card--line">
              <p className="bg-c-text bg-c-text--label-3" style={{ color: '#757575', marginBottom: 8 }}>
                BALOK
              </p>
              {(Object.entries(TETROMINOES) as [PieceKey, { color: string }][]).map(([key, { color }]) => (
                <div
                  key={key}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      background: color,
                      borderRadius: 2,
                      flexShrink: 0,
                      border: '1px solid rgba(0,0,0,0.12)',
                    }}
                  />
                  <span className="bg-c-text bg-c-text--label-3" style={{ color: '#535353' }}>{key}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
