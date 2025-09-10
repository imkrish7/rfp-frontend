import { createActor } from "xstate";
import { authMachine } from "@/machines/authMachine";

export const authService = createActor(authMachine).start();
const persistedState = authService.getPersistedSnapshot();
localStorage.setItem("user_auth", JSON.stringify(persistedState));

const restoredState = JSON.parse(localStorage.getItem("user_auth") ?? "{}");

export const persistedAuthService = createActor(authMachine, {
	snapshot: restoredState,
}).start();
