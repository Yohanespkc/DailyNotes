Sebuah cincin jari -jari R menggelinding di bidang datar tanpa slip. Di dalam hoop ada benda A. Ketika A berada pada posisi terendah kecepatan pusat massa hoop adalah v0. Hitung nilai v0 agar hoop tidak melompat. Anggap massa hoop sama dengan massa benda.


**Ringkasnya:** jawaban akhir buku, v₀ ≤ √(8gR), ternyata benar. Tetapi ada dua langkah yang salah di tengah, dan kesalahannya kebetulan saling menghilangkan.

## Bagian yang benar: energi

Anggap benda A ikut bergerak bersama hoop (kecepatannya nol di P, seperti asumsi di buku), dan I = mR².

- Di P: E_P = ½mv₀² + ½(mR²)(v₀/R)² + mgR = **mv₀² + mgR**
- Di Q, dengan v_b' = 2v': E_Q = ½m(2v')² + 2mgR + ½mv'² + ½mv'² + mgR = **3mv'² + 3mgR**

Dari E_P = E_Q diperoleh **v₀² = 3v'² + 2gR**, sama dengan buku.

## Kesalahan 1: gaya pada benda A di titik tertinggi

Buku menulis N + mg = m v_Q²/(2R) = 2mv'²/R, dengan anggapan A bergerak melingkar berjari-jari 2R berpusat di P. Anggapan ini benar untuk **kecepatan** (rotasi sesaat terhadap P, v_Q = 2v'), tetapi **tidak** untuk **percepatan**. P adalah titik yang bergerak, jadi bukan pusat kelengkungan lintasan A.

Lintasan A adalah sikloid. Di puncak, pusat hoop bergerak lurus dengan percepatan horizontal nol (simetri), sehingga percepatan A hanyalah percepatan sentripetal relatif terhadap pusat hoop, yaitu ω'²R = v'²/R ke bawah. Jadi:

**N + mg = mv'²/R**

Jari-jari kelengkungan sikloid di puncak adalah 4R, bukan 2R: (2v')²/4R = v'²/R.

## Kesalahan 2: persamaan untuk hoop

Buku menulis N + N' − mg = mv'²/R, seolah pusat hoop bergerak melingkar. Padahal pusat hoop bergerak **lurus horizontal**, sehingga percepatan vertikalnya nol:

**N' + N − mg = 0**

## Hasil yang benar

N = mv'²/R − mg, sehingga N' = mg − N = **2mg − mv'²/R**.

Hoop tidak melompat jika N' ≥ 0, yaitu v'² ≤ 2gR. Maka:

v₀² = 3v'² + 2gR ≤ 8gR, atau **v₀ ≤ √(8gR)**

Di buku, N terlalu besar mv'²/R (kesalahan 1), dan N' juga terlalu besar mv'²/R (kesalahan 2). Keduanya saling meniadakan, sehingga N' akhirnya sama dengan yang benar.

## Pengecekan tambahan

- Untuk seluruh sistem, gaya normal tanah N' = 2mg + m·a_Ay. Di puncak, a_Ay = −v'²/R, hasilnya sama seperti di atas.
- Saya juga memeriksa N' di semua posisi ψ sepanjang satu putaran. Nilai minimumnya hanya menyentuh nol di puncak saat v₀² = 8gR, sehingga puncak memang titik kritis.
- Syarat tambahan: agar A mencapai puncak diperlukan v₀² ≥ 2gR (agar v'² ≥ 0).

Semua ini berlaku jika A menempel dan ikut berputar bersama hoop. Kalau A dianggap meluncur bebas tanpa gesekan di dalam hoop, soalnya menjadi berbeda dan jawabannya tidak sama.

