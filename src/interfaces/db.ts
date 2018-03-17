export type Item = {
  id: string;
  label?: string;
};

export type DBStructure = {
  menu: {
    items: Item[];
  };
};
