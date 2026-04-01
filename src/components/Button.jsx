function Button({ label, onClick, variant = 'num', wide = false, isDark }) {

  const base = `
  flex items-center justify-center font-semibold
  py-3 sm:py-4 px-1 sm:px-2 cursor-pointer select-none
  transition-all duration-150 ease-out
  active:scale-95
`

  const variants = isDark ? {
    num:      'bg-[#1e2029] hover:bg-[#2a2d3d] text-white',
    fn:       'bg-[#1a1c26] hover:bg-[#22253a] text-violet-400 text-sm',
    operator: 'bg-[#23203a] hover:bg-[#2d2a4a] text-violet-300 text-xl',
    equals:   'bg-violet-600 hover:bg-violet-500 text-white text-xl shadow-[0_0_20px_rgba(124,106,247,0.35)] hover:shadow-[0_0_28px_rgba(124,106,247,0.5)]',
    clear:    'bg-[#1a1c26] hover:bg-[#2a1f2f] text-pink-400 hover:text-pink-300',
    backspace:'bg-[#1a1c26] hover:bg-[#2a1f2f] text-pink-400 hover:text-pink-300',
  } : {
    num: 'bg-white hover:bg-gray-100 text-gray-900',

fn: 'bg-gray-50 hover:bg-gray-100 text-violet-600 text-sm',

operator: 'bg-violet-100 hover:bg-violet-200 text-violet-700 text-xl',

equals: 'bg-violet-600 hover:bg-violet-500 text-white text-xl shadow-md',

clear: 'bg-gray-50 hover:bg-red-100 text-pink-500',

backspace: 'bg-gray-50 hover:bg-red-100 text-pink-500',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${wide ? 'col-span-2' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button