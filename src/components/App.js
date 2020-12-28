import React from 'react';
import {Grid} from "semantic-ui-react";
import './App.css';

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./Metapanel/MetaPanel";

const App = () => (
    <Grid columns={"equal"} className={"app"} style={{background: '#eee'}}>
        {/*componentes*/}
        <ColorPanel/>

        <SidePanel/>

        <Grid.Column style={{marginLeft: 320}}>
            <Messages/>
        </Grid.Column>

        <Grid.Column width={4}>
            <MetaPanel/>
        </Grid.Column>

    </Grid>
)

export default App;
