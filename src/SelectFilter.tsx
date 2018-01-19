"use strict";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
export class SelectFilter extends React.Component<SelectFilterProps,{}> {
	constructor(props: SelectFilterProps) {
		super(props);
		this.state = {};
	}
	handleChangeField = (value: string)=>{
		this.props.onChange({
			field: value,
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
		let options_field_part0 = Array.from(new Set(
			this.props.fields.map((field: string)=>field.split('.')[0])
		)).map((field: string)=>{
			return {
				value: field, label: field.split('.').pop()
			}
		});
		options_field_part0.unshift({
			value: null,
			label: "[none]",
		});
		return <div>
			{this.props.value.field?
				this.props.value.field.split('.').map((part: string, idx: number, array: string[])=>{
					if(idx == 0) {
						return <Select name={"field-part"+idx} key={idx}
							value={{value: this.props.value.field, label: part}}
							onChange={this.handleChangeField}
							options={options_field_part0}
						/>
					} else {
						let options = Array.from(new Set(
							this.props.fields.filter((field: string)=>
								field.startsWith(array.slice(0,idx).join('.'))
							)
						)).map((field: string)=>{
							return {
								value: field, label: field.split('.').pop()
							}
						});
						return <Select name={"field-part"+idx} key={idx}
							value={{value: this.props.value.field, label: part}}
							onChange={this.handleChangeField}
							options={options}
						/>
					}
				}):
				<Select name="field-part0"
					value={this.props.value}
					onChange={this.handleChangeField}
					options={options_field_part0}
				/>
			}
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
