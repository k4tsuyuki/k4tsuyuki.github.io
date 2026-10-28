/* =====================================================================
   ЭТО ЕДИНСТВЕННЫЙ ФАЙЛ, КОТОРЫЙ НУЖНО МЕНЯТЬ.
   Здесь контакты и список работ.
   Меняй только текст внутри кавычек "...". Запятые и скобки не трогай.
   ===================================================================== */

window.SITE = {
  name: "Katsuyuki",
  software: "After Effects / Photoshop",
  /* контакты: если ссылки нет (url: ""), рядом будет кнопка Copy */
  contacts: [
    { label: "Email",   value: "katsuyukiadmin@gmail.com", url: "mailto:katsuyukiadmin@gmail.com" },
    { label: "Discord",   value: "k4tsuyuk1",           url: "" },
    { label: "YouTube", value: "@k4tsuyuki",            url: "https://www.youtube.com/@k4tsuyuki" },
    { label: "Instagram", value: "koyomifanboy",        url: "https://www.instagram.com/koyomifanboy/" },
    { label: "Telegram",  value: "katsuyuk1",           url: "https://t.me/katsuyuk1" },
    { label: "Payhip",    value: "koyomifanboy",        url: "https://payhip.com/koyomifanboy" },
    { label: "Steam",     value: "k4tsuyuki",           url: "https://steamcommunity.com/id/k4tsuyuki/" }
  ]
};

/* ---------------------------------------------------------------------
   РАБОТЫ. Самая верхняя показывается первой и самой большой.
   Чтобы добавить новую, скопируй строку от { до }, вставь её сразу
   после строки "window.WORKS = [" и поменяй:
     title — название
     year  — год
     link  — ссылка на YouTube (любая: youtu.be, watch, shorts)
     tags  — метки, например ["AMV", "4K"]
     badge — (необязательно) плашка на обложке, например badge: "Flxwery's pick"
     ratio — (необязательно) формат кадра, если не 16:9, например ratio: "1920x1440"
             или ratio: "1920x800". Обычно сайт ставит его сам.
   --------------------------------------------------------------------- */

