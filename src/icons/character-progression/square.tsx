import React from "react"

export const Square = (props: React.SVGAttributes<SVGElement>): JSX.Element => (
	<svg {...props} width="100%" height="100%" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect width="30" height="30" rx="6" fill="#B4830A" />
	</svg>
)
