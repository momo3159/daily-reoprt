export type Report = {
  date: string;
  text: string;
};

export type FetchedData = {
  [key: string]: Report;
};
