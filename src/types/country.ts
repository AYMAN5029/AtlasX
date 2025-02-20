export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  languages: { [key: string]: string };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  population: number;
  area: number;
  continents: string[];
  timezones: string[];
  tld: string[];
  idd: {
    root: string;
    suffixes: string[];
  };
}