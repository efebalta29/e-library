# FEBA-Kütüphane - Dijital Kitaplığınız

Kullanıcıların kitapları tarayabileceği, arayabileceği ve yer imi ekleyebileceği modern bir e-kütüphane web sitesi projesi.

## Özellikler

- Masaüstü, tablet ve mobil cihazlarda çalışan duyarlı tasarım
- Kategoriye göre kitapları tarama
- Başlık, yazar veya açıklamaya göre kitap bulma işlevi
- Giriş ve kayıt ile kullanıcı hesap sistemi
- Daha sonra okumak için kitapları kaydetme yer imi sistemi
- Kullanıcı profili yönetimi
- Yumuşak geçişler ve animasyonlarla modern kullanıcı arayüzü
- Kitap okuma sayfası ile içeriği görüntüleme
- Tekrar kullanılabilir header ve footer bileşenleri

## Sayfalar

1. **Ana Sayfa (index.html)**: Öne çıkan kitaplar, yeni gelenler ve kategorileri gösterir
2. **Kitaplar Sayfası (books.html)**: Filtreleme ve sıralama seçenekleriyle tüm kitapları tarayın
3. **Hesap Sayfası (account.html)**: Yer imi eklenen kitapları görüntüleyin ve kullanıcı profilini yönetin
4. **Giriş Sayfası (login.html)**: Kullanıcı girişi
5. **Kayıt Sayfası (register.html)**: Yeni kullanıcı kaydı
6. **Okuma Sayfası (read.html)**: Kitap içeriğini görüntüleme
7. **Header (header.html)**: Tüm sayfalarda kullanılan ortak üst menü
8. **Footer (footer.html)**: Tüm sayfalarda kullanılan ortak alt menü

## Kullanılan Teknolojiler

- HTML5
- CSS3 (temalandırma için CSS değişkenleriyle)
- JavaScript (ES6+)
- İstemci tarafı veri kalıcılığı için LocalStorage
- Mock-data ile simüle edilmiş içerikler

## Başlangıç

Bu projeyi yerel olarak çalıştırmak için:

1. Depoyu klonlayın veya indirin
2. `index.html` dosyasını tarayıcınızda açın

## Proje Yapısı

```
/e-library
│
├── index.html               # Ana sayfa
├── books.html               # Kitap listeleme sayfası
├── account.html             # Kullanıcı hesap sayfası
├── login.html               # Giriş sayfası
├── register.html            # Kayıt sayfası
├── read.html                # Kitap okuma sayfası
├── header.html              # Tekrar kullanılabilir header
├── footer.html              # Tekrar kullanılabilir footer
│
├── css/                     # CSS dosyaları
│   ├── style.css            # Ana stil sayfası
│   ├── books.css            # Kitaplar sayfası stilleri
│   ├── account.css          # Hesap sayfası stilleri
│   ├── auth.css             # Giriş/Kayıt sayfaları stilleri
│   └── read.css             # Okuma sayfası stilleri
│
├── js/                      # JavaScript dosyaları
│   ├── script.js            # Ana JavaScript dosyası
│   ├── books.js             # Kitaplar sayfası için JavaScript
│   ├── account.js           # Hesap sayfası için JavaScript
│   ├── login.js             # Giriş sayfası için JavaScript
│   ├── register.js          # Kayıt sayfası için JavaScript
│   └── read.js              # Okuma sayfası için JavaScript
│
├── mock-data/               # Simüle edilmiş veri dosyaları
│   ├── books.js             # Kitap verileri
│   └── book-contents.js     # Kitap içerikleri
│
├── assets/                  # Resimler ve diğer statik dosyalar
│   └── feba.png             # Logo
│
└── README.md                # Proje belgelendirmesi
```

## Gelecek Geliştirmeler

- Gerçek veri kalıcılığı için arka uç entegrasyonu
- Kullanıcı yorumları ve değerlendirmeleri
- Sosyal paylaşım özellikleri
- Okuma ilerlemesi takibi
- Kişiselleştirilmiş kitap önerileri
- Karanlık mod tema seçeneği

## Proje Durumu

Bu yalnızca bir ön uç uygulamasıdır. Arka uç işlevselliği gelecek bir aşamada eklenecektir.

## Lisans

Bu proje sadece eğitim amaçlıdır.

## Yazar

Öğrenci Projesi 
