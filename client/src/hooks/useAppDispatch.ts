import type { AppDispatch } from "@/stores";
import { useDispatch } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
