import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import { geocodeCity, fetchWeather } from "./api";

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
                alert(err.message); // zeigt deine genaue Fehlermeldung
            } else {
                alert("Unbekannter Fehler bei der Stadtsuche");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-300 to-blue-100 flex flex-col items-center justify-start p-6">
            <h1 className="text-4xl font-extrabold text-blue-900 mb-6 drop-shadow">
                Surf Wetter Deutschland 🌊
            </h1>

            {/* Eingabe */}
            <SearchBar onSearch={handleSearch} />

            {/* Menü für Küstenstädte */}
            <div className="mt-4">
                <label className="block text-blue-900 font-semibold mb-2">
                    Schnellauswahl Küstenstädte:
                </label>
                <select
                    onChange={(e) => e.target.value && handleSearch(e.target.value)}
                    className="border border-blue-400 rounded-xl px-4 py-2 shadow bg-white text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Bitte wählen</option>
                    {[
                        "Hamburg",
                        "Kiel",
                        "Rostock",
                        "Lübeck",
                        "Flensburg",
                        "Wilhelmshaven",
                        "Bremerhaven",
                        "Cuxhaven"
                    ].map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>

            {/* Vorhersage */}
            {city && (
                <h2 className="mt-6 mb-4 text-2xl font-bold text-blue-700">
                    Vorhersage für{" "}
                    <span className="underline decoration-blue-300">{city}</span>
                </h2>
            )}

            <div className="flex flex-col items-center gap-4 w-full">
                {weather.map((day) => (
                    <WeatherCard key={day.day} {...day} />
                ))}
            </div>
        </div>
    );
};
