import type { Metadata } from "next";
import KostLanding from "@/components/KostLanding";

export const metadata: Metadata = {
  title: "Cari Kost Terbaik – Mamikos",
  description:
    "Temukan ribuan pilihan kost terbaik di seluruh Indonesia. Harga terjangkau, lokasi strategis, dan fasilitas lengkap.",
};

export default function KostPage() {
  return <KostLanding />;
}
