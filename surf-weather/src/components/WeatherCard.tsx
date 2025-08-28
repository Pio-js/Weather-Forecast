interface Props {
    day: string;
    tempMax: number;
    tempMin: number;
    wind: number;
    rain: number;
}

export const WeatherCard: React.FC<Props> = ({ day, tempMax, tempMin, wind, rain }) => {
    // format date into European format (dd/mm/yyyy)
    const formattedDate = new Date(day).toLocaleDateString("de-DE");

    return (
        <div className="bg-white/90 border border-blue-200 shadow-lg rounded-2xl mb-4 p-4 flex items-center w-full max-w-md hover:scale-[1.02] transition">
            {/* Date on the left */}
            <div className="w-1/3 text-center pr-4 border-r border-gray-200">
                <h3 className="font-semibold text-2xl text-blue-600">{formattedDate}</h3>
            </div>

            {/* Weather info on the right */}
            <div className="w-2/3 pl-4 flex flex-col gap-1 text-gray-700">
                <p className="text-2xl">
                    🌡️ <span className="font-semibold">{tempMax}°</span> / {tempMin}°
                </p>
                <p className="text-2xl">💨 {wind} km/h</p>
                <p className="text-2xl">🌧️ {rain} mm</p>
            </div>
        </div>
    );
};
