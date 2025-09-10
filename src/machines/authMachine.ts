import {
	authentication,
	createOrganisationProfile,
	createVendorProfile,
	getUserAction,
	loginAction,
	signupAction,
} from "@/actions/authActions";
import type {
	LoginRequest,
	LoginResponse,
	OrganisationProfile,
	ProfileData,
	SignupRequest,
	UserProfile,
	VendorProfileData,
} from "@/types/auth";
import type { AxiosError } from "axios";

import { setup, assign, fromPromise } from "xstate";

export const authMachine = setup({
	types: {
		context: {} as {
			loginCredentials: LoginRequest | null;
			loginResponse: LoginResponse | null;
			signupCredentials: SignupRequest | null;
			userProfile: UserProfile | null;
			loginError: string | null;
			signupError: string | null;
			profileFetchError: string | null;
			isAuthenticated: boolean;
			otp: string | null;
			email: string | null;
			organisationProfileData: Omit<OrganisationProfile, "role"> | null;
			vendorProfileData: Omit<VendorProfileData, "role"> | null;
		},
		events: {} as
			| {
					type: "LOGIN";
					loginCredentials: LoginRequest;
			  }
			| {
					type: "SIGNUP";
					signupCredentials: SignupRequest;
			  }
			| {
					type: "fetchUserDetails";
					userProfile: UserProfile;
			  }
			| {
					type: "LOGOUT";
			  }
			| {
					type: "ACTIVATE";
					otp: string;
					email: string;
			  }
			| {
					type: "RESEND";
					email: string;
			  }
			| {
					type: "CREATE_PROFILE";
					profileData: ProfileData;
			  },
	},
	actors: {
		login: fromPromise(
			async ({
				input,
			}: {
				input: LoginRequest;
			}): Promise<LoginResponse> => {
				const response = await loginAction(input);

				return response;
			}
		),
		signup: fromPromise(async ({ input }: { input: SignupRequest }) => {
			const response = await signupAction(input);
			return response;
		}),
		getUser: fromPromise(async (): Promise<UserProfile> => {
			const response = await getUserAction();
			return response;
		}),
		tokenAuthentication: fromPromise(async () => {
			const response = await authentication();
			return response;
		}),
		createOrganisationProfile: fromPromise(
			async ({ input }: { input: Omit<OrganisationProfile, "role"> }) => {
				const response = await createOrganisationProfile(input);
				return response;
			}
		),
		createVendorProfile: fromPromise(
			async ({ input }: { input: Omit<VendorProfileData, "role"> }) => {
				const response = await createVendorProfile(input);
				return response;
			}
		),
		getUserAccountActivated: fromPromise(async () => {}),
		resendOTP: fromPromise(async () => {}),
	},
	guards: {
		hasAuthToken: () => {
			console.log("I hve been here");
			const authToken = localStorage.getItem("RFP_ACCESS_TOKEN");
			console.log(authToken, localStorage);
			if (authToken && authToken.length > 0) {
				return true;
			}

			return false;
		},
		isAccountActivated: ({ context }) => {
			if (context.loginResponse?.nextStep === "VERIFY_EMAIL") {
				return true;
			}
			return false;
		},
		hasProfileCompleted: ({ context }) => {
			if (context.loginResponse?.nextStep === "DASHBOARD") {
				return true;
			}
			return false;
		},
		validateUser: (
			{ context },
			params: { role: "PROCUREMENT" | "VENDOR" }
		) => {
			return context.loginResponse?.role === params.role;
		},
	},
	actions: {},
}).createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgWWQY0wEsA7MAOlWLSwHsAnQgL0jILDwGsBBDTAFRocwxAMQBtAAwBdRKAAONWIXSEaxWSAAeiAIwAOACxkAnADYATAb0BWA8b0BmYw+umANCACeic07IGJQOt7CR1rYIBfCI9qHHwiUgoqXnomFjZOHiwBIVExHRkkEAUlFTUNbQQAWnMTfQB2KwMHUx16hz0PbwRzYx0yF0Djax0HOz1LAyiY3lwCEnJKWNTmCDJ0Ok8AGRooEhEtgHkAcQBJADlJQvlFZVV1IsqdUwcTY3e9RtMDer09Y3MXUQBgsZHMgR0Egs1j0+jGU2iIFicwSi2StAYqzIMHQAFVYGA6DsoDAIPsIGpyCQAG6CcjI+ILJLLTEsHH4wnE0kkBA0mh4ZBlYhXK4aEp3cqPHz1fqhSxmYxWSzmQFeHyOMh6QISRy2YbhCQImZYFFMpYpVlrdkEom7bmiQl0ehkOQAG0FADN6ABbMgM+aJc0YtJWsB4m1cyA8vkCoUi6Ri25CirS2U6eWmRUTAwqoE9DVawK6uzhayGqKI4g0CBwDT+1GJ0r3FPVXz9d7vermNoOLuuPNVUxkbWBEESeqhLumaZI2aMwPozArSCNiUPUCVKpwt6d7vtPvuNUIHRmMhlosSFX1a-GerTxH1s2L5drDLcXg5YSr5NS6qjaw7ree69uY-ZHi0xjDtqiovAEE62DOj4LiyIbrJsxIkN+za-hIeYjEYDjasW+rWIhc4BmiKFYtanJ2lG67FEm2EboguFHt8eiakRLgluEZEmvO9K8MIKixmAWGSixCAWK8pjQq0KrWGMFh5mM9Sas816XjooytKRD7kaifoWiGEkMZUsISMO0KNCW3zmJ04GwpqclajpOgGNYlgOPxcQUWQrq7CQAAEHrIIQrorkU4o-lJZZkK0nwgj8vheeYh7dM5vQdp8Hn1DCEg+RWQA */
	id: "authMachine",
	initial: "unauthorized",
	context: {
		loginResponse: null,
		loginError: null,
		loginCredentials: null,
		signupCredentials: null,
		signupError: null,
		userProfile: null,
		profileFetchError: null,
		isAuthenticated: false,
		otp: null,
		email: null,
		organisationProfileData: null,
		vendorProfileData: null,
	},
	states: {
		unauthorized: {
			initial: "checkAuthToken",
			states: {
				checkAuthToken: {
					always: [
						{
							guard: "hasAuthToken",
							target: "authenticate",
						},
						{
							target: "tryAuthenticate",
						},
					],
				},
				tryAuthenticate: {
					on: {
						LOGIN: {
							target: "getUserLoggedin",
							actions: assign(({ event }) => {
								return {
									loginCredentials: event.loginCredentials,
									loginError: null,
								};
							}),
						},
						SIGNUP: {
							target: "creatingUser",
							actions: assign(({ event }) => {
								return {
									signupCredentials: event.signupCredentials,
								};
							}),
						},
					},
				},
				getUserLoggedin: {
					invoke: {
						src: "login",
						input: ({ context }) => {
							if (!context.loginCredentials) {
								throw new Error("logincredentials required");
							}
							return context.loginCredentials;
						},
						onDone: {
							target: "validateLoggedinResponse",
							actions: assign(({ event }) => {
								console.log(event.output);
								return {
									loginResponse: event.output,
								};
							}),
						},
						onError: {
							target: "tryAuthenticate",
							actions: assign(({ event }) => {
								return {
									loginError: (event.error as Error).message,
								};
							}),
						},
					},
				},
				creatingUser: {
					invoke: {
						src: "signup",
						input: ({ context }) => {
							if (!context.signupCredentials) {
								throw new Error("signup credentials required");
							}
							return context.signupCredentials;
						},
						onDone: {
							target: "#authMachine.unauthorized.activateAccount",
						},
						onError: {
							target: "tryAuthenticate",
							actions: assign(({ event }) => {
								return {
									signupError: (event.error as Error).message,
								};
							}),
						},
					},
				},
				validateLoggedinResponse: {
					always: [
						{
							guard: "isAccountActivated",
							target: "#authMachine.unauthorized.activateAccount",
						},
						{
							target: "#authMachine.authorized",
							actions: assign(({ context }) => {
								if (context.loginResponse?.accessToken) {
									localStorage.setItem(
										"RFP_ACCESS_TOKEN",
										context.loginResponse?.accessToken
									);
								}
								return {
									isAuthenticated: context.loginResponse
										?.accessToken
										? true
										: false,
								};
							}),
						},
					],
				},
				authenticate: {
					invoke: {
						src: "tokenAuthentication",
						onDone: {
							target: "validateLoggedinResponse",
							actions: assign(({ event }) => {
								return {
									loginResponse: event.output,
								};
							}),
						},
						onError: {
							target: "#authMachine.unauthorized.tryAuthenticate",
							actions: ({ event }) => {
								if (
									(event.error as AxiosError).status === 401
								) {
									localStorage.removeItem(
										import.meta.env.VITE_ACCESS_TOKEN
									);
								}
							},
						},
					},
				},
				activateAccount: {
					on: {
						ACTIVATE: {
							target: "#authMachine.unauthorized.activatingAccount",
							actions: assign(({ event }) => {
								return {
									otp: event.otp,
									email: event.email,
								};
							}),
						},
						RESEND: {
							target: "#authMachine.unauthorized.resendingEmail",
							actions: assign(({ event }) => {
								return {
									email: event.email,
								};
							}),
						},
					},
				},
				activatingAccount: {
					invoke: {
						src: "getUserAccountActivated",
						input: ({ context }) => {
							if (!context.otp || !context.email) {
								throw new Error("Bad Request!");
							}
							return context.otp;
						},
						onDone: {
							target: "#authMachine.unauthorized.tryAuthenticate",
						},
						onError: {
							target: "#authMachine.unauthorized.activateAccount",
						},
					},
				},
				resendingEmail: {
					invoke: {
						src: "resendOTP",
						input: ({ context }) => {
							return context.email;
						},
						onDone: {
							target: "#authMachine.unauthorized.activateAccount",
						},
						onError: {
							target: "#authMachine.unauthorized.activateAccount",
						},
					},
				},
			},
		},
		createUser: {},
		authorized: {
			initial: "nextStep",
			states: {
				nextStep: {
					always: [
						{
							guard: "hasProfileCompleted",
							target: "fetchUserDetails",
						},
						{
							target: "completeProfile",
						},
					],
				},
				fetchUserDetails: {
					invoke: {
						src: "getUser",
						onDone: {
							target: "dashboard",
							actions: assign(({ event }) => {
								return {
									userProfile: event.output,
								};
							}),
						},
						onError: {
							target: "profileFetchError",
							actions: assign(({ event }) => {
								return {
									profileFetchError: (event.error as Error)
										.message,
								};
							}),
						},
					},
				},
				completeProfile: {
					on: {
						LOGOUT: {
							target: "#authMachine.unauthorized",
							actions: assign(() => {
								localStorage.clear();
								return {
									loginResponse: null,
									loginError: null,
									loginCredentials: null,
									signupCredentials: null,
									signupError: null,
									userProfile: null,
									profileFetchError: null,
									isAuthenticated: false,
								};
							}),
						},
						CREATE_PROFILE: {
							target: "creatingProfile",
							actions: assign(({ event }) => {
								if (event.profileData.role === "organisation") {
									return {
										organisationProfileData:
											event.profileData,
									};
								} else {
									return {
										vendorProfileData: event.profileData,
									};
								}
							}),
						},
					},
				},
				creatingProfile: {
					always: [
						{
							guard: {
								type: "validateUser",
								params: { role: "PROCUREMENT" },
							},
							target: "createOrganisationProfile",
						},
						{
							guard: {
								type: "validateUser",
								params: { role: "VENDOR" },
							},
							target: "createVendorProfile",
						},
					],
				},
				createOrganisationProfile: {
					invoke: {
						src: "createOrganisationProfile",
						input: ({ context }) => {
							if (!context.organisationProfileData) {
								throw new Error("Bad request!");
							}
							return context.organisationProfileData;
						},
						onDone: {
							target: "dashboard",
						},
						onError: {
							target: "profileFetchError",
						},
					},
				},
				createVendorProfile: {
					invoke: {
						src: "createVendorProfile",
						input: ({ context }) => {
							if (!context.vendorProfileData) {
								throw new Error("Bad request!");
							}
							return context.vendorProfileData;
						},
						onDone: {
							target: "dashboard",
						},
						onError: {
							target: "profileCreateError",
						},
					},
				},
				profileCreateError: {
					target: "completeProfile",
				},
				profileFetchError: {},
				dashboard: {
					on: {
						LOGOUT: {
							target: "#authMachine.unauthorized",
							actions: assign(() => {
								localStorage.clear();
								return {
									loginResponse: null,
									loginError: null,
									loginCredentials: null,
									signupCredentials: null,
									signupError: null,
									userProfile: null,
									profileFetchError: null,
									isAuthenticated: false,
								};
							}),
						},
					},
				},
			},
		},
	},
});
