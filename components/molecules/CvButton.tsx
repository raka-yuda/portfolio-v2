import { ReactNode } from 'react'

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
			data-track="cv_click" data-track-url={href}
		>
			{children}
		</a>
	);
}
