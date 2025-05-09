import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../stores";

const useSelect: TypedUseSelectorHook<RootState> = useSelector;
export default useSelect;