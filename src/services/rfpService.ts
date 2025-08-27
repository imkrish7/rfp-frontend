import { rfpMachine } from "@/machines/rfpMachine";
import { createActor } from "xstate";

export const rfpService = createActor(rfpMachine).start();
