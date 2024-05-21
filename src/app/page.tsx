import Image from 'next/image'

export default function Home() {
	return (
		<div>
			<h1>Highly Caffeinated AND-GPT</h1>
			<Image src="/logo.svg" alt="logo" width={40} height={40} />
		</div>
	)
}
