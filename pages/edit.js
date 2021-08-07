import React from "react";
import { Card, CardContent } from "@material-ui/core";
import UploadForm from "../components/edit/UploadForm";

const edit = () => {
  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          {/*  UploadForm 컴포넌트를 추가해주세요. */}
          <UploadForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default edit;
