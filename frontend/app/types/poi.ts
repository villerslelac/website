import { Geometry, GeometryCollection } from 'geojson';

export interface POI {
  id: number;
  name: string;
  description: string;
  address: string;
  contact?: string;
  category: string;
  tags?: string[];
  external_links?: string[];
  geolocation: GeometryCollection | Geometry;
}

export type POIs = POI[];
