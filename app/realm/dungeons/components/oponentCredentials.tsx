import Image from "next/image"

interface Props {
  floorDescription: string
  monsterName: string
  monsterImageUrl: string
  currentFloor: number
  onConfirm: () => void
  onClose?: () => void
}

const OponentCredentials = ({
  floorDescription,
  monsterName,
  monsterImageUrl,
  currentFloor,
  onConfirm,
  onClose,
}: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Modal */}
      <div
        className="relative z-10 w-140 rounded-sm overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #1a2a1a 0%, #0d1a0d 40%, #0a1208 100%)",
          boxShadow:
            "0 0 60px rgba(0,0,0,0.9), inset 0 0 40px rgba(0,0,0,0.5)",
          border: "2px solid #2a3a2a",
        }}
      >
        {/* Close */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{
              background:
                "radial-gradient(circle, #8b1a1a 0%, #5a0d0d 100%)",
              border: "2px solid #c0392b",
              boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            ✕
          </button>
        )}

        <div className="p-6 pb-5">
          <h2
            className="text-center text-2xl font-extrabold mb-3 tracking-wide"
            style={{
              color: "#f5c842",
              textShadow:
                "0 0 12px rgba(245,200,66,0.5), 0 2px 4px rgba(0,0,0,0.8)",
              fontFamily: "'Georgia', serif",
            }}
          >
            {monsterName} {currentFloor}/10
          </h2>

          <p
            className="text-center text-sm leading-relaxed mb-5 px-2"
            style={{
              color: "#e8d48a",
              textShadow: "0 1px 3px rgba(0,0,0,0.8)",
              fontFamily: "'Georgia', serif",
            }}
          >
            {floorDescription}
          </p>

          <div className="flex justify-center mb-5">
            <div
              className="relative w-56 h-56"
              style={{
                background:
                  "radial-gradient(ellipse at center, #1a3d6b 0%, #0d2040 50%, #060e1f 100%)",
                border: "3px solid #8a7a30",
                boxShadow:
                  "0 0 20px rgba(138,122,48,0.4), inset 0 0 30px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.8)",
                borderRadius: "4px",
              }}
            >
              <Image
                src={monsterImageUrl}
                alt={monsterName}
                fill
                className="object-contain p-3"
              />
            </div>
          </div>

          <div className="flex justify-end pr-1">
            <button
              onClick={onConfirm}
              className="px-10 py-2 text-base font-bold tracking-widest uppercase transition-all duration-150 active:scale-95"
              style={{
                fontFamily: "'Georgia', serif",
                color: "#f0e0a0",
                background:
                  "linear-gradient(180deg, #2a4a2a 0%, #1a3020 50%, #0f2010 100%)",
                border: "2px solid #4a7a4a",
                borderRadius: "3px",
                boxShadow:
                  "0 0 12px rgba(74,122,74,0.3), 0 4px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
                textShadow: "0 1px 3px rgba(0,0,0,0.8)",
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OponentCredentials