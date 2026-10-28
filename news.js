/* =====================================================================
   НОВОСТИ. Самая верхняя запись показывается первой.
   Чтобы добавить новость, скопируй блок от { до }, вставь его сразу
   после строки "window.NEWS = [" и поменяй текст в кавычках:
     date   — дата в виде "ГГГГ-ММ-ДД", например "2026-10-18"
     title  — заголовок
     text   — текст (новая строка: \n)
     link   — ссылка, например на файлы проекта (Google Drive, Mega, Payhip).
              Если ссылки нет, оставь пустые кавычки ""
     button — надпись на кнопке ссылки, например "Download project".
              Если пусто, будет "Open"
   Если в списке нет ни одной новости, раздел News на сайте скрывается.
   ===================================================================== */

window.NEWS = [
  {
    date: "2026-10-28",
    title: "Site update",
    text: "Files: project files and packs, now sold right here. Free ones download with just your email, paid ones go through PayPal.\nOrder: commission an edit, with prices and the earliest deadline.\nWorks: all my edits from YouTube, under the All edits button.",
    link: "/files/",
    button: "Open Files"
  },
  {
    date: "2026-10-18",
    title: "New address",
    text: "The site now lives at katsuyuki.studio.",
    link: "",
    button: ""
  }
];
