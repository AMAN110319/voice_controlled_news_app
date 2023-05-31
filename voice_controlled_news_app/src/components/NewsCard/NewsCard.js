import React, { useState, useEffect, createRef } from 'react';
import {Card,CardActions,CardActionArea,CardContent,CardMedia,Button,Typography} from '@material-ui/core';
import classNames from 'classnames';
import useStyles from './styles.js';
const NewsCard = ({article:{description,publishedAt,source,title,url,urlToImage},i,activeArticle}) => {
  
    const classes = useStyles();

    const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    window.scroll(0, 0);

    setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
  }, []);

  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs]);


    return (
    <Card ref={elRefs[i]} className={classNames(classes.card,activeArticle===i ? classes.activeCard :null)}>
      <CardActionArea href={url} target="_blank">
        {/* to show images we need to specify media height */}
        <CardMedia className={classes.media} image={urlToImage || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fillustrations%2Fnews-headlines-newsletter-636978%2F&psig=AOvVaw056SQ4yOEBi6Eiw1t5wG__&ust=1679312967485000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKD6uLj25_0CFQAAAAAdAAAAABAE'} />
        <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
            <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant='h5'>{title}</Typography>
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">Learn More</Button>
        <Typography variant="h5" color="textSecondary">{i+1}</Typography>
      </CardActions>
    </Card>
  )
}

export default NewsCard;
