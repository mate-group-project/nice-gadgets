import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import type { PickupPoint } from '../types/PickupPoint';

type Props = {
  points: PickupPoint[];
};

export function AutoFitBounds({ points }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;

    const bounds = points.map((p) => [
      p.coordinates.lat,
      p.coordinates.lng,
    ]) as [number, number][];

    map.fitBounds(bounds, {
      padding: [50, 50],
    });
  }, [points, map]);

  return null;
}
