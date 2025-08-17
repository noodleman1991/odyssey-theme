import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

type TextAlignment = 'left' | 'center' | 'right' | 'justify';

interface TextBlockData {
	heading?: string;
	content?: any; // TinaCMS rich text content
	textAlign?: TextAlignment;
	narrow?: boolean;
}

interface TextBlockProps {
	data: TextBlockData;
	tinaField: string;
	isRTL: boolean;
}


export function TextBlock({ data, tinaField, isRTL }: TextBlockProps) {
	const alignmentClass: Record<TextAlignment, string> = {
		left: isRTL ? 'text-right' : 'text-left',
		center: 'text-center',
		right: isRTL ? 'text-left' : 'text-right',
		justify: 'text-justify'
	};

	// Get alignment class with fallback
	const getAlignmentClass = (align?: TextAlignment): string => {
		return align && align in alignmentClass
			? alignmentClass[align]
			: alignmentClass.right;
	};

	return (
		<section
			className={`text-block py-12 ${data.narrow ? 'container max-w-4xl mx-auto' : 'container mx-auto'}`}
			data-tina-field={tinaField}
		>
			<div className="px-4">
				{data.heading && (
					<h2
						className={`text-3xl font-bold mb-8 ${getAlignmentClass(data.textAlign)}`}
						data-tina-field={`${tinaField}.heading`}
					>
						{data.heading}
					</h2>
				)}

				{data.content && (
					<div
						className={`prose prose-lg max-w-none ${getAlignmentClass(data.textAlign)}`}
						data-tina-field={`${tinaField}.content`}
					>
						<TinaMarkdown
							content={data.content}
							components={{
								Quote: (props: any) => (
									<blockquote className="border-l-4 border-blue-500 pl-6 my-6 italic">
										<p className="text-lg mb-2">"{props.text}"</p>
										{props.author && <cite className="text-sm text-gray-600">— {props.author}</cite>}
									</blockquote>
								),
								Button: (props: any) => (
									<a
										href={props.href}
										className={`inline-block px-6 py-3 rounded-lg font-semibold transition-colors my-4
                              ${!props.style || props.style === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                              ${props.style === 'secondary' ? 'bg-gray-600 text-white hover:bg-gray-700' : ''}
                              ${props.style === 'outline' ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' : ''}
                            `}
									>
										{props.text}
									</a>
								),
							}}
						/>
					</div>
				)}
			</div>
		</section>
	);
}
