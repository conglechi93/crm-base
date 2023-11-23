export interface LanguageProps {
  languageId: string;
  locale: string;
  name: string;
}

const languageData: LanguageProps[] = [
  {
    languageId: 'english',
    locale: 'en',
    name: 'English',
  },
  {
    languageId: 'vietnam',
    locale: 'vn',
    name: 'Việt Nam',
  },
];
export default languageData;
