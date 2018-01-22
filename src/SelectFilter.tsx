"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {TreeSelect, TreeNode} from './TreeSelect.tsx';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
interface SelectFilterState {
	expandTree?: boolean,
}
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
	handleChangeOrder = (option: {value: string})=>{
		this.props.onChange({
			field: this.props.value.field,
			order: option.value,
			limit: this.props.value.limit,
		});
	}
	handleChangeLimit = (option: {value: number})=>{
		this.props.onChange({
			field: this.props.value.field,
			order: this.props.value.order,
			limit: option.value,
		});
	}
	handleToggleTree = ()=>{
		this.setState({
			expandTree: !this.state.expandTree,
		});
	}
	render() {
		return <div>
			<span onClick={this.handleToggleTree}><b>Filter: </b>{this.props.value.field}</span>
			{this.state.expandTree?
				<TreeSelect fields={this.props.fields} value={this.props.value.field} onSelect={this.handleChangeField} />
			:null}
			<Select name="order"
				value={this.props.value.order}
				onChange={this.handleChangeOrder}
				options={[
					{value: 'asc', label: 'Ascending'},
					{value: 'desc', label: 'Descending'},
				]}
			/>
			<Select name="limit"
				value={this.props.value.limit}
				onChange={this.handleChangeLimit}
				options={[
					{value: 10, label: '10'},
					{value: 20, label: '20'},
					{value: 50, label: '50'},
					{value: 100, label: '100'},
				]}
			/>
		</div>
	}
}
