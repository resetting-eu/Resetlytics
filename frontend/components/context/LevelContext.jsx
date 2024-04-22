import { createContext } from 'react';

const LevelContext = createContext({
    items: {},
    setItems: () => null,
});

export default LevelContext;