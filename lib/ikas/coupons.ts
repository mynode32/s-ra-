import { createClient } from '@/lib/supabase/server';

export async function generateIkasCoupon(storeId: string, customerEmail: string, discountPercentage: number = 20) {
  const supabase = await createClient();

  // 1. Mağazanın API erişim bilgilerini Supabase'den çek
  const { data: store, error } = await supabase
    .from('stores')
    .select('access_token')
    .eq('id', storeId)
    .single();

  if (error || !store) {
    console.error('Mağaza bulunamadı:', error);
    throw new Error('Mağaza bulunamadı veya yetkilendirme eksik.');
  }

  // 2. İkas GraphQL API Mutation
  // Not: Bu mutasyon ikas'ın güncel dökümantasyonundaki kampanya/kupon oluşturma
  // şemasına göre uyarlanmıştır. (Örnek şema)
  const query = `
    mutation CouponCreate($input: CouponCreateInput!) {
      couponCreate(input: $input) {
        coupon {
          id
          code
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  // Benzersiz, tek kullanımlık ve tahmine kapalı bir kupon kodu üretiyoruz
  const uniqueCode = `SIRA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const variables = {
    input: {
      code: uniqueCode,
      isActive: true,
      usageLimit: 1, // Sadece 1 kere kullanılabilir (Suistimali engeller)
      discountType: 'PERCENTAGE',
      discountValue: discountPercentage,
      name: `Sıra Ödülü - ${customerEmail}`
    }
  };

  try {
    // 3. ikas Admin API'ye isteği at
    const response = await fetch('https://api.myikas.com/api/v2/admin/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.access_token}` // OAuth'tan aldığımız güvenli token
      },
      body: JSON.stringify({ query, variables })
    });

    const result = await response.json();
    
    // Hata kontrolü
    if (result.errors || result.data?.couponCreate?.userErrors?.length > 0) {
      console.error('ikas API Error:', result.errors || result.data.couponCreate.userErrors);
      throw new Error('ikas üzerinde indirim kodu oluşturulamadı');
    }

    // Başarıyla oluşturulan kupon kodunu döndür
    return result.data.couponCreate.coupon.code;

  } catch (err) {
    console.error('Kupon üretme işlemi başarısız oldu:', err);
    throw err;
  }
}
