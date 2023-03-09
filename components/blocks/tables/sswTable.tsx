import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Template } from "tinacms";
import cs from "classnames";
import axios from "axios";

const getTableData = (data, keys) => {
	const res = [];

	keys.forEach((k) => {
		const { key, rowIndex, ...rest } = data[k];
		if (!res[rowIndex]) {
			res[rowIndex] = {};
		}
		res[rowIndex] = { ...res[rowIndex], [key]: { ...rest } };
	});

	return res;
};

type ArrayLikeObject = Record<number, unknown>;

const fetchTableData = async (url: string): Promise<ArrayLikeObject> => {
	const response = await axios.get(url);
	if (response.status !== 200) return {};
	return response.data;
};

const TableItem = ({ type, value, url }) => {
	if (type === "link") {
		return <Link href={url}>{value}</Link>;
	}

	return value;
};

export const SSWTable = (props) => {
	const { title, classNames, columns = {}, data = {}, dataURL } = props;
	const [tableData, setTableData] = useState(dataURL ? {} : data);

	useEffect(() => {
		async function init() {
			if (dataURL) {
				const data = await fetchTableData(dataURL);
				setTableData(data);
			}
		}
		init();
	}, [dataURL]);

	const colKeys = Object.keys(columns).sort();
	const dataKeys = Object.keys(tableData).sort();

	if (!colKeys.length) return null;

	return (
		<div
			className={cs({
				[classNames?.container]: classNames?.container,
			})}
		>
			{title && (
				<h2
					className={cs("mt-5 mb-3 text-2xl text-sswRed", {
						[classNames?.title]: classNames?.title,
					})}
				>
					{title}
				</h2>
			)}

			<table className="w-full">
				<thead>
					<tr>
						{colKeys.map((ck) => {
							const { key, align, label, className } = columns[ck];
							const presetClass = "bg-gray-300 py-1 px-3";
							return (
								<th
									key={key}
									align={align ? align : "left"}
									className={cs(
										presetClass,
										{ [classNames?.head]: !className && classNames?.head },
										{ [className]: !!className }
									)}
								>
									{label}
								</th>
							);
						})}
					</tr>
				</thead>
				{dataKeys.length ? (
					<tbody>
						{getTableData(tableData, dataKeys).map((row, idx) => {
							return (
								<tr key={idx}>
									{colKeys.map((ck) => {
										const fieldKey = columns[ck].key;
										const tableProps = row[fieldKey];
										return (
											<td
												key={`${idx}-${fieldKey}`}
												className={cs(
													"border-l-1 border-l-white bg-gray-125 py-1 px-3",
													{ [classNames?.body]: !!classNames?.body }
												)}
											>
												<TableItem {...tableProps} />
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				) : null}
			</table>
		</div>
	);
};

export const sswTableBlockSchema: Template = {
	name: "SSWTable",
	fields: [
		{
			type: "string",
			label: "title",
			name: "title",
		},
		{
			type: "object",
			label: "ClassNames",
			name: "classNames",
			fields: [
				{
					type: "string",
					label: "Table Container ClassName",
					name: "container",
				},
				{
					type: "string",
					label: "Table Title ClassName",
					name: "title",
				},
				{
					type: "string",
					label: "Table Head ClassName",
					name: "head",
				},
				{
					type: "string",
					label: "Table Body ClassName",
					name: "body",
				},
			],
		},
		{
			type: "string",
			label: "data fetching url",
			name: "dataURL",
		},
		{
			type: "object",
			label: "Columns",
			name: "columns",
			list: true,
			ui: {
				itemProps: (item) => {
					return {
						label: item?.key,
					};
				},
			},
			fields: [
				{
					type: "string",
					label: "label",
					name: "label",
				},
				{
					type: "string",
					label: "column key",
					name: "key",
				},
				{
					type: "string",
					label: "className",
					name: "className",
				},
				{
					type: "string",
					label: "align",
					name: "align",
				},
			],
		},
		{
			type: "object",
			label: "Data",
			name: "data",
			list: true,
			ui: {
				itemProps: (item) => {
					return { label: item?.key };
				},
			},
			fields: [
				{
					type: "string",
					label: "column key",
					name: "key",
				},
				{
					type: "string",
					label: "value",
					name: "value",
				},
				{
					type: "number",
					label: "Row Index",
					name: "rowIndex",
				},
				{
					type: "string",
					label: "type",
					name: "type",
				},
				{
					type: "string",
					label: "url",
					name: "url",
				},
			],
		},
	],
};
