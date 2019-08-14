import React, { Component } from 'react';
import './Dropdown.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Dropdown extends Component {
	constructor(props) {
		super(props)
		this.state = {
			listOpen: false,
			// title: !props.title ? '--Course--' : (props.title.length > 7) ? props.title.substring(0, 7) + '...' : props.title,
			index: props.index || 0,
			title: props.list[props.index].value,
		}
	}

	componentWillMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleClickOutside = (e) => {
		if (this.node.contains(e.target))
			return
		this.setState({
			listOpen: false
		})
	}

	toggleList = (e) => {
		e.stopPropagation();
		this.setState(prevState => ({
			listOpen: !prevState.listOpen
		}))
	}

	onClick = (id) => {
		this.setState({
			index: id,
			title: this.props.list[id].value,
			listOpen: false

        });
		this.props.onSelect(id)
	}

	render() {
		return (
			<div className="dropdown" onClick={(e) => e.stopPropagation()} ref={node => this.node = node}>
				<div className="header" onClick={this.toggleList} style={{
					background: this.state.listOpen ? '#ebd987' : 'white',
				}}>
					<div className="title">{this.state.title.length > 11 ? this.state.title.substring(0,11) + '...' : this.state.title}</div>
					<div className="icon">
						{this.state.listOpen ?
							<FontAwesomeIcon icon="angle-up" />
							: <FontAwesomeIcon icon="angle-down" />
						}
					</div>
				</div>
				{this.state.listOpen &&
					<ul className="list">
						{this.props.list.map(item => (
							<li className="list-item" 
								key={item.id}
								onClick={(e) => this.onClick(item.id)}
							>
								{item.value}
							</li>
						))}
					</ul>
				}
			</div>
		)
	}
}

export default Dropdown;
