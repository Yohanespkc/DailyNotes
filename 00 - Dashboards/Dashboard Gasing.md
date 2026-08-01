# 🎛️ Dashboard Vault Gasing

> Halaman pusat kontrol Vault **Gasing** menggunakan **Dataview**.

---

## 📑 1. Tampilan List Berdasarkan Tag

```dataview
LIST
FROM #web-clipping OR #slurp
SORT file.name ASC
```

---

## 📌 2. Penjelajah Tugas (Task Aggregator)
*Semua tugas/checklist (`- [ ]`) dari seluruh file di Vault Gasing yang belum centang akan berkumpul otomatis di sini:*

```dataview
TASK
WHERE !completed
```

---

## 🏷️ 3. Pengelompokan Artikel Berdasarkan Sumber (Group By)

```dataview
TABLE length(rows) AS "Jumlah Artikel"
FROM ""
WHERE site
GROUP BY site
```

---
*Tips: Tambahkan checklist `- [ ] contoh tugas` di catatan mana saja untuk melihatnya muncul otomatis di section 2 di atas!*
