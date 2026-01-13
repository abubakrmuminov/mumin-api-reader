'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { hadithApi } from '@/lib/api/client';
import { getCollectionSlug } from '@/lib/utils';

export default function HadithRedirectPage() {
    const params = useParams();
    const router = useRouter();
    const id = parseInt(params.id as string);

    useEffect(() => {
        async function performRedirect() {
            if (!id) return;
            try {
                const hadith = await hadithApi.getHadithById(id);
                if (hadith) {
                    const slug = getCollectionSlug(hadith.collection);
                    router.replace(`/collections/${slug}/${hadith.hadithNumber}`);
                } else {
                    router.replace('/404');
                }
            } catch (err) {
                console.error('Redirect failed', err);
                router.replace('/');
            }
        }
        performRedirect();
    }, [id, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-sand">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-emerald-900/10 border-t-gold-500 rounded-full animate-spin" />
                <p className="text-emerald-900/40 font-bold uppercase tracking-widest text-xs">Redirecting to SEO URL...</p>
            </div>
        </div>
    );
}
