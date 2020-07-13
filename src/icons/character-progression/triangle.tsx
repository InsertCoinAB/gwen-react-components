import React from "react"

export const Triangle = (props: React.SVGAttributes<SVGElement>): JSX.Element => (
	<svg {...props} width="100%" height="100%" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			fill="#285376"
			d="M 12.097656 2.882812 C 14.277344 -0.957031 19.722656 -0.957031 21.902344 2.882812 L 31.71875 20.191406 C 33.902344 24.035156 31.175781 28.847656 26.816406 28.847656 L 7.183594 28.847656 C 2.824219 28.847656 0.0976562 24.035156 2.28125 20.191406 Z M 12.097656 2.882812 "
		/>
	</svg>
)
