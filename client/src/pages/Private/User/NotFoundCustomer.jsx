import React from "react";
import { Link } from "react-router-dom";

const NotFoundCustomer = () => {
  return (
    <div>
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
      <Link to="/customer/home">Kembali ke Beranda</Link>
    </div>
  );
};

export default NotFoundCustomer;