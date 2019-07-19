import React, { Component } from 'react';
import './Planner.scss';
import ReactDOM from 'react-dom';
import Toolbar from '../components/toolbar/Toolbar'
import Button from '../components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Planner extends Component {

    onFocusSearch = (e) => {
        const node = ReactDOM.findDOMNode(this);
        if (node instanceof HTMLElement) {
            const searchBar = node.querySelector('.search-bar');
            const icon = node.querySelector('.search-icon');
            searchBar.classList.add('select');
            icon.classList.add('select');
        }
    }

    onFocusOutSearch = (e) => {
        const node = ReactDOM.findDOMNode(this);
        if (node instanceof HTMLElement) {
            const searchBar = node.querySelector('.search-bar');
            const icon = node.querySelector('.search-icon');
            searchBar.classList.remove('select');
            icon.classList.remove('select');
        }
    }

    componentDidMount() {
        this.st.addEventListener('focus', this.onFocusSearch);
        this.st.addEventListener('focusout', this.onFocusOutSearch);
    }

    componentWillUnmount() {
        this.st.removeEventListener('focus', this.onFocusSearch);
        this.st.removeEventListener('focusout', this.onFocusSearch);
    }

    render() {
        return (
            <div className="planner">
                <Toolbar />

                <div className="planner-content">
                    <div className="planner-header">
                        <div className="center-text">
                            {/* TODO: Name should come from database */}
                            <p>my first ever plan</p>
                            <div className="save-button">
                                <Button type="icon" icon="save" tooltip="Save" direction="right" />
                            </div>
                        </div>
                        <div className="line-h" />
                    </div>

                    <div className="planner-body">
                        <div className="curriculum">
                            <div className="curriculum-header">
                                <div className="center-text">
                                    <p>Curriculum</p>
                                </div>
                                <div className="line-h" />
                            </div>
                            <div className="curriculum-body">
                                <div className="search-bar">
                                    <div className="search-icon">
                                        <FontAwesomeIcon icon="search" fixedWidth/>
                                    </div>
                                    <form className="search-form">
                                        <input type="text" ref={elem => this.st = elem} className="search" placeholder="Search"/>
                                    </form>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
        }
        
        export default Planner;
