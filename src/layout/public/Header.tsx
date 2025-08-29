import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import { Link } from "react-router";

const navigation = [
	{ name: "Product", href: "#" },
	{ name: "Features", href: "#" },
	{ name: "Marketplace", href: "#" },
	{ name: "Company", href: "#" },
];

const Header = () => {
	// return (
	// 	<header className="h-[60px] w-full px-4 flex items-center justify-between">
	// 		<div>
	// 			<Link to="/">
	// 				<h1 className="text-4xl font-bold">Procurer</h1>
	// 			</Link>
	// 		</div>
	// 		<div className="flex gap-4">
	// 			<Link to="/login">
	// 				<Button variant={"link"}>Sign In</Button>
	// 			</Link>
	// 			<Link to={"/signup"}>
	// 				<Button className="rounded-4xl bg-gray-600">Signup</Button>
	// 			</Link>
	// 		</div>
	// 	</header>
	// );
	return (
		<header className="absolute inset-x-0 top-0h-[50px] z-50">
			<nav
				aria-label="Global"
				className="flex items-center justify-between p-6 lg:px-8"
			>
				<div className="flex lg:flex-1">
					<Link to="/" className="-m-1.5 p-1.5">
						<h1 className="text-4xl font-bold">Procurer.</h1>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon aria-hidden="true" className="size-6" />
					</button>
				</div>
				<div className="hidden lg:flex lg:gap-x-12">
					{navigation.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className="text-sm/6 font-semibold text-white"
						>
							{item.name}
						</a>
					))}
				</div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2">
					<Link
						to="/signup"
						className="text-sm/6 font-semibold text-gray text-white outline-1 px-2 py-1 rounded-sm"
					>
						Sign up
					</Link>
					<Link
						to="/login"
						className="text-sm/6 font-semibold text-white"
					>
						Log in <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Header;
