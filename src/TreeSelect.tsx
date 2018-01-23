
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Treebeard, theme} from 'react-treebeard';

export interface TreeNode {
	name: string,
	path: string,
	valid: boolean,
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
						valid: idx == array.length - 1,
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
			style={TreebeardTheme}
		/>
	}
}

let TreebeardTheme = {
    tree: {
        base: {
            listStyle: 'none',
            margin: 0,
            padding: 0,
        },
        node: {
            base: {
                position: 'relative'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                background: '#c5c5c5'
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'top',
                    marginLeft: '-5px',
                    height: '24px',
                    width: '24px'
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-7px 0 0 -7px',
                    height: '14px'
                },
                height: 10,
                width: 10,
                arrow: {
                    fill: 'black',
                    strokeWidth: 0
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '24px',
                    verticalAlign: 'middle'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px'
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};
