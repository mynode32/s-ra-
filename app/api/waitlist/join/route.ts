import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateIkasCoupon } from '@/lib/ikas/coupons';

export async function POST(request: Request) {
  try {
    const { email, store_id, ref_code } = await request.json();

    if (!email || !store_id) {
      return NextResponse.json({ error: 'Email ve store_id zorunludur' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Mağazayı kontrol et
    const { data: store, error: storeError } = await supabase
      .from('stores')
      .select('*')
      .eq('id', store_id)
      .single();

    if (storeError || !store) {
      return NextResponse.json({ error: 'Geçersiz mağaza' }, { status: 400 });
    }

    // 2. Email daha önce kayıtlı mı?
    const { data: existingEntry } = await supabase
      .from('waitlist_entries')
      .select('*')
      .eq('store_id', store_id)
      .eq('email', email)
      .single();

    if (existingEntry) {
      return NextResponse.json({ 
        message: 'Zaten kayıtlısınız!', 
        position: existingEntry.position,
        referral_code: existingEntry.referral_code,
        referral_count: 0
      });
    }

    // 3. Sıra numarasını (position) belirle
    const { count } = await supabase
      .from('waitlist_entries')
      .select('*', { count: 'exact', head: true })
      .eq('store_id', store_id);

    const position = (count || 0) + 1;

    // 4. Benzersiz bir referans kodu oluştur (emailin başı + rastgele 4 hane)
    const seed = email.split('@')[0].replace(/[^a-z0-9]/gi, '').toLowerCase();
    const randomHex = Math.random().toString(36).substring(2, 6);
    const referralCode = `${seed}-${randomHex}`;

    // 5. Eğer bir referans koduyla geldiyse, referans edeni bul
    let referredById = null;
    let referrerEntry = null;
    if (ref_code) {
      const { data: referrer } = await supabase
        .from('waitlist_entries')
        .select('*')
        .eq('store_id', store_id)
        .eq('referral_code', ref_code)
        .single();
        
      if (referrer) {
        referredById = referrer.id;
        referrerEntry = referrer;
      }
    }

    // 6. Yeni kaydı veritabanına ekle
    const { data: newEntry, error: insertError } = await supabase
      .from('waitlist_entries')
      .insert({
        store_id,
        email,
        referral_code: referralCode,
        referred_by: referredById,
        position,
        status: 'confirmed' // Test amaçlı direkt onaylıyoruz
      })
      .select()
      .single();

    if (insertError) {
      console.error("Kayıt hatası:", insertError);
      return NextResponse.json({ error: 'Kayıt sırasında bir hata oluştu' }, { status: 500 });
    }

    // 7. VİRAL DÖNGÜ & ÖDÜL KONTROLÜ (Eğer referansla geldiyse)
    if (referrerEntry) {
      // Davet edenin toplam getirdiği kişi sayısını say
      const { count: referralCount } = await supabase
        .from('waitlist_entries')
        .select('*', { count: 'exact', head: true })
        .eq('referred_by', referrerEntry.id);

      const targetRef = 2; // TEST AMAÇLI: 2 kişide kupon ver!

      if (referralCount === targetRef) {
        console.log(`[ÖDÜL KİLİDİ AÇILDI] ${referrerEntry.email} ${targetRef} kişiyi getirdi!`);
        
        try {
          // İkas Kuponu Oluştur
          const couponCode = await generateIkasCoupon(
            store_id, 
            referrerEntry.email, 
            20
          );
          
          console.log("Oluşturulan İkas Kuponu:", couponCode);
          
          // Resend ile Mail Gönder
          const { Resend } = require('resend');
          const resend = new Resend(process.env.RESEND_API_KEY);
          
          await resend.emails.send({
            from: 'Sıra Rewards <onboarding@resend.dev>', // Test için resend.dev kullanılır, canlıda kendi domainin olacak
            to: referrerEntry.email,
            subject: '🎉 Tebrikler! İndirim Kuponunu Kazandın!',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>Harika bir iş çıkardın!</h2>
                <p>Tam <strong>${targetRef}</strong> kişiyi bekleme listesine davet ettin ve ödülünü açtın.</p>
                <div style="background: #f4f4f5; padding: 20px; text-align: center; border-radius: 12px; margin: 20px 0;">
                  <p style="margin: 0; color: #52525b; font-size: 14px;">Mağazamızda geçerli %20 İndirim Kodun</p>
                  <p style="margin: 10px 0 0; font-size: 24px; font-weight: bold; color: #18181b; letter-spacing: 2px;">
                    ${couponCode}
                  </p>
                </div>
                <p style="color: #71717a; font-size: 14px;">Hemen alışverişe başla ve indiriminin tadını çıkar!</p>
              </div>
            `
          });
          
          console.log(`[MAIL GÖNDERİLDİ] Kupon ${referrerEntry.email} adresine iletildi.`);
          
        } catch (couponError) {
          console.error("İkas kuponu oluşturulamadı:", couponError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      position: newEntry.position,
      referral_code: newEntry.referral_code,
      referral_count: 0
    });

  } catch (err: any) {
    console.error("Waitlist API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
