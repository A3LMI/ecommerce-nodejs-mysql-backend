import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Admin } from './components/Admin';

import { Routes, Route } from 'react-router-dom';

function App () {
    return (
        <>
            <Routes>
                <Route path='/admin' component={< Admin />}></Route>
            </Routes>
        </>
    );
};

export default App;