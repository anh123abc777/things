import { Link } from '@mui/joy';
import { Card, CardActionArea } from '@mui/material';
import { memo, useState } from 'react';
import { actions } from '~/hooks';
import { useThing } from '~/hooks';

function NewThing(props) {
    const [state, dispatch] = useThing();

    return (
        <div className=" d-flex align-items-center justify-content-center" id="additional-thing">
            <Card variant="outlined" sx={{ width: '50%', borderRadius: '8px' }}>
                <CardActionArea sx={{ padding: '8px' }}>
                    <span>take a note</span>
                    <Link
                        overlay
                        href="#with-card"
                        textColor="inherit"
                        underline="none"
                        fontWeight="md"
                        onClick={() => dispatch(actions.showThing({ title: '', body: '' }))}
                    ></Link>
                </CardActionArea>
            </Card>
        </div>
    );
}

export default memo(NewThing);
