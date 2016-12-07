import './dropdown.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface DropdownProps{
	label?: string;
	value?: string;
}
export interface DropdownState{
	visible: boolean;
}
export class Dropdown extends React.Component<DropdownProps,DropdownState> {
	constructor(props: DropdownProps) {
		super(props);
		this.state = {
			visible: false,
		};
	}
	render() {
		return <div className="dropdown-container"
			onClick={()=>this.setState({visible:!this.state.visible})} >
			<div className="dropdown-label">
				{this.props.label}
			</div>
			<div className="dropdown-button-container">
				<div className="dropdown-button">
					{this.props.value}
				</div>
				{this.state.visible?
				<div className="dropdown-items">
					{this.props.children}
				</div>
				:null}
			</div>
		</div>
	}
}
