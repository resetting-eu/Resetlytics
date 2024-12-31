import { Typography } from "@mui/material";
import Homepage from "./homepage";
import { getCompaniesBaseline, getCompany } from "@/lib/db/adapter/handlers";

// Later ON MOVE UP GETS
export default async function Page() {
  const baseline = await getCompaniesBaseline();
  const sme = await getCompany("1");
  return (
    <>
      <Typography variant="subtitle1" color="RoyalBlue" gutterBottom>{'Service Quality / Analysis / Reservation'}</Typography>
      <Homepage sme={sme} baseline={baseline} />
    </>
  );
}
