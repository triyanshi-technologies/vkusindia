import { company } from "./company";
import type { Localized } from "./types";

interface PolicySection {
  heading: string;
  paragraphs: string[];
}

interface Policy {
  title: string;
  note?: string;
  sections: PolicySection[];
}

const SITE = "https://vkusindia.com";
const EMAIL = "info@vkusindia.com";

export const privacyPolicy: Localized<Policy> = {
  ru: {
    title: "Политика в отношении обработки персональных данных",
    note: "Редакция от 16 ноября 2026 г.",
    sections: [
      {
        heading: "1. Общие положения",
        paragraphs: [
          `Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые оператором веб-сайта ${SITE} (далее - Оператор).`,
          "1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.",
          `1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее - Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта ${SITE}.`,
          `1.3. Сведения об Операторе: адрес: ${company.address.full.ru}, электронная почта: ${EMAIL}.`,
        ],
      },
      {
        heading: "2. Основные понятия, используемые в Политике",
        paragraphs: [
          "2.1. Автоматизированная обработка персональных данных - обработка персональных данных с помощью средств вычислительной техники.",
          "2.2. Блокирование персональных данных - временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).",
          `2.3. Веб-сайт - совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу ${SITE}.`,
          "2.4. Информационная система персональных данных - совокупность содержащихся в базах данных персональных данных и обеспечивающих их обработку информационных технологий и технических средств.",
          "2.5. Обезличивание персональных данных - действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному Пользователю или иному субъекту персональных данных.",
          "2.6. Обработка персональных данных - любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.",
          "2.7. Оператор - государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или совместно с другими лицами организующие и (или) осуществляющие обработку персональных данных, а также определяющие цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.",
          `2.8. Персональные данные - любая информация, относящаяся прямо или косвенно к определённому или определяемому Пользователю веб-сайта ${SITE}.`,
          `2.9. Пользователь - любой посетитель веб-сайта ${SITE}.`,
          "2.10. Предоставление персональных данных - действия, направленные на раскрытие персональных данных определённому лицу или определённому кругу лиц.",
          "2.11. Распространение персональных данных - любые действия, направленные на раскрытие персональных данных неопределённому кругу лиц (передача персональных данных) или на ознакомление с персональными данными неограниченного круга лиц, в том числе обнародование персональных данных в средствах массовой информации, размещение в информационно-телекоммуникационных сетях или предоставление доступа к персональным данным каким-либо иным способом.",
          "2.12. Трансграничная передача персональных данных - передача персональных данных на территорию иностранного государства органу власти иностранного государства, иностранному физическому или иностранному юридическому лицу.",
          "2.13. Уничтожение персональных данных - любые действия, в результате которых персональные данные уничтожаются безвозвратно с невозможностью дальнейшего восстановления содержания персональных данных в информационной системе персональных данных и (или) уничтожаются материальные носители персональных данных.",
        ],
      },
      {
        heading: "3. Оператор может обрабатывать следующие персональные данные Пользователя",
        paragraphs: [
          "3.1. При отправке запроса на продукт: имя, номер телефона, адрес электронной почты, страна, выбранный продукт и его варианты, требуемое количество, комментарий.",
          "3.2. При отправке сообщения через форму обратной связи: имя, адрес электронной почты, тема и текст сообщения.",
          "3.3. Данные, перечисленные в пп. 3.1-3.2, далее по тексту Политики объединены общим понятием Персональные данные.",
          "3.4. Сайт также использует технический файл «cookie», в котором сохраняется выбранный язык сайта, и сохраняет в браузере Пользователя отметку о закрытии уведомления об использовании файлов «cookie». Эти данные не позволяют идентифицировать Пользователя. Сервисы интернет-статистики на сайте не используются.",
        ],
      },
      {
        heading: "4. Цели обработки персональных данных",
        paragraphs: [
          "4.1. Цель обработки персональных данных Пользователя - ответ на запросы и сообщения Пользователя; подготовка коммерческих предложений; заключение, исполнение и прекращение гражданско-правовых договоров; доставка продукции.",
          "4.2. Технический файл «cookie» используется только для сохранения выбранного Пользователем языка сайта.",
        ],
      },
      {
        heading: "5. Правовые основания обработки персональных данных",
        paragraphs: [
          `5.1. Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки Пользователем самостоятельно через специальные формы, расположенные на сайте ${SITE}, или при их отправке на адрес электронной почты ${EMAIL}. Заполняя соответствующие формы и/или отправляя свои персональные данные Оператору, Пользователь выражает своё согласие с данной Политикой.`,
          "5.2. Файл «cookie» с выбранным языком сайта сохраняется, если это разрешено в настройках браузера Пользователя.",
        ],
      },
      {
        heading:
          "6. Порядок сбора, хранения, передачи и других видов обработки персональных данных",
        paragraphs: [
          "Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путём реализации правовых, организационных и технических мер, необходимых для выполнения в полном объёме требований действующего законодательства в области защиты персональных данных.",
          "6.1. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.",
          "6.2. Персональные данные Пользователя не передаются третьим лицам, за исключением поставщиков технических услуг, необходимых для работы сайта и доставки запросов Оператору: хостинг-провайдера сайта (Vercel Inc.) и почтового сервиса, через который запросы направляются Оператору (в настоящее время - Gmail, Google LLC), а также случаев, предусмотренных действующим законодательством.",
          `6.3. В случае выявления неточностей в персональных данных Пользователь может актуализировать их самостоятельно, путём направления Оператору уведомления на адрес электронной почты ${EMAIL} с пометкой «Актуализация персональных данных».`,
          `6.4. Персональные данные обрабатываются до достижения целей обработки (рассмотрения запроса или исполнения договора) либо до отзыва Пользователем согласия на их обработку. Пользователь может в любой момент отозвать своё согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на адрес ${EMAIL} с пометкой «Отзыв согласия на обработку персональных данных».`,
        ],
      },
      {
        heading: "7. Трансграничная передача персональных данных",
        paragraphs: [
          "7.1. Оператор до начала осуществления трансграничной передачи персональных данных обязан убедиться в том, что иностранным государством, на территорию которого предполагается осуществлять передачу персональных данных, обеспечивается надёжная защита прав субъектов персональных данных.",
          "7.2. Трансграничная передача персональных данных на территории иностранных государств, не отвечающих вышеуказанным требованиям, может осуществляться только в случае наличия согласия в письменной форме субъекта персональных данных на трансграничную передачу его персональных данных и/или исполнения договора, стороной которого является субъект персональных данных.",
          "7.3. Серверы хостинг-провайдера и почтового сервиса, указанных в п. 6.2, могут располагаться за пределами Российской Федерации. Трансграничная передача персональных данных осуществляется только в объёме, необходимом для доставки Оператору запроса или сообщения, отправленного Пользователем через формы на сайте.",
        ],
      },
      {
        heading: "8. Заключительные положения",
        paragraphs: [
          `8.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты ${EMAIL}.`,
          "8.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены её новой версией.",
          `8.3. Актуальная версия Политики в свободном доступе расположена в сети Интернет по адресу ${SITE}.`,
        ],
      },
    ],
  },
  en: {
    title: "Personal data processing policy",
    note: "Version of 16 November 2026. This English translation is provided for convenience. In case of any discrepancy, the Russian version prevails.",
    sections: [
      {
        heading: "1. General provisions",
        paragraphs: [
          `This personal data processing policy has been drawn up in accordance with Federal Law No. 152-FZ of 27 July 2006 “On Personal Data” and sets out the procedure for processing personal data and the measures taken to ensure its security by the operator of the website ${SITE} (hereinafter, the Operator).`,
          "1.1. The Operator’s primary goal and condition for carrying out its activities is to respect human and civil rights and freedoms when processing personal data, including the protection of the rights to privacy and personal and family secrets.",
          `1.2. This Operator policy on personal data processing (hereinafter, the Policy) applies to all information the Operator may obtain about visitors to the website ${SITE}.`,
          `1.3. Operator details: address: ${company.address.full.en}, email: ${EMAIL}.`,
        ],
      },
      {
        heading: "2. Key terms used in the Policy",
        paragraphs: [
          "2.1. Automated processing of personal data - processing of personal data using computer technology.",
          "2.2. Blocking of personal data - temporary suspension of the processing of personal data (except where processing is needed to clarify the personal data).",
          `2.3. Website - the set of graphic and informational materials, computer programs and databases that make them available on the internet at ${SITE}.`,
          "2.4. Personal data information system - the personal data contained in databases together with the information technologies and technical means used to process it.",
          "2.5. Depersonalisation of personal data - actions after which it is impossible, without additional information, to determine whether personal data belongs to a specific User or other data subject.",
          "2.6. Processing of personal data - any action (operation) or set of actions performed with personal data, with or without automation, including collection, recording, systematisation, accumulation, storage, clarification (updating, modification), retrieval, use, transfer (distribution, provision, access), depersonalisation, blocking, deletion and destruction.",
          "2.7. Operator - a state body, municipal body, legal entity or individual that, alone or jointly with others, organises and/or carries out the processing of personal data and determines its purposes, the data to be processed and the actions (operations) performed with it.",
          `2.8. Personal data - any information relating directly or indirectly to an identified or identifiable User of the website ${SITE}.`,
          `2.9. User - any visitor to the website ${SITE}.`,
          "2.10. Provision of personal data - actions aimed at disclosing personal data to a specific person or a specific group of persons.",
          "2.11. Dissemination of personal data - any actions aimed at disclosing personal data to an indefinite group of persons or making it available to an unlimited number of persons, including publication in the media, placement in information and telecommunication networks, or providing access in any other way.",
          "2.12. Cross-border transfer of personal data - transfer of personal data to the territory of a foreign state, to an authority of a foreign state, or to a foreign individual or legal entity.",
          "2.13. Destruction of personal data - any actions that irreversibly destroy personal data, making it impossible to restore its content in the personal data information system, and/or that destroy the physical media containing it.",
        ],
      },
      {
        heading: "3. Personal data of the User the Operator may process",
        paragraphs: [
          "3.1. When sending a product enquiry: name, phone number, email address, country, the selected product and its options, required quantity and comment.",
          "3.2. When sending a message through the contact form: name, email address, subject and message text.",
          "3.3. The data listed in clauses 3.1-3.2 is hereinafter collectively referred to as Personal Data.",
          "3.4. The website also uses a technical cookie that stores the selected website language, and stores in the User’s browser a note that the cookie notice has been closed. This data does not identify the User. No web analytics services are used on the website.",
        ],
      },
      {
        heading: "4. Purposes of processing personal data",
        paragraphs: [
          "4.1. The purpose of processing the User’s personal data is to respond to the User’s enquiries and messages; to prepare commercial offers; to conclude, perform and terminate civil law contracts; and to deliver products.",
          "4.2. The technical cookie is used only to remember the website language selected by the User.",
        ],
      },
      {
        heading: "5. Legal grounds for processing personal data",
        paragraphs: [
          `5.1. The Operator processes the User’s personal data only if the User fills in and/or submits it through forms on the website ${SITE} or sends it to ${EMAIL}. By filling in such forms and/or sending personal data to the Operator, the User agrees to this Policy.`,
          "5.2. The cookie with the selected website language is stored if this is permitted by the User’s browser settings.",
        ],
      },
      {
        heading: "6. Collection, storage, transfer and other processing of personal data",
        paragraphs: [
          "The security of personal data processed by the Operator is ensured through the legal, organisational and technical measures required to fully comply with the applicable data protection legislation.",
          "6.1. The Operator ensures the safety of personal data and takes all possible measures to prevent access to it by unauthorised persons.",
          "6.2. The User’s personal data is not transferred to third parties, except to the technical service providers needed to run the website and deliver enquiries to the Operator: the website hosting provider (Vercel Inc.) and the email service through which enquiries are sent to the Operator (currently Gmail, Google LLC), and except as required by applicable law.",
          `6.3. If inaccuracies are found in personal data, the User can update it by emailing the Operator at ${EMAIL} with the subject “Updating personal data”.`,
          `6.4. Personal data is processed until the purposes of processing are achieved (the enquiry is handled or the contract is performed) or until the User withdraws consent to its processing. The User may withdraw consent to the processing of personal data at any time by emailing the Operator at ${EMAIL} with the subject “Withdrawal of consent to personal data processing”.`,
        ],
      },
      {
        heading: "7. Cross-border transfer of personal data",
        paragraphs: [
          "7.1. Before carrying out a cross-border transfer of personal data, the Operator must make sure that the foreign state to which the data is to be transferred provides reliable protection of the rights of personal data subjects.",
          "7.2. Cross-border transfer of personal data to foreign states that do not meet the above requirements may only take place with the written consent of the data subject and/or for the performance of a contract to which the data subject is a party.",
          "7.3. The servers of the hosting provider and the email service named in clause 6.2 may be located outside the Russian Federation. Cross-border transfer of personal data takes place only to the extent needed to deliver to the Operator the enquiry or message the User sends through the website forms.",
        ],
      },
      {
        heading: "8. Final provisions",
        paragraphs: [
          `8.1. The User can obtain any clarification regarding the processing of their personal data by contacting the Operator at ${EMAIL}.`,
          "8.2. Any changes to the Operator’s personal data processing policy will be reflected in this document. The Policy is valid indefinitely until replaced by a new version.",
          `8.3. The current version of the Policy is publicly available at ${SITE}.`,
        ],
      },
    ],
  },
};
