import { NextResponse } from "next/server";
import Img from '../../assets/download.jpeg'

export const GET = async () => {
    const posts = [
        {
            id: 1,
            title: {
                en: "Understanding React Hooks",
                so: "Fahanka React Hooks",
                ar: "فهم React Hooks"
            },
            description: {
                en: "Learn how to use React hooks in your applications.",
                so: "Baro sida loo isticmaalo React hooks ee apps-kaaga.",
                ar: "تعلم كيفية استخدام React hooks في تطبيقاتك."
            },
            image: Img,
            slug: "react-hooks"
        },
        {
            id: 2,
            title: {
                en: "Next.js Best Practices",
                so: "Tabaha Ugu Wanaagsan ee Next.js",
                ar: "أفضل ممارسات Next.js"
            },
            description: {
                en: "Tips and tricks for building scalable Next.js apps.",
                so: "Talooyin iyo xeelado lagu dhiso Next.js apps waaweyn.",
                ar: "نصائح وحيل لبناء تطبيقات Next.js قابلة للتطوير."
            },
            image: Img,
            slug: "nextjs-best-practices"
        }
    ];

    return NextResponse.json(posts);
};
