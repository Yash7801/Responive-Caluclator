function CalculationHistory({ history, isOpen, isDark, onClose, onRecall, onClear }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border
        transition-all duration-300 ease-in-out
        fixed md:relative top-0 left-0 h-full md:h-auto z-50 md:z-auto
        w-[200px] sm:w-[240px]
        ${isDark ? 'bg-[#16181f] border-white/5' : 'bg-white border-black/8'}
        ${isOpen
          ? 'translate-x-0 opacity-100 shadow-xl sm:shadow-2xl'
          : '-translate-x-full opacity-0 pointer-events-none md:translate-x-0 md:opacity-100 md:pointer-events-auto shadow-none'}
      `}>

        <div className={`flex justify-between items-center px-3 sm:px-4 py-2 sm:py-3 border-b flex-shrink-0 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">
            History
          </h2>
          <button
            onClick={onClear}
            className="text-xs text-gray-500 hover:text-pink-400 transition-colors font-semibold px-2 py-1 rounded hover:bg-pink-400/10"
          >
            ✕ Clear
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto p-1 sm:p-2">
          {history.length === 0 ? (
            <li className="text-center text-gray-500 text-xs italic py-6 sm:py-8">
              No calculations yet.
            </li>
          ) : (
            [...history].reverse().map((entry, i) => (
              <li
                key={i}
                onClick={() => { onRecall(entry.result); onClose() }}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl cursor-pointer transition-colors duration-150 mb-0.5 sm:mb-1 ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
              >
                <p className="text-xs text-gray-500 font-mono truncate">{entry.expr}</p>
                <p className={`text-sm sm:text-base font-mono mt-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {entry.result}
                </p>
              </li>
            ))
          )}
        </ul>
      </aside>
    </>
  )
}

export default CalculationHistory