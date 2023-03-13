import { NextApiRequest, NextApiResponse } from "next";
import { getLiveStreamBannerInfo } from "../../services";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const datetimeParam = req.query["datetime"];
		if (typeof datetimeParam !== "string") {
			res.status(401).json({ message: "Unsupported query param" });
		}

		const bannerInfoRes = await getLiveStreamBannerInfo(<string>datetimeParam);
		res.status(bannerInfoRes.status).json(bannerInfoRes.data);
	} else {
		res.status(405).json({ message: "Unsupported method" });
	}
}
