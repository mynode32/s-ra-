import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // satıcı kurulum linkine tıklandığında gelen mağaza adı
  const storeName = searchParams.get('store_name') || searchParams.get('shop');

  if (!storeName) {
    return NextResponse.json({ error: 'Missing store_name parameter. Please provide your ikas store name.' }, { status: 400 });
  }

  const clientId = process.env.IKAS_CLIENT_ID;
  if (!clientId || clientId.includes('6f8465b2')) {
    return NextResponse.json({ 
      error: 'Vercel hala eski şifreyi (veya boş şifreyi) okuyor!', 
      current_client_id: clientId || 'BOMBOŞ'
    }, { status: 400 });
  }
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/ikas/callback`;
  const scopes = 'write_discounts'; // Kupon oluşturmak için gereken yetki

  // İkas yetkilendirme ekranına yönlendir
  const authUrl = new URL(`https://${storeName}.myikas.com/api/admin/oauth/authorize`);
  authUrl.searchParams.set('client_id', clientId!);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', scopes);
  authUrl.searchParams.set('state', storeName); // Callback'te mağazayı hatırlamak için
  
  return NextResponse.redirect(authUrl.toString());
}
