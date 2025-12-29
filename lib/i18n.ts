import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../public/locales/en/common.json'
import ru from '../public/locales/ru/common.json'
import uk from '../public/locales/uk/common.json'
import be from '../public/locales/be/common.json'
import ca from '../public/locales/ca/common.json'
import es from '../public/locales/es/common.json'
import de from '../public/locales/de/common.json'
import fr from '../public/locales/fr/common.json'
import it from '../public/locales/it/common.json'
import pt from '../public/locales/pt/common.json'
import pl from '../public/locales/pl/common.json'
import ro from '../public/locales/ro/common.json'
import nl from '../public/locales/nl/common.json'
import el from '../public/locales/el/common.json'
import cs from '../public/locales/cs/common.json'
import hu from '../public/locales/hu/common.json'
import sv from '../public/locales/sv/common.json'
import fi from '../public/locales/fi/common.json'
import da from '../public/locales/da/common.json'
import bg from '../public/locales/bg/common.json'
import hr from '../public/locales/hr/common.json'
import sk from '../public/locales/sk/common.json'
import sl from '../public/locales/sl/common.json'
import lt from '../public/locales/lt/common.json'
import lv from '../public/locales/lv/common.json'
import et from '../public/locales/et/common.json'
import ga from '../public/locales/ga/common.json'
import mt from '../public/locales/mt/common.json'
import zh from '../public/locales/zh/common.json'
import ja from '../public/locales/ja/common.json'
import vi from '../public/locales/vi/common.json'
import tr from '../public/locales/tr/common.json'
import az from '../public/locales/az/common.json'
import hy from '../public/locales/hy/common.json'
import ka from '../public/locales/ka/common.json'
import th from '../public/locales/th/common.json'
import si from '../public/locales/si/common.json'

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  uk: { translation: uk },
  be: { translation: be },
  ca: { translation: ca },
  es: { translation: es },
  de: { translation: de },
  fr: { translation: fr },
  it: { translation: it },
  pt: { translation: pt },
  pl: { translation: pl },
  ro: { translation: ro },
  nl: { translation: nl },
  el: { translation: el },
  cs: { translation: cs },
  hu: { translation: hu },
  sv: { translation: sv },
  fi: { translation: fi },
  da: { translation: da },
  bg: { translation: bg },
  hr: { translation: hr },
  sk: { translation: sk },
  sl: { translation: sl },
  lt: { translation: lt },
  lv: { translation: lv },
  et: { translation: et },
  ga: { translation: ga },
  mt: { translation: mt },
  zh: { translation: zh },
  ja: { translation: ja },
  vi: { translation: vi },
  tr: { translation: tr },
  az: { translation: az },
  hy: { translation: hy },
  ka: { translation: ka },
  th: { translation: th },
  si: { translation: si },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: typeof window !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

