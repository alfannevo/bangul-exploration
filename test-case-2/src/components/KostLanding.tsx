'use client'

import {
  BangulBrandLogoMamikos,
  BangulIllustration,
  BangulButton,
  BangulInput,
  BangulDivider,
  BangulFooter,
} from 'bangul-vue/react'

const FEATURES = [
  {
    illustration: 'easy-find-kos',
    title: 'Mudah Ditemukan',
    desc: 'Cari kost berdasarkan lokasi, harga, dan fasilitas dengan mudah dalam satu aplikasi.',
  },
  {
    illustration: 'favorite-kos',
    title: 'Simpan Favorit',
    desc: 'Simpan dan bandingkan kost favoritmu sebelum memutuskan pilihan terbaik.',
  },
  {
    illustration: 'safe-payment',
    title: 'Pembayaran Aman',
    desc: 'Bayar kost dengan aman menggunakan berbagai metode pembayaran terpercaya.',
  },
]

const POPULAR_CITIES = ['Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya', 'Semarang', 'Malang']

const STATS = [
  { value: '2 Juta+', label: 'Kost Tersedia' },
  { value: '500+', label: 'Kota di Indonesia' },
  { value: '5 Juta+', label: 'Pengguna Aktif' },
  { value: '10 Tahun', label: 'Pengalaman' },
]

