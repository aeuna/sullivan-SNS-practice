import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { useRouter } from "next/router";
import UploadForm from "../components/edit/UploadForm";

const edit = () => {
  const router = useRouter();
  const { feedUid } = router.query;

  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          {/*  알맞은 props를 전달해주세요. */}
          <UploadForm feedUid={feedUid} />
        </CardContent>
      </Card>
    </div>
  );
};

export default edit;
