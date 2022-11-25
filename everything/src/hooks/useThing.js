import { useContext } from 'react';
import Context from './Context';

export const useThing = () => {
    const [state, dispatch] = useContext(Context);

    return [state, dispatch];
};
