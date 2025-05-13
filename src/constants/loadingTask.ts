import { SimpleMap } from "./types";

export type LoadingTasksList = SimpleMap;

export type LoadingTaskRegistry = SimpleMap<string>;

export interface LoadingTaskPayload {
  name: string;
  uuid: string;
}