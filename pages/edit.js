import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { useRouter } from "next/router";

const edit = () => {
  const router = useRouter();
  const { feedUid } = router.query;
  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          {/*  UploadForm 컴포넌트를 추가하고, 적절한 props를 전달해주세요. */}
        </CardContent>
      </Card>
    </div>
  );
};

export default edit;
