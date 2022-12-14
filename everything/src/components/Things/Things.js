import React, { useEffect, useState } from 'react';
import Link from '@mui/joy/Link';
import { Box, Card, CardActionArea, TextareaAutosize } from '@mui/material';
import styles from './Things.module.scss';
import classNames from 'classnames/bind';
import { actions, useThing } from '~/hooks';
import ListImages from '~/components/ListImages';

const cx = classNames.bind(styles);

function Things() {
    const [state, dispatch] = useThing();
    const [things, setThings] = useState([]);

    useEffect(() => {
        setThings(state.things);
    }, [state]);

    const createThing = (thing) => {
        return (
            <div className={cx('item')} key={thing.id}>
                <Card
                    variant="outlined"
                    sx={{
                        borderRadius: '8px',
                    }}
                    className={cx('item-context')}
                >
                    <CardActionArea>
                        <ListImages images={thing.images_url} limit={1}></ListImages>
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
                                href="#"
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
