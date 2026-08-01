# 📚 Daftar Artikel Web (Automated Index)

> Halaman ini menggunakan plugin **Dataview** untuk merangkum semua artikel web yang tersimpan di Vault **Gasing** secara otomatis.

```dataview
TABLE 
  site AS "Sumber",
  date AS "Tanggal Artikel",
  tags AS "Tags"
FROM ""
WHERE slurped OR contains(tags, "web-clipping")
SORT date DESC
```

---

*Catatan: Jika plugin **Dataview** sudah diaktifkan, kode di atas akan berubah menjadi tabel interaktif yang selalu diperbarui secara real-time!*
