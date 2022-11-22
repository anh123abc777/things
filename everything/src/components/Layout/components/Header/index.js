import { CardActionArea, Grid, IconButton, InputBase, Paper } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AcUnitSharpIcon from '@mui/icons-material/AcUnitSharp';
import ReplayIcon from '@mui/icons-material/Replay';
import { actions, useThing } from '~/components/thing';
import axios from 'axios';
import { useState } from 'react';
import Link from '@mui/joy/Link';

const cx = classNames.bind(styles);
const API_URL = 'http://localhost:3000/api/v1/things/';

const Header = () => {
    const [state, dispatch] = useThing();

    const handleLoadThings = () => {
        axios
            .get(API_URL)
            .then((response) => response.data)
            .then((items) => {
                dispatch(actions.loadThing(items));
            });
    };

    const handleSearching = (e) => {
        console.log(e.target.value);
        dispatch(actions.searchThings(e.target.value));
    };

    return (
        <Grid container className={cx('wrapper')}>
            <Grid item xs={2} className={cx('inner')}>
                <IconButton className="dark-color">
                    <MenuIcon fontSize="large" />
                </IconButton>
                <CardActionArea
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: 'fit-content',
                        borderRadius: '32px',
                        padding: '8px',
                    }}
                >
                    <AcUnitSharpIcon color="primary" sx={{ fontSize: '40px' }} />
                    <h1>Things</h1>
                    <Link
                        overlay
                        href="#with-card"
                        textColor="inherit"
                        underline="none"
                        fontWeight="md"
                        onClick={() => dispatch(actions.refreshThings())}
                    />
                </CardActionArea>
            </Grid>
            <Grid item xs={8} className={cx('inner')}>
                <Paper
                    component="form"
                    className={cx('inner')}
                    elevation={0}
                    variant="outlined"
                    sx={{ width: '50%', borderRadius: '8px' }}
                >
                    <InputBase
                        className={cx('search-field')}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => handleSearching(e)}
                    />
                    <IconButton type="button" aria-label="search">
                        <SearchIcon fontSize="large" />
                    </IconButton>
                </Paper>
            </Grid>
            <Grid item xs={2} sx={{ justifyContent: 'flex-end' }} className={cx('inner')}>
                <IconButton className="dark-color" onClick={() => handleLoadThings()}>
                    <ReplayIcon fontSize="large" />
                </IconButton>{' '}
                <IconButton>
                    <MenuIcon fontSize="large" />
                </IconButton>{' '}
                <IconButton>
                    <MenuIcon fontSize="large" />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default Header;
