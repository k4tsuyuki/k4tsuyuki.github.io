/* Магазин файлов (страница /files/).
   Цена в евро: price — минимальная цена (0 = бесплатно).
   pwyw: true — человек может заплатить больше ("плати сколько хочешь").
   old — старая цена, показывается зачёркнутой.
   date — когда файл вышел (ГГГГ-ММ-ДД), по нему файлы идут от новых к старым.
   cover — картинка (img/files/...) или yt:ID видео на YouTube.
   Чтобы кнопка "Project file" появилась в плеере у работы, в works.js этой работе ставится file: "id товара".
   Сами файлы (ссылки на Google Диск) лежат НЕ здесь, а в Google Таблице, лист "Files". */
window.SHOP = [
  {"id": "souvenir", "date": "2024-05-18", "title": "souvenir", "price": 0, "pwyw": true, "cover": "img/files/souvenir.jpg"},
  {"id": "fashion-x-naobito", "date": "2024-03-27", "title": "Fashion × Naobito", "price": 0, "pwyw": true, "cover": "img/files/fashion-x-naobito.jpg"},
  {"id": "nicotine", "date": "2024-02-15", "title": "nicotine", "price": 0, "pwyw": true, "cover": "img/files/nicotine.jpg"},
  {"id": "all-the-stars-2hc", "date": "2023-12-30", "title": "All The Stars 2HC", "price": 0, "pwyw": true, "cover": "img/files/all-the-stars-2hc.jpg"},
  {"id": "aint-ready", "date": "2023-12-10", "title": "AINT READY (ft. @fxizvisualz)", "price": 0, "pwyw": true, "cover": "img/files/aint-ready.jpg"},
  {"id": "fire-force-end-of-the-world", "date": "2023-11-09", "title": "Fire Force — End of The World", "price": 7, "pwyw": true, "tags": ["AMV", "4K"], "cover": "img/files/fire-force-end-of-the-world.jpg"},
  {"id": "no-romance", "date": "2023-10-22", "title": "No Romance (rm: @z0uma.283)", "price": 0, "pwyw": true, "tags": ["AMV"], "cover": "img/files/no-romance.jpg"},
  {"id": "haise-1k-bundle", "date": "2023-09-28", "title": "Haise 1K Bundle", "price": 0, "tags": ["Pack"], "cover": "img/files/haise-1k-bundle.jpg"},
  {"id": "demon-slayer-molly", "date": "2023-08-21", "title": "Demon Slayer — Molly", "price": 4, "tags": ["Collab part", "4K"], "cover": "img/files/demon-slayer-molly.jpg"},
  {"id": "luxxid-diamondz", "date": "2023-07-15", "title": "Luxxid Diamondz — Demon Slayer", "price": 3, "pwyw": true, "old": 7, "tags": ["AMV", "4K"], "cover": "img/files/luxxid-diamondz.jpg"},
  {"id": "milka-spring-editing-pack", "date": "2023-04-21", "title": "Milka Spring Editing Pack", "price": 4, "old": 7, "tags": ["Pack"], "cover": "img/files/milka-spring-editing-pack.jpg"},
  {"id": "on-my-own", "date": "2023-03-14", "title": "On My Own — Black Clover", "price": 0, "pwyw": true, "tags": ["AMV", "4K"], "cover": "yt:1yuZW_Z6dcI"},
  {"id": "the-beach", "date": "2023-02-27", "title": "The Beach — Beyond the Boundary", "price": 0, "pwyw": true, "tags": ["AMV", "4K"], "cover": "yt:X23B4pPTem8"},
  {"id": "make-it-right", "date": "2023-02-21", "title": "make it right. (ft. @odixkks)", "price": 0, "pwyw": true, "cover": "yt:DIi0dNqN0L0"},
  {"id": "people-you-know", "date": "2023-02-19", "title": "People You Know", "price": 0, "pwyw": true, "tags": ["AMV"], "cover": "img/files/people-you-know.jpg"},
  {"id": "infinity", "date": "2023-02-13", "title": "Infinity.", "price": 0, "pwyw": true, "cover": "img/files/infinity.jpg"},
  {"id": "one-day-3hc", "date": "2023-02-05", "title": "One Day (3HC collab part)", "price": 0, "pwyw": true, "tags": ["Collab part"], "cover": "yt:fH1bLfKCT8M"},
  {"id": "live-a-lil", "date": "2023-01-22", "title": "Live a lil. — Demon Slayer", "price": 0, "pwyw": true, "tags": ["AMV", "4K"], "cover": "yt:wdRb50u2RFQ"},
  {"id": "pursuit", "date": "2023-01-26", "title": "Pursuit… (koyomi × bld)", "price": 0, "pwyw": true, "tags": ["AMV", "4K"], "cover": "img/files/pursuit.jpg"},
  {"id": "billie-jean", "date": "2023-01-19", "title": "Billie Jean — Demon Slayer", "price": 0, "tags": ["AMV"], "cover": "img/files/billie-jean.jpg"},
  {"id": "fetti", "date": "2023-01-16", "title": "Fetti. (ft. @samurai)", "price": 0, "pwyw": true, "cover": "img/files/fetti.jpg"},
  {"id": "murder-on-my-mind", "date": "2022-12-20", "title": "Murder On My Mind — Demon Slayer", "price": 0, "tags": ["AMV"], "cover": "yt:L7xx0WRq13M"},
  {"id": "fly-by-midnight", "date": "2023-01-16", "title": "Fly By Midnight (Milka × Zemzo)", "price": 0, "tags": ["AMV"], "cover": "img/files/fly-by-midnight.jpg"},
  {"id": "part-for", "date": "2022-11-21", "title": "part for ???", "price": 0, "tags": ["Collab part"], "cover": "img/files/part-for.jpg"},
  {"id": "damage", "date": "2022-11-11", "title": "Damage #h1pp3xsoc1", "price": 2, "old": 3, "cover": "img/files/damage.jpg"},
  {"id": "insomnia", "date": "2022-11-01", "title": "Insomnia", "price": 0, "cover": "yt:Csb6mem6T7Y"}
];
