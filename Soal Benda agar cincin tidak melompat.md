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

Kesalahan utama pada solusi di buku tersebut terletak pada **analisis kinematika percepatan dan dinamika gaya di titik tertinggi (titik Q)**.

  

Berikut rincian letak kekeliruan dan penjelasannya:

  

### 1. Asumsi Percepatan Sentripetal terhadap Titik Kontak Sesaat ($2R$)

Di buku tertulis:

  

> _"Di titik tertinggi: benda A dapat dianggap sesaat bergerak melingkar dengan jari-jari $2R$ dengan pusat lingkaran di titik P..."_
> 
>   
> 
>   

Lalu menuliskan persamaan sentripetal:

  

$$N + mg = m\frac{v_Q^2}{2R} = \frac{2mv'^2}{R}$$

  

**Kekeliruan:**

  

- Titik kontak sesaat (titik kontak dengan lantai) **bukan kerangka inersia** dan **bukan pusat kelengkungan lintasan**.
    
      
    
- Lintasan partikel $A$ adalah **sikloid** ($x_A = R(\theta - \sin\theta)$, $y_A = R(1 - \cos\theta)$).
    
      
    
- Percepatan vertikal partikel secara eksak adalah turunan kedua dari posisinya terhadap waktu:
    
      
    
    $$y_A = R(1 - \cos\theta) \implies \dot{y}_A = R\dot{\theta}\sin\theta \implies \ddot{y}_A = R\ddot{\theta}\sin\theta + R\dot{\theta}^2\cos\theta$$
    
- Pada titik tertinggi ($\theta = \pi$), $\sin\pi = 0$ dan $\cos\pi = -1$, sehingga:
    
      
    
    $$\ddot{y}_A = -R\dot{\theta}^2 = -\frac{v'^2}{R}$$
    
    Bukan $-v_Q^2/(2R) = -4v'^2/(2R) = -2v'^2/R$.
    
      
    

Di buku, percepatannya dihitung menjadi $\frac{2v'^2}{R}$, padahal nilai riil percepatan vertikal partikel di titik puncak hanyalah $\frac{v'^2}{R}$ ke arah bawah.

  

### 2. Persamaan Gerak Vertikal Cincin (Hoop)

Di buku tertulis:

  

> _"Pada saat benda A di titik tertinggi, pusat massa hoop dapat dianggap bergerak melingkar dengan jari-jari R..."_
> 
>   
> 
>   
> 
> $$N + N' - mg = \frac{mv'^2}{R}$$
> 
>   

**Kekeliruan:**

  

- Pusat cincin (hoop) bergerak secara **horizontal murni** pada ketinggian tetap $y_C = R$.
    
      
    
- Karena cincin terus menggelinding lurus di atas lantai datar tanpa melompat, percepatan vertikal pusat massa cincin adalah **nol**:
    
      
    
    $$\ddot{y}_C = 0$$
    
- Persamaan gaya vertikal pada cincin seharusnya:
    
      
    
    $$\Sigma F_{y,\text{cincin}} = N' - N - mg = m \ddot{y}_C = 0 \implies N' = N + mg$$
    
    (dengan $N'$ gaya normal dari lantai ke cincin, dan $N$ gaya kontak antara benda $A$ dengan dinding cincin).
    
      
    
- Buku mengasumsikan pusat hoop mengalami percepatan sentripetal vertikal sebesar $\frac{v'^2}{R}$, yang secara fisis tidak mungkin terjadi karena pusat hoop tidak bergerak melingkar di bidang vertikal.
    
      
    

### Perhitungan yang Benar

Jika dihitung secara konsisten:

  

1. **Gaya normal pada partikel $A$ di puncak ($\theta = \pi$):**
    
      
    
    $$mg + N = m(-\ddot{y}_A) = m\frac{v'^2}{R} \implies N = \frac{mv'^2}{R} - mg$$
    
2. **Gaya normal lantai $N'$ pada cincin di puncak:**
    
    Karena cincin tidak bergerak vertikal ($\ddot{y}_C = 0$):
    
      
    
    $$N' - N - mg = 0 \implies N' = N + mg = \frac{mv'^2}{R}$$
    
    _(Catatan: jika menggunakan pusat massa total $2m$: $N' - 2mg = 2m \ddot{y}_{pm} = m(-v'^2/R) \implies N' = 2mg - \frac{mv'^2}{R}$)_
    
      
    
    Mari cek melalui percepatan pusat massa:
    
      
    
    $$y_{pm} = \frac{y_C + y_A}{2} \implies \ddot{y}_{pm} = \frac{0 + \ddot{y}_A}{2} = -\frac{v'^2}{2R}$$
    
    Maka:
    
      
    
    $$N' - 2mg = (2m)\ddot{y}_{pm} = 2m\left(-\frac{v'^2}{2R}\right) = -\frac{mv'^2}{R}$$
    
    $$N' = 2mg - \frac{mv'^2}{R}$$
    
3. **Syarat agar cincin tidak melompat ($N' \ge 0$):**
    
      
    
    $$2mg - \frac{mv'^2}{R} \ge 0 \implies \frac{v'^2}{R} \le 2g$$
    
4. **Kekekalan Energi:**
    
    Energi di titik awal sama dengan energi di titik puncak:
    
      
    
    $$mv_0^2 = 3mv'^2 + 2mgR \implies v'^2 = \frac{v_0^2 - 2gR}{3}$$
    
5. **Substitusikan ke syarat normal:**
    
      
    
    $$\frac{v_0^2 - 2gR}{3R} \le 2g$$
    
    $$v_0^2 - 2gR \le 6gR$$
    
    $$v_0^2 \le 8gR \implies v_0 \le \sqrt{8gR}$$
    

### Kesimpulan

Secara kebetulan hasil akhirnya sama-sama mengarah ke angka $8gR$ di buku, tetapi itu terjadi karena **dua kesalahan fatal yang saling tumpang tindih**:

  

1. Mengalikan dua percepatan vertikal partikel $A$ (menggunakan jari-jari sesaat $2R$ sehingga dapat $2v'^2/R$ alih-alih $v'^2/R$).
    
      
    
2. Memberikan percepatan semu ke pusat massa cincin yang seharusnya $\ddot{y}_C = 0$.

![[WhatsApp Image 2026-09-19 at 15.06.47 (1).jpeg]]

![[WhatsApp Image 2026-09-19 at 15.06.47.jpeg]]