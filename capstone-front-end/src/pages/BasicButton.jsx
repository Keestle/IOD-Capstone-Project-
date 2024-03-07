import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function WhoWeAreButton() {
  return (
    <Stack spacing={1} direction="row" sx={{ justifyContent: "center" }}>
      <Button component={Link} to="/budget" variant="contained">
        Budget Calculator
      </Button>
    </Stack>
  );
}
