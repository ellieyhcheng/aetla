import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, ButtonGroup, Container, Row, Col} from 'reactstrap'
import Button from '../button/Button';
import uuid from 'uuid'
import Cards from '../card/Cards'

class PlanList extends Component {
    state = {
        items: [
            {id: uuid(), name: "Plan1", text: "My first plan"},
            {id: uuid(), name: "Plan2", text: "My second plan"},
            {id: uuid(), name: "Plan3", text: "My third plan"}
        ]
    }

    render() {
        const { items } = this.state;
        // let planCards = this.state.items.map((id, name, text) => {
        //     return (
        //         <Col>
        //             <Cards id={id} name={name} text={text}/>
        //         </Col>
        //     )
        // })
        return(
        <Container fluid>
            <Row>
                {items.map(({id, name, text}) => (
                    <Col sm="4">
                        <Cards info={{id, name, text}}/>
                    </Col>
                ))}
            </Row>
        </Container>
        )
    }
}

export default PlanList