import type { PickupPoint } from "../types/PickupPoint";

type Props = {
  points: PickupPoint[];
};

export const PickupPointsMap = ({ points }: Props) => {
  return (
    <div className="map">
      {points.map((point) => (
        <div key={point.id}>
          {point.name}
        </div>
      ))}
    </div>
  );
};