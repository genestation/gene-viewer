"use strict";

import './SelectFilter.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {TreeSelect, TreeNode} from './TreeSelect.tsx';
import {Dropdown, DropdownList, DropdownListFind, DropdownListOption} from './Dropdown.tsx';

export interface FieldFilter {
	field: string,
	order: string,
	limit: number,
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
		this.state = {
			expandTree: false,
		};
	}
	handleChangeField = (node: TreeNode)=>{
		this.setState({
			expandTree: !node.valid,
		});
		this.props.onChange({
			field: node.path,
			order: this.props.value.order,
			limit: this.props.value.limit,
		});
	}
	handleChangeOrder = (option: DropdownListOption)=>{
		this.props.onChange({
			field: this.props.value.field,
			order: option.value,
			limit: this.props.value.limit,
		});
	}
	handleChangeLimit = (option: DropdownListOption)=>{
		this.props.onChange({
			field: this.props.value.field,
			order: this.props.value.order,
			limit: option.value,
		});
	}
	render() {
		return <div className="selectfilter-container">
			<Dropdown className="selectfilter-element" autoclose={false} label="Filter" value={this.props.value.field?this.props.value.field:"<none>"}>
				<TreeSelect fields={this.props.fields} value={this.props.value.field} onSelect={this.handleChangeField} />
			</Dropdown>
			<Dropdown className="selectfilter-element" label="Order" value={DropdownListFind(this.props.value.order,SelectFilter.orderOptions).label}>
				<DropdownList onChange={this.handleChangeOrder} options={SelectFilter.orderOptions}/>
			</Dropdown>
			<Dropdown className="selectfilter-element" label="Limit" value={DropdownListFind(this.props.value.limit,SelectFilter.limitOptions).label}>
				<DropdownList onChange={this.handleChangeLimit} options={SelectFilter.limitOptions}/>
			</Dropdown>
		</div>
	}
}
