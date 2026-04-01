import Button from "./Button";

const BUTTONS = [
  { label: "📋", variant: "fn", action: "history" },
  { label: "%", variant: "fn", action: "percent" },
  { label: "√", variant: "fn", action: "sqrt" },
  { label: "AC", variant: "clear", action: "allclear" },

  { label: "x²", variant: "fn", action: "square" },
  { label: "1/x", variant: "fn", action: "inverse" },
  { label: "±", variant: "fn", action: "sign" },
  { label: "÷", variant: "operator", action: "operator", value: "÷" },

  { label: "7", variant: "num", action: "number", value: "7" },
  { label: "8", variant: "num", action: "number", value: "8" },
  { label: "9", variant: "num", action: "number", value: "9" },
  { label: "×", variant: "operator", action: "operator", value: "×" },

  { label: "4", variant: "num", action: "number", value: "4" },
  { label: "5", variant: "num", action: "number", value: "5" },
  { label: "6", variant: "num", action: "number", value: "6" },
  { label: "−", variant: "operator", action: "operator", value: "−" },

  { label: "1", variant: "num", action: "number", value: "1" },
  { label: "2", variant: "num", action: "number", value: "2" },
  { label: "3", variant: "num", action: "number", value: "3" },
  { label: "+", variant: "operator", action: "operator", value: "+" },

  { label: "0", variant: "num", action: "number", value: "0"},
{ label: ".", variant: "num", action: "decimal" },
{ label: "⌫", variant: "backspace", action: "backspace" },

{ label: "=", variant: "equals", action: "equals"},
];

function ButtonGrid({ onAction, isDark }) {
  return (
    <div
      className={`grid grid-cols-4 gap-[1px] ${isDark ? "bg-white/5" : "bg-gray-200"}`}
    >
      {BUTTONS.map((btn, i) => (
        <Button
          key={i}
          label={btn.label}
          variant={btn.variant}
          wide={btn.wide || false}
          isDark={isDark}
          onClick={() => onAction(btn.action, btn.value)}
        />
      ))}
    </div>
  );
}

export default ButtonGrid;
