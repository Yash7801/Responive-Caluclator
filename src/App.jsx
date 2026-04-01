import { useState, useEffect, useCallback } from 'react'
import Display from './components/Display'
import ButtonGrid from './components/ButtonGrid'
import HistoryPanel from './components/HistoryPanel'

function App() {
  const [current,     setCurrent]     = useState('0')
  const [previous,    setPrevious]    = useState(null)
  const [operator,    setOperator]    = useState(null)
  const [expression,  setExpression]  = useState('')
  const [freshResult, setFreshResult] = useState(false)
  const [history,     setHistory]     = useState([])
  const [historyOpen, setHistoryOpen] = useState(false)
  const [theme,       setTheme]       = useState('dark')

  const isDark = theme === 'dark'

  function inputNumber(digit) {
  if (current === 'Error') {
    setCurrent(digit)
    setFreshResult(false)
    return
  }

  if (freshResult) {
    setCurrent(digit)
    setFreshResult(false)
    return
  }

  setCurrent(prev => prev === '0' ? digit : prev + digit)
}

  function inputDecimal() {
    if (current === 'Error') return
    if (current.includes('.')) return
    setCurrent(prev => prev + '.')
  }

  function inputOperator(op) {
  if (current === 'Error') return

  if (operator && !freshResult) {
    setOperator(op)
    setExpression(`${previous} ${op}`)
    return
  }

  setExpression(`${current} ${op}`)
  setPrevious(current)
  setOperator(op)
  setCurrent('0')
  setFreshResult(false)
}

  function inputEquals() {
    if (!operator || !previous || current === 'Error') return

    const a = parseFloat(previous)
    const b = parseFloat(current)
    let result

    if (operator === '+') result = a + b
    if (operator === '−') result = a - b
    if (operator === '×') result = a * b
    if (operator === '÷') result = b === 0 ? 'Error' : a / b

    const expr = `${previous} ${operator} ${current}`
    const formatted =
  result === 'Error'
    ? 'Error'
    : Number.isInteger(result)
    ? String(result)
    : String(parseFloat(result.toFixed(10)))

    setHistory(prev => [...prev, { expr, result: formatted }])
    setExpression(`${expr} =`)
    setCurrent(formatted)
    setPrevious(null)
    setOperator(null)
    setFreshResult(true)
  }

  function allClear() {
    setCurrent('0')
    setPrevious(null)
    setOperator(null)
    setExpression('')
    setFreshResult(false)
  }

  function backspace() {
  if (freshResult || current === 'Error') {
    allClear()
    return
  }

  setCurrent(prev => prev.length <= 1 ? '0' : prev.slice(0, -1))
}

  function percent() {
    if (current === 'Error') return
    setCurrent(prev => String(parseFloat(prev) / 100))
  }

  function sqrt() {
  if (current === 'Error') return

  const val = parseFloat(current)
  if (val < 0) { setCurrent('Error'); return }

  setExpression(`√(${current})`)
  setCurrent(String(parseFloat(Math.sqrt(val).toPrecision(12))))
  setFreshResult(true)
}

  function square() {
    if (current === 'Error') return
    const val = parseFloat(current)
    setExpression(`(${current})²`)
    setCurrent(String(parseFloat((val * val).toPrecision(12))))
    setFreshResult(true)
  }

  function inverse() {
    if (current === 'Error') return
    const val = parseFloat(current)
    if (val === 0) { setCurrent('Error'); return }
    setExpression(`1/(${current})`)
    setCurrent(String(parseFloat((1 / val).toPrecision(12))))
    setFreshResult(true)
  }

  function toggleSign() {
    if (current === '0' || current === 'Error') return
    setCurrent(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev)
  }

  const handleAction = useCallback((action, value) => {
  if (action === 'number')    inputNumber(value)
  if (action === 'decimal')   inputDecimal()
  if (action === 'operator')  inputOperator(value)
  if (action === 'equals')    inputEquals()
  if (action === 'allclear')  allClear()
  if (action === 'backspace') backspace()
  if (action === 'percent')   percent()
  if (action === 'sqrt')      sqrt()
  if (action === 'square')    square()
  if (action === 'inverse')   inverse()
  if (action === 'sign')      toggleSign()
  if (action === 'history')   setHistoryOpen(prev => !prev)
}, [current, operator, previous, freshResult])

  useEffect(() => {
  function handleKey(e) {
    const key = e.key

    if (/^[0-9]$/.test(key)) {
  handleAction('number', key)
}

    if (key === '.') {
      handleAction('decimal')
    }

    if (key === '+') handleAction('operator', '+')
    if (key === '-') handleAction('operator', '−')
    if (key === '*') handleAction('operator', '×')
    if (key === '/') {
      e.preventDefault()
      handleAction('operator', '÷')
    }

    if (key === 'Enter' || key === '=') {
      handleAction('equals')
    }

    if (key === 'Backspace') {
      handleAction('backspace')
    }

    if (key === 'Escape') {
      handleAction('allclear')
    }
  }

  window.addEventListener('keydown', handleKey)

  return () => window.removeEventListener('keydown', handleKey)
}, [handleAction])

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start pt-6 sm:pt-10 p-2 sm:p-4 transition-colors duration-300 ${isDark ? 'bg-[#0e0f14]' : 'bg-[#e8eaf0]'}`}>
      <h1 className={`text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 tracking-wide text-center transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:drop-shadow-lg cursor-default ${isDark ? 'text-white hover:text-violet-300' : 'text-gray-900 hover:text-violet-600'}`}>
        Calculator
      </h1>

      <button
        onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-sm sm:text-lg transition-all duration-200 hover:scale-110 hover:rotate-12 bg-white/10 border-white/10"
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      <div className="flex flex-col md:flex-row mt-2 sm:mt-4 gap-2 sm:gap-3 items-center w-full max-w-[400px] md:max-w-[1000px]">

        {historyOpen && (
  <HistoryPanel
    history={history}
    isOpen={historyOpen}
    isDark={isDark}
    onClose={() => setHistoryOpen(false)}
    onRecall={(result) => { setCurrent(result); setFreshResult(true) }}
    onClear={() => setHistory([])}
  />
)}

        <main className={`w-full md:flex-1 rounded-xl sm:rounded-2xl overflow-hidden border shadow-xl sm:shadow-2xl transition-colors duration-300 ${isDark ? 'bg-[#16181f] border-white/5' : 'bg-white border-black/8'}`}>
          <Display expression={expression} result={current} isDark={isDark} />
          <ButtonGrid onAction={handleAction} isDark={isDark} />
        </main>

      </div>
    </div>
  )
}

export default App