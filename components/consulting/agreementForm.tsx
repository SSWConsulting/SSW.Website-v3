import React from "react";
import { Template } from "tinacms";

export const AgreementForm = () => {
	return (
		<div className="agreement-form">
			<div className="row">
				<div className="col-sm-3">
					<label htmlFor="aperson">Authorized Person</label>
				</div>
				<div className="col-sm-9">
					<input type="text" id="aperson" name="aperson" />
				</div>
			</div>
			<div className="row">
				<div className="col-sm-3">
					<label htmlFor="position">Position</label>
				</div>
				<div className="col-sm-9">
					<input type="text" id="position" name="position" />
				</div>
			</div>
			<div className="row">
				<div className="col-sm-3">
					<label htmlFor="fullcompanyname">Person or Full Company Name</label>
				</div>
				<div className="col-sm-9">
					<input
						type="text"
						id="fullcompanyname"
						name="fullcompanyname"
						placeholder="E.g. Northwind Pty Ltd"
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-3">
					<label htmlFor="signdate">Signature &amp; Date</label>
				</div>
				<div className="col-sm-9">
					<input type="text" id="signdate" name="signdate" />
				</div>
			</div>
			<div className="row">
				<div className="col-sm-3">
					<label htmlFor="address">Client registered business address</label>
				</div>
				<div className="col-sm-9">
					<textarea id="address" name="address"></textarea>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-3">
					<label htmlFor="abn">Client ABN + date of incorporation</label>
				</div>
				<div className="col-sm-9">
					<input type="text" id="abn" name="abn" />
				</div>
			</div>
		</div>
	);
};

export const agreementFormBlockSchema: Template = {
	label: "Agreement Form",
	name: "AgreementForm",
	ui: {},
	fields: [
		{
			name: "foo",
			label: "foo",
			type: "string",
		},
	],
};
