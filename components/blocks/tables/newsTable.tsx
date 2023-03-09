import axios from "axios";
import React, { useEffect, useState } from "react";
import { Template } from "tinacms";
import { SSWTable } from "./sswTable";

export const NewsTable = () => {
	const [tables, setTables] = useState({});

	useEffect(() => {
		async function init() {
			const response = await axios.get("/api/get-newsletters?year=all");
			if (response.status === 200) setTables(response.data);
		}
		init();
	}, []);

	return (
		<>
			{Object.keys(tables)
				.sort()
				.reverse()
				.map((year, idx) => {
					return (
						<SSWTable
							key={year}
							title={idx === 0 ? "Past SSW Newsletters" : false}
							columns={[
								{ key: "month", label: year, className: "w-1/6" },
								{ key: "desc", label: "Description", className: "w-5/6" },
							]}
							data={tables[year]}
						/>
					);
				})}
		</>
	);
};

export const newsTableBlockSchema: Template = {
	name: "NewsTable",
	fields: [],
};
