import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useThing } from './hooks';
import { actions } from '.';

function Things(props) {

    const [state, dispatch] = useThing();
    const {things} = state

    return (
    <div className='list-thing'>   
        <Row className='card-body'>
            {things.map((thing) => {
                return (
                    <Col 
                        xs={2} 
                        key={thing.id}
                        className='py-1'
                    >
                        <div className='card p-2'>
                            <h2>{thing.title}</h2>
                            <p>{thing.body}</p>
                            <div>
                                {thing.labels.map((label) => {
                                    return (
                                            <span className='label-card p-1'>{label.name}</span>
                                    )
                                })}
                            </div>
                            <a className="stretched-link" onClick={() => dispatch(actions.showThing(thing))}></a>
                        </div>
                    </Col>
                );
            })}
        </Row>
    </div>
  );
}

export default Things