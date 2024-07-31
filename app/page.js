import { Box, Stack } from "@mui/material";

const item = [
  "tomato",
  "potato",
  "onion",
  "garlic",
  "ginger",
  "carrot",
  "lettuce",
  "cucumber",
  "cabbage",
  "bell pepper",
];

export default function Home() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack width="800px" height="200px" spacing={2} overflow={"auto"}>
        {item.map((i) => (
          <Box
            key={i}
            width="100%"
            height="100px"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor={"#f0f0f0"}
          >
            {i}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
