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

const SITE = "https://www.vkusindia.ru";
const EMAIL = "info@vkusindia.ru";
const OPT_OUT_EMAIL = "infoirtaif@gmail.com";

export const privacyPolicy: Localized<Policy> = {
  ru: {
    title: "Политика в отношении обработки персональных данных",
    sections: [
      {
        heading: "1. Общие положения",
        paragraphs: [
          "Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые ООО «Индорашен трейд энд инвестмент форум» (далее - Оператор).",
          "1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.",
          `1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее - Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта ${SITE}.`,
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
          "3.1. Фамилия, имя, отчество.",
          "3.2. Электронный адрес.",
          "3.3. Номера телефонов.",
          "3.4. Год, месяц, дата и место рождения.",
          "3.5. Фотографии.",
          "3.6. Адрес фактического места проживания и регистрации по месту жительства и (или) по месту пребывания.",
          "3.7. Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т. ч. файлов «cookie») с помощью сервисов интернет-статистики (Яндекс Метрика, Google Analytics и других).",
          "3.8. Вышеперечисленные данные далее по тексту Политики объединены общим понятием Персональные данные.",
        ],
      },
      {
        heading: "4. Цели обработки персональных данных",
        paragraphs: [
          "4.1. Цель обработки персональных данных Пользователя - информирование Пользователя посредством отправки электронных писем; заключение, исполнение и прекращение гражданско-правовых договоров; предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте; доставка продукции.",
          `4.2. Также Оператор имеет право направлять Пользователю уведомления о новых продуктах и услугах, специальных предложениях и различных событиях. Пользователь всегда может отказаться от получения информационных сообщений, направив Оператору письмо на адрес электронной почты ${OPT_OUT_EMAIL} с пометкой «Отказ от уведомлений о новых продуктах и услугах и специальных предложениях».`,
          "4.3. Обезличенные данные Пользователей, собираемые с помощью сервисов интернет-статистики, служат для сбора информации о действиях Пользователей на сайте, улучшения качества сайта и его содержания.",
        ],
      },
      {
        heading: "5. Правовые основания обработки персональных данных",
        paragraphs: [
          `5.1. Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки Пользователем самостоятельно через специальные формы, расположенные на сайте ${SITE}, или при их отправке на адрес электронной почты ${EMAIL}. Заполняя соответствующие формы и/или отправляя свои персональные данные Оператору, Пользователь выражает своё согласие с данной Политикой.`,
          "5.2. Оператор обрабатывает обезличенные данные о Пользователе в случае, если это разрешено в настройках браузера Пользователя (включено сохранение файлов «cookie» и использование технологии JavaScript).",
        ],
      },
      {
        heading:
          "6. Порядок сбора, хранения, передачи и других видов обработки персональных данных",
        paragraphs: [
          "Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путём реализации правовых, организационных и технических мер, необходимых для выполнения в полном объёме требований действующего законодательства в области защиты персональных данных.",
          "6.1. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.",
          "6.2. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства.",
          `6.3. В случае выявления неточностей в персональных данных Пользователь может актуализировать их самостоятельно, путём направления Оператору уведомления на адрес электронной почты ${EMAIL} с пометкой «Актуализация персональных данных».`,
          `6.4. Срок обработки персональных данных является неограниченным. Пользователь может в любой момент отозвать своё согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на адрес ${EMAIL} с пометкой «Отзыв согласия на обработку персональных данных».`,
        ],
      },
      {
        heading: "7. Трансграничная передача персональных данных",
        paragraphs: [
          "7.1. Оператор до начала осуществления трансграничной передачи персональных данных обязан убедиться в том, что иностранным государством, на территорию которого предполагается осуществлять передачу персональных данных, обеспечивается надёжная защита прав субъектов персональных данных.",
          "7.2. Трансграничная передача персональных данных на территории иностранных государств, не отвечающих вышеуказанным требованиям, может осуществляться только в случае наличия согласия в письменной форме субъекта персональных данных на трансграничную передачу его персональных данных и/или исполнения договора, стороной которого является субъект персональных данных.",
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
    note: "This English translation is provided for convenience. In case of any discrepancy, the Russian version prevails.",
    sections: [
      {
        heading: "1. General provisions",
        paragraphs: [
          "This personal data processing policy has been drawn up in accordance with Federal Law No. 152-FZ of 27 July 2006 “On Personal Data” and sets out the procedure for processing personal data and the measures taken to ensure its security by Indo Russian Trade and Investment Forum LLC (hereinafter, the Operator).",
          "1.1. The Operator’s primary goal and condition for carrying out its activities is to respect human and civil rights and freedoms when processing personal data, including the protection of the rights to privacy and personal and family secrets.",
          `1.2. This Operator policy on personal data processing (hereinafter, the Policy) applies to all information the Operator may obtain about visitors to the website ${SITE}.`,
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
          "3.1. Surname, first name and patronymic.",
          "3.2. Email address.",
          "3.3. Phone numbers.",
          "3.4. Year, month, date and place of birth.",
          "3.5. Photographs.",
          "3.6. Address of actual residence and of registration at the place of residence and/or stay.",
          "3.7. The website also collects and processes depersonalised visitor data (including cookies) using web analytics services (Yandex Metrica, Google Analytics and others).",
          "3.8. The data listed above is hereinafter collectively referred to as Personal Data.",
        ],
      },
      {
        heading: "4. Purposes of processing personal data",
        paragraphs: [
          "4.1. The purpose of processing the User’s personal data is to inform the User by email; to conclude, perform and terminate civil law contracts; to give the User access to services, information and/or materials on the website; and to deliver products.",
          `4.2. The Operator may also send the User notifications about new products and services, special offers and events. The User can always unsubscribe by emailing the Operator at ${OPT_OUT_EMAIL} with the subject “Unsubscribe from notifications about new products, services and special offers”.`,
          "4.3. Depersonalised User data collected by web analytics services is used to gather information about User actions on the website and to improve the quality of the website and its content.",
        ],
      },
      {
        heading: "5. Legal grounds for processing personal data",
        paragraphs: [
          `5.1. The Operator processes the User’s personal data only if the User fills in and/or submits it through forms on the website ${SITE} or sends it to ${EMAIL}. By filling in such forms and/or sending personal data to the Operator, the User agrees to this Policy.`,
          "5.2. The Operator processes depersonalised data about the User if this is permitted by the User’s browser settings (cookies and JavaScript enabled).",
        ],
      },
      {
        heading: "6. Collection, storage, transfer and other processing of personal data",
        paragraphs: [
          "The security of personal data processed by the Operator is ensured through the legal, organisational and technical measures required to fully comply with the applicable data protection legislation.",
          "6.1. The Operator ensures the safety of personal data and takes all possible measures to prevent access to it by unauthorised persons.",
          "6.2. The User’s personal data will never, under any circumstances, be transferred to third parties, except as required by applicable law.",
          `6.3. If inaccuracies are found in personal data, the User can update it by emailing the Operator at ${EMAIL} with the subject “Updating personal data”.`,
          `6.4. The period of personal data processing is unlimited. The User may withdraw consent to the processing of personal data at any time by emailing the Operator at ${EMAIL} with the subject “Withdrawal of consent to personal data processing”.`,
        ],
      },
      {
        heading: "7. Cross-border transfer of personal data",
        paragraphs: [
          "7.1. Before carrying out a cross-border transfer of personal data, the Operator must make sure that the foreign state to which the data is to be transferred provides reliable protection of the rights of personal data subjects.",
          "7.2. Cross-border transfer of personal data to foreign states that do not meet the above requirements may only take place with the written consent of the data subject and/or for the performance of a contract to which the data subject is a party.",
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
