import { Outlet } from "react-router";
import Header from "./Header";

const PublicLayout = () => {
	return (
		<div className="grid grid-rows-[auto, 1fr]">
			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default PublicLayout;
