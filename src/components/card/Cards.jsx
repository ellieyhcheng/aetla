import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, ButtonGroup, Container} from 'reactstrap'
import Button from '../button/Button';
import uuid from 'uuid'

class Cards extends Component {    
    constructor(props) {
        super(props);
    }

    render() { 
        const { items } = this.props.info;  
        return(            
            <Card size="sm" class="planCard" body inverse style ={{backgroundColor: '#333', borderColor: '#333'}}>
                <CardBody>
                    <CardTitle tag="h3">{this.props.name}</CardTitle>
                    <CardText>{this.props.text}</CardText>
                    <ButtonGroup>
                        <Button type="icon" icon="download" tooltip="Export Plan"/>
                        <Button type="icon" icon="trash-alt" tooltip="Delete"/>
                        <Button type="icon" icon="sliders-h" tooltip="Plan Settings"/>
                    </ButtonGroup>
                </CardBody>
            </Card>
        )}}

export default Cards