import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UpdateProfile from "@/components/UpdateProfile";

const ProfileDetails = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<div className="flex flex-col font-[fangsong]">
						<span className="text-5xl font-semibold text-center">
							Complete Your
						</span>
						<span className="text-5xl font-semibold text-center">
							Profile
						</span>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<UpdateProfile />
			</CardContent>
		</Card>
	);
};

export default ProfileDetails;
