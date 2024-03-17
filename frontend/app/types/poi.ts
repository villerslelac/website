import { Geometry, GeometryCollection } from 'geojson';

export interface POI {
  id: number;
  name: string;
  slug: string;
  description: string;
  address: string;
  contact?: string;
  category: string;
  tags?: string[];
  external_links?: {
    link: string;
    name: string;
  }[];
  geolocation: GeometryCollection | Geometry;
}

export type POIs = POI[];
