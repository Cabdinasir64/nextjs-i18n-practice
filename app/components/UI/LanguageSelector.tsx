"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Language, useLanguageStore } from "../../store/languageStore";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { languages, language, setLanguage } = useLanguageStore();
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang as Language);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 text-gray-800 w-full md:w-auto"
      >
        <span className="text-xl">{currentLang?.flag}</span>
        <span className="text-base font-medium">{currentLang?.name}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-500"
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute mt-2 w-full md:w-48 right-0 rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 backdrop-blur-sm bg-white/95"
          >
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                onClick={() => handleChange(lang.code)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-gray-800 text-base hover:bg-gray-50 transition-all duration-200 ${lang.code === language
                    ? "bg-blue-50 text-blue-600 font-semibold border-r-2 border-blue-600"
                    : ""
                  }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="flex-1">{lang.name}</span>
                {lang.code === language && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-blue-600 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}