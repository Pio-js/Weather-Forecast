import axios from "axios";

export async function fetchWeather(lat: number, lon: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=Europe/Berlin`;
    const response = await axios.get(url);
    return response.data;
}

// api.ts
export async function geocodeCity(city: string) {
    const url =
        `https://geocoding-api.open-meteo.com/v1/search` +
        `?name=${encodeURIComponent(city)}` +
        `&language=de` +
        `&count=10` +
        `&countryCode=DE`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Geocoding API Fehler");

    const data = await res.json();

    // nur Städte in Deutschland durchlassen
    const deOnly = (data.results || []).filter((r: {country_code: string}) => r.country_code === "DE");

    if (deOnly.length === 0) {
        throw new Error(`„${city}“ wurde nicht in Deutschland gefunden.`);
    }

    // nach Bevölkerungsgröße sortieren (beste Treffer zuerst)
    deOnly.sort((a: {population: number}, b: {population: number}) => (b.population ?? 0) - (a.population ?? 0));
    const best = deOnly[0];

    return {
        lat: best.latitude,
        lon: best.longitude,
        name: best.name,
        admin1: best.admin1,
    };
}

