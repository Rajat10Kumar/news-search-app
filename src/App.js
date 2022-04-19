import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap'
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { NewsCards, Modal } from './components';
import useStyles from './styles';
import { useUserAuth } from "../src/context/UserContext";
import {Typography} from '@material-ui/core'
import { useNavigate } from "react-router";
const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const { user } = useUserAuth();
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    let junk = user.email;
    if (junk) {
      setEmail(junk);
    }
  }, [user]);

  useEffect(() => {
    if (email) {
      setLoading(false);
      alanBtn({
        key: '02f7017485e3ac2e0e3832aa0db5d3f32e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: ({ command, articles, number }) => {
          if (command === 'newHeadlines') {
            setNewsArticles(articles);

            const docRef = addDoc(collection(db, "news-article"), {
              articles: articles,
              timestamp: serverTimestamp(),
              email: email
            });
            setActiveArticle(-1);
          } else if (command === 'instructions') {
            setIsOpen(true);
          } else if (command === 'highlight') {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          }
          else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];

            if (parsedNumber > articles.length) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              const opendocRef = addDoc(collection(db, "open-article"), {
                article_Opened: article,
                opend_At: serverTimestamp(),
                email: email
              });
              window.open(article.url, '_blank');
              alanBtn().playText('Opening...');
            } else {
              alanBtn().playText('Please try that again...');
            }
          }
          else if(command==='openArticles'){
            navigate("/openarticles");
          }
          else if(command==='goBack'){
            navigate("/home");
          }
        },
      });
    }

  }, [email]);

  return (
    <Container style={{width:'100vw'}}>
      {loading ? (<div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        {/* <img src="https://alan.app/static/alan-logo-medium-text-and-icon.986d8ae5.svg" className={classes.alanLogo} alt="logo" /> */}
      </div>) : null}
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/adrian-hajdin/"> Adrian Hajdin</a> -
            <a className={classes.link} href="http://youtube.com/javascriptmastery"> JavaScript Mastery</a>
          </Typography>
          <img className={classes.image} src={logo} height="50px" alt="JSMastery logo" />
        </div>
      ) : null} */}

    </Container>
  );
};

export default App;
