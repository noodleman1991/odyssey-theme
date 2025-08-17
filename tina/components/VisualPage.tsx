import React from 'react';
import { tinaField, useTina } from "tinacms/dist/react";
import type { PageQuery, PageQueryVariables } from '../__generated__/types';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { HeroBlock } from './blocks/HeroBlock';
import { TextBlock } from './blocks/TextBlock';
import { ImageTextBlock } from './blocks/ImageTextBlock';
import { CTABlock } from './blocks/CTABlock';

type Props = {
	variables: PageQueryVariables;
	data: PageQuery;
	query: string;
}

const componentMap = {
	hero: HeroBlock,
	textBlock: TextBlock,
	imageText: ImageTextBlock,
	cta: CTABlock,
};

export default function VisualPage(props: Props) {
	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	});

	const page = data.page;
	const isRTL = page.lang === 'he' || page.lang === 'ar';

	return (
		<div
			dir={isRTL ? 'rtl' : 'ltr'}
			className={`page-content ${isRTL ? 'rtl' : 'ltr'}`}
			data-tina-field={tinaField(page)}
		>
			{page.blocks?.map((block, index) => {
				const Component = componentMap[block.__typename?.replace('PageBlocks', '').toLowerCase()];

				if (!Component) {
					console.warn(`No component found for block type: ${block.__typename}`);
					return null;
				}

				return (
					<Component
						key={index}
						data={block}
						tinaField={tinaField(page, "blocks", index)}
						isRTL={isRTL}
					/>
				);
			})}
		</div>
	);
}
