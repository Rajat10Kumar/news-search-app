import React from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';

import NewsCard from './NewsCard/NewsCard';
import useStyles from './styles.js';
import animationData from '../../assets/39701-robot-bot-3d.json'
import animationData2 from '../../assets/98877-search.json'
import Lottie from 'react-lottie'
const infoCards = [
  { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
  { color: '#1565c0', title: 'Categories', info: 'Business, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
  { color: '#4527a0', title: 'Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
  { color: '#283593', title: 'Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
];

const NewsCards = ({ articles, activeArticle }) => {
  const classes = useStyles();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};
const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: animationData2,
  rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
  }
};
  if (!articles.length) {
    return (
      <Grid>
        <Grid item>
        <Grow in>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {infoCards.map((infoCard) => (
            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
              <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                <Typography variant="h5" component="h5">{infoCard.title}</Typography>
                {infoCard.info ? <Typography variant="h6" component="h6">{infoCard.info}</Typography> : null}
                <Typography variant="h6" component="h6">Try saying: <br /> <i>{infoCard.text}</i></Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>

        </Grid>
        <Grid item>
        <Lottie options={defaultOptions}
                      height={300}
                      width={300}
              />
        </Grid>
      </Grid>
      
    );
  }

  return (
    <Grid>
    <Grid item>
    <Lottie options={defaultOptions}
                      height={300}
                      width={300}
              />
    </Grid>
      <Grid item>

    <Grow in>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {articles.map((article, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
            <NewsCard activeArticle={activeArticle} i={i} article={article} />
          </Grid>
        ))}
      </Grid>
    </Grow>
      </Grid>
      <Grid item>
      <Lottie options={defaultOptions2}
                      height={300}
                      width={300}
              />
      </Grid>
      <Typography variant="h5" component="h5" style={{textAlign: 'center', padding:10}}>Speak and Search for More News...</Typography>
    </Grid>
    
  );
};

export default NewsCards;
