// Kitapların veri tabanı (gerçek bir uygulamada sunucudan gelecek)
const allBooks = [
    {
        id: 1,
        title: "Düşüncenin Gücü",
        author: "Ali Yılmaz",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "Düşünce gücü ve zihin kontrolü hakkında kapsamlı bir rehber.",
        rating: 4.5,
        category: "Kişisel Gelişim"
    },
    {
        id: 3,
        title: "Kuantum Fiziği",
        author: "Dr. Mehmet Öz",
        cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "Kuantum fiziğinin temel kavramlarını anlaşılır bir şekilde anlatan bir kitap.",
        rating: 4.3,
        category: "Bilim"
    },
    {
        id: 4,
        title: "Karanlık Orman",
        author: "Cixin Liu",
        cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "Üçlü Beden Problemi serisinin ikinci kitabında insanlık ve uzaylılar arasındaki gerilim devam ediyor.",
        rating: 4.9,
        category: "Bilim Kurgu"
    },
    {
        id: 5,
        title: "Kadim Şehir",
        author: "Ayşe Kulin",
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "İstanbulun tarihine yolculuk yapan heyecan verici bir roman.",
        rating: 4.2,
        category: "Tarih Kurgu"
    },
    {
        id: 6,
        title: "Mutfak Sırları",
        author: "Refika Birgül",
        cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "Ünlü şeften evde kolayca yapabileceğiniz lezzetli tarifler.",
        rating: 4.7,
        category: "Yemek"
    },
    {
        id: 7,
        title: "Başarı Psikolojisi",
        author: "Doğan Cüceloğlu",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "Başarıya giden yolda psikolojik engelleri aşmanın yolları.",
        rating: 4.6,
        category: "Psikoloji"
    },
    {
        id: 8,
        title: "Rüzgarın İzinde",
        author: "Buket Uzuner",
        cover: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "Türkiyenin farklı bölgelerinden etkileyici yolculuk hikayeleri.",
        rating: 4.4,
        category: "Gezi"
    },
    {
        id: 10,
        title: "Yapay Zeka",
        author: "Ethem Alpaydın",
        cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "Yapay zeka teknolojileri ve uygulamaları hakkında kapsamlı bir inceleme.",
        rating: 4.5,
        category: "Bilim"
    },
    {
        id: 11,
        title: "Çalıkuşu",
        author: "Reşat Nuri Güntekin",
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "Feride adlı genç bir öğretmenin Anadoludaki yaşamını anlatan klasik bir roman.",
        rating: 4.9,
        category: "Klasik"
    },
    {
        id: 12,
        title: "Sefiller",
        author: "Victor Hugo",
        cover: "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "19. yüzyıl Fransasında geçen, adalet ve kurtuluş temalı epik bir roman.",
        rating: 4.8,
        category: "Klasik"
    }
]; 
