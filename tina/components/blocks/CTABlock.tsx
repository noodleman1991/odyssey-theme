import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

interface CTABlockProps {
	data: any;
	tinaField: string;
	isRTL: boolean;
}

export function CTABlock({ data, tinaField, isRTL }: CTABlockProps) {
	return (
		<section
			className="cta-block py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
			data-tina-field={tinaField}
		>
			<div className="container mx-auto px-4 text-center">
				{data.heading && (
					<h2
						className="text-4xl font-bold mb-6"
						data-tina-field={`${tinaField}.heading`}
					>
						{data.heading}
					</h2>
				)}

				{data.content && (
					<div
						className="prose prose-lg prose-invert max-w-none mb-8"
						data-tina-field={`${tinaField}.content`}
					>
						<TinaMarkdown content={data.content} />
					</div>
				)}

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					{data.primaryCTA?.text && data.primaryCTA?.href && (
						<a
							href={data.primaryCTA.href}
							className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
							data-tina-field={`${tinaField}.primaryCTA`}
						>
							{data.primaryCTA.text}
						</a>
					)}

					{data.secondaryCTA?.text && data.secondaryCTA?.href && (
						<a
							href={data.secondaryCTA.href}
							className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
							data-tina-field={`${tinaField}.secondaryCTA`}
						>
							{data.secondaryCTA.text}
						</a>
					)}
				</div>
			</div>
		</section>
	);
}
