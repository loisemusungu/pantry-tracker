"use client"

import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, query } from "@firebase/firestore";


export default function Home() {
  const [pantryTracker, setPantryTracker] = useState([])
  useEffect(() => {
    const updatePantryTracker = async () => {
      const snapshot = query(collection(firestore, "pantryTracker"))
      const docs = await getDocs(snapshot)
      const pantryTrackerList = []
      docs.forEach((doc) => {
        pantryTrackerList.push(doc.id)
      })
      console.log(pantryTrackerList)
      setPantryTracker(pantryTrackerList)
    }
    updatePantryTracker()
  }, [])
  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Box border={"1px solid #333"}>
        <Box
          width="800px"
          height="100px"
          bgcolor={"#EBDDC3"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
            Pantry Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={"auto"}>
          {pantryTracker.map((i) => (
            <Box
              key={i}
              width="100%"
              height="300px"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              bgcolor={"#f0f0f0"}
            >
              <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
                {
                  // capitalize first letter of the item
                  i.charAt(0).toUpperCase() + i.slice(1)
                }
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
