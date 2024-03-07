import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ResponsiveAppBar from "./Header";

const WhoWeArePage = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <ResponsiveAppBar />
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 5 }}>
        <Typography variant="h4" gutterBottom>
          Who We Are
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Welcome to Nickel Nomad – Your Compass to Financial Empowerment!
        </Typography>
        <Typography paragraph>
          At Nickel Nomad, we believe that financial well-being is the
          cornerstone of a fulfilling life. Our mission is to guide you on a
          journey toward financial empowerment, making every dollar count.
          Whether you're planning for a special occasion or navigating everyday
          expenses, our innovative budget calculator is your trusted companion
          in achieving your financial goals.
        </Typography>
        <Typography paragraph>
          🌐 **Explore Our Budget Calculator:** Unleash the power of budgeting
          with our intuitive budget calculator designed for every occasion. From
          special celebrations to everyday life, Nickel Nomad provides a
          user-friendly platform to help you take control of your finances.
          Easily plan, track, and manage your budget, ensuring every nickel
          finds its purpose.
        </Typography>
        <Typography paragraph>🚀 **Why Nickel Nomad?**</Typography>
        <ul>
          <li>
            **Versatile Budgeting:** Tailor your budget to any event or
            milestone, ensuring a personalized financial roadmap.
          </li>
          <li>
            **User-Friendly Interface:** Our platform is designed for
            simplicity, making budgeting accessible to everyone.
          </li>
          <li>
            **Real-time Tracking:** Stay informed with real-time updates on your
            spending and saving goals.
          </li>
          <li>
            **Financial Empowerment:** Gain confidence in your financial
            decisions and embrace a more mindful approach to money.
          </li>
        </ul>
        <Typography paragraph>
          💡 **Your Financial Journey Starts Here:** Nickel Nomad is not just a
          budgeting tool; it's your ally in financial success. Join our
          community of savvy users who are transforming their financial lives
          one budget at a time. Embrace the freedom that comes with financial
          empowerment and embark on a journey toward a brighter, more prosperous
          future.
        </Typography>
        <Typography paragraph>
          Ready to navigate your financial landscape? Start your Nickel Nomad
          journey today!
        </Typography>
      </Paper>
    </Container>
  );
};

export default WhoWeArePage;
