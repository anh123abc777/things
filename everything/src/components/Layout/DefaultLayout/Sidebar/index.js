import { Box } from '@mui/material';
import ListLabel from '~/components/label/ListLabel';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { useThing } from '~/components/thing';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

function Sidebar(props) {
    const [state, dispatch] = useThing();
    const { isShowSidebar } = state;
    return (
        <Fragment>
            {isShowSidebar && (
                <Box className={cx('wrapper')}>
                    <div className="nav-header py-2"></div>
                    <ListLabel
                        onShowThingsOfLabel={props.onShowThingsOfLabel}
                        setIsUpdateLabel={props.setIsUpdateLabel}
                        labels={props.labels}
                        setLabels={props.setLabels}
                    ></ListLabel>
                </Box>
            )}
        </Fragment>
    );
}

export default Sidebar;
