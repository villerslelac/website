export interface Menu {
  items: {
    label: string;
    link: string;
    items?: {
      label: string;
      link: string;
    }[];
  }[];
}
