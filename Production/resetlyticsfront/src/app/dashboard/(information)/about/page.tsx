import { Typography } from "@mui/material";
import Homepage from "./homepage";

export default function Page() {
  return (
    <>
      <Typography sx={{ color: "RoyalBlue", variant: 'subtitle1' }}>{'About'}</Typography>
      <Homepage />
    </>
  );
}