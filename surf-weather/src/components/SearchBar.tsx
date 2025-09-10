import { useState } from "react";

interface Props {
    onSearch: (city: string) => void;
}

export const SearchBar: React.FC<Props> = ({ onSearch }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            const city = input.trim();
            const formattedCity =
                city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
            onSearch(formattedCity);
            setInput("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 z-10">
            <input
                type="text"
                placeholder="Gib eine Stadt in Deutschland ein"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-3 bg-white rounded-xl border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
            >
                Suchen
            </button>
        </form>
    );
};
