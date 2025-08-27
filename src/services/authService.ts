import { createActor } from "xstate";
import { authMachine } from "@/machines/authMachine";

export const authService = createActor(authMachine).start();
