import Image from "next/image"

interface Props {
    floorDescription: string,
    monsterName: string,
    monsterImageUrl: string,
    currentFloor : number
}

const OponentCredentials = ({ floorDescription, monsterName, monsterImageUrl, currentFloor }: Props) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Modal container */}
            <div
                className="relative z-10 w-140 rounded-sm overflow-hidden"
                style={{
                    background: "linear-gradient(160deg, #1a2a1a 0%, #0d1a0d 40%, #0a1208 100%)",
                    boxShadow: "0 0 60px rgba(0,0,0,0.9), inset 0 0 40px rgba(0,0,0,0.5)",
                    border: "2px solid #2a3a2a",
                }}
            >
                {/* Close button */}
                <button
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{
                        background: "radial-gradient(circle, #8b1a1a 0%, #5a0d0d 100%)",
                        border: "2px solid #c0392b",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
                    }}
                >
                    ✕
                </button>

                {/* Decorative top corners */}
                <div className="absolute top-0 left-0 w-16 h-16 opacity-40"
                    style={{ background: "radial-gradient(circle at top left, #3d6b3d, transparent 70%)" }} />
                <div className="absolute top-0 right-0 w-16 h-16 opacity-40"
                    style={{ background: "radial-gradient(circle at top right, #3d6b3d, transparent 70%)" }} />

                {/* Content */}
                <div className="p-6 pb-5">
                    {/* Title */}
                    <h2
                        className="text-center text-2xl font-extrabold mb-3 tracking-wide"
                        style={{
                            color: "#f5c842",
                            textShadow: "0 0 12px rgba(245,200,66,0.5), 0 2px 4px rgba(0,0,0,0.8)",
                            fontFamily: "'Georgia', 'Times New Roman', serif",
                        }}
                    >
                        {monsterName} {currentFloor}/10
                    </h2>

                    {/* Description text */}
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

                    {/* Monster image frame */}
                    <div className="flex justify-center mb-5">
                        <div
                            className="relative w-56 h-56"
                            style={{
                                background: "radial-gradient(ellipse at center, #1a3d6b 0%, #0d2040 50%, #060e1f 100%)",
                                border: "3px solid #8a7a30",
                                boxShadow: "0 0 20px rgba(138,122,48,0.4), inset 0 0 30px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.8)",
                                borderRadius: "4px",
                            }}
                        >
                            {/* Corner decorations */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400/60" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-400/60" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400/60" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-400/60" />

                            <Image
                                src={monsterImageUrl}
                                alt={monsterName}
                                fill
                                className="object-contain p-3"
                            />
                        </div>
                    </div>

                    {/* OK Button */}
                    <div className="flex justify-end pr-1">
                        <button
                            className="px-10 py-2 text-base font-bold tracking-widest uppercase transition-all duration-150 active:scale-95"
                            style={{
                                fontFamily: "'Georgia', serif",
                                color: "#f0e0a0",
                                background: "linear-gradient(180deg, #2a4a2a 0%, #1a3020 50%, #0f2010 100%)",
                                border: "2px solid #4a7a4a",
                                borderRadius: "3px",
                                boxShadow: "0 0 12px rgba(74,122,74,0.3), 0 4px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
                                textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(180deg, #3a5a3a 0%, #2a4030 50%, #1a3020 100%)"
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(180deg, #2a4a2a 0%, #1a3020 50%, #0f2010 100%)"
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