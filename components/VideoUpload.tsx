"use client";

import React, { useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Stack,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VideoUpload: React.FC = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [restriction, setRestriction] = useState("public");
  const [video, setVideo] = useState<File | null>(null);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setVideo(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ heading, description, restriction, video });
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Box p={3} border={1} borderRadius={2} borderColor="grey.400" width="50%">
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Restriction</FormLabel>
            <RadioGroup
              value={restriction}
              onChange={(e) => setRestriction(e.target.value)}
            >
              <FormControlLabel
                value="public"
                control={<Radio />}
                label="Public"
              />
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
            </RadioGroup>
          </FormControl>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              multiple
            />
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default VideoUpload;
