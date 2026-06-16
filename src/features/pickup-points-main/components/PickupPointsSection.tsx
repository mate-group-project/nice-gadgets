import { Button } from '@base-ui/react';
import './PickupPointsSection.scss';
import { useEffect, useRef, useState } from 'react';
import type { PickupPoint } from '../types/PickupPoint';
import { getPickupPoints } from '../api/getPickupPoints.ts';
import { PickupPointsMap } from './PickupPointsMap.tsx';

export const PickupPointsSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const loadPickupPoints = async () => {
    setLoading(true);
    setError(null);

    try {
      const language: 'en' | 'uk' = 'en';
      const response = await getPickupPoints(language);

      setPickupPoints(response);
      setHasLoaded(true);
    } catch {
      setError('Failed to load pickup points');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMap = () => {
    const shouldOpen = !isOpen;

    setIsOpen(shouldOpen);

    if (shouldOpen && !hasLoaded) {
      loadPickupPoints();
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    if (pickupPoints.length === 0) return;

    mapRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [isOpen, pickupPoints]);

  return (
    <>
      <Button
        className="button about__button"
        onClick={handleToggleMap}
      >
        Pickup and return points
      </Button>

      {isOpen && (
        <div ref={mapRef}>
          {loading && <p>Loading...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && <PickupPointsMap points={pickupPoints} />}
        </div>
      )}
    </>
  );
};
