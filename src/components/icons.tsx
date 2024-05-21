type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
	Logo: ({ ...props }: IconProps) => (
		<svg
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<rect width="40" height="40" rx="20" fill="#FF323C" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M16.5363 25.0382V28.6034H23.4637V23.4638H28.6034V16.5364H25.0381L16.5363 25.0382ZM23.4637 15.1309V11.3967H16.5363V16.5364H11.3967V23.4638H15.1309L23.4637 15.1309Z"
				fill="white"
			/>
		</svg>
	),
}