window.WORKS = [
  { title: "Archetype 3HC",              year: "2026", link: "https://www.youtube.com/watch?v=YSs2BbX69Fo", tags: ["AMV", "4K"] },
  { title: "Sing Me to Sleep",           year: "2026", link: "https://youtu.be/gpQxpaTkwDQ", tags: ["AMV", "4K"], ratio: "1920x1440" },
  { title: "Dove Doll 4HC",              year: "2026", link: "https://youtu.be/7wK3X0X2X90", tags: ["AMV", "4K"] },
  { title: "Save Me × Legendary Lovers", year: "2026", link: "https://youtu.be/_Asoua2qE_0", tags: ["AMV", "4K"] },
  { title: "Transgender 2",              year: "2026", link: "https://youtu.be/xv_AfLaNKWQ", tags: ["AMV", "Collab", "4K"] },
  { title: "Spokoynaya Noch",            year: "2026", link: "https://youtu.be/oNwfnxYTpaw", tags: ["AMV", "4K"] },
  { title: "I'm God",                    year: "2026", link: "https://youtu.be/38tOSZbfzXk", tags: ["AMV", "4K"], ratio: "1920x1440" },
  { title: "Missing Textures",           year: "2026", link: "https://youtu.be/wH6_dg3BL80", tags: ["AMV", "4K"] },
  { title: "Golden Brown",               year: "2025", link: "https://youtu.be/HWC5Qk6dwaw", tags: ["AMV", "4K"] },
  { title: "Transgender",                year: "2025", link: "https://youtu.be/hvh8QtzKZQA", tags: ["AMV", "4K"], badge: "Flxwery's pick" },
  { title: "Just Ur Doll",               year: "2025", link: "https://youtu.be/TWAUvWGPW7k", tags: ["AMV", "4K"], ratio: "1920x1440" },
  { title: "Under Your Spell",           year: "2025", link: "https://youtu.be/f5h1Djyj19M", tags: ["AMV", "4K"], ratio: "1920x1440" },
  { title: "Can't Feel Myself",          year: "2024", link: "https://youtu.be/xg8joSFOHxU", tags: ["MMV", "4K"] },

  /* ВСЕ ОСТАЛЬНЫЕ ЭДИТЫ С КАНАЛА (archive: true). На главной они спрятаны
     и появляются по кнопке "All edits". Чтобы эдит показывался сразу, убери у него archive: true.
     file: "id" — у эдита есть проектный файл в магазине (кнопка в плеере). */
  { title: "Nights Like This (practice)", year: "2025", link: "https://youtu.be/GseRHE5oLoM", tags: ["AMV", "4K"], archive: true },
  { title: "Khaos Emerald 2HC", year: "2025", link: "https://youtu.be/JgGGKiL8cQ8", tags: ["AMV"], archive: true },
  { title: "Hangar.", year: "2024", link: "https://youtu.be/HCQEiuEP324", tags: ["AMV"], archive: true },
  { title: "Rick Owens", year: "2024", link: "https://youtu.be/WmfILbIgDIc", tags: ["AMV", "4K"], archive: true },
  { title: "A Silent Voice — Manga Animation", year: "2024", link: "https://youtu.be/_OIKFOs49Ns", tags: ["AMV"], archive: true },
  { title: "ALTYN — Oyasumi Punpun", year: "2024", link: "https://youtu.be/9qqT7pGNrQs", tags: ["AMV"], archive: true, ratio: "1920x1440" },
  { title: "24 songs (3HC)", year: "2024", link: "https://youtu.be/v09zZf2FxR8", tags: ["AMV"], archive: true },
  { title: "greedy.", year: "2024", link: "https://youtu.be/J7AsizmgsmM", tags: ["AMV"], archive: true, ratio: "1920x1440" },
  { title: "souvenir", year: "2024", link: "https://youtu.be/1UzcsnItj4A", tags: ["AMV"], archive: true, file: "souvenir", ratio: "1920x1440" },
  { title: "Satoru Must Die.", year: "2024", link: "https://youtu.be/xVZte_mXWQw", tags: ["AMV"], archive: true, ratio: "1920x1440" },
  { title: "Jersey Luv", year: "2024", link: "https://youtu.be/bvHu2jeVNRw", tags: ["AMV", "4K"], archive: true },
  { title: "Swan Dive", year: "2024", link: "https://youtu.be/yPjcYOFGEGY", tags: ["AMV"], archive: true },
  { title: "Fashion × Naobito", year: "2024", link: "https://youtu.be/UJYsT7Rh6zc", tags: ["AMV"], archive: true, file: "fashion-x-naobito" },
  { title: "Never Let Go — Jujutsu Kaisen", year: "2024", link: "https://youtu.be/-BDQ1kl-0v8", tags: ["AMV", "4K"], archive: true },
  { title: "Hand Outs", year: "2023", link: "https://youtu.be/kV8l_27O9sE", tags: ["AMV", "4K"], archive: true, ratio: "1920x1440" },
  { title: "All The Stars 2HC", year: "2023", link: "https://youtu.be/nHbwl5nyaRA", tags: ["AMV"], archive: true, file: "all-the-stars-2hc" },
  { title: "Systëm — Jujutsu Kaisen", year: "2023", link: "https://youtu.be/iy1-ky8pHHw", tags: ["AMV", "4K"], archive: true },
  { title: "AINT READY (ft. @fxizvisualz)", year: "2023", link: "https://youtu.be/F7KMm9wvblA", tags: ["AMV"], archive: true, file: "aint-ready" },
  { title: "AINT READY — Jujutsu Kaisen (collab part)", year: "2023", link: "https://youtu.be/v4eWd8RqYV8", tags: ["AMV", "Collab part", "4K"], archive: true },
  { title: "Who's A True Friend? — Vagabond", year: "2023", link: "https://youtu.be/tG06bDflAvE", tags: ["MMV"], archive: true },
  { title: "Fire Force — End of The World", year: "2023", link: "https://youtu.be/2HxVXcznc8k", tags: ["AMV", "4K"], archive: true, file: "fire-force-end-of-the-world" },
  { title: "V3RSE Apps Opening", year: "2023", link: "https://youtu.be/8VPXYDwbqSY", tags: ["AMV", "4K"], archive: true },
  { title: "No Romance (rm: @z0uma.283)", year: "2023", link: "https://youtu.be/guqwviZL2ws", tags: ["AMV"], archive: true, file: "no-romance" },
  { title: "No More Talk — Jujutsu Kaisen (mep part)", year: "2023", link: "https://youtu.be/yn0zQVwDF_o", tags: ["AMV", "Collab part"], archive: true },
  { title: "Systëm (Quality Test)", year: "2023", link: "https://youtu.be/dUgWkpOhDa8", tags: ["AMV", "4K"], archive: true },
  { title: "Molly — Haise × Rize (ft. @rizevfx)", year: "2023", link: "https://youtu.be/LD69oFd74Nw", tags: ["AMV", "4K"], archive: true },
  { title: "Shibuya Incident — Glock In My Lap", year: "2023", link: "https://youtu.be/rQdx4sBfQ_E", tags: ["AMV", "4K"], archive: true },
  { title: "Ichigo vs Yhwach — Warning", year: "2023", link: "https://youtu.be/OSs_zv-SfBE", tags: ["AMV", "4K"], archive: true },
  { title: "Demon Slayer Mix — Hardy Boys V2", year: "2023", link: "https://youtu.be/JlJP9p4ufeE", tags: ["AMV", "4K"], archive: true },
  { title: "Demon Slayer — Molly", year: "2023", link: "https://youtu.be/Xk0HTK-8GRM", tags: ["AMV", "Collab part", "4K"], archive: true, file: "demon-slayer-molly" },
  { title: "Resonance — Chainsaw Man Trailer", year: "2023", link: "https://youtu.be/N64QflGnpg8", tags: ["AMV", "4K"], archive: true, ratio: "1920x1440" },
  { title: "Hell's Paradise — Waste", year: "2023", link: "https://youtu.be/4uklzqgTTvg", tags: ["AMV", "4K"], archive: true, ratio: "1920x1440" },
  { title: "animals.", year: "2023", link: "https://youtu.be/VN1MIR-vEP0", tags: ["AMV"], archive: true },
  { title: "Yum Yum. (collab part)", year: "2023", link: "https://youtu.be/0jw8wQmC1w8", tags: ["AMV", "Collab part"], archive: true, ratio: "1920x1440" },
  { title: "Gabimaru — Hell's Paradise 2HC", year: "2023", link: "https://youtu.be/vJh3eqRbHCo", tags: ["AMV"], archive: true, ratio: "1920x1440" },
  { title: "Shameless — Demon Slayer (ft. @odixkks)", year: "2023", link: "https://youtu.be/C7TKrUBXr5o", tags: ["AMV"], archive: true, ratio: "1920x1440" },
  { title: "Stunning — Demon Slayer", year: "2023", link: "https://youtu.be/5S-nk0ZkmiA", tags: ["AMV", "4K"], archive: true, ratio: "1920x1440" },
  { title: "Luxxid Diamondz — Demon Slayer", year: "2023", link: "https://youtu.be/u7tuLYKDC-U", tags: ["AMV", "4K"], archive: true, file: "luxxid-diamondz", ratio: "1920x1440" },
  { title: "Look Don't Touch", year: "2023", link: "https://youtu.be/ipAF32KYeSU", tags: ["AMV", "4K"], archive: true, ratio: "1920x1440" },
  { title: "Lights.", year: "2023", link: "https://youtu.be/3pDehi2RoNY", tags: ["AMV"], archive: true },
  { title: "Fashion", year: "2023", link: "https://youtu.be/5MgOSoMlyxY", tags: ["AMV"], archive: true },
  { title: "Ukrainian Boys (ft. @odixkks, @Lik_1)", year: "2023", link: "https://youtu.be/RfaOH3Qop2Q", tags: ["AMV"], archive: true },
  { title: "They Say 2 (remastered)", year: "2023", link: "https://youtu.be/v5D_ppt7v2o", tags: ["AMV"], archive: true },
  { title: "Living Life.", year: "2023", link: "https://youtu.be/gRlu7mmOuMk", tags: ["AMV"], archive: true },
  { title: "Grave — Hell's Paradise × Demon Slayer (ft. @Klebs2nd)", year: "2023", link: "https://youtu.be/ooiO8OG2Qmo", tags: ["AMV", "4K"], archive: true },
  { title: "Spring Editing Pack", year: "2023", link: "https://youtu.be/lVfRJwpbI7o", tags: ["Pack"], archive: true, file: "milka-spring-editing-pack" },
  { title: "Byrd — Demon Slayer (open collab)", year: "2023", link: "https://youtu.be/MHt7h5YLoTo", tags: ["AMV"], archive: true },
  { title: "london", year: "2023", link: "https://youtu.be/gIg3KnunZUo", tags: ["AMV"], archive: true },
  { title: "Mania.", year: "2023", link: "https://youtu.be/g3dFgwJCSRM", tags: ["AMV"], archive: true },
  { title: "You Know How We Do It — Rengoku", year: "2023", link: "https://youtu.be/RDWnpuV-tR4", tags: ["AMV"], archive: true },
  { title: "On My Own — Black Clover", year: "2023", link: "https://youtu.be/1yuZW_Z6dcI", tags: ["AMV", "4K"], archive: true, file: "on-my-own", ratio: "1920x1440" },
  { title: "Who? What! — Demon Slayer", year: "2023", link: "https://youtu.be/-qoPqzl_RHU", tags: ["AMV"], archive: true },
  { title: "poland kid", year: "2023", link: "https://youtu.be/9itJdfbHO-E", tags: ["AMV"], archive: true },
  { title: "The Beach — Beyond the Boundary", year: "2023", link: "https://youtu.be/X23B4pPTem8", tags: ["AMV", "4K"], archive: true, file: "the-beach" },
  { title: "make it right. (ft. @odixkks)", year: "2023", link: "https://youtu.be/DIi0dNqN0L0", tags: ["AMV"], archive: true, file: "make-it-right" },
  { title: "People You Know", year: "2023", link: "https://youtu.be/B3_ignIQ57M", tags: ["AMV"], archive: true, file: "people-you-know" },
  { title: "Infinity.", year: "2023", link: "https://youtu.be/wZSd__6q2TM", tags: ["AMV"], archive: true, file: "infinity" },
  { title: "ft. @Lik_1", year: "2023", link: "https://youtu.be/scMbj7iwkCE", tags: ["AMV"], archive: true },
  { title: "One Day (3HC collab part)", year: "2023", link: "https://youtu.be/fH1bLfKCT8M", tags: ["AMV", "Collab part"], archive: true, file: "one-day-3hc" },
  { title: "edit from 2021", year: "2023", link: "https://youtu.be/sy-7iN_a0Io", tags: ["AMV"], archive: true },
  { title: "Pursuit. (ft. @Bld.602)", year: "2023", link: "https://youtu.be/6WWCOWD62Oc", tags: ["AMV"], archive: true, file: "pursuit" },
  { title: "Pursuit (collab part)", year: "2023", link: "https://youtu.be/bFgIJ5OWH9M", tags: ["AMV", "Collab part"], archive: true },
  { title: "Live a lil. — Demon Slayer", year: "2023", link: "https://youtu.be/wdRb50u2RFQ", tags: ["AMV", "4K"], archive: true, file: "live-a-lil" },
  { title: "Billie Jean — Demon Slayer", year: "2023", link: "https://youtu.be/vMpF6EB8qD4", tags: ["AMV"], archive: true, file: "billie-jean" },
  { title: "Fetti. (ft. @samurai.1833)", year: "2023", link: "https://youtu.be/UXlcwVbbxuo", tags: ["AMV"], archive: true, file: "fetti" },
  { title: "Tell Em — Demon Slayer (ft. @odixkks)", year: "2023", link: "https://youtu.be/ryJjObB1OpE", tags: ["AMV"], archive: true },
  { title: "Fly By Midnight — Milka × Zemzo", year: "2023", link: "https://youtu.be/pgLzBRjAzK8", tags: ["AMV"], archive: true, file: "fly-by-midnight" },
  { title: "Lost — Naruto Shippuden Mix", year: "2022", link: "https://youtu.be/5cFv8-V12a8", tags: ["AMV"], archive: true },
  { title: "Killers From The Northside — Chainsaw Man", year: "2022", link: "https://youtu.be/HSLOB1WRV5o", tags: ["AMV"], archive: true },
  { title: "Murder On My Mind — Demon Slayer", year: "2022", link: "https://youtu.be/L7xx0WRq13M", tags: ["AMV"], archive: true, file: "murder-on-my-mind" },
  { title: "Walk (Milka's open collab)", year: "2022", link: "https://youtu.be/ebLDHSY8WhY", tags: ["AMV"], archive: true },
  { title: "part for ???", year: "2022", link: "https://youtu.be/gKqT-k4Y56A", tags: ["AMV", "Collab part"], archive: true, file: "part-for" },
  { title: "Damage #h1pp3xsoc1", year: "2022", link: "https://youtu.be/ycx2Z4UgZ48", tags: ["AMV"], archive: true, file: "damage" },
  { title: "1HC scrap", year: "2022", link: "https://youtu.be/OocaGwMQ3oI", tags: ["AMV"], archive: true },
  { title: "First Woe — Demon Slayer", year: "2022", link: "https://youtu.be/etx8ngmnO7A", tags: ["AMV"], archive: true },
  { title: "Turn It Up", year: "2022", link: "https://youtu.be/2wr1O4HoFdo", tags: ["AMV"], archive: true },
  { title: "Talk (flow edit)", year: "2022", link: "https://youtu.be/QtpwFrCsWyM", tags: ["AMV"], archive: true },
  { title: "Insomnia", year: "2022", link: "https://youtu.be/Csb6mem6T7Y", tags: ["AMV"], archive: true, file: "insomnia" },
  { title: "Stand Out (part)", year: "2022", link: "https://youtu.be/PeO6T-SPUPo", tags: ["AMV", "Collab part"], archive: true },
  { title: "Skat", year: "2022", link: "https://youtu.be/zIHyqK_Seu4", tags: ["AMV"], archive: true },
  { title: "Katana (mep part)", year: "2022", link: "https://youtu.be/7wB9kq3qEM4", tags: ["AMV", "Collab part"], archive: true },
  { title: "Money So Big (S1lent remake)", year: "2022", link: "https://youtu.be/G69uzIt5nIs", tags: ["AMV", "4K"], archive: true },
  { title: "Under The Influence", year: "2022", link: "https://youtu.be/rWxFQ7cLQ6o", tags: ["AMV"], archive: true },
  { title: "Never Cared", year: "2022", link: "https://youtu.be/k31oa68iiVI", tags: ["AMV"], archive: true },
  { title: "Into You", year: "2022", link: "https://youtu.be/9fGVoCioNaA", tags: ["AMV"], archive: true },
  { title: "Riddle (mep part)", year: "2022", link: "https://youtu.be/yV3jA3wCRLc", tags: ["AMV", "Collab part"], archive: true },
  { title: "Runnin (remake)", year: "2022", link: "https://youtu.be/JWUE_STxdN4", tags: ["AMV"], archive: true },
  { title: "Can't Hold Us", year: "2022", link: "https://youtu.be/2TrIkwEnJrA", tags: ["AMV"], archive: true },
  { title: "Sacrifice", year: "2022", link: "https://youtu.be/1DQQZWezyW4", tags: ["AMV"], archive: true },
  { title: "moonlight", year: "2022", link: "https://youtu.be/JLnZs9JYSXI", tags: ["AMV"], archive: true },
  { title: "They Say", year: "2022", link: "https://youtu.be/bE6QxOu4YT4", tags: ["AMV"], archive: true },
  { title: "quick collab edit", year: "2022", link: "https://youtu.be/E4jp1yJtm78", tags: ["AMV"], archive: true },
  { title: "Deity", year: "2022", link: "https://youtu.be/S-zElGdu51g", tags: ["AMV"], archive: true },
  { title: "Welcome to the Party", year: "2022", link: "https://youtu.be/QpXUjSQusc0", tags: ["AMV", "4K"], archive: true }
];
