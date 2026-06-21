"use client";

import { track } from "@/lib/analytics";
import { ReactNode } from "react";

export function CvButton({
	href,
	children,
	className,
	style,
}: {
	href: string;
	children: ReactNode;
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={className}
			style={style}
			onClick={() => track("cv_click", { url: href })}
		>
			{children}
		</a>
	);
}
