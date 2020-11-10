export * from "./string.js";
export * from "./object.js";
export * from "./hooks.js";
export * from "./function.js";
export * from "./path.js";

export const isClient = typeof window !== "undefined";
export const isServer = !isClient;
