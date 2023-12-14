const Hero = () => {
	return (
		<section className="hero">
			<div className="hero__left">
				<h1 className="hero__heading">
					Premium Luxury Products at your{" "}
					<div className="hero__span-finger">finger tips!</div>
				</h1>
				<h3 className="hero__sub-heading">
					Catering to your needs with best in class Customer-Support Services
					and Customer friendly policies
				</h3>
				<div className="hero__scroll">
					Scroll Down to Explore Our Products{" "}
					<span className="hero__span-arrow">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="16"
							width="12"
							viewBox="0 0 384 512"
						>
							<path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
						</svg>
					</span>
				</div>
			</div>
			<div className="hero__right">
				<div className="hero__img-box">
					<img
						src="/images/hero-img.png"
						alt="hero image"
						className="hero__img"
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero;
