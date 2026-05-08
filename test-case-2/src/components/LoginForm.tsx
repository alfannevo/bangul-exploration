'use client'

import { useState } from 'react'
import { BangulButton, BangulInput } from 'bangul-vue/react'

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  function handleLogin() {
    setIsLoading(true)
    // TODO: handle login
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="bg-c-card bg-c-card--md" style={{ width: '100%', maxWidth: 400 }}>
      <h1 className="bg-c-text bg-c-text--heading-3">Masuk</h1>
      <p className="bg-c-text bg-c-text--body-2" style={{ marginTop: 4, marginBottom: 24 }}>
        Silakan masuk ke akun Anda
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="bg-c-field">
          <div className="bg-c-field__label">
            <label className="bg-c-field--required" htmlFor="email">Email</label>
          </div>
          <BangulInput id="email" type="email" placeholder="contoh@email.com" size="lg" />
        </div>

        <div className="bg-c-field">
          <div className="bg-c-field__label">
            <label className="bg-c-field--required" htmlFor="password">Kata Sandi</label>
          </div>
          <BangulInput id="password" type="password" placeholder="Masukkan kata sandi" size="lg" />
        </div>

        <BangulButton variant="primary" size="lg" block loading={isLoading} onClick={handleLogin}>
          Masuk
        </BangulButton>
      </div>
    </div>
  )
}
