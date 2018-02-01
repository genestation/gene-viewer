"use strict";

import './SelectControl.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {TreeSelect, TreeNode} from './TreeSelect.tsx';
import {HistogramBucket} from './Histogram.tsx';
import {Dropdown, DropdownList, DropdownListFind, DropdownListOption} from './Dropdown.tsx';

export interface Controls {
	view?: string,
	filter?: string,
	order?: string,
	limit?: number,
	hoverRegion?: number[],
	clickRegion?: number[],
	hoverFeature?: string,
	clickFeature?: string,
	hoverBucket?: HistogramBucket[],
	clickBucket?: HistogramBucket[],
}
interface SelectControlProps {
	value: Controls,
	fields: string[],
	onChange: (control: Controls)=>any,
}
interface SelectControlState {}
export class SelectControl extends React.Component<SelectControlProps,SelectControlState> {
	static orderOptions: DropdownListOption[] = [{
		label: "Ascending",
		value: "asc",
	},{
		label: "Descending",
		value: "desc",
	}];
	static limitOptions: DropdownListOption[] = [{
		label: "10",
		value: 10,
	},{
		label: "20",
		value: 20,
	},{
		label: "50",
		value: 50,
	},{
		label: "100",
		value: 100,
	}];
	constructor(props: SelectControlProps) {
		super(props);
	}
	handleChange = (settings: Controls)=>{
		this.props.onChange(Object.assign(this.props.value,settings));
	}
	render() {
		const region = this.props.value.hoverRegion ?
			this.props.value.hoverRegion : this.props.value.clickRegion;
		const bucket = this.props.value.hoverBucket ?
			this.props.value.hoverBucket : this.props.value.clickBucket;
		const feature = this.props.value.hoverFeature ?
			this.props.value.hoverFeature : this.props.value.clickFeature;
		return <div className="selectcontrol-container">
			<div className="selectcontrol-row">
				<Dropdown className="selectcontrol-view selectcontrol-element" autoclose={false} label="View"
					value={this.props.value.view?this.props.value.view:"<auto>"}>
					<TreeSelect fields={this.props.fields} value={this.props.value.view}
						onSelect={(node: TreeNode)=>{this.handleChange({view: node.path})}} />
				</Dropdown>
				<Dropdown className="selectcontrol-element" autoclose={false} label="Filter"
					value={this.props.value.filter?this.props.value.filter:"<associations>"}>
					<TreeSelect fields={this.props.fields} value={this.props.value.filter}
						onSelect={(node: TreeNode)=>{this.handleChange({filter: node.path})}} />
				</Dropdown>
				{this.props.value.filter?
					<Dropdown className="selectcontrol-element" label="Order"
						value={DropdownListFind(this.props.value.order,SelectControl.orderOptions).label}>
						<DropdownList options={SelectControl.orderOptions}
							onChange={(option: DropdownListOption)=>{this.handleChange({order: option.value})}} />
					</Dropdown>
				:null}
				{this.props.value.filter?
					<Dropdown className="selectcontrol-element" label="Limit"
						value={DropdownListFind(this.props.value.limit,SelectControl.limitOptions).label}>
						<DropdownList options={SelectControl.limitOptions}
							onChange={(option: DropdownListOption)=>{this.handleChange({limit: option.value})}} />
					</Dropdown>
				:null}
			</div>
			<div className="selectcontrol-row">
				{region?
					<Dropdown className="selectcontrol-element" label="Region"
						value={region.join('..')}>
					</Dropdown>
				:null}
				{bucket?
					<Dropdown className="selectcontrol-element" label="Bucket"
						value={bucket
							.map((bucket: HistogramBucket)=>
								bucket.from.toExponential(2)+'..'+bucket.to.toExponential(2))
							.join(', ')
						}>
					</Dropdown>
				:null}
				{feature?
					<Dropdown className="selectcontrol-element" label="Feature"
						value={feature}>
					</Dropdown>
				:null}
				<Dropdown className="selectcontrol-placeholder" label="" value="0" />
			</div>
		</div>
	}
}
