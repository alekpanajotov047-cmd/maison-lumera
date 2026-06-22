"use client";
import * as React from "react";

import {
	motion,
	useMotionTemplate,
	useScroll,
	useTransform,
} from "framer-motion";

interface iISmoothScrollHeroProps {
	/** Height of the scroll section in pixels @default 1500 */
	scrollHeight?: number;
	/** Background image URL for desktop view */
	desktopImage?: string;
	/** Background image URL for mobile view */
	mobileImage?: string;
	/** Optional video URL for desktop — when provided, replaces desktopImage */
	desktopVideo?: string;
	/** Optional video URL for mobile — falls back to desktopVideo when omitted */
	mobileVideo?: string;
	/** Poster shown while video loads */
	videoPoster?: string;
	/** Initial clip path percentage @default 25 */
	initialClipPercentage?: number;
	/** Final clip path percentage @default 75 */
	finalClipPercentage?: number;
	/** Overlay content (headline, CTA, etc.) — rendered above the background */
	children?: React.ReactNode;
}

interface iISmoothScrollHeroBackgroundProps
	extends Required<
		Pick<
			iISmoothScrollHeroProps,
			"scrollHeight" | "initialClipPercentage" | "finalClipPercentage"
		>
	> {
	desktopImage?: string;
	mobileImage?: string;
	desktopVideo?: string;
	mobileVideo?: string;
	videoPoster?: string;
}

const SmoothScrollHeroBackground: React.FC<iISmoothScrollHeroBackgroundProps> = ({
	scrollHeight,
	desktopImage,
	mobileImage,
	desktopVideo,
	mobileVideo,
	videoPoster,
	initialClipPercentage,
	finalClipPercentage,
}) => {
	const { scrollY } = useScroll();

	const clipStart = useTransform(
		scrollY,
		[0, scrollHeight],
		[initialClipPercentage, 0],
	);
	const clipEnd = useTransform(
		scrollY,
		[0, scrollHeight],
		[finalClipPercentage, 100],
	);

	const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

	// For images we animate background-size; for videos we animate transform scale.
	const backgroundSize = useTransform(
		scrollY,
		[0, scrollHeight + 500],
		["170%", "100%"],
	);
	const videoScale = useTransform(scrollY, [0, scrollHeight + 500], [1.15, 1]);

	const mobileVideoSrc = mobileVideo ?? desktopVideo;

	return (
		<motion.div
			className="sticky top-0 h-screen w-full bg-black overflow-hidden"
			style={{ clipPath, willChange: "transform, opacity" }}
		>
			{/* Mobile background */}
			{mobileVideoSrc ? (
				<motion.video
					key={`m-${mobileVideoSrc}`}
					className="absolute inset-0 w-full h-full object-cover md:hidden"
					style={{ scale: videoScale }}
					src={mobileVideoSrc}
					poster={videoPoster}
					autoPlay
					muted
					loop
					playsInline
					preload="auto"
				/>
			) : mobileImage ? (
				<motion.div
					className="absolute inset-0 md:hidden"
					style={{
						backgroundImage: `url(${mobileImage})`,
						backgroundSize,
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
				/>
			) : null}

			{/* Desktop background */}
			{desktopVideo ? (
				<motion.video
					key={`d-${desktopVideo}`}
					className="absolute inset-0 w-full h-full object-cover hidden md:block"
					style={{ scale: videoScale }}
					src={desktopVideo}
					poster={videoPoster}
					autoPlay
					muted
					loop
					playsInline
					preload="auto"
				/>
			) : desktopImage ? (
				<motion.div
					className="absolute inset-0 hidden md:block"
					style={{
						backgroundImage: `url(${desktopImage})`,
						backgroundSize,
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
				/>
			) : null}
		</motion.div>
	);
};

/**
 * A smooth scroll hero with a clip-path reveal that expands as the user scrolls.
 * Accepts either images or videos as the background, plus optional overlay children.
 */
const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = ({
	scrollHeight = 1500,
	desktopImage,
	mobileImage,
	desktopVideo,
	mobileVideo,
	videoPoster,
	initialClipPercentage = 25,
	finalClipPercentage = 75,
	children,
}) => {
	return (
		<div
			style={{ height: `calc(${scrollHeight}px + 100vh)` }}
			className="relative w-full"
		>
			<SmoothScrollHeroBackground
				scrollHeight={scrollHeight}
				desktopImage={desktopImage}
				mobileImage={mobileImage}
				desktopVideo={desktopVideo}
				mobileVideo={mobileVideo}
				videoPoster={videoPoster}
				initialClipPercentage={initialClipPercentage}
				finalClipPercentage={finalClipPercentage}
			/>
			{children ? (
				<div className="pointer-events-none absolute inset-x-0 top-0 h-screen z-10 flex items-center">
					<div className="pointer-events-auto w-full">{children}</div>
				</div>
			) : null}
		</div>
	);
};

export default SmoothScrollHero;
export type { iISmoothScrollHeroProps };
