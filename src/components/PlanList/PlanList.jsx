import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText,
    CardSubtitle, CardBody, Container, Row, Col} from 'reactstrap'
import Button from '../button/Button';
import Cards from '../card/Cards'

import {connect} from 'react-redux'
import {getPlans} from '../../actions/itemActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Route, Link } from 'react-router-dom';

class PlanList extends Component {
    
    componentDidMount() {
        this.props.getPlans();
    }


    render() {
        const { plans } = this.props.plan;
        return(
        <div className="mt-5" style={{
            marginLeft: '160px',
        }}>
        <Container fluid style={{screenLeft: "5em"}}>
        <Row>
        <Col xs="2">
            <Card className="planCard" body style ={{backgroundColor: '#F5DEB3', borderColor: '#F5DEB3'}}>
                <CardBody>
                <div className="button-icon">
                    <FontAwesomeIcon icon="copy" fixedWidth className="icon"/>
                    <span className="tooltip">Add Page</span>
                </div>
                </CardBody>
            </Card>
            </Col>
            {this.props.plans.map((plan, index) => (
                <Cards info={plan} key={index}/>
            ))}
        </Row>
        </Container>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    getPlans,
    plan: state.plan,
    plans: state.auth.userProfile ? state.auth.userProfile.plans : [],
})
export default connect(mapStateToProps, {getPlans})(PlanList)
