import { rest } from "msw";

export const handlers = [
  rest.get("https://rickandmortyapi.com/api/character", (req, res, ctx) => {}),
];
