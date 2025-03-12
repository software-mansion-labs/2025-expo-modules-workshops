import { useEvent } from "expo";

import ExpoModulesWorkshops from "./ExpoModulesWorkshopsModule";

const { getScreenOrientation } = ExpoModulesWorkshops;

export function useScreenOrientation() {
  const screenOrientationChange = useEvent(
    ExpoModulesWorkshops,
    "onScreenOrientationChange",
    { orientation: getScreenOrientation() },
  );

  return screenOrientationChange.orientation;
}
