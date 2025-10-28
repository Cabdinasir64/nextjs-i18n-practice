"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import HeroImg from "../../assets/download.jpeg";

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section className="relative bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 flex flex-col-reverse md:flex-row items-center gap-12">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 text-center md:text-left"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
                        {t("hero.title")}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-100/90">
                        {t("hero.description")}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                        <Link
                            href="/get-started"
                            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            {t("hero.getStarted")}
                        </Link>
                        <Link
                            href="/read-more"
                            className="px-8 py-3 border-2 border-white text-white rounded-2xl hover:bg-white hover:text-blue-600 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300"
                        >
                            {t("hero.readMore")}
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 relative w-full max-w-md mx-auto"
                >
                    <Image
                        src={HeroImg}
                        alt="Hero Illustration"
                        className="w-full h-auto rounded-3xl shadow-2xl"
                        priority
                    />
                </motion.div>

            </div>

            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500 rounded-full opacity-30 blur-3xl pointer-events-none"></div>
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gray-400 rounded-full opacity-30 blur-3xl pointer-events-none"></div>
        </section>
    );
}
