import 'leaflet/dist/leaflet.css';
import './PickupPointsMap.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { PickupPoint } from '../types/PickupPoint';
import { AutoFitBounds } from './AutoFitBounds';

type Props = {
  points: PickupPoint[];
};

export const PickupPointsMap = ({ points }: Props) => {
  return (
    <div className="map-wrapper">
      <MapContainer
        className="map"
        center={[50.4501, 30.5234]}
        zoom={6}
      >
        <AutoFitBounds points={points} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {points.map((point) => (
          <Marker
            key={point.id}
            position={[point.coordinates.lat, point.coordinates.lng]}
          >
            <Popup>
              <strong>{point.name}</strong>
              <br />
              {point.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
