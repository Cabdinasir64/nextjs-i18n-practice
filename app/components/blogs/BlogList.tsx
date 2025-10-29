"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "../../store/languageStore";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogPost {
    id: number;
    title: Record<string, string>;
    description: Record<string, string>;
    image: string;
    slug: string;
}

export default function BlogList() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const { language } = useLanguageStore();
    const { t } = useTranslation();

    const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

    useEffect(() => {
        setDir(language === "ar" ? "rtl" : "ltr");
    }, [language]);

    useEffect(() => {
        fetch("/api/blog")
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    return (
        <section className="max-w-6xl mx-auto px-6 py-16">
            <h2
                className={`text-3xl md:text-4xl font-bold mb-10 text-center ${dir === "rtl" ? "md:text-right text-right" : "md:text-left text-left"
                    }`}
            >
                {t("blog.title")}
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, i) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                    >
                        <div
                            className={`flex flex-col ${dir === "rtl" ? "md:flex-col-s" : "md:flex-col"
                                }`}
                        >
                            <div className="relative w-full h-60">
                                <Image
                                    src={post.image}
                                    alt={post.title[language]}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className={`p-6 ${dir === "rtl" ? "text-right" : "text-left"}`}>
                                <h3 className="text-xl md:text-2xl font-semibold mb-3">
                                    {post.title[language]}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                                    {post.description[language]}
                                </p>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-500 transition"
                                >
                                    {t("blog.readMore")}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}