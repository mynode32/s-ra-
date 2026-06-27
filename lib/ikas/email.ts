import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCouponEmail(customerEmail: string, couponCode: string, storeName: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Sıra Bekleme Listesi <onboarding@resend.dev>', // Resend test domain (canlıda değiştirilir)
      to: [customerEmail],
      subject: `🎉 Tebrikler! ${storeName} mağazasından indirim kazandınız`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Tebrikler!</h2>
          <p>Bekleme listemizdeki referans hedefine ulaştınız ve <strong>${storeName}</strong> mağazasında kullanabileceğiniz özel indirim kodunuzu kazandınız!</p>
          <div style="background-color: #f4f4f5; padding: 20px; text-align: center; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 0; color: #52525b; font-size: 14px;">İndirim Kodunuz</p>
            <h1 style="margin: 8px 0 0 0; color: #18181b; font-family: monospace;">${couponCode}</h1>
          </div>
          <p>Bu kodu ödeme sayfasında kullanarak %20 indiriminizi hemen uygulayabilirsiniz.</p>
          <p style="color: #71717a; font-size: 12px; margin-top: 40px;">Bu kod sadece size özeldir ve tek kullanımlıktır.</p>
        </div>
      `
    });

    if (error) {
      console.error('Email sending error:', error);
      throw new Error('E-posta gönderilemedi');
    }

    return data;
  } catch (err) {
    console.error('Resend process failed:', err);
    throw err;
  }
}
