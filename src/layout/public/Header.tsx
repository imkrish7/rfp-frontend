import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Header = () => {
	return (
		<header className="h-[60px] w-full px-4 flex items-center justify-between">
			<div>
				<Link to="/">
					<h1 className="text-4xl font-bold">Procurer</h1>
				</Link>
			</div>
			<div className="flex gap-4">
				<Link to="/login">
					<Button variant={"link"}>Sign In</Button>
				</Link>
				<Link to={"/signup"}>
					<Button className="rounded-4xl bg-gray-600">Signup</Button>
				</Link>
			</div>
		</header>
	);
};

export default Header;
