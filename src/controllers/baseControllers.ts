import * as Hapi from "@hapi/hapi";
import { users } from "../models/test";

export function indexHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit,
): string {
  return "Hello World!";
}

export function apiHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit,
): any[] {
  return users;
}
