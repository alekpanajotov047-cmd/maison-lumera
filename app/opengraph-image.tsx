import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Maison Lumèra — Haute Parfumerie de Grasse';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#FAF6F0',
          display: 'flex',
          flexDirection: 'column',
          padding: 80,
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Hairline ornament top */}
        <div
          style={{
            position: 'absolute',
            top: 80,
            left: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 16,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#B08968',
          }}
        >
          <span style={{ fontStyle: 'italic' }}>I</span>
          <span style={{ width: 40, height: 1, background: '#B08968' }} />
          <span>Haute Parfumerie · Grasse · 1948</span>
        </div>

        {/* Main wordmark */}
        <div
          style={{
            margin: 'auto 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 140,
              lineHeight: 1,
              color: '#2A1F18',
              fontWeight: 300,
              letterSpacing: -4,
              display: 'flex',
            }}
          >
            Maison
          </div>
          <div
            style={{
              fontSize: 160,
              lineHeight: 1,
              color: '#B08968',
              fontStyle: 'italic',
              fontWeight: 300,
              letterSpacing: -4,
              display: 'flex',
            }}
          >
            Lumèra
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 30,
              fontStyle: 'italic',
              color: '#6B5B4E',
              maxWidth: 760,
              lineHeight: 1.3,
              display: 'flex',
            }}
          >
            Тих език на светлината. Четири аромата, създадени на ръка в Грас.
          </div>
        </div>

        {/* Hairline ornament bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 80,
            right: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 14,
            letterSpacing: 5,
            textTransform: 'uppercase',
            color: '#6B5B4E',
          }}
        >
          <span>maison-lumera.com</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 32, height: 1, background: '#C9A961' }} />
            <span style={{ color: '#C9A961', fontStyle: 'italic' }}>✦</span>
            <span style={{ width: 32, height: 1, background: '#C9A961' }} />
          </span>
          <span>One of one</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
