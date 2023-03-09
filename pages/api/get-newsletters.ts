import axios from "axios";
import dayjs from "dayjs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import convert from "xml-js";

let CACHE: Record<number, object> | null = null;

const moveText = (target) => {
	Object.entries<unknown>(target).forEach(([k, v]) => {
		const hasText = !!v["_text"];
		if (hasText) target[k] = v["_text"];
	});
};

const tableData2TinaTableData = (data) => {
	const res = [];

	data.forEach((item, idx) => {
		res.push({
			key: "month",
			value:
				dayjs().month(item.month).format("MMMM") +
				`${item.optionalTitle ? " " + item.optionalTitle : ""}`,
			rowIndex: idx,
			type: "link",
			url: item.url,
		});
		res.push({ key: "desc", value: item.description, rowIndex: idx });
	});

	return res;
};

const compare = (a, b) => {
	if (a.month !== b.month) return a.month < b.month ? -1 : 1;
	if (a.optionalTitle !== b.optionalTitle) return a.title < b.title ? -1 : 1;
	const nameA = path.parse(a.url).name;
	const nameB = path.parse(b.url).name;
	if (nameA !== nameB) return nameA < nameB ? -1 : 1;
};

type xmlText = { _text: string } | string;

interface Newsletter {
	year: xmlText;
	month: xmlText;
	url: xmlText;
	description: xmlText;
	optionalTitle: xmlText | object;
}

interface Newsletters {
	_attributes?: { year: string };
	newsletter: Newsletter[] | Newsletter;
}

const getAllNewsLetters = async () => {
	const response = await axios.get(
		"https://www.ssw.com.au/ssw/NETUG/SSWUpdate/NewsLetterList.xml"
	);
	if (response.status !== 200) return [];

	const data = convert.xml2js(response.data, { compact: true }) as {
		root: {
			newsletters: Newsletters[];
		};
	};
	const letters = data.root.newsletters;
	const res = {};

	letters.forEach((c) => {
		if (Array.isArray(c.newsletter)) {
			c.newsletter.forEach((letter) => {
				moveText(letter);
				letter.optionalTitle =
					typeof letter.optionalTitle === "object" ? "" : letter.optionalTitle;
			});
		} else {
			moveText(c.newsletter);
			c.newsletter = [c.newsletter];
		}

		const year = c._attributes["year"];
		res[year] = tableData2TinaTableData(c.newsletter.sort(compare));
	});

	CACHE = res;

	return res;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const year = req.query["year"];
		if (Array.isArray(year)) {
			return res.status(401).json({ message: "Duplicated query param" });
		}
		if (typeof year !== "string") {
			return res.status(401).json({ message: "Unsupported query param" });
		}
		if (!dayjs(year, "YYYY", true).isValid() && year !== "all") {
			return res.status(401).json({ message: "Invalid query param [year]" });
		}

		if (!CACHE) {
			await getAllNewsLetters();
		}

		if (year === "all") {
			return res.status(200).json(CACHE);
		}

		const currentYear = dayjs().format("YYYY");
		if (year === currentYear) {
			await getAllNewsLetters();
			return res.status(200).json(CACHE[year]);
		} else {
			return res.status(200).json(CACHE[<string>year]);
		}
	} else {
		return res.status(405).json({ message: "Unsupported method" });
	}
}
