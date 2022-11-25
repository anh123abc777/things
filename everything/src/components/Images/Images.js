import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';

const Images = (props) => {
    let [isActived, setIsActived] = useState([]);

    const handleOnBlur = (i) => {
        let updateActived = [...isActived];
        updateActived[i] = false;
        setIsActived(updateActived);
        console.log(`UnFocus: ${updateActived[i]}`);
    };

    console.log('lo');
    const handleOnFocus = (i) => {
        let updateActived = [...isActived];
        updateActived[i] = true;
        setIsActived(updateActived);
        console.log(`Focus ${updateActived[i]}`);
    };

    return (
        <Box sx={{}}>
            {props.images &&
                props.images.map((image, i) => {
                    return (
                        <Box key={i} onMouseLeave={() => handleOnBlur(i)} onMouseEnter={() => handleOnFocus(i)}>
                            <img className="col-12" src={image?.preview || image.iamge_url} alt="" width="80%" />
                            {!!isActived[i] && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        marginTop: -5,
                                        position: 'absolute',
                                        width: '100%',
                                    }}
                                >
                                    <IconButton
                                        sx={{ padding: 0, margin: 1, background: 'blue' }}
                                        onClick={() => props.onRemoveImage(image)}
                                    >
                                        <DeleteForeverIcon
                                            fontSize="large"
                                            sx={{ color: 'black', background: '#B2B2B2', borderRadius: 0.5 }}
                                        />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    );
                })}
        </Box>
    );
};

export default Images;
