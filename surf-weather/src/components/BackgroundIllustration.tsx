export default function BackgroundIllustration() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 overflow-hidden z-0"
        >
            {/* Hintergrund */}
            <div className="relative h-[60vh] md:h-[50vh] w-full bg-gradient-to-b from-sky-300 to-white">
                {/* Sonne */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-yellow-300 shadow-[0_0_40px_15px_rgba(253,224,71,0.6)]" />
            </div>

            {/* Multivan */}
            <div className="absolute right-[10%] sm:right-[15%] bottom-0 w-[60%] sm:w-[40%] z-20">
                <img src="van_with_shadow.svg" alt="Van" />
            </div>

            {/* Wellen */}
            <div className="relative h-[20vh] md:h-[30vh] w-full z-10">
                {/* Surfer (Mann) */}
                <div className="absolute right-0 w-[35%] sm:w-[25%] lg:bottom-[10vh] scale-x-[-1] z-10">
                    <img src="surfing_man.svg" alt="Surfing man" />
                </div>

                {/* Surferin (Frau) */}
                <div className="absolute left-0 w-[30%] sm:w-[20%] lg:bottom-[15vh] z-10">
                    <img src="surfing_woman.svg" alt="Surfing woman" />
                </div>

                <svg
                    className="absolute bottom-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    {/* Meer */}
                    <rect width="1440" height="320" fill="#14aab8" />

                    {/* Innere Wellen */}
                    <path
                        fill="#0d9488"
                        fillOpacity="0.8"
                        d="M0,280 Q180,260 360,280 T720,280 T1080,280 T1440,280 V320 H0 Z"
                    />

                    {/* Wellen */}
                    <path
                        fill="#2dd4bf"
                        fillOpacity="0.3"
                        d="M0,260 Q240,240 480,260 T960,260 T1440,260 V320 H0 Z"
                    />

                    {/* Schaum */}
                    <path
                        fill="white"
                        fillOpacity="0.8"
                        d="M0,300 Q200,290 400,300 T800,300 T1200,300 T1440,300 V320 H0 Z"
                    />
                </svg>
            </div>
            {/* Strand */}
            <div className="h-[20vh] w-full relative">
                <svg
                    className="absolute top-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    {/* Sand basis */}
                    <rect width="1440" height="320" fill="#fcd34d" />

                    {/* Dunkler Sand */}
                    <path
                        fill="#fbbf24"
                        d="M0,40 Q300,60 600,40 T1200,40 T1440,60 V320 H0 Z"
                    />

                    {/* Hellerer Sand */}
                    <path
                        fill="#fde68a"
                        d="M0,80 Q240,100 480,80 T960,100 T1440,80 V320 H0 Z"
                    />
                </svg>
            </div>
        </div>
    );
}
