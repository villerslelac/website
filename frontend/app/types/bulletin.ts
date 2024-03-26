export interface Bulletin {
  id: number;
  name: string;
  year: string;
  cover: {
    id: string;
    title: string;
    filename_download: string;
  };
  file: {
    id: string;
    title: string;
    filename_download: string;
  };
}

export type Bulletins = Bulletin[];
