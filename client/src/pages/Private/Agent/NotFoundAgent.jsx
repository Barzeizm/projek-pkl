import React from "react";
import { Link } from "react-router-dom";

const NotFoundAgent = () => {
  return (
    <div>
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
      <Link to="/agent/dashboard">Kembali ke Beranda</Link>
    </div>
  );
};

export default NotFoundAgent;