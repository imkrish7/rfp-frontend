import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Verify() {
	return (
		<div className="flex items-center justify-center flex-col gap-4 h-[100vh] -mt-14">
			<div className="flex flex-col gap-2">
				<div className="flex flex-col font-[fangsong]">
					<span className="text-5xl font-semibold text-center">
						Activate Your
					</span>
					<span className="text-5xl font-semibold text-center">
						Account
					</span>
				</div>
				<div className="">
					<span className="text-lg font-[fangsong] font-medium text-gray-500">
						Uncover the Untapped Patential of Your Growth to Connect
						with Clients{" "}
					</span>
				</div>
			</div>

			<div className="mt-4">
				<Card className="bg-transparent border-none">
					<CardContent className="flex flex-col gap-4">
						<InputOTP
							maxLength={4}
							pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
							className="p-2 rounded-none"
						>
							<InputOTPGroup>
								<InputOTPSlot
									className="text-gray-200"
									index={0}
								/>
								<InputOTPSlot
									className="text-gray-200"
									index={1}
								/>
								<InputOTPSlot
									className="text-gray-200"
									index={2}
								/>
								<InputOTPSlot
									className="text-gray-200"
									index={3}
								/>
							</InputOTPGroup>
						</InputOTP>
						<span className="text-gray-200">
							Please enter the one-time password sent to your
							phone.
						</span>
						<div>
							<Button className="p-4 bg-gray-500">Submit</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
