import React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import {SocialMediaIconsReact} from 'social-media-icons-react';

const Home = () => {
    return (
        <div>
            <Parallax pages={4} style={{ top: '0', left: '0' } }>
                <ParallaxLayer
                    offset={0}
                    speed={2.5}
                    style={
                        {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center' }
                    }>
                    <h2 className={"homePageText"}><img src={"crypto2.png"} alt={"https://www.flaticon.com/free-icons/cryptocurrency"} className={"App-logo2"}/><br /><br />About this project :<br /><br />We aim to bring you the latest data about Stocks, Company Market Data and Crypto.<br />
                        Either view the data via the website or get updates via Email on a scheduled basis.<br />More in depth explanation below.
                    </h2>

                </ParallaxLayer>

                <ParallaxLayer offset={1} speed={2} style={{ backgroundColor: '#000000' }} />

                <ParallaxLayer
                    offset={1}
                    speed={1}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                    }}>
                    <h2 className={"homePageText"}><img src={"crypto3.png"} alt={"https://www.flaticon.com/free-icons/crypto"} className={"App-logo2"}/><br/><br/>Crypto Data :<br /><br />When singed in as a technical user, view up to 200 different Crypto currencies.<br />
                        When signed in as a non t echnical user, receive daily or weekly crypto updates via Email.<br />
                        Technical users may also receive updates via Email. Note, when not signed in or if your a <br />non technical user, then you can only view up to one crypto on the website.
                    </h2>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={2}
                    speed={1}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'black',
                    }}>
                    <h2 className={"homePageText"}><img src={"stock.png"} alt={"https://www.flaticon.com/free-icons/stock"} className={"App-logo2"}/><br/><br/>Stock Data :<br /><br />When singed in as a technical user, view real-time quote data for US stocks by searching the stock symbol.<br />
                        When signed in as a non technical user, receive daily or weekly stock updates via Email.<br />
                        Technical users may also receive updates via Email.
                    </h2>
                </ParallaxLayer>

                <ParallaxLayer offset={3} speed={2} style={{ backgroundColor: '#000000' }} />

                <ParallaxLayer
                    offset={3}
                    speed={1}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        backgroundColor:'black'
                    }}>
                    <h2 className={"homePageText"}><img src={"market.png"} alt={"https://www.flaticon.com/free-icons/market"} className={"App-logo2"}/><br/><br/>Market Data :<br /><br />When singed in as a technical user, view Latest Market Data
                        Categorised by Headline and Summary by searching the stock symbol.<br />
                        When signed in as a non technical user, receive daily or weekly company updates via Email.<br />
                        Technical users may also receive updates via Email.
                    </h2>
                </ParallaxLayer>


            </Parallax>
        </div>
    );
};

export default Home;


