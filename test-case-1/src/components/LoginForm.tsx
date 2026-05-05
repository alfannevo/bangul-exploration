"use client";

import { useState } from "react";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: handle login
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <div className="bg-c-card bg-c-card--md bg-c-card--shadow" style={{ width: "100%", maxWidth: 400 }}>
      <h1 className="bg-c-text bg-c-text--heading-3">Masuk</h1>
      <p className="bg-c-text bg-c-text--body-2" style={{ marginTop: 4, marginBottom: 24 }}>
        Silakan masuk ke akun Anda
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="bg-c-field">
            <div className="bg-c-field__label">
              <label className="bg-c-field--required" htmlFor="email">Email</label>
            </div>
            <div className="bg-c-input bg-c-input--lg">
              <input
                className="bg-c-input__field"
                id="email"
                type="email"
                name="email"
                placeholder="contoh@email.com"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="bg-c-field">
            <div className="bg-c-field__label">
              <label className="bg-c-field--required" htmlFor="password">Kata Sandi</label>
            </div>
            <div className="bg-c-input bg-c-input--lg">
              <input
                className="bg-c-input__field"
                id="password"
                type="password"
                name="password"
                placeholder="Masukkan kata sandi"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`bg-c-button bg-c-button--primary bg-c-button--lg bg-c-button--block${isLoading ? " bg-c-button--loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "" : "Masuk"}
          </button>
        </div>
      </form>
    </div>
  );
}
