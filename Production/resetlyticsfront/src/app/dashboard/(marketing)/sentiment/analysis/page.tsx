import Homepage from "./homepage";
import { Typography } from "@mui/material";
import { getCompany } from "@/lib/db/adapter/handlers";

// Later ON MOVE UP GETS
export default async function Page() {
  const sme = await getCompany("1");
  return (
    <>
    <Typography variant="subtitle1" color="RoyalBlue" gutterBottom>{'Sentiment Analysis / Analysis'}</Typography>
    <Homepage sme={sme} />
    </>
  );
}

