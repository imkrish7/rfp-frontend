const Hero = () => {
	return (
		<section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
			<h2 className="text-4xl font-bold mb-4 text-gradient italic">
				Streamline Your RFP Management
			</h2>
			<p className="text-lg text-gray-700 max-w-2xl mb-8 italic">
				Collaborate, track, and manage all your RFPs in one place. Save
				time, stay compliant, and win more deals.
			</p>
			<div className="space-x-4">
				<button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
					Get Started
				</button>
				<button className="border border-black text-black px-6 py-3 rounded-xl hover:bg-gray-100 transition">
					Learn More
				</button>
			</div>
		</section>
	);
};

export default Hero;
