import React from "react"

export const Circle = (props: React.SVGAttributes<SVGElement>): JSX.Element => (
	<svg {...props} width="100%" height="100%" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="15" cy="15" r="15" fill="#1C915F" />
	</svg>
)
