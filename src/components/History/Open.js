import React ,{ useState, useEffect}from 'react'
import {useUserAuth} from '../../context/UserContext'
import { collection,getDocs ,query, where} from "firebase/firestore";
import {db} from '../../firebase'
import { Accordion } from 'react-bootstrap'
import { Grid } from '@material-ui/core';
import Lottie from 'react-lottie'
import animationData from '../../assets/39701-robot-bot-3d.json'
const OpenArticle =()=>{
    const { user } = useUserAuth();
    const [email, setEmail] = useState(null);
    const [opend_articles, setOpend_articles] = useState([]);
    useEffect(() => {
        let junk = user.email;
        if (junk) {
          setEmail(junk);
        }
      }, [user]);
     const docRef = query(collection(db,"open-article"),where("email","==",email));
     getDocs(docRef).then((snapshot) => {
         let articles = []
         snapshot.docs.forEach((doc) => {
             articles.push({...doc.data(),id:doc.id});
         })
         setOpend_articles(articles)  
     })
      .catch((err) => {
          console.log(err.message)
      })
       
        
    const showarticles = opend_articles.map((article) =>
            <Accordion.Item key={article.id}>
                <Accordion.Header>{article.article_Opened.author} {article.article_Opened.publishedAt}</Accordion.Header>
                    <Accordion.Body>
                    {article.article_Opened.title}
                    </Accordion.Body>
            </Accordion.Item>
    );
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };  
   return (
    <div className="container p-5">
    <p className="text-center" style={{fontSize:'24px',fontWeight:"bold"}}>Aricles You Have Opened</p>
    <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="center"
    spacing={10}
    >
        <Grid item>
        <Lottie options={defaultOptions}
                        height={300}
                        width={300}
                />
        </Grid>
        <Grid item>
            <Accordion>
            {showarticles}
            </Accordion>
        </Grid>
        
    </Grid>
    </div>
   );
};
export default OpenArticle;
