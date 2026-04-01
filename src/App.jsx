import { useState, useEffect, useCallback } from 'react'
import CalculatorScreen from './components/CalculatorScreen'
import Keypad from './components/Keypad'
import CalculationHistory from './components/CalculationHistory'

function App() {
  const [displayValue, setDisplayValue] = useState('0')
  const [storedValue, setStoredValue] = useState(null)
  const [currentOp, setCurrentOp] = useState(null)
  const [calcDisplay, setCalcDisplay] = useState('')
  const [justCalculated, setJustCalculated] = useState(false)
  const [pastResults, setPastResults] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [colorMode, setColorMode] = useState('dark')

  const darkMode = colorMode === 'dark'

  function handleNumber(digit) {
  if (displayValue === 'Error') {
    setDisplayValue(digit)
    setJustCalculated(false)
    return
  }

  if (justCalculated) {
    setDisplayValue(digit)
    setJustCalculated(false)
    return
  }

  setDisplayValue(prev => prev === '0' ? digit : prev + digit)
}

  function handleDecimal() {
    if (displayValue === 'Error') return
    if (displayValue.includes('.')) return
    setDisplayValue(prev => prev + '.')
  }

  function setOperator(op) {
  if (displayValue === 'Error') return

  if (currentOp && !justCalculated) {
    setCurrentOp(op)
    setCalcDisplay(`${storedValue} ${op}`)
    return
  }

  setCalcDisplay(`${displayValue} ${op}`)
  setStoredValue(displayValue)
  setCurrentOp(op)
  setDisplayValue('0')
  setJustCalculated(false)
}

  function calculate() {
    if (!currentOp || !storedValue || displayValue === 'Error') return

    const a = parseFloat(storedValue)
    const b = parseFloat(displayValue)
    let result

    if (currentOp === '+') result = a + b
    if (currentOp === '−') result = a - b
    if (currentOp === '×') result = a * b
    if (currentOp === '÷') result = b === 0 ? 'Error' : a / b

    const expr = `${storedValue} ${currentOp} ${displayValue}`
    const formatted =
  result === 'Error'
    ? 'Error'
    : Number.isInteger(result)
    ? String(result)
    : String(parseFloat(result.toFixed(10)))

    setPastResults(prev => [...prev, { expr, result: formatted }])
    setCalcDisplay(`${expr} =`)
    setDisplayValue(formatted)
    setStoredValue(null)
    setCurrentOp(null)
    setJustCalculated(true)
  }

  function clearAll() {
    setDisplayValue('0')
    setStoredValue(null)
    setCurrentOp(null)
    setCalcDisplay('')
    setJustCalculated(false)
  }

  function deleteLast() {
  if (justCalculated || displayValue === 'Error') {
    clearAll()
    return
  }

  setDisplayValue(prev => prev.length <= 1 ? '0' : prev.slice(0, -1))
}

  function calculatePercent() {
    if (displayValue === 'Error') return
    setDisplayValue(prev => String(parseFloat(prev) / 100))
  }

  function calculateSquareRoot() {
  if (displayValue === 'Error') return

  const val = parseFloat(displayValue)
  if (val < 0) { setDisplayValue('Error'); return }

  setCalcDisplay(`√(${displayValue})`)
  setDisplayValue(String(parseFloat(Math.sqrt(val).toPrecision(12))))
  setJustCalculated(true)
}

  function calculateSquare() {
    if (displayValue === 'Error') return
    const val = parseFloat(displayValue)
    setCalcDisplay(`(${displayValue})²`)
    setDisplayValue(String(parseFloat((val * val).toPrecision(12))))
    setJustCalculated(true)
  }

  function calculateInverse() {
    if (displayValue === 'Error') return
    const val = parseFloat(displayValue)
    if (val === 0) { setDisplayValue('Error'); return }
    setCalcDisplay(`1/(${displayValue})`)
    setDisplayValue(String(parseFloat((1 / val).toPrecision(12))))
    setJustCalculated(true)
  }

  function changeSign() {
    if (displayValue === '0' || displayValue === 'Error') return
    setDisplayValue(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev)
  }

  const handleAction = useCallback((action, value) => {
  if (action === 'number')    handleNumber(value)
  if (action === 'decimal')   handleDecimal()
  if (action === 'operator')  setOperator(value)
  if (action === 'equals')    calculate()
  if (action === 'allclear')  clearAll()
  if (action === 'backspace') deleteLast()
  if (action === 'percent')   calculatePercent()
  if (action === 'sqrt')      calculateSquareRoot()
  if (action === 'square')    calculateSquare()
  if (action === 'inverse')   calculateInverse()
  if (action === 'sign')      changeSign()
  if (action === 'history')   setShowHistory(prev => !prev)
}, [displayValue, currentOp, storedValue, justCalculated])

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
    <div className={`min-h-screen flex flex-col items-center justify-start pt-6 sm:pt-10 p-2 sm:p-4 transition-colors duration-300 ${darkMode ? 'bg-[#0e0f14]' : 'bg-[#e8eaf0]'}`}>
      <h1 className={`text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 tracking-wide text-center transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:drop-shadow-lg cursor-default ${darkMode ? 'text-white hover:text-violet-300' : 'text-gray-900 hover:text-violet-600'}`}>
        Calculator
      </h1>

      <button
        onClick={() => setColorMode(t => t === 'dark' ? 'light' : 'dark')}
        className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-sm sm:text-lg transition-all duration-200 hover:scale-110 hover:rotate-12 bg-white/10 border-white/10"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      <div className="flex flex-col md:flex-row mt-2 sm:mt-4 gap-2 sm:gap-3 items-center w-full max-w-[400px] md:max-w-[1000px]">

        {showHistory && (
  <CalculationHistory
    history={pastResults}
    isOpen={showHistory}
    isDark={darkMode}
    onClose={() => setShowHistory(false)}
    onRecall={(result) => { setDisplayValue(result); setJustCalculated(true) }}
    onClear={() => setPastResults([])}
  />
)}

        <main className={`w-full md:flex-1 rounded-xl sm:rounded-2xl overflow-hidden border shadow-xl sm:shadow-2xl transition-colors duration-300 ${darkMode ? 'bg-[#16181f] border-white/5' : 'bg-white border-black/8'}`}>
          <CalculatorScreen expression={calcDisplay} result={displayValue} isDark={darkMode} />
          <Keypad onAction={handleAction} isDark={darkMode} />
        </main>

      </div>
    </div>
  )
}

export default App