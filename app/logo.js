export default function Logo() {
  return (
    <div className="w-48 h-48 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
        <circle cx="100" cy="100" r="90" fill="#dc2626" opacity="0.9"/>
        <path d="M100 30 L130 90 L100 170 L70 90 Z" fill="white"/>
        <circle cx="100" cy="75" r="20" fill="#dc2626"/>
        <circle cx="100" cy="125" r="20" fill="#dc2626"/>
      </svg>
    </div>
  );
}
