const CDN = "https://static-nanas-asset.kerupux.com/assets/bangul";
const CDN_IL = `${CDN}/illustrations`;
const CDN_BL = `${CDN}/brand-logos`;
const CDN_OT = `${CDN}/others`;

export default function KostLandingPage() {
  const listings = [
    {
      id: 1,
      name: "Kost Harmoni Bintaro",
      location: "Bintaro, Tangerang Selatan",
      price: "Rp 1.200.000",
      type: "Putri",
      rating: 4.8,
      reviews: 42,
      illustration: "furnished-room-color",
    },
    {
      id: 2,
      name: "Kost Griya Menteng",
      location: "Menteng, Jakarta Pusat",
      price: "Rp 2.500.000",
      type: "Campur",
      rating: 4.6,
      reviews: 31,
      illustration: "empty-room-color",
    },
    {
      id: 3,
      name: "Kost Sejahtera Depok",
      location: "Margonda, Depok",
      price: "Rp 900.000",
      type: "Putra",
      rating: 4.5,
      reviews: 58,
      illustration: "type-kos",
    },
  ];

  const features = [
    {
      illustration: "easy-find-kos",
      title: "Mudah Dicari",
      desc: "Temukan ribuan pilihan kost di seluruh Indonesia hanya dalam hitungan detik.",
    },
    {
      illustration: "verified-account",
      title: "Terverifikasi",
      desc: "Setiap kost sudah diverifikasi langsung oleh tim Mamikos.",
    },
    {
      illustration: "chat-owner",
      title: "Chat Langsung",
      desc: "Hubungi pemilik kost langsung tanpa perantara.",
    },
    {
      illustration: "safe-payment",
      title: "Booking Aman",
      desc: "Proses booking dan pembayaran yang aman dan terpercaya.",
    },
  ];

  return (
    <div style={{ fontFamily: "Lato, sans-serif", color: "#404040" }}>

      {/* Navbar */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #e8e8e8", padding: "0 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img
            className="bg-c-brand-logo"
            src={`${CDN_BL}/mamikos-logotype-green.svg`}
            alt="Mamikos"
            style={{ height: 28 }}
          />
          <nav style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <a href="#" className="bg-c-link bg-c-link--medium-naked">
              <span className="bg-c-text bg-c-text--body-2">Cari Kost</span>
            </a>
            <a href="#" className="bg-c-link bg-c-link--medium-naked">
              <span className="bg-c-text bg-c-text--body-2">Pasang Iklan</span>
            </a>
            <a href="/login">
              <button className="bg-c-button bg-c-button--secondary bg-c-button--md">Masuk</button>
            </a>
            <a href="/login">
              <button className="bg-c-button bg-c-button--primary bg-c-button--md">Daftar</button>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #008742 0%, #1baa56 100%)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", gap: 48 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 className="bg-c-text bg-c-text--heading-1" style={{ color: "#ffffff", marginBottom: 12 }}>
              Cari Kost Impianmu
            </h1>
            <p className="bg-c-text bg-c-text--body-landing" style={{ color: "#b8e4ca", marginBottom: 40 }}>
              Lebih dari 1 juta pilihan kost di seluruh Indonesia. Murah, nyaman, dan terverifikasi.
            </p>

            {/* Search bar */}
            <div className="bg-c-card bg-c-card--md">
              <div className="bg-c-field">
                <div className="bg-c-field__label">
                  <label className="bg-c-text bg-c-text--label-2" htmlFor="search-location">
                    Lokasi atau nama kost
                  </label>
                </div>
                <div className="bg-c-input bg-c-input--lg">
                  <input
                    className="bg-c-input__field"
                    id="search-location"
                    type="text"
                    placeholder="Contoh: Kost di Depok, dekat UI"
                  />
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <button className="bg-c-button bg-c-button--primary bg-c-button--lg bg-c-button--block">
                  Cari Kost
                </button>
              </div>
            </div>

            {/* Quick tags */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24 }}>
              {["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Depok"].map((city) => (
                <button key={city} className="bg-c-tag bg-c-tag--md" style={{ cursor: "pointer" }}>
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Hero illustration */}
          <div style={{ flexShrink: 0, display: "none" }} className="hero-illustration">
            <img
              className="bg-c-illustration"
              src={`${CDN_IL}/mamikos-benefit.svg`}
              alt="Cari kost mudah dengan Mamikos"
              style={{ width: 320 }}
            />
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section style={{ background: "#fafafa", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <h2 className="bg-c-text bg-c-text--heading-2">Kost Pilihan Terbaik</h2>
            <p className="bg-c-text bg-c-text--body-2" style={{ marginTop: 4 }}>
              Dipilih berdasarkan rating dan ulasan penghuni
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {listings.map((kost) => (
              <div key={kost.id} className="bg-c-card bg-c-card--md bg-c-card--shadow bg-c-card--clickable">
                {/* Illustration as room preview */}
                <div style={{ background: "#f6f6f6", borderRadius: 8, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", height: 180, overflow: "hidden" }}>
                  <img
                    className="bg-c-illustration"
                    src={`${CDN_IL}/${kost.illustration}.svg`}
                    alt={kost.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain", padding: 16 }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                  <p className="bg-c-text bg-c-text--title-3">{kost.name}</p>
                  <span className="bg-c-label bg-c-label--pill" style={{ whiteSpace: "nowrap" }}>{kost.type}</span>
                </div>

                <p className="bg-c-text bg-c-text--body-3" style={{ marginTop: 4, color: "#757575" }}>
                  📍 {kost.location}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                  <div className="bg-c-rating-star" />
                  <span className="bg-c-text bg-c-text--label-3">{kost.rating} ({kost.reviews} ulasan)</span>
                </div>

                <hr className="bg-c-divider bg-c-divider--small" style={{ margin: "12px 0" }} />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span className="bg-c-text bg-c-text--title-2" style={{ color: "#008742" }}>{kost.price}</span>
                    <span className="bg-c-text bg-c-text--body-3" style={{ color: "#949494" }}> /bulan</span>
                  </div>
                  <button className="bg-c-button bg-c-button--secondary bg-c-button--sm">Lihat Detail</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="bg-c-button bg-c-button--tertiary bg-c-button--lg">
              Lihat Semua Kost
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: "#ffffff", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="bg-c-text bg-c-text--heading-2">Kenapa Pilih Mamikos?</h2>
            <p className="bg-c-text bg-c-text--body-1" style={{ marginTop: 8, color: "#757575" }}>
              Platform kost terpercaya nomor 1 di Indonesia
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
            {features.map((f) => (
              <div key={f.title} className="bg-c-card bg-c-card--md bg-c-card--line" style={{ textAlign: "center" }}>
                <img
                  className="bg-c-illustration"
                  src={`${CDN_IL}/${f.illustration}.svg`}
                  alt={f.title}
                  style={{ width: 96, height: 96, objectFit: "contain", margin: "0 auto 16px" }}
                />
                <p className="bg-c-text bg-c-text--title-3" style={{ marginBottom: 8 }}>{f.title}</p>
                <p className="bg-c-text bg-c-text--body-2" style={{ color: "#757575" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: "#edf9f4", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", gap: 48 }}>
          <img
            className="bg-c-illustration"
            src={`${CDN_IL}/register-owner.svg`}
            alt="Daftarkan kost Anda"
            style={{ width: 240, flexShrink: 0 }}
          />
          <div>
            <h2 className="bg-c-text bg-c-text--heading-2" style={{ marginBottom: 12 }}>
              Punya Kost? Iklankan Sekarang!
            </h2>
            <p className="bg-c-text bg-c-text--body-1" style={{ color: "#757575", marginBottom: 32 }}>
              Bergabung bersama lebih dari 200.000 pemilik kost yang sudah terdaftar di Mamikos.
            </p>
            <button className="bg-c-button bg-c-button--primary bg-c-button--xl bg-c-button--rounded">
              Daftarkan Kost Saya
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-l-footer">

        {/* Row 1: main content */}
        <div className="bg-c-grid bg-c-grid--vtop bg-c-grid--left bg-c-grid--wrapped">

          {/* col 4: logo + description + app stores */}
          <div className="bg-c-grid__item bg-is-col-4">
            <div className="bg-l-footer__logo">
              <a href="https://mamikos.com" className="bg-l-footer__logo-link">
                <img src={`${CDN_BL}/mamikos-logotype-green.svg`} alt="Mamikos" />
              </a>
            </div>
            <div className="bg-l-footer__description">
              <p className="bg-c-text bg-c-text--body-2">
                Dapatkan &quot;info kost murah&quot; hanya di MamiKos App.<br />
                Mau &quot;Sewa Kost Murah&quot;?
              </p>
            </div>
            <div className="bg-l-footer__appstore">
              <a href="https://play.google.com/store/apps/details?id=com.git.mami.kos" target="_blank" rel="nofollow noopener">
                <img src={`${CDN_OT}/get-it-on-playstore.svg`} alt="GET IT ON Google Play" />
              </a>
              <a href="https://itunes.apple.com/id/app/mh-kos/id1055272843" target="_blank" rel="nofollow noopener">
                <img src={`${CDN_OT}/get-it-on-appstore.svg`} alt="Available on the App Store" />
              </a>
            </div>
          </div>

          {/* col 8: 3 link columns */}
          <div className="bg-c-grid__item bg-is-col-8">
            <div className="bg-c-grid bg-c-grid--vtop bg-c-grid--left">

              {/* col 6: MAMIKOS links */}
              <div className="bg-c-grid__item bg-is-col-6">
                <div className="bg-l-footer__link-title">
                  <p className="bg-c-text bg-c-text--body-1">MAMIKOS</p>
                </div>
                <div className="bg-l-footer__link-wrapper">
                  <div>
                    <div className="bg-l-footer__link-item">
                      <a className="bg-c-link bg-c-link--high-naked" href="https://mamikos.com/tentang-kami" target="_blank" rel="noreferrer">Tentang Kami</a>
                    </div>
                    <div className="bg-l-footer__link-item">
                      <a className="bg-c-link bg-c-link--high-naked" href="https://mamikos.com/career" target="_blank" rel="noreferrer">Job Mamikos</a>
                    </div>
                    <div className="bg-l-footer__link-item">
                      <a className="bg-c-link bg-c-link--high-naked" href="https://mamikos.com/promosi-kost" target="_blank" rel="noreferrer">Promosikan Kost Anda</a>
                    </div>
                    <div className="bg-l-footer__link-item">
                      <a className="bg-c-link bg-c-link--high-naked" href="https://help.mamikos.com" target="_blank" rel="noreferrer">Pusat Bantuan</a>
                    </div>
                  </div>
                  <div>
                    <div className="bg-l-footer__link-item">
                      <a className="bg-c-link bg-c-link--high-naked" href="https://mamikos.com/info" target="_blank" rel="noreferrer">Blog Mamikos</a>
                    </div>
                    <div className="bg-l-footer__link-item">
                      <a className="bg-c-link bg-c-link--high-naked" href="https://singgahsini.id/" target="_blank" rel="noreferrer">Singgahsini</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* col 3: Kebijakan */}
              <div className="bg-c-grid__item bg-is-col-3">
                <div className="bg-l-footer__link-title">
                  <p className="bg-c-text bg-c-text--body-1">Kebijakan</p>
                </div>
                <div className="bg-l-footer__link-item">
                  <a className="bg-c-link bg-c-link--high-naked" href="https://help.mamikos.com/post/kebijakan-privasi-mamikos" target="_blank" rel="noreferrer">Kebijakan Privasi</a>
                </div>
                <div className="bg-l-footer__link-item">
                  <a className="bg-c-link bg-c-link--high-naked" href="https://help.mamikos.com/syarat-dan-ketentuan" target="_blank" rel="noreferrer">Syarat dan Ketentuan Umum</a>
                </div>
              </div>

              {/* col 3: Hubungi kami + social */}
              <div className="bg-c-grid__item bg-is-col-3">
                <div className="bg-l-footer__link-title">
                  <p className="bg-c-text bg-c-text--body-1">Hubungi kami</p>
                </div>
                <div className="bg-l-footer__link-item">
                  <a className="bg-c-link bg-c-link--high-naked" href="https://mamikos.com/tentang-kami?opencomplaintform=1" target="_blank" rel="noreferrer">
                    halo@mamikos.com
                  </a>
                </div>
                <div className="bg-l-footer__link-item">
                  <a className="bg-c-link bg-c-link--high-naked" href="https://wa.me/6281325111171" target="_blank" rel="noreferrer">
                    +6281325111171
                  </a>
                </div>
                <a className="bg-c-link bg-c-link--high-naked bg-l-footer__social-link-icon" href="https://www.facebook.com/mamikos" target="_blank" rel="noreferrer" aria-label="Facebook" />
                <a className="bg-c-link bg-c-link--high-naked bg-l-footer__social-link-icon" href="https://twitter.com/mamikos" target="_blank" rel="noreferrer" aria-label="Twitter/X" />
                <a className="bg-c-link bg-c-link--high-naked bg-l-footer__social-link-icon" href="https://www.instagram.com/mamikos" target="_blank" rel="noreferrer" aria-label="Instagram" />
              </div>

            </div>
          </div>

          {/* full-width divider */}
          <div className="bg-c-grid__item">
            <div className="bg-l-footer__divider">
              <span className="bg-c-divider bg-c-divider--small" role="separator" />
            </div>
          </div>

        </div>

        {/* Row 2: copyright */}
        <div className="bg-c-grid bg-c-grid--vtop bg-c-grid--left bg-c-grid--wrapped">
          <div className="bg-c-grid__item">
            <div className="bg-l-footer__copyright">
              <a className="bg-l-footer__iso-certificate" href="https://help.mamikos.com/post/apa-itu-iso-iec-27001" target="_blank" rel="noreferrer">
                <img src={`${CDN_OT}/iso-certificate-v2.svg`} alt="mamikos-iso-certificate" width={48} height={48} />
              </a>
              <span className="bg-c-text bg-c-text--label-2">© 2026 Mamikos.com. All rights reserved</span>
            </div>
          </div>
        </div>

      </footer>

    </div>
  );
}
