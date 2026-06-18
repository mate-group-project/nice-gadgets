import { Button } from '@base-ui/react';
import './PickupPointsSection.scss';
import { useEffect, useRef, useState } from 'react';
import type { PickupPoint } from '../types/PickupPoint';
import { getPickupPoints } from '../api/getPickupPoints.ts';
import { PickupPointsMap } from './PickupPointsMap.tsx';
import { useTranslation } from '@/features/translations/hooks/useTranslation';
import { PickupPointsMapSkeleton } from './PickupPointsMapSkeleton.tsx';

export const PickupPointsSection = () => {
  const { language } = useTranslation();
  const { t } = useTranslation();

  const pickupPointsLanguage: 'en' | 'uk' = language === 'uk' ? 'uk' : 'en';

  const [isOpen, setIsOpen] = useState(false);
  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mapRef = useRef<HTMLDivElement | null>(null);

  const handleToggleMap = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let ignore = false;

    const loadPickupPoints = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getPickupPoints(pickupPointsLanguage);

        if (!ignore) {
          setPickupPoints(response);
        }
      } catch {
        if (!ignore) {
          setError('Failed to load pickup points');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadPickupPoints();

    return () => {
      ignore = true;
    };
  }, [isOpen, pickupPointsLanguage]);

  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      mapRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }, [isOpen]);

  return (
    <>
      <Button
        className="button about__button"
        onClick={handleToggleMap}
      >
        {t('about.points')}
      </Button>

      {isOpen && (
        <div ref={mapRef}>
          {loading && <PickupPointsMapSkeleton />}

          {error && <PickupPointsMapSkeleton />}

          {!loading && !error && <PickupPointsMap points={pickupPoints} />}
        </div>
      )}
    </>
  );
};
