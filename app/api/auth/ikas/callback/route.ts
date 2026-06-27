import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const storeName = searchParams.get('state'); // route.ts'te gönderdiğimiz state

  if (!code || !storeName) {
    return NextResponse.json({ error: 'Missing code or state parameter' }, { status: 400 });
  }

  const clientId = (process.env.IKAS_CLIENT_ID || '').trim();
  const clientSecret = (process.env.IKAS_CLIENT_SECRET || '').trim();
  const redirectUri = `${(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').trim()}/api/auth/ikas/callback`;

  // Code'u Access Token'a çevir
  const tokenUrl = `https://${storeName}.myikas.com/api/admin/oauth/token`;
  const body = new URLSearchParams({
    client_id: clientId!,
    client_secret: clientSecret!,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri
  });

  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('ikas token error:', tokenData);
      return NextResponse.json({ error: 'Failed to get token from ikas' }, { status: 400 });
    }

    const { access_token, refresh_token } = tokenData;

    // Supabase'e Satıcıyı Kaydet
    const supabase = await createClient();
    const { data: store, error } = await supabase
      .from('stores')
      .upsert({
        ikas_merchant_id: storeName,
        access_token: access_token,
        refresh_token: refresh_token || '',
        store_url: `https://${storeName}.myikas.com`
      }, { onConflict: 'ikas_merchant_id' })
      .select()
      .single();

    if (error) {
      console.error('Supabase save error:', error);
      return NextResponse.json({ error: 'Database error while saving store' }, { status: 500 });
    }

    // Kurulum başarılı, satıcıyı kendi özel paneline (dashboard) yönlendiriyoruz
    return NextResponse.redirect(new URL(`/dashboard?store_id=${store.id}`, request.url));
  } catch (error) {
    console.error('OAuth callback process error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
