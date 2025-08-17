import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

interface HeroBlockProps {
	data: any;
	tinaField: string;
	isRTL: boolean;
}

type Layout = "centered" | "left" | "right" | "split";

const layoutClasses: Record<Layout, string> = {
	centered: "text-center",
	left: "text-left",
	right: "text-right",
	split: "grid grid-cols-2",
};

export function HeroBlock({ data, tinaField, isRTL }: HeroBlockProps) {
	const layoutClasses = {
		centered: 'text-center',
		left: isRTL ? 'text-right' : 'text-left',
		right: isRTL ? 'text-left' : 'text-right',
		split: 'grid grid-cols-1 md:grid-cols-2 gap-8 items-center'
	};

	return (
		<section
			className={`hero-section ${layoutClasses[data.layout as Layout] || 'text-center'}`}
			style={data.backgroundImage ? {
				backgroundImage: `url(${data.backgroundImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			} : {}}
			data-tina-field={tinaField}
		>
			<div className="hero-content container mx-auto px-4 py-16">
				{data.heading && (
					<h1
						className="hero-heading text-4xl md:text-6xl font-bold mb-4"
						data-tina-field={`${tinaField}.heading`}
					>
						{data.heading}
					</h1>
				)}

				{data.subheading && (
					<h2
						className="hero-subheading text-xl md:text-2xl mb-6 opacity-90"
						data-tina-field={`${tinaField}.subheading`}
					>
						{data.subheading}
					</h2>
				)}

				{data.content && (
					<div
						className="hero-content prose prose-lg max-w-none mb-8"
						data-tina-field={`${tinaField}.content`}
					>
						<TinaMarkdown content={data.content} />
					</div>
				)}

				{data.cta?.text && data.cta?.href && (
					<a
						href={data.cta.href}
						className={`inline-block px-8 py-3 rounded-lg font-semibold transition-colors
              ${data.cta.style === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
              ${data.cta.style === 'secondary' ? 'bg-gray-600 text-white hover:bg-gray-700' : ''}
              ${data.cta.style === 'outline' ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' : ''}
            `}
						data-tina-field={`${tinaField}.cta`}
					>
						{data.cta.text}
					</a>
				)}
			</div>
		</section>
	);
}
