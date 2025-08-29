import Hero from "@/components/Hero";
import RFPTable from "../assets/rfptable.png";

const Home = () => {
	return (
		<div className="flex flex-col gap-2 relative">
			<Hero />
			{/* <section id="workflow" className="py-20 px-6">
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
			</section> */}
			<section className="w-full relative flex justify-center py-48">
				<img
					width="2432"
					height="1442"
					src={RFPTable}
					alt="Product screenshot"
					className="w-3xl absolute bottom-10 shadow-xl/30 shadow-gray-600 max-w-none opacity-[0.65] rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:-ml-0"
				/>
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
