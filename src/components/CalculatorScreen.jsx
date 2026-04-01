function CalculatorScreen({ expression, result, isDark }) {
  const fontSize =
    result.length > 18 ? 'text-lg sm:text-xl' :
    result.length > 12 ? 'text-2xl sm:text-3xl' : 'text-4xl sm:text-5xl'

  return (
    <div
      className={`px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 flex flex-col items-end gap-1 min-h-[120px] sm:min-h-[140px] justify-end border-b transition-colors duration-300 ${
        isDark
          ? 'bg-[#12141a] border-white/5'
          : 'bg-white border-gray-200'
      }`}
    >
      <p
        className={`text-xs sm:text-sm font-mono min-h-[1.2em] sm:min-h-[1.4em] tracking-wide ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`}
      >
        {expression || ''}
      </p>

      <p
        key={result}
        className={`font-mono font-light tracking-tight leading-none break-all text-right ${fontSize} ${
          isDark ? 'text-white' : 'text-gray-900'
        } animate-fadeSlide`}
      >
        {result}
      </p>
    </div>
  )
}

export default CalculatorScreen