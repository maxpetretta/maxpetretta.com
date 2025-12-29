import { clsx, type ClassValue } from "clsx";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(
	dateString: string,
	options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" },
): string {
	return new Date(dateString).toLocaleDateString(undefined, options);
}

type Metadata = {
	title: string;
	date: string;
};

export type Post = {
	path: string;
	metadata: Metadata;
};

export async function fetchMarkdownPosts() {
	const files = import.meta.glob("/src/lib/posts/*.md");
	const fileEntries = Object.entries(files);

	const posts: Post[] = [];
	await Promise.all(
		fileEntries.map(async ([filePath, resolver]) => {
			try {
				const resolved = (await resolver()) as { metadata: Metadata };
				if (resolved?.metadata?.title && resolved?.metadata?.date) {
					const path = filePath.slice(14, -3);
					posts.push({ path, metadata: resolved.metadata });
				}
			} catch (error) {
				console.error(`Error loading post ${filePath}:`, error);
			}
		}),
	);

	return posts;
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: HTMLElement,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 },
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};