export default function KostLanding() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #e8e8e8',
        padding: '12px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <a href="/kost" style={{ display: 'flex', alignItems: 'center', width: 128, textDecoration: 'none' }}>
            <BangulBrandLogoMamikos rootStyle={{ width: '128px' }} />
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a
              href="#"
              className="bg-c-text bg-c-text--label-2"
              style={{ color: '#404040', textDecoration: 'none' }}
            >
              Jual / Sewa
            </a>
            <a
              href="#"
              className="bg-c-text bg-c-text--label-2"
              style={{ color: '#404040', textDecoration: 'none', marginRight: 4 }}
            >
              Bantuan
            </a>
            <BangulButton variant="secondary" size="sm">Masuk</BangulButton>
            <BangulButton variant="primary" size="sm">Daftar</BangulButton>
          </nav>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #f0faf4 0%, #e3f4eb 100%)', padding: '64px 24px' }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 48,
          flexWrap: 'wrap',
        }}>
          {/* Left: copy + search */}
          <div style={{ flex: '1 1 380px' }}>
            <h1
              className="bg-c-text bg-c-text--heading-1"
              style={{ color: '#1a3d2b', marginBottom: 16 }}
            >
              Cari Kost<br />Impianmu
            </h1>
            <p
              className="bg-c-text bg-c-text--body-1"
              style={{ color: '#555', marginBottom: 32, maxWidth: 440 }}
            >
              Ribuan pilihan kost terbaik di seluruh Indonesia. Harga terjangkau,
              lokasi strategis, dan fasilitas lengkap menunggumu.
            </p>

            {/* Search row — BangulInput + BangulButton are siblings, not nested in Veaury slots */}
            <div style={{ display: 'flex', gap: 10, maxWidth: 500 }}>
              <div style={{ flex: 1 }}>
                <BangulInput
                  placeholder="Cari kota, kecamatan, atau area..."
                  size="lg"
                  icon="search"
                />
              </div>
              <BangulButton variant="primary" size="lg">Cari</BangulButton>
            </div>

            {/* Popular cities */}
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <span className="bg-c-text bg-c-text--label-3" style={{ color: '#888', alignSelf: 'center' }}>
                Populer:
              </span>
              {POPULAR_CITIES.map(city => (
                <a
                  key={city}
                  href="#"
                  style={{
                    padding: '4px 12px',
                    borderRadius: 20,
                    border: '1px solid #2d7d46',
                    color: '#2d7d46',
                    fontSize: 13,
                    textDecoration: 'none',
                    background: '#fff',
                  }}
                >
                  {city}
                </a>
              ))}
            </div>
          </div>

          {/* Right: illustration */}
          <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 320, maxWidth: '100%' }}>
              <BangulIllustration name="easy-find-kos" alt="Cari kost impian" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Mamikos ─────────────────────────────────────────────── */}
      <section style={{ padding: '72px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2
            className="bg-c-text bg-c-text--heading-2"
            style={{ textAlign: 'center', marginBottom: 8 }}
          >
            Kenapa Pilih Mamikos?
          </h2>
          <p
            className="bg-c-text bg-c-text--body-1"
            style={{ textAlign: 'center', color: '#888', marginBottom: 48 }}
          >
            Lebih dari 2 juta kost tersedia — temukan yang paling sesuai untukmu
          </p>

          {/* Feature cards — BEM containers, Bangul only as leaves */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {FEATURES.map(f => (
              <div
                key={f.illustration}
                className="bg-c-card bg-c-card--md"
                style={{ textAlign: 'center', padding: '32px 24px' }}
              >
                <div style={{ width: 160, margin: '0 auto 20px' }}>
                  <BangulIllustration name={f.illustration} alt={f.title} />
                </div>
                <h3 className="bg-c-text bg-c-text--heading-5" style={{ marginBottom: 8 }}>
                  {f.title}
                </h3>
                <p className="bg-c-text bg-c-text--body-2" style={{ color: '#888' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────────────── */}
      <section style={{ background: '#2d7d46', padding: '48px 24px' }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 32,
          textAlign: 'center',
        }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <p
                className="bg-c-text bg-c-text--heading-2"
                style={{ color: '#fff', marginBottom: 4 }}
              >
                {s.value}
              </p>
              <p
                className="bg-c-text bg-c-text--body-2"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Kost di Sekitarmu ───────────────────────────────────────── */}
      <section style={{ padding: '72px 24px', background: '#f9f9f9' }}>
        <div style={{
          maxWidth: 960,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 48,
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 240 }}>
              <BangulIllustration name="kos-around" alt="Kost di sekitar kamu" />
            </div>
          </div>
          <div style={{ flex: '1 1 280px' }}>
            <h2 className="bg-c-text bg-c-text--heading-3" style={{ marginBottom: 12 }}>
              Kost di Sekitar Kamu
            </h2>
            <p
              className="bg-c-text bg-c-text--body-1"
              style={{ color: '#666', marginBottom: 24, maxWidth: 400 }}
            >
              Aktifkan lokasi dan temukan kost terbaik yang paling dekat
              dengan aktivitas, kampus, atau tempatmu bekerja.
            </p>
            <BangulButton variant="primary" size="lg">Aktifkan Lokasi</BangulButton>
          </div>
        </div>
      </section>

      {/* ── Fasilitas Lengkap ────────────────────────────────────────── */}
      <section style={{ padding: '72px 24px', background: '#fff' }}>
        <div style={{
          maxWidth: 960,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 48,
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: '1 1 280px' }}>
            <h2 className="bg-c-text bg-c-text--heading-3" style={{ marginBottom: 12 }}>
              Fasilitas Kost Lengkap
            </h2>
            <p
              className="bg-c-text bg-c-text--body-1"
              style={{ color: '#666', marginBottom: 24, maxWidth: 400 }}
            >
              Filter kost berdasarkan fasilitas yang kamu butuhkan — WiFi,
              AC, kamar mandi dalam, parkir, hingga dapur bersama.
            </p>
            <BangulButton variant="secondary" size="lg">Lihat Semua Fasilitas</BangulButton>
          </div>
          <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 240 }}>
              <BangulIllustration name="kos-facilities-around" alt="Fasilitas kost lengkap" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Download App CTA ────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #1a3d2b 0%, #2d7d46 100%)',
        padding: '72px 24px',
      }}>
        <div style={{
          maxWidth: 960,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 48,
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: '1 1 280px' }}>
            <h2
              className="bg-c-text bg-c-text--heading-3"
              style={{ color: '#fff', marginBottom: 12 }}
            >
              Download Aplikasi Mamikos
            </h2>
            <p
              className="bg-c-text bg-c-text--body-1"
              style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 28 }}
            >
              Cari, pilih, dan bayar kost langsung dari genggamanmu.
              Tersedia di Google Play dan App Store.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <BangulButton variant="secondary" size="md">Google Play</BangulButton>
              <BangulButton variant="secondary" size="md">App Store</BangulButton>
            </div>
          </div>
          <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 220 }}>
              <BangulIllustration name="mamikos-benefit" alt="Download Mamikos App" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <BangulFooter />
    </div>
  )
}
