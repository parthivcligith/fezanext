import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://fezamattresses.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
    ]
}
