import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '1rem',
  },
  feedBtn: {
    marginRight: '1rem',
  },
}));

const SubmitButton = () => {
  const classes = useStyles();

  return (
    <Grid container justify='flex-end' className={classes.container}>
      <Link href='/feed'>
        <Button
          className={classes.feedBtn}
          size='large'
          variant='outlined'
          color='secondary'
        >
          목록
        </Button>
      </Link>
      <Button
        form='edit'
        type='submit'
        variant='outlined'
        color='primary'
        size='large'
      >
        공유
      </Button>
    </Grid>
  );
};

export default SubmitButton;
