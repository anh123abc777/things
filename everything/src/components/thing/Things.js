import React, { useEffect, useRef, useState } from 'react';
import { useThing } from './hooks';
import { actions } from '.';
import Images from './pics/Images';
import Link from '@mui/joy/Link';
import { Box, Card, CardActionArea, TextareaAutosize } from '@mui/material';
import styles from './Things.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Things() {
    const [state, dispatch] = useThing();
    const [things, setThings] = useState([]);
    const dragItem = useRef();
    const dragOverItem = useRef();

    useEffect(() => {
        setThings(state.things);
    }, [state]);

    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.innerHTML);
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };

    const drop = (e) => {
        const copyThings = [...things];
        const dragItemContent = copyThings[dragItem.current];
        copyThings.splice(dragItem.current, 1);
        copyThings.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setThings(copyThings);
    };

    const createThing = (thing) => {
        return (
            <div
                className={cx('item')}
                onDragStart={(e) => dragStart(e, thing.position)}
                onDragEnter={(e) => dragEnter(e, thing.position)}
                onDragEnd={drop}
                key={thing.id}
                draggable
            >
                <Card
                    variant="outlined"
                    sx={{
                        borderRadius: '8px',
                    }}
                    className={cx('item-context')}
                >
                    <CardActionArea>
                        <Images images={thing.images_url} limit={1}></Images>
                        <div className="p-2">
                            <h2>{thing.title}</h2>
                            <TextareaAutosize
                                className="no-border none-resize match-parent"
                                maxRows={4}
                                defaultValue={thing.body}
                            ></TextareaAutosize>
                            <div>
                                {thing.labels.map((label) => {
                                    return (
                                        <span className="label-card p-1" key={label.id}>
                                            {label.name}
                                        </span>
                                    );
                                })}
                            </div>
                            <Link
                                overlay
                                href="#with-card"
                                textColor="inherit"
                                underline="none"
                                fontWeight="md"
                                onClick={() => dispatch(actions.showThing(thing))}
                            />
                        </div>
                    </CardActionArea>
                </Card>
            </div>
        );
    };

    const allThing = things.map((thing) => createThing(thing));

    return (
        <Box>
            <Box className={cx('container')}>{allThing}</Box>
        </Box>
    );
}

export default Things;
