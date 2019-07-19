import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, ButtonGroup, Container, Row, Col} from 'reactstrap'
import Button from '../button/Button';
import './Cards.scss';

class Cards extends Component {    
    constructor(props) {
        super(props);
    }

    render() { 
        console.log() 
        return(
            <Col xs="2">
            <Card class="planCard" body style ={{backgroundColor: '#F5DEB3', borderColor: '#F5DEB3'}}>
                <CardBody>
                    <CardTitle tag="h3">{this.props.info.name}</CardTitle>
                    <CardText>{this.props.info.text}</CardText>
                    <ButtonGroup style={{marginTop: "2em", marginBottom:"none"}}>
                        <Button type="icon" icon="download" tooltip="Export Plan" direction="bottom"/>
                        <Button type="icon" icon="trash-alt" tooltip="Delete" direction="bottom"/>
                        <Button type="icon" icon="sliders-h" tooltip="Plan Settings" direction="bottom"/>
                    </ButtonGroup>
                </CardBody>
            </Card>
            </Col>
        )}}

export default Cards