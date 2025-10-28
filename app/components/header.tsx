"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguageStore } from "../store/languageStore";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/UI/LanguageSelector";
import '../i18n'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { language } = useLanguageStore();
    const { t } = useTranslation();

    const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
    
    useEffect(() => {
        setDir(language === "ar" ? "rtl" : "ltr");
        document.dir = language === "ar" ? "rtl" : "ltr";
    }, [language]);

    const navLinks = [
        { href: "/", label: t("nav.home") },
        { href: "/about", label: t("nav.about") },
        { href: "/blog", label: t("nav.blog") },
        { href: "/contact", label: t("nav.contact") },
    ];

    return (
        <header
            className={`w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50 ${dir === "rtl" ? "text-right" : "text-left"
                }`}
        >
            <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl font-bold text-blue-600"
                >
                    I18N 🌐
                </motion.div>

                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link, i) => (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={link.href}
                                className="text-gray-700 hover:text-blue-600 transition font-medium"
                            >
                                {link.label}
                            </Link>
                        </motion.div>
                    ))}
                    <div className="ml-3">
                        <LanguageSelector />
                    </div>
                </nav>

                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white shadow-inner border-t border-gray-100"
                    >
                        <div className="flex flex-col items-start px-4 py-3 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-gray-700 hover:text-blue-600 font-medium transition"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="mt-2">
                                <LanguageSelector />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
