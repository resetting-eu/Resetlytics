import { getAllQualitySurveys } from "@/lib/db/services";
import Homepage from "./homepage";
import { Typography } from "@mui/material";

export default async function Page() {
  const surveys = await getAllQualitySurveys()
  return (
    <>
      <Typography variant="subtitle1" color="RoyalBlue" gutterBottom>{'Service Quality / Survey'}</Typography>
      <Homepage surveys={surveys} />
    </>
  );
}