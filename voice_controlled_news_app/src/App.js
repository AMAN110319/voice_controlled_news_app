import React,{useState ,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js'
import wordsToNumbers from 'words-to-numbers';
// import { Typography } from '@material-ui/core';


const alanKey='93058fa709c73c88eccac4489412b5a02e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
  const classes=useStyles();
  const [newsArticles,setNewsArticles]=useState([]);
  const [activeArticle,setActiveArticle]=useState(-1);
  useEffect(()=>{
alanBtn({
  key:alanKey,
  onCommand:({command,articles,number})=>{
    if(command==='newHeadlines'){
      setNewsArticles(articles);
      setActiveArticle(-1);
    }
    else if(command==='highlight'){
      setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
    }
    else if(command==='open'){
      const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
      const article = articles[parsedNumber - 1];
      
      if (parsedNumber > articles.length) {
        alanBtn().playText('Please try that again...');
      } else if (article) {
        window.open(article.url, '_blank');
        alanBtn().playText('Opening...');
      } else {
        alanBtn().playText('Please try that again...');
      }

    }

  }
})
  },[])
  return (
    <div>
      <div className={classes.logoContainer}>
      <img src="https://miro.medium.com/v2/resize:fit:750/format:webp/1*CJyCnZVdr-EfgC27MAdFUQ.jpeg" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  )
}

export default App
