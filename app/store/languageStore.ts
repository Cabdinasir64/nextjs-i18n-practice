import { create } from "zustand";

export type Language = "en" | "ar" | "so";

interface LanguageOption {
    code: Language;
    name: string;
    flag: string;
}

interface LanguageState {
    language: Language;
    languages: LanguageOption[];
    setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: "en",

    languages: [
        { code: "en", name: "English", flag: "🇬🇧" },
        { code: "ar", name: "العربية", flag: "🇸🇦" },
        { code: "so", name: "Af-Soomaali", flag: "🇸🇴" },
    ],

    setLanguage: (lang) => set({ language: lang }),
}));
