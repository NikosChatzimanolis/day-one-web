// ── lib/translations.ts ──

export const languages = ['EN', 'EL', 'RU'] as const
export type Language = typeof languages[number]

const translations = {
  // ─── Navbar ───
  'nav.process': { EN: 'Process', EL: 'Διαδικασία', RU: 'Процесс' },
  'nav.work': { EN: 'Work', EL: 'Δουλειές', RU: 'Работы' },
  'nav.pricing': { EN: 'Pricing', EL: 'Τιμές', RU: 'Цены' },
  'nav.contact': { EN: 'Contact', EL: 'Επικοινωνία', RU: 'Контакт' },
  'nav.cta': { EN: 'Get started today', EL: 'Ξεκινήστε σήμερα', RU: 'Начните сегодня' },
  'nav.openMenu': { EN: 'Open menu', EL: 'Άνοιγμα μενού', RU: 'Открыть меню' },
  'nav.closeMenu': { EN: 'Close menu', EL: 'Κλείσιμο μενού', RU: 'Закрыть меню' },

  // ─── Hero ───
  'hero.label': { EN: 'Web studio — Cyprus & Greece', EL: 'Web studio — Κύπρος & Ελλάδα', RU: 'Веб-студия — Кипр и Греция' },
  'hero.headline1': { EN: 'Customers are already', EL: 'Οι πελάτες σας ήδη', RU: 'Клиенты уже' },
  'hero.headline2': { EN: 'searching for you.', EL: 'σας ψάχνουν.', RU: 'ищут вас.' },
  'hero.description': {
    EN: 'We build the system that catches them — a website designed to convert, visible on Google, and ready in days.',
    EL: 'Φτιάχνουμε το σύστημα που τους πιάνει — site που φέρνει πελάτες, εμφανίζεται στο Google, και είναι έτοιμο σε μέρες.',
    RU: 'Мы создаём систему, которая их находит — сайт, созданный для конверсии, видимый в Google и готовый за дни.',
  },
  'hero.cta': { EN: 'Get noticed now', EL: 'Κάντε το πρώτο βήμα', RU: 'Станьте заметными сейчас' },
  'hero.note': {
    EN: 'We take your online presence off your hands so you can focus on running your business',
    EL: 'Αναλαμβάνουμε την online παρουσία σας για να εστιάσετε στη δουλειά σας',
    RU: 'Мы берём вашу онлайн-присутствие на себя, чтобы вы занимались своим бизнесом',
  },

  // ─── Process / How It Works ───
  'process.label': { EN: 'How we work', EL: 'Πώς δουλεύουμε', RU: 'Как мы работаем' },
  'process.heading': { EN: 'We build the system — not just the site', EL: 'Φτιάχνουμε σύστημα — όχι απλά ένα site', RU: 'Мы строим систему — не просто сайт' },
  'process.description': {
    EN: 'Most studios hand you a website and disappear. We build something that brings customers in — and keep improving it over time.',
    EL: 'Οι περισσότεροι σου φτιάχνουν ένα site και χάνονται. Εμείς φτιάχνουμε κάτι που δουλεύει — και το βελτιώνουμε συνεχώς.',
    RU: 'Большинство студий делают сайт и исчезают. Мы создаём то, что привлекает клиентов — и продолжаем улучшать.',
  },
  'process.step1.title': { EN: 'Understand & Position', EL: 'Κατανόηση & Στρατηγική', RU: 'Анализ и позиционирование' },
  'process.step1.description': {
    EN: 'We quickly understand your business, your customers, and what actually drives results. Then we define how your website should convert visitors into calls, bookings, or messages — not just exist online.',
    EL: 'Μαθαίνουμε γρήγορα τη δουλειά σας, τους πελάτες σας και τι πραγματικά φέρνει αποτέλεσμα. Μετά σχεδιάζουμε πώς το site σας θα μετατρέπει επισκέπτες σε κλήσεις, κρατήσεις ή μηνύματα.',
    RU: 'Мы быстро разбираемся в вашем бизнесе, клиентах и том, что приносит результат. Затем определяем, как сайт будет конвертировать посетителей в звонки, бронирования или сообщения.',
  },
  'process.step1.part': { EN: 'Your part: a short call', EL: 'Από εσάς: ένα σύντομο τηλεφώνημα', RU: 'От вас: короткий звонок' },
  'process.step2.title': { EN: 'Design, Build & Optimise', EL: 'Σχεδιασμός & Κατασκευή', RU: 'Дизайн, разработка и оптимизация' },
  'process.step2.description': {
    EN: 'We build your full online presence — structure, design, and messaging. Mobile-first, fast, and focused on conversion. Everything is set up to turn visitors into real customers.',
    EL: 'Στήνουμε ολόκληρη την online παρουσία σας — δομή, σχεδιασμό και κείμενα. Πρώτα κινητό, γρήγορο, και φτιαγμένο για να φέρνει πελάτες.',
    RU: 'Мы создаём полное онлайн-присутствие — структуру, дизайн и контент. Mobile-first, быстрый и ориентированный на конверсию.',
  },
  'process.step2.part': { EN: 'Your part: review and approve', EL: 'Από εσάς: κοιτάτε και εγκρίνετε', RU: 'От вас: проверка и одобрение' },
  'process.step3.title': { EN: 'Activate Visibility', EL: 'Ενεργοποίηση Ορατότητας', RU: 'Активация видимости' },
  'process.step3.description': {
    EN: "A website alone isn\u2019t enough. We set up your Google presence, structure your visibility, and guide how customers will actually find you. Everything is aligned to bring traffic that converts.",
    EL: 'Ένα site από μόνο του δεν αρκεί. Σας στήνουμε στο Google, στα social media, και φροντίζουμε να σας βρίσκουν οι πελάτες σας.',
    RU: 'Одного сайта недостаточно. Мы настраиваем ваше присутствие в Google, структурируем видимость и направляем клиентов к вам.',
  },
  'process.step3.part': { EN: 'Your part: nothing — we handle it', EL: 'Από εσάς: τίποτα — τα αναλαμβάνουμε όλα', RU: 'От вас: ничего — мы всё сделаем' },
  'process.step4.title': { EN: 'Ongoing Growth', EL: 'Συνεχής Ανάπτυξη', RU: 'Постоянный рост' },
  'process.step4.description': {
    EN: 'We continuously improve your system — updates, content, optimisation, and expansion. Your online presence evolves instead of becoming outdated.',
    EL: 'Βελτιώνουμε συνεχώς το σύστημά σας — ενημερώσεις, περιεχόμενο, βελτιστοποίηση και επέκταση. Η παρουσία σας εξελίσσεται αντί να μένει πίσω.',
    RU: 'Мы постоянно улучшаем вашу систему — обновления, контент, оптимизация и расширение. Ваше онлайн-присутствие развивается, а не устаревает.',
  },
  'process.step4.part': { EN: 'Your part: optional — for businesses that want to grow', EL: 'Από εσάς: προαιρετικό — για όσους θέλουν να αναπτυχθούν', RU: 'От вас: по желанию — для бизнеса, который хочет расти' },
  'process.result': {
    EN: 'Your system is built to bring in customers — not just sit online.',
    EL: 'Το σύστημά σας φτιάχτηκε για να φέρνει πελάτες — όχι απλά να υπάρχει.',
    RU: 'Ваша система создана привлекать клиентов — а не просто существовать в интернете.',
  },
  'process.getStarted': { EN: 'Get started', EL: 'Ξεκινήστε', RU: 'Начать' },
  'process.seeFullProcess': { EN: 'See the full process', EL: 'Δείτε ολόκληρη τη διαδικασία', RU: 'Полный процесс' },

  // ─── Demo ───
  'demo.label': { EN: 'See it in action', EL: 'Δείτε τα αποτελέσματα', RU: 'Смотрите в действии' },
  'demo.heading': { EN: 'Real businesses. Real builds.', EL: 'Πραγματικές επιχειρήσεις. Πραγματικά sites.', RU: 'Реальный бизнес. Реальные проекты.' },
  'demo.description': {
    EN: "These aren\u2019t templates. Every site is built from scratch for the business it represents. Browse real examples and see the quality for yourself.",
    EL: 'Δεν είναι έτοιμα πρότυπα. Κάθε site φτιάχνεται από το μηδέν για τη δουλειά που εξυπηρετεί. Δείτε πραγματικά παραδείγματα.',
    RU: 'Это не шаблоны. Каждый сайт создаётся с нуля для конкретного бизнеса. Посмотрите реальные примеры.',
  },
  'demo.cta': { EN: 'Want this for your business?', EL: 'Θέλετε κάτι αντίστοιχο;', RU: 'Хотите такое для своего бизнеса?' },
  'demo.placeholder.title': { EN: 'Live demos coming soon', EL: 'Σύντομα κοντά σας', RU: 'Скоро live-демо' },
  'demo.placeholder.text': {
    EN: "We\u2019re preparing interactive previews of real client builds. Check back shortly.",
    EL: 'Ετοιμάζουμε παραδείγματα από πραγματικές δουλειές μας. Ελάτε σύντομα ξανά.',
    RU: 'Мы готовим интерактивные превью реальных проектов. Загляните позже.',
  },

  // ─── Pricing ───
  'pricing.label': { EN: 'What you get', EL: 'Τι περιλαμβάνει', RU: 'Что вы получаете' },
  'pricing.heading': { EN: 'Clear pricing. No surprises.', EL: 'Ξεκάθαρες τιμές. Χωρίς εκπλήξεις.', RU: 'Прозрачные цены. Без сюрпризов.' },
  'pricing.subtitle': { EN: 'Choose the right fit for your business.', EL: 'Διαλέξτε αυτό που ταιριάζει στη δουλειά σας.', RU: 'Выберите подходящий вариант для вашего бизнеса.' },
  'pricing.launch': { EN: 'Launch', EL: 'Launch', RU: 'Запуск' },
  'pricing.advanced': { EN: 'Advanced', EL: 'Advanced', RU: 'Расширенный' },
  'pricing.growth': { EN: 'Growth', EL: 'Growth', RU: 'Рост' },
  'pricing.oneTime': { EN: 'one-time', EL: 'εφάπαξ', RU: 'единоразово' },
  'pricing.ongoingManagement': { EN: 'ongoing system management', EL: 'συνεχής διαχείριση', RU: 'постоянное управление системой' },
  'pricing.recommended': { EN: 'Recommended', EL: 'Προτείνεται', RU: 'Рекомендуем' },
  'pricing.getPreview': { EN: 'Get started', EL: 'Ξεκινήστε', RU: 'Начать' },
  'pricing.startGrowing': { EN: 'Start growing', EL: 'Ξεκινήστε τώρα', RU: 'Начать расти' },
  'pricing.launch.f1': { EN: 'Custom website (built for your business)', EL: 'Site φτιαγμένο για τη δουλειά σας', RU: 'Индивидуальный сайт (для вашего бизнеса)' },
  'pricing.launch.f2': { EN: 'Mobile-first, fast-loading design', EL: 'Σχεδιασμός για κινητό, γρήγορη φόρτωση', RU: 'Mobile-first, быстрая загрузка' },
  'pricing.launch.f3': { EN: 'Conversion-focused structure', EL: 'Δομή που φέρνει πελάτες', RU: 'Структура, ориентированная на конверсию' },
  'pricing.launch.f4': { EN: 'Contact system (forms, WhatsApp, calls)', EL: 'Σύστημα επικοινωνίας (φόρμες, WhatsApp, κλήσεις)', RU: 'Система контактов (формы, WhatsApp, звонки)' },
  'pricing.launch.f5': { EN: 'Google Business setup + basic visibility setup', EL: 'Στήσιμο Google Business + βασική ορατότητα', RU: 'Настройка Google Business + базовая видимость' },
  'pricing.launch.f6': { EN: 'Social media profile setup (Facebook, Instagram)', EL: 'Στήσιμο social media (Facebook, Instagram)', RU: 'Настройка соцсетей (Facebook, Instagram)' },
  'pricing.launch.f7': { EN: 'Live within days, not months', EL: 'Online σε μέρες, όχι μήνες', RU: 'Онлайн за дни, а не месяцы' },
  'pricing.launch.f8': { EN: '30 days of post-launch adjustments', EL: '30 μέρες αλλαγών μετά την παράδοση', RU: '30 дней корректировок после запуска' },
  'pricing.advanced.f1': { EN: 'Everything in Launch', EL: 'Ό,τι έχει το Launch', RU: 'Всё из тарифа Запуск' },
  'pricing.advanced.f2': { EN: 'Multi-page website (up to 5 pages)', EL: 'Site πολλών σελίδων (έως 5)', RU: 'Многостраничный сайт (до 5 страниц)' },
  'pricing.advanced.f3': { EN: 'Advanced SEO + structured data', EL: 'Προχωρημένο SEO + δομημένα δεδομένα', RU: 'Продвинутое SEO + структурированные данные' },
  'pricing.advanced.f4': { EN: 'Google Analytics + conversion tracking', EL: 'Google Analytics + παρακολούθηση μετατροπών', RU: 'Google Analytics + отслеживание конверсий' },
  'pricing.advanced.f5': { EN: 'Social media setup + profile optimisation', EL: 'Στήσιμο social media + βελτιστοποίηση προφίλ', RU: 'Настройка соцсетей + оптимизация профиля' },
  'pricing.advanced.f6': { EN: 'CMS integration (easy content editing)', EL: 'Σύστημα διαχείρισης περιεχομένου (εύκολη επεξεργασία)', RU: 'Интеграция CMS (простое редактирование)' },
  'pricing.advanced.f7': { EN: 'Custom animations + interactions', EL: 'Εξατομικευμένα animations & εφέ', RU: 'Пользовательские анимации и взаимодействия' },
  'pricing.advanced.f8': { EN: 'Priority delivery', EL: 'Παράδοση κατά προτεραιότητα', RU: 'Приоритетная доставка' },
  'pricing.growth.setup': { EN: '+ €550 one-time setup (Advanced website included)', EL: '+ €550 εφάπαξ (περιλαμβάνει Advanced site)', RU: '+ €550 единоразовая настройка (включает сайт Расширенный)' },
  'pricing.growth.f1': { EN: 'Everything in Advanced', EL: 'Ό,τι έχει το Advanced', RU: 'Всё из тарифа Расширенный' },
  'pricing.growth.f2': { EN: 'Continuous improvements and optimisation', EL: 'Συνεχείς βελτιώσεις και βελτιστοποίηση', RU: 'Постоянные улучшения и оптимизация' },
  'pricing.growth.f3': { EN: 'Social media coverage — strategy & posting', EL: 'Social media — στρατηγική & δημοσιεύσεις', RU: 'Соцсети — стратегия и публикации' },
  'pricing.growth.f4': { EN: 'Conversion tracking + performance insights', EL: 'Παρακολούθηση αποτελεσμάτων & αναφορές', RU: 'Отслеживание конверсий + аналитика' },
  'pricing.growth.f5': { EN: 'Ongoing visibility improvements (Google & local)', EL: 'Συνεχής βελτίωση ορατότητας (Google & τοπικά)', RU: 'Постоянное улучшение видимости (Google и локально)' },
  'pricing.growth.f6': { EN: 'Priority support and fast updates', EL: 'Άμεση υποστήριξη και γρήγορες αλλαγές', RU: 'Приоритетная поддержка и быстрые обновления' },
  'pricing.growth.note': {
    EN: 'A website alone is not enough — this is how you actually grow. Social media coverage includes strategy and posting, not content creation. Minimum 3-month contract.',
    EL: 'Ένα site από μόνο του δεν αρκεί — έτσι αναπτύσσεστε στα αλήθεια. Τα social media περιλαμβάνουν στρατηγική και δημοσιεύσεις, όχι δημιουργία περιεχομένου. Ελάχιστη διάρκεια 3 μήνες.',
    RU: 'Одного сайта недостаточно — так вы действительно растёте. Покрытие соцсетей включает стратегию и публикации, но не создание контента. Минимальный контракт — 3 месяца.',
  },
  'pricing.vatNote': {
    EN: 'All prices exclude VAT where applicable. Hosting and domain costs are separate.',
    EL: 'Οι τιμές δεν περιλαμβάνουν ΦΠΑ. Hosting και domain χρεώνονται ξεχωριστά.',
    RU: 'Цены не включают НДС. Стоимость хостинга и домена оплачивается отдельно.',
  },
  'pricing.questions': { EN: 'Questions? Just ask.', EL: 'Απορίες; Ρωτήστε μας.', RU: 'Вопросы? Спрашивайте.' },
  'pricing.contentTitle': { EN: 'Need content creation?', EL: 'Χρειάζεστε περιεχόμενο;', RU: 'Нужно создание контента?' },
  'pricing.contentText': {
    EN: "Custom content packages — including photography, video, and copywriting — can be provided and quoted after a brief discussion.",
    EL: 'Πακέτα περιεχομένου — φωτογραφία, βίντεο και κείμενα — γίνονται κατόπιν συνεννόησης.',
    RU: 'Пакеты контента — фото, видео и копирайтинг — предоставляются после обсуждения.',
  },
  'pricing.contentCta': { EN: "Let\u2019s talk about it.", EL: 'Ας τα πούμε.', RU: 'Давайте обсудим.' },

  // ─── Contact ───
  'contact.label': { EN: 'Get in touch', EL: 'Επικοινωνία', RU: 'Связаться' },
  'contact.heading': {
    EN: "Let\u2019s build something that brings customers in",
    EL: 'Ας φτιάξουμε κάτι που φέρνει πελάτες',
    RU: 'Давайте создадим то, что привлекает клиентов',
  },
  'contact.description': {
    EN: "Tell us about your business and we\u2019ll show you exactly how customers will find you online.",
    EL: 'Πείτε μας λίγα λόγια για τη δουλειά σας και θα σας δείξουμε πώς θα σας βρίσκουν οι πελάτες σας online.',
    RU: 'Расскажите о вашем бизнесе, и мы покажем, как именно клиенты будут вас находить онлайн.',
  },
  'contact.whatsapp': { EN: 'WhatsApp', EL: 'WhatsApp', RU: 'WhatsApp' },
  'contact.email': { EN: 'Email', EL: 'Email', RU: 'Email' },
  'contact.basedIn': { EN: 'Based in', EL: 'Έδρα', RU: 'Расположение' },
  'contact.location': { EN: 'Paphos, Cyprus', EL: 'Πάφος, Κύπρος', RU: 'Пафос, Кипр' },
  'contact.responseTime': {
    EN: 'We usually respond within 2 hours on WhatsApp.',
    EL: 'Απαντάμε συνήθως εντός 2 ωρών στο WhatsApp.',
    RU: 'Обычно отвечаем в WhatsApp в течение 2 часов.',
  },

  // ─── Contact Form ───
  'form.name': { EN: 'Your name', EL: 'Το όνομά σας', RU: 'Ваше имя' },
  'form.namePlaceholder': { EN: 'Nikos Papadopoulos', EL: 'Νίκος Παπαδόπουλος', RU: 'Иван Иванов' },
  'form.email': { EN: 'Email address', EL: 'Email', RU: 'Электронная почта' },
  'form.emailPlaceholder': { EN: 'nikos@yourbusiness.com', EL: 'nikos@yourbusiness.com', RU: 'ivan@yourbusiness.com' },
  'form.message': { EN: 'Tell us about your project', EL: 'Πείτε μας για τη δουλειά σας', RU: 'Расскажите о вашем проекте' },
  'form.messagePlaceholder': {
    EN: 'I run a small restaurant in Paphos and need a website to attract more customers and take bookings.',
    EL: 'Έχω ένα μικρό εστιατόριο στην Πάφο και θέλω ένα site για να βρίσκω πελάτες και να παίρνω κρατήσεις.',
    RU: 'У меня небольшой ресторан в Пафосе, и мне нужен сайт для привлечения клиентов и бронирования.',
  },
  'form.submit': { EN: 'Send message', EL: 'Αποστολή μηνύματος', RU: 'Отправить сообщение' },
  'form.sending': { EN: 'Sending...', EL: 'Αποστολή...', RU: 'Отправка...' },
  'form.note': {
    EN: "We\u2019ll get back to you within a few hours",
    EL: 'Θα επικοινωνήσουμε μαζί σας εντός λίγων ωρών',
    RU: 'Мы свяжемся с вами в течение нескольких часов',
  },
  'form.successTitle': { EN: 'Message sent', EL: 'Μήνυμα εστάλη', RU: 'Сообщение отправлено' },
  'form.successText': {
    EN: "We\u2019ll review it and get back to you within 24 hours. Keep an eye on your inbox.",
    EL: 'Θα το δούμε και θα σας απαντήσουμε μέσα σε 24 ώρες. Τσεκάρετε το email σας.',
    RU: 'Мы рассмотрим и ответим в течение 24 часов. Следите за почтой.',
  },
  'form.sendAnother': { EN: 'Send another message', EL: 'Στείλτε άλλο μήνυμα', RU: 'Отправить ещё' },
  'form.nameRequired': { EN: 'Name is required.', EL: 'Το όνομα είναι υποχρεωτικό.', RU: 'Имя обязательно.' },
  'form.nameMin': { EN: 'Name must be at least 2 characters.', EL: 'Τουλάχιστον 2 χαρακτήρες.', RU: 'Минимум 2 символа.' },
  'form.emailRequired': { EN: 'Email is required.', EL: 'Το email είναι υποχρεωτικό.', RU: 'Email обязателен.' },
  'form.emailInvalid': { EN: 'Please enter a valid email address.', EL: 'Εισάγετε έγκυρο email.', RU: 'Введите корректный email.' },
  'form.messageRequired': { EN: 'Message is required.', EL: 'Το μήνυμα είναι υποχρεωτικό.', RU: 'Сообщение обязательно.' },
  'form.messageMin': { EN: 'Message must be at least 10 characters.', EL: 'Τουλάχιστον 10 χαρακτήρες.', RU: 'Минимум 10 символов.' },
  'form.messageMax': { EN: 'Message must be under 2000 characters.', EL: 'Μέγιστο 2000 χαρακτήρες.', RU: 'Максимум 2000 символов.' },

  // ─── Footer ───
  'footer.tagline': { EN: 'Systems that bring customers to your business.', EL: 'Συστήματα που φέρνουν πελάτες στη δουλειά σας.', RU: 'Системы, которые приводят клиентов в ваш бизнес.' },
  'footer.navigation': { EN: 'Navigation', EL: 'Πλοήγηση', RU: 'Навигация' },
  'footer.getInTouch': { EN: 'Get in touch', EL: 'Επικοινωνία', RU: 'Связаться' },
  'footer.copyright': { EN: '© 2026 Day One. Cyprus.', EL: '© 2026 Day One. Κύπρος.', RU: '© 2026 Day One. Кипр.' },

  // ─── How We Work page ───
  'hww.label': { EN: 'How we work', EL: 'Πώς δουλεύουμε', RU: 'Как мы работаем' },
  'hww.heading': { EN: 'How We Work', EL: 'Πώς Δουλεύουμε', RU: 'Как Мы Работаем' },
  'hww.subheading': {
    EN: 'One system. Every channel. Built to convert.',
    EL: 'Ένα σύστημα. Κάθε κανάλι. Στημένο για να αποδίδει.',
    RU: 'Единая система. Все каналы. Настроено на результат.',
  },
  'hww.intro': {
    EN: 'We build and manage the complete online presence of a business — website, visibility, contact paths, and social media — then keep it working as one connected system over time. Content production such as photography, video, and custom creative assets is available separately when needed.',
    EL: 'Φτιάχνουμε και διαχειριζόμαστε την πλήρη διαδικτυακή παρουσία μιας επιχείρησης — ιστοσελίδα, ορατότητα, τρόπους επικοινωνίας και μέσα κοινωνικής δικτύωσης — και τα κρατάμε να λειτουργούν ως ένα ενιαίο σύστημα. Η παραγωγή περιεχομένου, όπως φωτογραφία, βίντεο και δημιουργικό υλικό, είναι διαθέσιμη ξεχωριστά, όταν χρειάζεται.',
    RU: 'Мы создаём и ведём полноценное онлайн-присутствие бизнеса — сайт, видимость в поиске, каналы коммуникации и социальные сети — и обеспечиваем их совместную работу как единой системы. Создание контента: фото, видео и авторские материалы — доступно отдельно, по запросу.',
  },
  'hww.backHome': { EN: 'Back to home', EL: 'Πίσω στην αρχική', RU: 'На главную' },
  'hww.home': { EN: 'Home', EL: 'Αρχική', RU: 'Главная' },

  // Steps
  'hww.step1.title': { EN: 'Understand the Business', EL: 'Κατανοούμε την Επιχείρηση', RU: 'Изучаем Бизнес' },
  'hww.step1.description': {
    EN: 'We start by learning exactly what you offer, who your customers are, and how they should find and contact you. No templates, no assumptions — the brief drives everything.',
    EL: 'Ξεκινάμε μαθαίνοντας ακριβώς τι προσφέρετε, ποιους εξυπηρετείτε και πώς πρέπει οι πελάτες να σας βρίσκουν και να επικοινωνούν μαζί σας. Καμία παραδοχή, κανένα πρότυπο — το brief καθορίζει τα πάντα.',
    RU: 'Начинаем с того, что детально разбираемся в вашем предложении, вашей аудитории и в том, как клиенты должны вас находить и выходить на связь. Никаких шаблонов и предположений — всё строится на реальной задаче.',
  },
  'hww.step2.title': { EN: 'Build the Core', EL: 'Χτίζουμε τη Βάση', RU: 'Формируем Основу' },
  'hww.step2.description': {
    EN: 'We design and build the website, structure the messaging, and set up every contact path so visitors know what to do next.',
    EL: 'Σχεδιάζουμε και κατασκευάζουμε την ιστοσελίδα, δομούμε το μήνυμα και ρυθμίζουμε κάθε τρόπο επικοινωνίας ώστε ο επισκέπτης να ξέρει ακριβώς τι να κάνει.',
    RU: 'Проектируем и разрабатываем сайт, выстраиваем структуру сообщений и настраиваем все пути коммуникации так, чтобы посетитель чётко понимал, что делать дальше.',
  },
  'hww.step3.title': { EN: 'Set Up Your Public Presence', EL: 'Στήνουμε τη Δημόσια Παρουσία', RU: 'Выстраиваем Публичное Присутствие' },
  'hww.step3.description': {
    EN: 'We create or optimise your Google Business profile and social media accounts, align your business information across every platform, and connect them to the website. Customers find the same professional business everywhere they look.',
    EL: 'Δημιουργούμε ή βελτιστοποιούμε το Google Business Profile και τους λογαριασμούς στα μέσα κοινωνικής δικτύωσης, εναρμονίζουμε τα στοιχεία της επιχείρησης σε κάθε πλατφόρμα και τα συνδέουμε με την ιστοσελίδα. Παντού που κοιτάει ο πελάτης, βλέπει την ίδια επαγγελματική εικόνα.',
    RU: 'Создаём или оптимизируем профиль в Google Business и аккаунты в социальных сетях, синхронизируем информацию о компании на всех платформах и связываем их с сайтом. Везде, где клиент вас ищет, — один профессиональный образ.',
  },
  'hww.step4.title': { EN: 'Launch the System', EL: 'Λανσάρουμε το Σύστημα', RU: 'Запускаем Систему' },
  'hww.step4.description': {
    EN: 'Before going live, we verify that the website, contact flow, visibility, and social presence are fully connected and working together. Nothing launches until the system works as a whole.',
    EL: 'Πριν βγει live, ελέγχουμε ότι ιστοσελίδα, επικοινωνία, ορατότητα και παρουσία στα social είναι πλήρως συνδεδεμένα. Τίποτα δεν ανεβαίνει αν δεν λειτουργεί σωστά στο σύνολό του.',
    RU: 'Перед запуском проверяем, что сайт, коммуникация, видимость и социальные сети работают как единое целое. Ничего не выходит в эфир, пока система не готова полностью.',
  },
  'hww.step5.title': { EN: 'Manage and Improve', EL: 'Διαχειριζόμαστε και Βελτιώνουμε', RU: 'Ведём и Развиваем' },
  'hww.step5.description': {
    EN: 'For clients on ongoing plans, we keep the website, Google presence, and social media updated, aligned, and improving. Changes in the business are reflected everywhere, automatically.',
    EL: 'Για τους πελάτες μας με συνεχόμενο πλάνο, κρατάμε ιστοσελίδα, Google και social ενημερωμένα, εναρμονισμένα και σε συνεχή βελτίωση. Οι αλλαγές στην επιχείρηση αντικατοπτρίζονται παντού.',
    RU: 'Для клиентов на постоянном обслуживании мы поддерживаем актуальность сайта, Google-профиля и социальных сетей, отражаем изменения в бизнесе и планомерно улучшаем результаты.',
  },
  'hww.step6.title': { EN: 'Add Content Production When Needed', EL: 'Παραγωγή Περιεχομένου Όταν Χρειάζεται', RU: 'Контент-продакшн — По Запросу' },
  'hww.step6.description': {
    EN: 'Photography, video, graphic design, and larger creative projects are available as separate paid add-ons. We scope and quote each one individually based on what the business actually needs.',
    EL: 'Φωτογράφιση, βίντεο, γραφιστικά και μεγαλύτερα δημιουργικά projects διατίθενται ως ξεχωριστές υπηρεσίες. Κοστολογούνται μεμονωμένα, με βάση τις πραγματικές ανάγκες της επιχείρησης.',
    RU: 'Фотосъёмка, видео, графика и крупные творческие проекты предоставляются как отдельные платные услуги. Каждый проект оценивается индивидуально, исходя из реальных потребностей бизнеса.',
  },

  // Social media clarity block
  'hww.social.heading': {
    EN: 'Social media, clearly explained',
    EL: 'Social media, ξεκάθαρα',
    RU: 'Социальные сети — без двусмысленностей',
  },
  'hww.social.intro': {
    EN: 'We set up and manage the business\u2019s social media presence — not just build and leave.',
    EL: 'Στήνουμε και διαχειριζόμαστε την παρουσία της επιχείρησης στα μέσα κοινωνικής δικτύωσης — δεν φεύγουμε μόλις φτιάξουμε την ιστοσελίδα.',
    RU: 'Мы настраиваем и ведём присутствие бизнеса в социальных сетях — а не просто запускаем сайт и уходим.',
  },
  'hww.social.setup': {
    EN: 'During setup, we create or optimise your profiles, align business information, connect accounts to the website and contact system, and make the entire presence consistent across channels.',
    EL: 'Κατά τη φάση του setup, δημιουργούμε ή βελτιστοποιούμε τα προφίλ, εναρμονίζουμε τα στοιχεία της επιχείρησης, συνδέουμε τους λογαριασμούς με την ιστοσελίδα και φροντίζουμε η παρουσία να είναι συνεκτική σε όλα τα κανάλια.',
    RU: 'На этапе настройки мы создаём или оптимизируем профили, синхронизируем информацию о компании, подключаем аккаунты к сайту и системе коммуникации, обеспечивая единый и профессиональный образ на всех каналах.',
  },
  'hww.social.ongoing': {
    EN: 'On ongoing plans, we keep profiles updated, active, and aligned with your website, current offers, and any business changes.',
    EL: 'Στα συνεχόμενα πλάνα, κρατάμε τα προφίλ ενεργά, ενημερωμένα και εναρμονισμένα με την ιστοσελίδα, τις τρέχουσες προσφορές και κάθε αλλαγή στην επιχείρηση.',
    RU: 'В рамках постоянного обслуживания мы держим профили активными, актуальными и согласованными с сайтом, текущими предложениями и изменениями в бизнесе.',
  },
  'hww.social.content': {
    EN: 'Content creation is separate. Photography, videos, graphics, and custom content production are quoted and delivered as standalone add-ons.',
    EL: 'Η παραγωγή περιεχομένου είναι ξεχωριστή υπηρεσία. Φωτογραφία, βίντεο, γραφιστικά και custom δημιουργικό κοστολογούνται χωριστά, ανάλογα με τις ανάγκες.',
    RU: 'Создание контента — отдельная услуга. Фото, видео, графика и авторский контент оцениваются и выполняются как самостоятельный заказ.',
  },

  // Closing + CTA
  'hww.closing': {
    EN: 'One setup. One system. Run by people who understand what small businesses actually need.',
    EL: 'Ένα setup. Ένα σύστημα. Από ανθρώπους που καταλαβαίνουν τι χρειάζεται πραγματικά μια μικρή επιχείρηση.',
    RU: 'Один запуск. Одна система. Команда, которая понимает, что нужно малому бизнесу на самом деле.',
  },
  'hww.cta.button': {
    EN: 'Start the conversation',
    EL: 'Ας μιλήσουμε',
    RU: 'Начнём разговор',
  },

  // ─── Back to top ───
  'backToTop': { EN: '↑ Back to top', EL: '↑ Πίσω στην αρχή', RU: '↑ Наверх' },

  // ─── Scroll hint ───
  'scroll': { EN: 'SCROLL', EL: 'SCROLL', RU: 'SCROLL' },
} as const

export type TranslationKey = keyof typeof translations

export function t(key: TranslationKey, lang: Language): string {
  return translations[key]?.[lang] ?? translations[key]?.['EN'] ?? key
}

export default translations
