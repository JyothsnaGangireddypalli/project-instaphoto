// import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import React, { useEffect, useState } from "react";

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ id: '', username: '', caption: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((caption) => caption._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ name: '', username: '', caption: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.username}"` : 'Insta photo'}</Typography>
        <TextField name="name" variant="outlined" label="names" fullWidth value={postData.names} onChange={(e) => setPostData({ ...postData, names: e.target.value })} />
        <TextField name="username" variant="outlined" label="username" fullWidth value={postData.username} onChange={(e) => setPostData({ ...postData, username: e.target.value })} />
        <TextField name="caption" variant="outlined" label="caption" fullWidth multiline rows={4} value={postData.caption} onChange={(e) => setPostData({ ...postData, caption: e.target.value })} />
        <TextField name="tags" variant="outlined" label="HashTags(Starts with # symbol) " fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="pink" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;