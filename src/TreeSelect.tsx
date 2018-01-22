
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
	valid?: boolean,
}
interface TreeSelectProps {
	fields: string[],
	onSelect: (node: TreeNode)=>any,
}
interface TreeSelectState {
	fields?: TreeNode[],
	cursor?: TreeNode,
}
export class TreeSelect extends React.Component<TreeSelectProps,TreeSelectState> {
	constructor(props: TreeSelectProps) {
		super(props);
		let fields = [] as TreeNode[];
		this.props.fields.forEach((field: string)=>{
			let ptr = fields;
			field.split('.').forEach((part: string, idx: number, array: string[])=>{
				let childIdx = ptr.findIndex((child: TreeNode)=>child.name == part);
				if(childIdx == -1) {
					childIdx = ptr.push({
						name: part,
						path: array.slice(0,idx+1).join('.'),
					}) - 1;
				}
				if(idx == array.length - 1) {
					ptr[childIdx].valid = true;
				} else {
					if(!ptr[childIdx].children) {
						ptr[childIdx].children = [];
					}
					ptr = ptr[childIdx].children;
				}
			})
		});
		this.state = {
			fields: fields,
		};
	}
	handleToggle = (node: any, toggled: boolean)=>{
		let ptr = this.state.fields;
		if(this.state.cursor) {
			this.state.cursor.path.split('.').forEach((part: string, idx: number, array: string[])=>{
				ptr.forEach((child: TreeNode)=>{
					if (child.name == part) {
						child.toggled = false;
					}
				});
				if(idx < array.length - 1) {
					ptr = ptr.find((child: TreeNode)=>child.name == part).children;
				}
			});
			this.state.cursor.active = false;
			ptr = this.state.fields;
		}
		node.path.split('.').forEach((part: string, idx: number, array: string[])=>{
			ptr.forEach((child: TreeNode)=>{
				if (child.name == part) {
					child.toggled = true;
				}
			});
			if(idx < array.length - 1) {
				ptr = ptr.find((child: TreeNode)=>child.name == part).children;
			}
		});
		node.active = true;
		this.setState({
			fields: this.state.fields,
			cursor: node,
		},()=>this.props.onSelect(node));
	}
	render() {
		return <Treebeard
			data={this.state.fields}
			onToggle={this.handleToggle}
		/>
	}
}
