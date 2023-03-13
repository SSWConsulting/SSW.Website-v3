import Image from "next/image";

const ContactPanel = ({
	phone,
	streetAddress,
	suburb,
	addressLocality,
	addressRegion,
	postalCode,
	addressCountry,
	sideImg,
	sidebarSecondaryPlace,
}) => {
	return (
		<>
			<h3>Contact Us</h3>
			<p>
				Whether you're having trouble with your development process or you just
				need us to write some awesome software, our team of experts is ready to
				help.
			</p>

			<p>
				Give us a call on
				<br />
				<strong>{phone}</strong>
			</p>

			<p>
				Find us at
				<br />
				<strong>
					{streetAddress} <br />
					{suburb}, {addressRegion} {postalCode} <br />
					{addressCountry}
				</strong>
			</p>

			<p>
				Learn more on
				<a href={`https://sswchapel.com.au/${addressLocality}`}> SSW Chapel</a>
				{!!sidebarSecondaryPlace && (
					<>
						{" "}
						and{" "}
						<a href={sidebarSecondaryPlace.url}>{sidebarSecondaryPlace.name}</a>
					</>
				)}
			</p>

			{sideImg ? (
				<Image src={sideImg} width={285} height={160} alt="Sidebar Image" />
			) : (
				<></>
			)}
		</>
	);
};

export default ContactPanel;
