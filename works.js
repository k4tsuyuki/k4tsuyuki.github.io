/* =====================================================================
   ЭТО ЕДИНСТВЕННЫЙ ФАЙЛ, КОТОРЫЙ НУЖНО МЕНЯТЬ.
   Здесь контакты и список работ.
   Меняй только текст внутри кавычек "...". Запятые и скобки не трогай.
   ===================================================================== */

window.SITE = {
  name: "Katsuyuki",
  focus: "Anime edits / AMV",
  software: "After Effects / Photoshop",
  count: "10",                  // большая цифра на главной и у раздела Works
  /* контакты: если ссылки нет (url: ""), рядом будет кнопка Copy */
  contacts: [
    { label: "Email",   value: "vplisetskyi@gmail.com", url: "mailto:vplisetskyi@gmail.com" },
    { label: "YouTube", value: "@k4tsuyuki",            url: "https://www.youtube.com/@k4tsuyuki" },
    { label: "Telegram",  value: "katsuyuk1",           url: "https://t.me/katsuyuk1" },
    { label: "Instagram", value: "koyomifanboy",        url: "https://www.instagram.com/koyomifanboy/" },
    { label: "Discord",   value: "k4tsuyuk1",           url: "" },
    { label: "Steam",     value: "k4tsuyuki",           url: "https://steamcommunity.com/id/k4tsuyuki/" },
    { label: "Payhip",    value: "koyomifanboy",        url: "https://payhip.com/koyomifanboy" }
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
   --------------------------------------------------------------------- */

window.WORKS = [
  { title: "Archetype 3HC",              year: "2026", link: "https://www.youtube.com/watch?v=YSs2BbX69Fo", tags: ["AMV"] },
  { title: "Sing Me to Sleep",           year: "2026", link: "https://youtu.be/gpQxpaTkwDQ", tags: ["AMV", "4K"] },
  { title: "Save Me × Legendary Lovers", year: "2026", link: "https://youtu.be/_Asoua2qE_0", tags: ["AMV", "4K"] },
  { title: "Forever Young",              year: "2026", link: "https://youtu.be/gxeuKaxkKi8", tags: ["AMV"] },
  { title: "Transgender 2",              year: "2026", link: "https://youtu.be/xv_AfLaNKWQ", tags: ["AMV", "Collab", "Loop"] },
  { title: "Cachalot",                   year: "2026", link: "https://youtu.be/k-nNshOo_9o", tags: ["AMV", "Collab", "4K"] },
  { title: "Spokoynaya Noch",            year: "2026", link: "https://youtu.be/oNwfnxYTpaw", tags: ["AMV", "4K"] },
  { title: "I'm God",                    year: "2026", link: "https://youtu.be/38tOSZbfzXk", tags: ["AMV"] },
  { title: "Missing Textures",           year: "2026", link: "https://youtu.be/wH6_dg3BL80", tags: ["AMV", "4K"] },
  { title: "Transgender",                year: "2025", link: "https://youtu.be/hvh8QtzKZQA", tags: ["AMV"] },
  { title: "Just Ur Doll",               year: "2025", link: "https://youtu.be/TWAUvWGPW7k", tags: ["AMV"] },
  { title: "Under Your Spell",           year: "2025", link: "https://youtu.be/f5h1Djyj19M", tags: ["AMV"] },
  { title: "Can't Feel Myself",          year: "2024", link: "https://youtu.be/xg8joSFOHxU", tags: ["AMV", "Animation"] }
];
