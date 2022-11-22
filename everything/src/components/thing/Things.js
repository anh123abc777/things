import React, { useEffect, useState } from 'react';
import { useThing } from './hooks';
import { actions } from '.';
import Images from './pics/Images';
import Link from '@mui/joy/Link';
import {
    Box,
    Card,
    CardActionArea,
    Container,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    TextareaAutosize,
} from '@mui/material';
import styles from './Things.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Things() {
    const [state, dispatch] = useThing();
    const { things } = state;

    return (
        <Box>
            <Box className={cx('container')}>
                {things.map((thing) => (
                    <div className={cx('item')} key={thing.id}>
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
                ))}
            </Box>
        </Box>
    );
}

export default Things;
