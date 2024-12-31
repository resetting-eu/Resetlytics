import { getAllSustainabilitySurveys } from "@/lib/db/services";
import Homepage from "./homepage";
import { Typography } from "@mui/material";

export default async function Page() {
  const surveys = await getAllSustainabilitySurveys()
  return (
    <>
      <Typography variant="subtitle1" color="RoyalBlue" gutterBottom>{'Sustainability / Survey'}</Typography>
      <Homepage surveys={surveys} />
    </>
  );
}
