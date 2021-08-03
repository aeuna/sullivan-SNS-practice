import React from "react";
import Avatar from "../common/Avatar";
import { Divider, Grid } from "@material-ui/core";

const CommentDetail = ({ detail }) => {
  return (
    <>
      <Grid container wrap="nowrap" spacing={2} justify="flex-start">
        <Grid item>
          <Avatar size={1} photoUrl={detail.photoUrl} />
        </Grid>
        <Grid item xs zeroMinWidth>
          <h4 style={{ marginTop: "10px", textAlign: "left" }}>
            {detail.username}
          </h4>
          <p style={{ textAlign: "left" }}>{detail.comment}</p>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
    </>
  );
};

export default CommentDetail;
