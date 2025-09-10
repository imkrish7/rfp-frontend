import { useAuth } from "@/context/AuthContext";
import { lazy, Suspense } from "react";
import ProfileSkelton from "./screenloader/ProfileSkelton";

const VendorProfile = lazy(() => import("./VendorProfile"));
const OrganisationProfile = lazy(() => import("./OrganisationProfile"));

export default function UpdateProfile() {
	const auth = useAuth();
	const role = auth.getSnapshot().context.loginResponse?.role;
	if (role === "PROCUREMENT") {
		return (
			<Suspense fallback={<ProfileSkelton />}>
				<OrganisationProfile />
			</Suspense>
		);
	}
	if (role === "VENDOR") {
		return (
			<Suspense fallback={<ProfileSkelton />}>
				<VendorProfile />
			</Suspense>
		);
	}
	return <h1 className="font-bold text-2xl">Comming Soon....</h1>;
}
