import Link from 'next/link';
import { CheckCircle2, Clock3, Phone } from 'lucide-react';

export const metadata = {
  title: 'Booking confirmed',
  description: 'Your Certifire UK booking has been received.'
};

export default function BookingConfirmedPage() {
  return (
    <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:'32px 20px',background:'radial-gradient(circle at 50% 15%, rgba(242,181,77,.14), transparent 28%), #0b0d0f',color:'#fff'}}>
      <section style={{width:'min(720px,100%)',padding:'42px 32px',border:'1px solid rgba(242,181,77,.24)',borderRadius:28,background:'linear-gradient(145deg,rgba(26,27,28,.98),rgba(15,16,17,.98))',boxShadow:'0 28px 80px rgba(0,0,0,.35)',textAlign:'center'}}>
        <div style={{width:64,height:64,borderRadius:'50%',display:'grid',placeItems:'center',margin:'0 auto 20px',background:'rgba(242,181,77,.12)',color:'#f2b54d',border:'1px solid rgba(242,181,77,.28)'}}><CheckCircle2 size={34}/></div>
        <p style={{margin:'0 0 8px',color:'#f2b54d',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',fontSize:13}}>Payment successful</p>
        <h1 style={{fontFamily:'var(--font-oswald)',fontSize:'clamp(36px,7vw,62px)',lineHeight:1,margin:'0 0 18px'}}>Your booking is confirmed.</h1>
        <p style={{fontSize:18,lineHeight:1.65,color:'#c8c4bd',margin:'0 auto 26px',maxWidth:590}}>Thank you. Certifire UK has received your booking and property details. Online bookings are attended within the next 7 working days.</p>
        <div style={{display:'flex',gap:12,justifyContent:'center',alignItems:'center',flexWrap:'wrap',marginBottom:28,color:'#d7d2ca'}}>
          <span style={{display:'inline-flex',gap:8,alignItems:'center'}}><Clock3 size={18}/> Attendance within 7 working days</span>
          <span style={{display:'inline-flex',gap:8,alignItems:'center'}}><Phone size={18}/> 07308 449574</span>
        </div>
        <p style={{fontSize:14,lineHeight:1.6,color:'#908b84',margin:'0 0 26px'}}>If Certifire needs anything further regarding access or the property, they will contact you using the details supplied at checkout.</p>
        <Link href="/" style={{display:'inline-flex',padding:'13px 20px',borderRadius:999,background:'#f2b54d',color:'#17120b',fontWeight:800,textDecoration:'none'}}>Back to Certifire UK</Link>
      </section>
    </main>
  );
}
