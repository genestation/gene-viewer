"use strict";

import './SelectFilter.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {TreeSelect, TreeNode} from './TreeSelect.tsx';
import {Dropdown} from './Dropdown.tsx';

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
	handleChangeOrder = (value: string)=>{
		this.props.onChange({
			field: this.props.value.field,
			order: value,
			limit: this.props.value.limit,
		});
	}
	handleChangeLimit = (value: number)=>{
		this.props.onChange({
			field: this.props.value.field,
			order: this.props.value.order,
			limit: value,
		});
	}
	render() {
		return <div className="selectfilter-container">
			<Dropdown className="selectfilter-element" autoclose={false} label="Filter" value={this.props.value.field?this.props.value.field:"<none>"}>
				<TreeSelect fields={this.props.fields} value={this.props.value.field} onSelect={this.handleChangeField} />
			</Dropdown>
			<Dropdown className="selectfilter-element" label="Order" value={this.props.value.order == "asc"?"Ascending":"Descending"}>
				<ul className="dropdown-list">
					<li className="dropdown-item"
					onClick={()=>this.handleChangeOrder("asc")}>Ascending</li>
					<li className="dropdown-item"
					onClick={()=>this.handleChangeOrder("desc")}>Descending</li>
				</ul>
			</Dropdown>
			<Dropdown label="Limit" value={this.props.value.limit}>
				<ul className="dropdown-list">
					<li className="dropdown-item"
					onClick={()=>this.handleChangeLimit(10)}>10</li>
					<li className="dropdown-item"
					onClick={()=>this.handleChangeLimit(20)}>20</li>
					<li className="dropdown-item"
					onClick={()=>this.handleChangeLimit(50)}>50</li>
					<li className="dropdown-item"
					onClick={()=>this.handleChangeLimit(100)}>100</li>
				</ul>
			</Dropdown>
		</div>
	}
}
