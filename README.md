# 🍳 RecipeChef
**DataChefs ekibi tarafından geliştirilen RecipeChef; yemek fotoğraflarından kalori tahmini yapabilen, eldeki malzemelere göre tarif üreten ve beslenme takibi sağlayan kapsamlı bir ekosistemdir.**

---

## 🚀 Proje Hakkında
RecipeChef, mutfaktaki karar verme sürecini hızlandırmak ve sağlıklı beslenmeyi kolaylaştırmak için tasarlanmıştır. Görüntü işleme (Computer Vision) ve Doğal Dil İşleme (NLP) teknolojilerini bir araya getirerek kullanıcıya kişiselleştirilmiş bir deneyim sunar.

## ✨ Temel Özellikler
- **🖼️ AI Vision (Kalori Tahmini):** Yemek fotoğraflarını analiz ederek porsiyon ve kalori hesabı yapar.
- **🤖 Akıllı Tarif Asistanı:** "Buzdolabımda ne var?" sorusuna mevcut malzemelerle en uygun tarifi verir.
- **📱 Multi-Platform:** Web ve Mobil üzerinden senkronize çalışma desteği.
- **📊 Besin Değeri Takibi:** Yemeklerin protein, karbonhidrat ve yağ dengesini grafiklerle sunar.

## 🛠️ Teknik Altyapı (Tech Stack)
| Alan | Teknoloji |
| :--- | :--- |
| **Frontend** | React.js / CSS |
| **Mobile** | React Native |
| **Backend** | Node.js (Express)  |
| **AI/ML** | TensorFlow / OpenCV / Gemini API |
| **Database** | PostgreSQL & FireBase |

## 👥 DataChefs Ekibi
- **Barış Karakoç** - Web Developer [@bariskarakocdev](https://github.com/bariskarakocdev)
- **[Muhammed Kadir Bük]** - AI Developer [@kadiri6506](https://github.com/kadiri6506)
- **[Selim Anafıev]** - Mobile Developer [@caawq](https://github.com/caawq)


## 📂 Proje Yapısı

├── web/            # React tabanlı web uygulaması.
├── mobile/         # React Native Mobil Uygulaması
├── ai-vision/      # Görüntü İşleme & ML Modelleri
├── ai-chatbot/     # Yapay zeka sohbet asistanı.
├── docs/           # Gereksinim analizleri ve proje dökümanları.
├── .gitignore      # GitHub'a yüklenmeyecek (node_modules, .env vb.) dosyaları filtreler.
├── LICENSE         # Projenin yasal kullanım haklarını (MIT vb.) belirleyen döküman. 
└── README.md       # Projenin genel tanıtımı, kurulumu ve ekip rehberi.

📋 Proje Yönetimi ve Takibi için
Proje süreçlerimizi **GitHub Projects** üzerinden **Kanban** metoduyla şeffaf bir şekilde yönetiyoruz.
Pano Linki: [🚀 DataChefs Kanban Board](https://github.com/users/bariskarakocdev/projects/2)

📌 Kurulum Rehberi (Geliştiriciler İçin)

## İlk kurulum ve çalıştırma için:

# Repoyu klonlayın ve içine girin
git clone https://github.com/bariskarakocdev/recipe-chef.git &&
cd recipe-chef

# Web klasörüne geçip paketleri yükleyin
cd web &&
npm install

## Sadece projeyi tekrar çalıştırmak için:
npm run dev

© 2026 DataChefs - Mutfakta Geleceği Pişiriyoruz.
