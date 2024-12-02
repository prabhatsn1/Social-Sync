import VideoUpload from "@/components/VideoUpload";
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: 20, fontWeight: "bold", mb: 2 }}
        >
          Welcome To Social Sync
        </Typography>
        <VideoUpload />
      </Container>
    </>
  );
}
