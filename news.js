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
    date: "2026-11-05",
    title: "Small things, done right",
    text: "Draw a card. A link in Works pulls a random edit like a tarot card.\nCovers. They tilt under the cursor, and a fast swipe across one slices it open.\nOrder. A wax seal with my K after you send an order, plus FAQ with answers on revisions, payment and posting.\nPreviews. Clients get a private page to watch the draft and leave comments.\nPFS. Promo codes now work at checkout.\nEmail. Subscribe under contacts to get a letter when a new edit is out.\n\nThe site also loads faster now.",
    link: "/order/",
    button: "Order an edit"
  },
  {
    date: "2026-10-31",
    title: "About me, and a few details",
    text: "About. A new page: who I am, what I edit on, and how to credit me in collabs.\nGothic. The cross button next to the theme switch turns the whole site gothic.\nLinks. A link to the site or to any single edit now shows its own preview card in Discord, Telegram and other apps.\nCopy. Copying my email or Discord now shows a clear notice.\n\nThere's also something hidden on the site. Try to find it.",
    link: "/about/",
    button: "Open About"
  },
  {
    date: "2026-10-28",
    title: "A new chapter for the site",
    text: "Everything I do now lives in one place.\n\nPFS. My project files and packs, sold right here, no Payhip in between. Free ones download for your email, the rest through PayPal.\nOrder. Commission an edit: pick a format and see the price and the earliest date I can deliver.\nWorks. The full archive, every edit from my channel since 2022.\nHome. A new first screen with my latest edit at full size.\nHolidays. The site changes its look for Halloween, Christmas, New Year, Valentine's Day, sakura season and April 1.\nNews. New posts now pop up when you visit.\n\nThanks for being here.",
    link: "/files/",
    button: "Open PFS"
  },
  {
    date: "2026-10-18",
    title: "New address",
    text: "The site now lives at katsuyuki.studio.",
    link: "",
    button: ""
  }
];
