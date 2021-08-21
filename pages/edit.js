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
          <UploadForm feedUid={feedUid} />
        </CardContent>
      </Card>
    </div>
  );
};

export default edit;
