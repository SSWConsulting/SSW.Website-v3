import Image from "next/image";
import { sswCountries } from "./constants/country";

export const Flag = ({ country }) => {
	const { flagUrl } = sswCountries.find((item) => item.label === country);

	return (
		<>
			<Image
				className="inline"
				src={flagUrl}
				width={35}
				height={35}
				alt="country"
			/>
		</>
	);
};
