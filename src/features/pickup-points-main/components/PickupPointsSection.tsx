// import { Button } from "@base-ui/react";
// import './PickupPointsSection.scss';
// import { useState } from "react";
// // import type { PickupPoint } from "../types/PickupPoint";
// import { getPickupPoints } from '../api//getPickupPoints.ts';
// import { PickupPointsMap } from "./PickupPointsMap.tsx";

// export const PickupPointsSection = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [pickupPoints, setPickupPoints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const loadPickupPoints = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await getPickupPoints();
//       setPickupPoints(response.data);
//     } catch {
//       setError('Failed to load pickup points');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOpenMap = () => {
//     setIsOpen(true);
//     loadPickupPoints();
//   };

//   return (
//     <>
//       <Button
//       className="button about__button"
//       onClick={handleOpenMap}
//     >
//       Pickup and return points
//       </Button>

//       {isOpen && (
//       <div>
//         {loading && <p>Loading...</p>}

//         {error && <p>{error}</p>}

//         {!loading && !error && (
//           <PickupPointsMap points={pickupPoints} />
//         )}
//       </div>
//     )}
//     </>
//   );
// };