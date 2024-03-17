'use client';

import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import SeeIcon from '@material-symbols/svg-400/rounded/trending_flat.svg';
import clsx from 'clsx';
import { Geometry } from 'geojson';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { POI, POIs } from '../../types';
import styles from './InteractiveMap.module.scss';

const associationIcon = L.divIcon({
  className: styles.associationIcon,
  html: '<span class="material-symbols-rounded">place</span>',
  iconSize: [32, 32],
  iconAnchor: [16, 28],
  popupAnchor: [0, -28],
});

const restaurantIcon = L.divIcon({
  className: styles.restaurantIcon,
  html: '<span class="material-symbols-rounded">place</span>',
  iconSize: [32, 32],
  iconAnchor: [16, 28],
  popupAnchor: [0, -28],
});

const shopIcon = L.divIcon({
  className: styles.shopIcon,
  html: '<span class="material-symbols-rounded">place</span>',
  iconSize: [32, 32],
  iconAnchor: [16, 28],
  popupAnchor: [0, -28],
});

const tourismIcon = L.divIcon({
  className: styles.tourismIcon,
  html: '<span class="material-symbols-rounded">place</span>',
  iconSize: [32, 32],
  iconAnchor: [16, 28],
  popupAnchor: [0, -28],
});

interface InteractiveMapProps {
  position: [number, number];
  zoom: number;
  pois: POIs;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  position,
  zoom,
  pois,
  className,
  ...props
}) => {
  const markersRef = useRef<L.Marker[]>([]);
  const mapRef = useRef<L.Map | null>();

  const handleMapChange = (map: L.Map | null) => {
    mapRef.current = map;
  };

  const showMarker = (idx: number) => {
    const marker = markersRef.current[idx];
    if (marker) {
      marker.openPopup();
      const map = mapRef.current;
      if (map) {
        map.flyTo(markersRef.current[idx].getLatLng(), 16);
      }
    }
  };

  const getMarkerIcon = (category: string) => {
    switch (category) {
      case 'restaurant':
        return restaurantIcon;
      case 'shop':
        return shopIcon;
      case 'toursim':
        return tourismIcon;
      default:
        return associationIcon;
    }
  };

  return (
    <div className={clsx(className, styles.container)} {...props}>
      <ul className={styles.list}>
        {pois.map((poi: POI, idx: number) => (
          <ListItem key={idx} onClick={() => showMarker(idx)} poi={poi} />
        ))}
      </ul>
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        className={styles.map}
        ref={handleMapChange}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pois.map((poi: POI, idx: number) => (
          <React.Fragment key={idx}>
            {poi.geolocation.type === 'Point' ? (
              <Marker
                key={idx}
                ref={(el) => (el ? (markersRef.current[idx] = el) : undefined)}
                position={[
                  poi.geolocation.coordinates[1],
                  poi.geolocation.coordinates[0],
                ]}
                icon={getMarkerIcon(poi.category)}
              >
                <Popup>
                  <PopupContent poi={poi} />
                </Popup>
              </Marker>
            ) : null}
            {poi.geolocation.type === 'GeometryCollection'
              ? poi.geolocation.geometries.map(
                  (geometry: Geometry, geoIdx: number) => (
                    <Marker
                      key={geoIdx}
                      ref={(el) =>
                        geoIdx == 0 && el
                          ? (markersRef.current[idx] = el)
                          : undefined
                      }
                      position={
                        geometry.type === 'Point'
                          ? [geometry.coordinates[1], geometry.coordinates[0]]
                          : [0, 0]
                      }
                      icon={getMarkerIcon(poi.category)}
                    >
                      <Popup>
                        <PopupContent poi={poi} />
                      </Popup>
                    </Marker>
                  ),
                )
              : null}
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

interface PopupContentProps {
  poi: POI;
}

const PopupContent: React.FC<PopupContentProps> = ({ poi }) => {
  return (
    <>
      <h4 className={styles.popupTitle}>{poi.name}</h4>
      <p className={styles.popupDesc}>{poi.description}</p>
    </>
  );
};
interface ListItemProps {
  poi: POI;
  onClick: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ poi, onClick }) => {
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'restaurant':
        return 'Restaurant';
      case 'shop':
        return 'Commerce';
      case 'tourism':
        return 'Tourisme';
      default:
        return 'Association';
    }
  };

  return (
    <li className={styles.listItem}>
      <span className={clsx(styles.category, styles[poi.category])}>
        {getCategoryName(poi.category)}
      </span>
      <h4 className={styles.listItemTitle}>{poi.name}</h4>
      <p className={styles.listItemDesc}>{poi.description}</p>
      <button onClick={onClick} className={styles.listItemBtn}>
        <SeeIcon />
        Voir sur la carte
      </button>
    </li>
  );
};
