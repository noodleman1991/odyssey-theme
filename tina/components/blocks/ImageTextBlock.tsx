import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

interface ImageTextBlockProps {
	data: any;
	tinaField: string;
	isRTL: boolean;
}

export function ImageTextBlock({ data, tinaField, isRTL }: ImageTextBlockProps) {
	const getLayoutClasses = () => {
		switch (data.layout) {
			case 'image-left':
				return isRTL
					? 'md:flex-row-reverse'
					: 'md:flex-row';
			case 'image-right':
				return isRTL
					? 'md:flex-row'
					: 'md:flex-row-reverse';
			case 'image-top':
				return 'flex-col';
			case 'image-bottom':
				return 'flex-col-reverse';
			default:
				return isRTL ? 'md:flex-row' : 'md:flex-row-reverse';
		}
	};

	return (
		<section
			className="image-text-block py-12"
			data-tina-field={tinaField}
		>
			<div className="container mx-auto px-4">
				<div className={`flex flex-col ${getLayoutClasses()} gap-8 items-center`}>
					{data.image && (
						<div className={`flex-1 ${data.sticky ? 'md:sticky md:top-8' : ''}`}>
							<img
								src={data.image}
								alt={data.imageAlt || ''}
								className="w-full h-auto rounded-lg shadow-lg"
								data-tina-field={`${tinaField}.image`}
							/>
						</div>
					)}

					<div className="flex-1">
						{data.heading && (
							<h2
								className="text-3xl font-bold mb-6"
								data-tina-field={`${tinaField}.heading`}
							>
								{data.heading}
							</h2>
						)}

						{data.content && (
							<div
								className="prose prose-lg max-w-none"
								data-tina-field={`${tinaField}.content`}
							>
								<TinaMarkdown content={data.content} />
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
