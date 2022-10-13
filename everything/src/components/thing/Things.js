import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useThing } from './hooks';
import { actions } from '.';
import Images from './pics/Images';

function Things() {

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
                        id={thing.id}
                    >
                        <div className='card'>
                            <Images images={thing.images_url} limit={1}></Images>
                            <div className=' p-2'>
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
                        </div>
                    </Col>
                );
            })}
        </Row>
    </div>
  );
}

export default Things