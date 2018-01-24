"use strict";

import './SelectFilter.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {TreeSelect, TreeNode} from './TreeSelect.tsx';
import {Dropdown, DropdownList, DropdownListFind, DropdownListOption} from './Dropdown.tsx';

export interface FieldFilter {
	view?: string,
	field?: string,
	order?: string,
	limit?: number,
}
interface SelectFilterProps {
	value: FieldFilter,
	fields: string[],
	onChange: (filter: FieldFilter)=>any,
}
interface SelectFilterState {}
export class SelectFilter extends React.Component<SelectFilterProps,SelectFilterState> {
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
	constructor(props: SelectFilterProps) {
		super(props);
	}
	handleChange = (settings: FieldFilter)=>{
		this.props.onChange(Object.assign(this.props.value,settings));
	}
	render() {
		return <div className="selectfilter-container">
				<Dropdown className="selectfilter-element" autoclose={false} label="View"
					value={this.props.value.field?this.props.value.field:"<auto>"}>
					<TreeSelect fields={this.props.fields} value={this.props.value.view}
						onSelect={(node: TreeNode)=>{this.handleChange({view: node.path})}} />
				</Dropdown>
			<div className="selectfilter-container-group">
				<Dropdown className="selectfilter-element" autoclose={false} label="Filter"
					value={this.props.value.field?this.props.value.field:"<associations>"}>
					<TreeSelect fields={this.props.fields} value={this.props.value.field}
						onSelect={(node: TreeNode)=>{this.handleChange({field: node.path})}} />
				</Dropdown>
				<Dropdown className="selectfilter-element" label="Order"
					value={DropdownListFind(this.props.value.order,SelectFilter.orderOptions).label}>
					<DropdownList options={SelectFilter.orderOptions}
						onChange={(option: DropdownListOption)=>{this.handleChange({order: option.value})}} />
				</Dropdown>
				<Dropdown className="selectfilter-element" label="Limit"
					value={DropdownListFind(this.props.value.limit,SelectFilter.limitOptions).label}>
					<DropdownList options={SelectFilter.limitOptions}
						onChange={(option: DropdownListOption)=>{this.handleChange({limit: option.value})}} />
				</Dropdown>
			</div>
		</div>
	}
}
