// ── lib/translations.ts ──

export const languages = ['EN', 'EL', 'RU'] as const
export type Language = typeof languages[number]

const translations = {
  // ─── Navbar ───
  'nav.process': { EN: 'Process', EL: 'Διαδικασία', RU: 'Процесс' },
  'nav.work': { EN: 'Work', EL: 'Δουλειές', RU: 'Работы' },
  'nav.pricing': { EN: 'Pricing', EL: 'Τιμές', RU: 'Цены' },
  'nav.contact': { EN: 'Contact', EL: 'Επικοινωνία', RU: 'Контакт' },
  'nav.cta': { EN: 'Get your free preview', EL: 'Δωρεάν προεπισκόπηση', RU: 'Бесплатный предпросмотр' },
  'nav.openMenu': { EN: 'Open menu', EL: 'Άνοιγμα μενού', RU: 'Открыть меню' },
  'nav.closeMenu': { EN: 'Close menu', EL: 'Κλείσιμο μενού', RU: 'Закрыть меню' },

  // ─── Hero ───
  'hero.label': { EN: 'Web studio — Cyprus & Greece', EL: 'Web studio — Κύπρος & Ελλάδα', RU: 'Веб-студия — Кипр и Греция' },
  'hero.headline1': { EN: 'Customers are already', EL: 'Οι πελάτες ήδη', RU: 'Клиенты уже' },
  'hero.headline2': { EN: 'searching for you.', EL: 'σας ψάχνουν.', RU: 'ищут вас.' },
  'hero.description': {
    EN: "We build the system that catches them — a website designed to convert, visible on Google, and ready in days. If you don\u2019t love the preview, you don\u2019t pay.",
    EL: 'Φτιάχνουμε το σύστημα που τους βρίσκει — ένα site σχεδιασμένο να μετατρέπει, ορατό στο Google, έτοιμο σε λίγες μέρες. Αν δεν σας αρέσει η προεπισκόπηση, δεν πληρώνετε.',
    RU: 'Мы создаём систему, которая их находит — сайт, созданный для конверсии, видимый в Google и готовый за дни. Если предпросмотр не понравится — вы не платите.',
  },
  'hero.cta': { EN: 'Get your free preview', EL: 'Δωρεάν προεπισκόπηση', RU: 'Бесплатный предпросмотр' },
  'hero.note': {
    EN: 'No commitment — we build your preview before you pay anything',
    EL: 'Χωρίς δέσμευση — φτιάχνουμε την προεπισκόπηση πριν πληρώσετε',
    RU: 'Без обязательств — мы создаём предпросмотр до оплаты',
  },

  // ─── Process / How It Works ───
  'process.label': { EN: 'How we work', EL: 'Πώς δουλεύουμε', RU: 'Как мы работаем' },
  'process.heading': { EN: 'We build the system — not just the site', EL: 'Φτιάχνουμε το σύστημα — όχι απλά ένα site', RU: 'Мы строим систему — не просто сайт' },
  'process.description': {
    EN: 'Most studios hand you a website and disappear. We build something that brings customers in — and keep improving it over time.',
    EL: 'Τα περισσότερα στούντιο σας δίνουν ένα site και εξαφανίζονται. Εμείς φτιάχνουμε κάτι που φέρνει πελάτες — και συνεχίζουμε να το βελτιώνουμε.',
    RU: 'Большинство студий делают сайт и исчезают. Мы создаём то, что привлекает клиентов — и продолжаем улучшать.',
  },
  'process.step1.title': { EN: 'Understand & Position', EL: 'Κατανόηση & Τοποθέτηση', RU: 'Анализ и позиционирование' },
  'process.step1.description': {
    EN: 'We quickly understand your business, your customers, and what actually drives results. Then we define how your website should convert visitors into calls, bookings, or messages — not just exist online.',
    EL: 'Κατανοούμε γρήγορα την επιχείρησή σας, τους πελάτες σας και τι φέρνει αποτελέσματα. Μετά ορίζουμε πώς το site σας θα μετατρέπει επισκέπτες σε κλήσεις, κρατήσεις ή μηνύματα.',
    RU: 'Мы быстро разбираемся в вашем бизнесе, клиентах и том, что приносит результат. Затем определяем, как сайт будет конвертировать посетителей в звонки, бронирования или сообщения.',
  },
  'process.step1.part': { EN: 'Your part: a short call', EL: 'Εσείς: μια σύντομη κλήση', RU: 'От вас: короткий звонок' },
  'process.step2.title': { EN: 'Design, Build & Optimise', EL: 'Σχεδιασμός, Κατασκευή & Βελτιστοποίηση', RU: 'Дизайн, разработка и оптимизация' },
  'process.step2.description': {
    EN: 'We build your full online presence — structure, design, and messaging. Mobile-first, fast, and focused on conversion. Everything is set up to turn visitors into real customers.',
    EL: 'Φτιάχνουμε ολόκληρη την online παρουσία σας — δομή, σχεδιασμό και μηνύματα. Mobile-first, γρήγορο και εστιασμένο στη μετατροπή.',
    RU: 'Мы создаём полное онлайн-присутствие — структуру, дизайн и контент. Mobile-first, быстрый и ориентированный на конверсию.',
  },
  'process.step2.part': { EN: 'Your part: review and approve', EL: 'Εσείς: ελέγξτε και εγκρίνετε', RU: 'От вас: проверка и одобрение' },
  'process.step3.title': { EN: 'Activate Visibility', EL: 'Ενεργοποίηση Ορατότητας', RU: 'Активация видимости' },
  'process.step3.description': {
    EN: "A website alone isn\u2019t enough. We set up your Google presence, structure your visibility, and guide how customers will actually find you. Everything is aligned to bring traffic that converts.",
    EL: 'Ένα site μόνο δεν αρκεί. Ρυθμίζουμε την παρουσία σας στο Google, δομούμε την ορατότητά σας και οδηγούμε τους πελάτες να σας βρουν.',
    RU: 'Одного сайта недостаточно. Мы настраиваем ваше присутствие в Google, структурируем видимость и направляем клиентов к вам.',
  },
  'process.step3.part': { EN: 'Your part: nothing — we handle it', EL: 'Εσείς: τίποτα — το αναλαμβάνουμε', RU: 'От вас: ничего — мы всё сделаем' },
  'process.step4.title': { EN: 'Ongoing Growth', EL: 'Συνεχής Ανάπτυξη', RU: 'Постоянный рост' },
  'process.step4.description': {
    EN: 'We continuously improve your system — updates, content, optimisation, and expansion. Your online presence evolves instead of becoming outdated.',
    EL: 'Βελτιώνουμε συνεχώς το σύστημά σας — ενημερώσεις, περιεχόμενο, βελτιστοποίηση και επέκταση. Η online παρουσία σας εξελίσσεται αντί να ξεπερνιέται.',
    RU: 'Мы постоянно улучшаем вашу систему — обновления, контент, оптимизация и расширение. Ваше онлайн-присутствие развивается, а не устаревает.',
  },
  'process.step4.part': { EN: 'Your part: optional — for businesses that want to grow', EL: 'Εσείς: προαιρετικό — για επιχειρήσεις που θέλουν ανάπτυξη', RU: 'От вас: по желанию — для бизнеса, который хочет расти' },
  'process.result': {
    EN: 'Your system is built to bring in customers — not just sit online.',
    EL: 'Το σύστημά σας φτιάχτηκε για να φέρνει πελάτες — όχι απλά να υπάρχει online.',
    RU: 'Ваша система создана привлекать клиентов — а не просто существовать в интернете.',
  },
  'process.getStarted': { EN: 'Get started', EL: 'Ξεκινήστε', RU: 'Начать' },
  'process.seeFullProcess': { EN: 'See the full process', EL: 'Δείτε ολόκληρη τη διαδικασία', RU: 'Полный процесс' },

  // ─── Demo ───
  'demo.label': { EN: 'See it in action', EL: 'Δείτε τα αποτελέσματα', RU: 'Смотрите в действии' },
  'demo.heading': { EN: 'Real businesses. Real builds.', EL: 'Πραγματικές επιχειρήσεις. Πραγματικά sites.', RU: 'Реальный бизнес. Реальные проекты.' },
  'demo.description': {
    EN: "These aren\u2019t templates. Every site is built from scratch for the business it represents. Browse real examples and see the quality for yourself.",
    EL: 'Δεν είναι templates. Κάθε site χτίζεται από το μηδέν για την επιχείρηση που εκπροσωπεί. Δείτε πραγματικά παραδείγματα.',
    RU: 'Это не шаблоны. Каждый сайт создаётся с нуля для конкретного бизнеса. Посмотрите реальные примеры.',
  },
  'demo.cta': { EN: 'Want this for your business?', EL: 'Θέλετε κάτι τέτοιο;', RU: 'Хотите такое для своего бизнеса?' },
  'demo.placeholder.title': { EN: 'Live demos coming soon', EL: 'Σύντομα live demos', RU: 'Скоро live-демо' },
  'demo.placeholder.text': {
    EN: "We\u2019re preparing interactive previews of real client builds. Check back shortly.",
    EL: 'Ετοιμάζουμε διαδραστικές προεπισκοπήσεις πραγματικών projects. Ελάτε σύντομα ξανά.',
    RU: 'Мы готовим интерактивные превью реальных проектов. Загляните позже.',
  },

  // ─── Pricing ───
  'pricing.label': { EN: 'What you get', EL: 'Τι παίρνετε', RU: 'Что вы получаете' },
  'pricing.heading': { EN: 'Clear pricing. No surprises.', EL: 'Ξεκάθαρες τιμές. Χωρίς εκπλήξεις.', RU: 'Прозрачные цены. Без сюрпризов.' },
  'pricing.subtitle': { EN: 'Choose the right fit for your business.', EL: 'Επιλέξτε ό,τι ταιριάζει στην επιχείρησή σας.', RU: 'Выберите подходящий вариант для вашего бизнеса.' },
  'pricing.launch': { EN: 'Launch', EL: 'Launch', RU: 'Запуск' },
  'pricing.advanced': { EN: 'Advanced', EL: 'Advanced', RU: 'Расширенный' },
  'pricing.growth': { EN: 'Growth', EL: 'Growth', RU: 'Рост' },
  'pricing.oneTime': { EN: 'one-time', EL: 'εφάπαξ', RU: 'единоразово' },
  'pricing.ongoingManagement': { EN: 'ongoing system management', EL: 'συνεχής διαχείριση συστήματος', RU: 'постоянное управление системой' },
  'pricing.recommended': { EN: 'Recommended', EL: 'Προτεινόμενο', RU: 'Рекомендуем' },
  'pricing.getPreview': { EN: 'Get your preview', EL: 'Δωρεάν προεπισκόπηση', RU: 'Получить предпросмотр' },
  'pricing.startGrowing': { EN: 'Start growing', EL: 'Ξεκινήστε την ανάπτυξη', RU: 'Начать расти' },
  'pricing.launch.f1': { EN: 'Custom website (built for your business)', EL: 'Custom website (για την επιχείρησή σας)', RU: 'Индивидуальный сайт (для вашего бизнеса)' },
  'pricing.launch.f2': { EN: 'Mobile-first, fast-loading design', EL: 'Mobile-first, γρήγορος σχεδιασμός', RU: 'Mobile-first, быстрая загрузка' },
  'pricing.launch.f3': { EN: 'Conversion-focused structure', EL: 'Δομή εστιασμένη στη μετατροπή', RU: 'Структура, ориентированная на конверсию' },
  'pricing.launch.f4': { EN: 'Contact system (forms, WhatsApp, calls)', EL: 'Σύστημα επικοινωνίας (φόρμες, WhatsApp, κλήσεις)', RU: 'Система контактов (формы, WhatsApp, звонки)' },
  'pricing.launch.f5': { EN: 'Google Business setup + basic visibility setup', EL: 'Google Business + βασική ρύθμιση ορατότητας', RU: 'Настройка Google Business + базовая видимость' },
  'pricing.launch.f6': { EN: 'Social media profile setup (Facebook, Instagram)', EL: 'Ρύθμιση social media (Facebook, Instagram)', RU: 'Настройка соцсетей (Facebook, Instagram)' },
  'pricing.launch.f7': { EN: 'Free preview before you pay', EL: 'Δωρεάν προεπισκόπηση πριν πληρώσετε', RU: 'Бесплатный предпросмотр до оплаты' },
  'pricing.launch.f8': { EN: '30 days of post-launch adjustments', EL: '30 μέρες διορθώσεων μετά το launch', RU: '30 дней корректировок после запуска' },
  'pricing.advanced.f1': { EN: 'Everything in Launch', EL: 'Ό,τι περιλαμβάνει το Launch', RU: 'Всё из тарифа Запуск' },
  'pricing.advanced.f2': { EN: 'Multi-page website (up to 5 pages)', EL: 'Πολυσέλιδο site (έως 5 σελίδες)', RU: 'Многостраничный сайт (до 5 страниц)' },
  'pricing.advanced.f3': { EN: 'Advanced SEO + structured data', EL: 'Προηγμένο SEO + structured data', RU: 'Продвинутое SEO + структурированные данные' },
  'pricing.advanced.f4': { EN: 'Google Analytics + conversion tracking', EL: 'Google Analytics + παρακολούθηση μετατροπών', RU: 'Google Analytics + отслеживание конверсий' },
  'pricing.advanced.f5': { EN: 'Social media setup + profile optimisation', EL: 'Social media setup + βελτιστοποίηση προφίλ', RU: 'Настройка соцсетей + оптимизация профиля' },
  'pricing.advanced.f6': { EN: 'CMS integration (easy content editing)', EL: 'CMS integration (εύκολη επεξεργασία)', RU: 'Интеграция CMS (простое редактирование)' },
  'pricing.advanced.f7': { EN: 'Custom animations + interactions', EL: 'Custom animations + interactions', RU: 'Пользовательские анимации и взаимодействия' },
  'pricing.advanced.f8': { EN: 'Priority delivery', EL: 'Προτεραιότητα παράδοσης', RU: 'Приоритетная доставка' },
  'pricing.growth.f1': { EN: 'Everything in Launch', EL: 'Ό,τι περιλαμβάνει το Launch', RU: 'Всё из тарифа Запуск' },
  'pricing.growth.f2': { EN: 'Continuous improvements and optimisation', EL: 'Συνεχείς βελτιώσεις και βελτιστοποίηση', RU: 'Постоянные улучшения и оптимизация' },
  'pricing.growth.f3': { EN: 'Social media coverage — strategy & posting', EL: 'Social media — στρατηγική & δημοσιεύσεις', RU: 'Соцсети — стратегия и публикации' },
  'pricing.growth.f4': { EN: 'Conversion tracking + performance insights', EL: 'Παρακολούθηση μετατροπών + insights', RU: 'Отслеживание конверсий + аналитика' },
  'pricing.growth.f5': { EN: 'Ongoing visibility improvements (Google & local)', EL: 'Συνεχής βελτίωση ορατότητας (Google & τοπικά)', RU: 'Постоянное улучшение видимости (Google и локально)' },
  'pricing.growth.f6': { EN: 'Priority support and fast updates', EL: 'Προτεραιότητα υποστήριξης και γρήγορες ενημερώσεις', RU: 'Приоритетная поддержка и быстрые обновления' },
  'pricing.growth.note': {
    EN: 'A website alone is not enough — this is how you actually grow. Social media coverage includes strategy and posting, not content creation.',
    EL: 'Ένα site μόνο δεν αρκεί — έτσι πραγματικά αναπτύσσεστε. Η κάλυψη social media περιλαμβάνει στρατηγική και δημοσιεύσεις, όχι δημιουργία περιεχομένου.',
    RU: 'Одного сайта недостаточно — так вы действительно растёте. Покрытие соцсетей включает стратегию и публикации, но не создание контента.',
  },
  'pricing.vatNote': {
    EN: 'All prices exclude VAT where applicable. Hosting and domain costs are separate.',
    EL: 'Οι τιμές δεν περιλαμβάνουν ΦΠΑ. Τα κόστη hosting και domain είναι ξεχωριστά.',
    RU: 'Цены не включают НДС. Стоимость хостинга и домена оплачивается отдельно.',
  },
  'pricing.questions': { EN: 'Questions? Just ask.', EL: 'Ερωτήσεις; Ρωτήστε μας.', RU: 'Вопросы? Спрашивайте.' },
  'pricing.contentTitle': { EN: 'Need content creation?', EL: 'Χρειάζεστε δημιουργία περιεχομένου;', RU: 'Нужно создание контента?' },
  'pricing.contentText': {
    EN: "Custom content packages — including photography, video, and copywriting — can be provided and quoted after a brief discussion.",
    EL: 'Πακέτα περιεχομένου — φωτογραφία, βίντεο και copywriting — παρέχονται κατόπιν συζήτησης.',
    RU: 'Пакеты контента — фото, видео и копирайтинг — предоставляются после обсуждения.',
  },
  'pricing.contentCta': { EN: "Let\u2019s talk about it.", EL: 'Ας το συζητήσουμε.', RU: 'Давайте обсудим.' },

  // ─── Contact ───
  'contact.label': { EN: 'Get in touch', EL: 'Επικοινωνία', RU: 'Связаться' },
  'contact.heading': {
    EN: "Let\u2019s build something that brings customers in",
    EL: 'Ας φτιάξουμε κάτι που φέρνει πελάτες',
    RU: 'Давайте создадим то, что привлекает клиентов',
  },
  'contact.description': {
    EN: "Tell us about your business. We\u2019ll put together a free visual preview — before you commit to anything.",
    EL: 'Πείτε μας για την επιχείρησή σας. Θα ετοιμάσουμε μια δωρεάν οπτική προεπισκόπηση — πριν δεσμευτείτε.',
    RU: 'Расскажите о вашем бизнесе. Мы подготовим бесплатный визуальный предпросмотр — без обязательств.',
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
  'form.message': { EN: 'Tell us about your project', EL: 'Πείτε μας για το project σας', RU: 'Расскажите о вашем проекте' },
  'form.messagePlaceholder': {
    EN: 'I run a small restaurant in Paphos and need a website to attract more customers and take bookings.',
    EL: 'Έχω ένα μικρό εστιατόριο στην Πάφο και χρειάζομαι ένα site για να προσελκύσω πελάτες και να δέχομαι κρατήσεις.',
    RU: 'У меня небольшой ресторан в Пафосе, и мне нужен сайт для привлечения клиентов и бронирования.',
  },
  'form.submit': { EN: 'Get my preview', EL: 'Λάβετε προεπισκόπηση', RU: 'Получить предпросмотр' },
  'form.sending': { EN: 'Sending...', EL: 'Αποστολή...', RU: 'Отправка...' },
  'form.note': {
    EN: "No commitment — we\u2019ll send you a custom preview first",
    EL: 'Χωρίς δέσμευση — θα σας στείλουμε πρώτα μια προεπισκόπηση',
    RU: 'Без обязательств — сначала отправим вам предпросмотр',
  },
  'form.successTitle': { EN: 'Message sent', EL: 'Μήνυμα εστάλη', RU: 'Сообщение отправлено' },
  'form.successText': {
    EN: "We\u2019ll review it and get back to you within 24 hours. Keep an eye on your inbox.",
    EL: 'Θα το εξετάσουμε και θα επικοινωνήσουμε εντός 24 ωρών. Ελέγξτε το inbox σας.',
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
  'footer.tagline': { EN: 'Systems that bring customers to your business.', EL: 'Συστήματα που φέρνουν πελάτες στην επιχείρησή σας.', RU: 'Системы, которые приводят клиентов в ваш бизнес.' },
  'footer.navigation': { EN: 'Navigation', EL: 'Πλοήγηση', RU: 'Навигация' },
  'footer.getInTouch': { EN: 'Get in touch', EL: 'Επικοινωνία', RU: 'Связаться' },
  'footer.copyright': { EN: '© 2026 Day One. Cyprus.', EL: '© 2026 Day One. Κύπρος.', RU: '© 2026 Day One. Кипр.' },

  // ─── How We Work page ───
  'hww.label': { EN: 'How we work', EL: 'Πώς δουλεύουμε', RU: 'Как мы работаем' },
  'hww.heading': { EN: 'From first call to live website — in days, not months', EL: 'Από την πρώτη κλήση σε live site — σε μέρες, όχι μήνες', RU: 'От первого звонка до готового сайта — за дни, не месяцы' },
  'hww.description': {
    EN: 'We keep it simple. Four clear steps, full transparency, and you see a free preview before you pay anything.',
    EL: 'Το κρατάμε απλό. Τέσσερα ξεκάθαρα βήματα, πλήρης διαφάνεια, και βλέπετε δωρεάν προεπισκόπηση πριν πληρώσετε.',
    RU: 'Мы всё упрощаем. Четыре понятных шага, полная прозрачность, и вы видите бесплатный предпросмотр до оплаты.',
  },
  'hww.backHome': { EN: 'Back to home', EL: 'Πίσω στην αρχική', RU: 'На главную' },
  'hww.home': { EN: 'Home', EL: 'Αρχική', RU: 'Главная' },
  'hww.step': { EN: 'Step', EL: 'Βήμα', RU: 'Шаг' },
  'hww.step1.title': { EN: 'Understand & Position', EL: 'Κατανόηση & Τοποθέτηση', RU: 'Анализ и позиционирование' },
  'hww.step1.subtitle': { EN: 'Your part: a short call', EL: 'Εσείς: μια σύντομη κλήση', RU: 'От вас: короткий звонок' },
  'hww.step1.description': {
    EN: 'We start with a quick call to understand your business, your customers, and what actually drives results. Then we define how your website should convert visitors into calls, bookings, or messages — not just exist online.',
    EL: 'Ξεκινάμε με μια σύντομη κλήση για να κατανοήσουμε την επιχείρησή σας, τους πελάτες σας και τι φέρνει αποτελέσματα. Μετά ορίζουμε πώς το site θα μετατρέπει επισκέπτες σε κλήσεις, κρατήσεις ή μηνύματα.',
    RU: 'Начинаем с короткого звонка, чтобы понять ваш бизнес, клиентов и что приносит результат. Затем определяем, как сайт будет конвертировать посетителей в звонки, бронирования или сообщения.',
  },
  'hww.step1.d1': { EN: 'Quick discovery call (15–20 minutes)', EL: 'Σύντομη κλήση γνωριμίας (15–20 λεπτά)', RU: 'Короткий звонок-знакомство (15–20 минут)' },
  'hww.step1.d2': { EN: 'We research your market and competitors', EL: 'Ερευνούμε την αγορά και τον ανταγωνισμό', RU: 'Исследуем ваш рынок и конкурентов' },
  'hww.step1.d3': { EN: 'Define your conversion strategy', EL: 'Ορίζουμε στρατηγική μετατροπής', RU: 'Определяем стратегию конверсии' },
  'hww.step1.d4': { EN: 'Agree on structure, messaging, and goals', EL: 'Συμφωνούμε δομή, μηνύματα και στόχους', RU: 'Согласовываем структуру, тексты и цели' },
  'hww.step1.duration': { EN: '1–2 days', EL: '1–2 μέρες', RU: '1–2 дня' },
  'hww.step2.title': { EN: 'Design, Build & Optimise', EL: 'Σχεδιασμός, Κατασκευή & Βελτιστοποίηση', RU: 'Дизайн, разработка и оптимизация' },
  'hww.step2.subtitle': { EN: 'Your part: review and approve', EL: 'Εσείς: ελέγξτε και εγκρίνετε', RU: 'От вас: проверка и одобрение' },
  'hww.step2.description': {
    EN: 'We build your full online presence — structure, design, and messaging. Mobile-first, fast, and focused on conversion. Everything is set up to turn visitors into real customers.',
    EL: 'Φτιάχνουμε ολόκληρη την online παρουσία σας — δομή, σχεδιασμό και μηνύματα. Mobile-first, γρήγορο και εστιασμένο στη μετατροπή.',
    RU: 'Создаём полное онлайн-присутствие — структуру, дизайн и контент. Mobile-first, быстрый и ориентированный на конверсию.',
  },
  'hww.step2.d1': { EN: 'Custom design — no templates', EL: 'Custom σχεδιασμός — χωρίς templates', RU: 'Индивидуальный дизайн — без шаблонов' },
  'hww.step2.d2': { EN: 'Mobile-first, fast-loading build', EL: 'Mobile-first, γρήγορη κατασκευή', RU: 'Mobile-first, быстрая загрузка' },
  'hww.step2.d3': { EN: 'Conversion-focused layout and copy', EL: 'Layout και κείμενα εστιασμένα στη μετατροπή', RU: 'Макет и тексты для конверсии' },
  'hww.step2.d4': { EN: 'Contact systems (forms, WhatsApp, calls)', EL: 'Συστήματα επικοινωνίας (φόρμες, WhatsApp, κλήσεις)', RU: 'Системы связи (формы, WhatsApp, звонки)' },
  'hww.step2.d5': { EN: 'You get a free preview before paying', EL: 'Δωρεάν προεπισκόπηση πριν πληρώσετε', RU: 'Бесплатный предпросмотр до оплаты' },
  'hww.step2.duration': { EN: '3–5 days', EL: '3–5 μέρες', RU: '3–5 дней' },
  'hww.step3.title': { EN: 'Activate Visibility', EL: 'Ενεργοποίηση Ορατότητας', RU: 'Активация видимости' },
  'hww.step3.subtitle': { EN: 'Your part: nothing — we handle it', EL: 'Εσείς: τίποτα — το αναλαμβάνουμε', RU: 'От вас: ничего — мы всё сделаем' },
  'hww.step3.description': {
    EN: "A website alone isn\u2019t enough. We set up your full internet presence — Google, social media, and local visibility — so customers can find you everywhere they\u2019re looking.",
    EL: 'Ένα site μόνο δεν αρκεί. Ρυθμίζουμε ολόκληρη την internet παρουσία σας — Google, social media και τοπική ορατότητα — ώστε οι πελάτες να σας βρίσκουν παντού.',
    RU: 'Одного сайта недостаточно. Мы настраиваем полное интернет-присутствие — Google, соцсети и локальную видимость — чтобы клиенты находили вас повсюду.',
  },
  'hww.step3.d1': { EN: 'Google Business profile setup + optimisation', EL: 'Google Business setup + βελτιστοποίηση', RU: 'Настройка и оптимизация Google Business' },
  'hww.step3.d2': { EN: 'Social media profile setup (Facebook, Instagram, etc.)', EL: 'Social media setup (Facebook, Instagram, κ.ά.)', RU: 'Настройка соцсетей (Facebook, Instagram и др.)' },
  'hww.step3.d3': { EN: 'Basic SEO + structured data', EL: 'Βασικό SEO + structured data', RU: 'Базовое SEO + структурированные данные' },
  'hww.step3.d4': { EN: 'Local visibility optimisation across platforms', EL: 'Βελτιστοποίηση τοπικής ορατότητας', RU: 'Оптимизация локальной видимости' },
  'hww.step3.d5': { EN: 'Analytics and conversion tracking', EL: 'Analytics και παρακολούθηση μετατροπών', RU: 'Аналитика и отслеживание конверсий' },
  'hww.step3.duration': { EN: '1–2 days', EL: '1–2 μέρες', RU: '1–2 дня' },
  'hww.step4.title': { EN: 'Ongoing Growth', EL: 'Συνεχής Ανάπτυξη', RU: 'Постоянный рост' },
  'hww.step4.subtitle': { EN: 'Your part: optional — for businesses that want to grow', EL: 'Εσείς: προαιρετικό — για επιχειρήσεις που θέλουν ανάπτυξη', RU: 'От вас: по желанию — для бизнеса, который хочет расти' },
  'hww.step4.description': {
    EN: 'We continuously improve your system — updates, optimisation, social media strategy, and expansion. Your online presence evolves instead of becoming outdated.',
    EL: 'Βελτιώνουμε συνεχώς το σύστημά σας — ενημερώσεις, βελτιστοποίηση, στρατηγική social media και επέκταση. Η online παρουσία σας εξελίσσεται.',
    RU: 'Мы постоянно улучшаем вашу систему — обновления, оптимизация, стратегия соцсетей и расширение. Ваше присутствие развивается.',
  },
  'hww.step4.d1': { EN: 'Continuous improvements and optimisation', EL: 'Συνεχείς βελτιώσεις και βελτιστοποίηση', RU: 'Постоянные улучшения и оптимизация' },
  'hww.step4.d2': { EN: 'Social media coverage — strategy & posting', EL: 'Social media — στρατηγική & δημοσιεύσεις', RU: 'Соцсети — стратегия и публикации' },
  'hww.step4.d3': { EN: 'Performance insights and reporting', EL: 'Insights απόδοσης και αναφορές', RU: 'Аналитика производительности и отчёты' },
  'hww.step4.d4': { EN: 'Ongoing Google & local visibility improvements', EL: 'Συνεχής βελτίωση ορατότητας Google & τοπικά', RU: 'Постоянное улучшение видимости в Google' },
  'hww.step4.d5': { EN: 'Priority support and fast updates', EL: 'Προτεραιότητα υποστήριξης και γρήγορες ενημερώσεις', RU: 'Приоритетная поддержка и быстрые обновления' },
  'hww.step4.duration': { EN: 'Ongoing', EL: 'Συνεχώς', RU: 'Постоянно' },
  'hww.cta.heading': { EN: 'Ready to get started?', EL: 'Έτοιμοι να ξεκινήσετε;', RU: 'Готовы начать?' },
  'hww.cta.description': {
    EN: "It starts with a short conversation. Tell us about your business and we\u2019ll show you what we can build — for free.",
    EL: 'Ξεκινά με μια σύντομη συζήτηση. Πείτε μας για την επιχείρησή σας και θα σας δείξουμε τι μπορούμε να φτιάξουμε — δωρεάν.',
    RU: 'Всё начинается с короткого разговора. Расскажите о бизнесе, и мы покажем, что можем создать — бесплатно.',
  },
  'hww.cta.preview': { EN: 'Get your free preview', EL: 'Δωρεάν προεπισκόπηση', RU: 'Бесплатный предпросмотр' },
  'hww.cta.whatsapp': { EN: 'WhatsApp us', EL: 'WhatsApp', RU: 'Написать в WhatsApp' },

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
