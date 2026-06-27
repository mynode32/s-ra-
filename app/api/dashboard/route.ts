import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const store_id = searchParams.get('store_id');

    if (!store_id) {
      return NextResponse.json({ error: 'store_id parametresi gerekli' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Tüm kayıtları çek (Gerçek veriler)
    const { data: entries, error } = await supabase
      .from('waitlist_entries')
      .select('*')
      .eq('store_id', store_id)
      .order('position', { ascending: true });

    if (error) throw error;

    // 2. İstatistikleri hesapla
    const totalSignups = entries.length;
    
    // Referansla gelenler (referred_by'ı dolu olanlar)
    const referredSignups = entries.filter(e => e.referred_by).length;
    
    // Onay bekleyenler (biz hepsini confirmed yaptık ama demo için tutabiliriz)
    const pendingSignups = entries.filter(e => e.status === 'unconfirmed').length;

    // Referans paylaşımı yüzdesi
    const refSharePct = totalSignups > 0 ? Math.round((referredSignups / totalSignups) * 100) : 0;
    
    // Basit bir K-faktörü hesaplama (Referansla gelenler / Davet eden benzersiz kişi sayısı)
    const uniqueReferrers = new Set(entries.filter(e => e.referred_by).map(e => e.referred_by)).size;
    const kFactor = uniqueReferrers > 0 ? (referredSignups / uniqueReferrers).toFixed(1) : "0.0";

    // 3. Liderlik Tablosu (Leaderboard) hesaplama
    // Kimin kaç kişiyi davet ettiğini sayalım
    const referralCounts: Record<string, number> = {};
    entries.forEach(e => {
      if (e.referred_by) {
        referralCounts[e.referred_by] = (referralCounts[e.referred_by] || 0) + 1;
      }
    });

    // En çok davet edenleri sırala
    const leaderboard = Object.entries(referralCounts)
      .map(([id, count]) => {
        const person = entries.find(e => e.id === id);
        return {
          id,
          person: person?.email || 'Bilinmeyen',
          handle: '@' + (person?.email?.split('@')[0] || 'user'),
          referrals: count,
          rank: 0 // Aşağıda atanacak
        };
      })
      .sort((a, b) => b.referrals - a.referrals)
      .map((item, index) => ({ ...item, rank: index + 1 }));

    // 4. Son kayıtlar listesini hazırla
    const recentSignups = [...entries].reverse().map(e => ({
      id: e.id,
      person: e.email,
      source: e.referred_by ? 'Referans' : 'Doğrudan',
      status: e.status, // veya 'rewarded' olabilir eğer kupon verdiysek
      position: e.position,
      referrals: referralCounts[e.id] || 0,
      joined: new Date(e.created_at).toLocaleDateString('tr-TR')
    }));

    return NextResponse.json({
      success: true,
      stats: {
        totalSignups,
        referredSignups,
        refSharePct,
        kFactor,
        pendingSignups,
      },
      leaderboard,
      recentSignups
    });

  } catch (err: any) {
    console.error("Dashboard API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
