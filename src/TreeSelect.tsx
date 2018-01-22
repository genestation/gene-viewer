
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard';

export interface TreeNode {
	name: string,
	path: string,
	children?: TreeNode[],
	toggled?: boolean,
	active?: boolean,
	loading?: boolean,
}
interface TreeSelectProps {
	fields: string[],
	value: string,
	onSelect: (node: TreeNode)=>any,
}
interface TreeSelectState {}
export class TreeSelect extends React.Component<TreeSelectProps,TreeSelectState> {
	constructor(props: TreeSelectProps) {
		super(props);
		this.state = {};
	}
	selectNode = (node: TreeNode)=>{
		this.props.onSelect(node);
	}
	render() {
		let fields = [] as TreeNode[];
		this.props.fields.forEach((field: string)=>{
			let ptr = fields;
			field.split('.').forEach((part: string, idx: number, array: string[])=>{
				let childIdx = ptr.findIndex((child: TreeNode)=>child.name == part);
				if(childIdx == -1) {
					childIdx = ptr.push({
						name: part,
						path: array.slice(0,idx+1).join('.'),
						toggled: this.props.value && this.props.value.startsWith(array.slice(0,idx+1).join('.')),
						active: this.props.value && this.props.value == array.slice(0,idx+1).join('.'),
					}) - 1;
				}
				if(idx != array.length - 1) {
					if(!ptr[childIdx].children) {
						ptr[childIdx].children = [];
					}
					ptr = ptr[childIdx].children;
				}
			})
		});
		return <Treebeard
			data={fields}
			onToggle={this.selectNode}
		/>
	}
}
