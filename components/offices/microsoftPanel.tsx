import Image from "next/image";

const MicrosoftPanel = () => {
	return (
		<>
			<h3>We ❤️ Microsoft</h3>
			<div className="border-2 bg-gray-100 px-4 py-2">
				<p>
					<strong>SSW is a Microsoft Gold Certified Partner!</strong>
				</p>
				<Image
					className="m-0"
					src="/images/logos/Microsoft-Gold-Partner.png"
					width={177}
					height={50}
					alt="Microsoft Gold Partner"
				/>
				<p>
					Microsoft Gold Certified Partners are the elite Microsoft Business
					Partners who earn the highest customer endorsement. They have the
					knowledge, skills, and commitment to help implement technology
					solutions that match your exact business needs. Microsoft Gold
					Certified Partners have passed the highest level of requirements from
					Microsoft and have demonstrated the most robust, efficient and
					scalable implementations of Microsoft technologies in demonstrated
					enterprise customer deployments or an on-site Microsoft assessment.
				</p>
			</div>
		</>
	);
};

export default MicrosoftPanel;
