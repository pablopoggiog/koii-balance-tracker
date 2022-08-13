import { useContext } from "react";
import { TrackContext } from "src/contexts";

export const useTrack = () => useContext(TrackContext);
