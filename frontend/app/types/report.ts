export interface Report {
  id: number;
  name: string;
  date: string;
  folder: {
    id: number;
    name: string;
    slug: string;
    order: number;
  };
  files: {
    directus_files_id: {
      id: string;
      title: string;
      filename_download: string;
    };
  }[];
}

export type Reports = Report[];

export interface ReportFolder {
  id: number;
  name: string;
  slug: string;
  order: number;
}

export type ReportFolders = ReportFolder[];
