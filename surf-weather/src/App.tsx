import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import { geocodeCity, fetchWeather } from "./api";
import BackgroundIllustration from "./components/BackgroundIllustration";

interface WeatherDay {
    day: string;
    tempMax: number;
    tempMin: number;
    wind: number;
    rain: number;
}

export const App: React.FC = () => {
    const [weather, setWeather] = useState<WeatherDay[]>([]);
    const [city, setCity] = useState("");

    const handleSearch = async (inputCity: string) => {
        try {
            const { lat, lon, name, admin1 } = await geocodeCity(inputCity);
            const data = await fetchWeather(lat, lon);

            const daily = data.daily.time.map((date: string, i: number) => ({
                day: date,
                tempMax: data.daily.temperature_2m_max[i],
                tempMin: data.daily.temperature_2m_min[i],
                wind: data.daily.windspeed_10m_max[i],
                rain: data.daily.precipitation_sum[i]
            }));

            setWeather(daily);
            setCity(`${name}${admin1 ? `, ${admin1}` : ""}`);
        } catch (err) {
            if (err instanceof Error) {
                alert(err.message); // zeigt die genaue Fehlermeldung
            } else {
                alert("Unbekannter Fehler bei der Stadtsuche");
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start p-6">
            <BackgroundIllustration />
            
            <h1 className="text-4xl font-extrabold text-blue-900 mb-6 drop-shadow">
                Surf Wetter Deutschland 🌊
            </h1>

            {/* Eingabe */}
            <SearchBar onSearch={handleSearch} />

            {/* Küstenstädte-Auswahl */}
            <div className="mt-6 w-full max-w-3xl z-10">
                <h3 className="text-xl font-semibold text-blue-900 mb-4 text-center">
                    Beliebte Küstenstädte
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {[
                        { name: "Hamburg", icon: "⚓️" },
                        { name: "Kiel", icon: "⛵️" },
                        { name: "Rostock", icon: "🌊" },
                        { name: "Lübeck", icon: "🏖️" },
                        { name: "Flensburg", icon: "🚤" },
                        { name: "Wilhelmshaven", icon: "⚓️" },
                        { name: "Bremerhaven", icon: "🌬️" },
                        { name: "Cuxhaven", icon: "🌞" }
                    ].map((city) => (
                        <button
                            key={city.name}
                            onClick={() => handleSearch(city.name)}
                            className="bg-white border border-blue-300 rounded-2xl shadow-md px-4 py-3 flex flex-col items-center justify-center hover:bg-blue-50 hover:scale-105 transition-transform duration-200"
                        >
                            <span className="text-2xl mb-1">{city.icon}</span>
                            <span className="font-medium text-blue-800">{city.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Vorhersage */}
            {city && (
                <h2 className="mt-8 mb-4 text-2xl font-bold text-blue-700 z-10">
                    Vorhersage für{" "}
                    <span className="underline decoration-blue-300">{city}</span>
                </h2>
            )}

            <div className="flex flex-col items-center gap-4 w-full z-10">
                {weather.map((day) => (
                    <WeatherCard key={day.day} {...day} />
                ))}
            </div>
        </div>
    );
};
