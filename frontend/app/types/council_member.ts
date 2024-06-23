export interface CouncilMember {
  id: number;
  firstname: string;
  lastname: string;
  position: string;
  group: 'MAYOR' | 'DEPUTY' | 'DELEGATE' | 'COUNCILOR';
  profile_picture: {
    id: string;
    title: string;
    filename_download: string;
  };
}

export type CouncilMembers = CouncilMember[];
