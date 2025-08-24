import Hero from "@/components/Hero";

const Home = () => {
	return (
		<div className="flex flex-col gap-2 min-h-[calc(100vh-60px)]">
			<Hero />

			<section id="features" className="py-20 px-6">
				<h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
					Why Choose Procurer?
				</h3>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
					{[
						{
							title: "Centralized Dashboard",
							desc: "All RFPs in one place with real-time updates.",
						},
						{
							title: "Team Collaboration",
							desc: "Invite stakeholders, assign reviewers, and track progress.",
						},
						{
							title: "Automated Workflows",
							desc: "Get reminders, approvals, and compliance checks instantly.",
						},
						{
							title: "Analytics & Insights",
							desc: "Measure win rates, bottlenecks, and efficiency.",
						},
					].map((f, i) => (
						<div
							key={i}
							className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-gradient-to-br from-white to-gray-100"
						>
							<h4 className="text-xl font-semibold mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
								{f.title}
							</h4>
							<p className="text-gray-700">{f.desc}</p>
						</div>
					))}
				</div>
			</section>
			<section id="workflow" className="py-20 px-6">
				<h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
					How It Works
				</h3>
				<div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
					{[
						{
							step: "1",
							title: "Create / Submit RFP",
							desc: "Start from scratch or use templates.",
						},
						{
							step: "2",
							title: "Collaborate & Review",
							desc: "Teams review and refine proposals together.",
						},
						{
							step: "3",
							title: "Evaluate Responses",
							desc: "Compare, score, and shortlist vendors.",
						},
						{
							step: "4",
							title: "Award & Archive",
							desc: "Finalize deals and keep records organized.",
						},
					].map((w, i) => (
						<div
							key={i}
							className="p-6 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow hover:shadow-lg transition"
						>
							<div className="text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent mb-2">
								{w.step}
							</div>
							<h4 className="text-xl font-semibold mb-2">
								{w.title}
							</h4>
							<p className="text-gray-700">{w.desc}</p>
						</div>
					))}
				</div>
			</section>
			<section id="mockup" className="bg-white py-20 px-6">
				<h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
					See RFP-CMS in Action
				</h3>
				<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
					{/* Sidebar mockup */}
					<div className="bg-gradient-to-br from-gray-100 to-white rounded-2xl shadow-lg p-6 h-[500px] flex">
						<aside className="w-1/4 bg-gradient-to-b from-black to-gray-700 text-white p-4 rounded-xl mr-4">
							<ul className="space-y-4">
								<li className="font-semibold">Dashboard</li>
								<li>RFPs</li>
								<li>Templates</li>
								<li>Teams</li>
								<li>Analytics</li>
								<li>Settings</li>
							</ul>
						</aside>
						<main className="flex-1 bg-white rounded-xl p-6 overflow-auto">
							<h4 className="text-lg font-semibold mb-4">
								RFP Dashboard
							</h4>
							<div className="grid grid-cols-2 gap-4">
								<div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow">
									<p className="text-gray-600">Active RFPs</p>
									<h5 className="text-2xl font-bold">12</h5>
								</div>
								<div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow">
									<p className="text-gray-600">
										Pending Reviews
									</p>
									<h5 className="text-2xl font-bold">5</h5>
								</div>
								<div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow">
									<p className="text-gray-600">Completed</p>
									<h5 className="text-2xl font-bold">28</h5>
								</div>
								<div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow">
									<p className="text-gray-600">
										Success Rate
									</p>
									<h5 className="text-2xl font-bold">74%</h5>
								</div>
							</div>
						</main>
					</div>

					{/* Description */}
					<div>
						<h4 className="text-2xl font-bold mb-4">
							Interactive Dashboard
						</h4>
						<p className="text-gray-700 mb-4">
							Manage proposals, monitor deadlines, and track
							progress with a powerful sidebar-driven dashboard.
							Keep everything organized and accessible in one
							place.
						</p>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>Quick access to RFPs and templates</li>
							<li>Real-time team collaboration</li>
							<li>Detailed analytics and insights</li>
							<li>Customizable workflows</li>
						</ul>
					</div>
				</div>
			</section>
			<section className=" text-center py-16 px-6">
				<h3 className="text-3xl font-bold mb-4">
					Ready to simplify your RFPs?
				</h3>
				<p className="mb-6 text-lg">
					Start managing RFPs smarter today with Procurer.
				</p>
				<button className="bg-white text-black font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition">
					Request a Demo
				</button>
			</section>

			{/* Footer */}
			<footer
				id="contact"
				className="bg-gradient-to-r from-black via-gray-800 to-gray-700 text-gray-300 py-6 px-8 text-center"
			>
				<p>
					© {new Date().getFullYear()} RFP-CMS. All rights reserved.
				</p>
			</footer>
		</div>
	);
};

export default Home;
