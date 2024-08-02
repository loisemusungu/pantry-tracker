"use client"

import { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, Modal, TextField } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, query, doc, setDoc, deleteDoc } from "@firebase/firestore";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #333',
  boxShadow: 24,
  p: 4,
  gap: 3,
  display: 'box',
  flexDirection: 'column'
}

export default function Home() {
  const [pantryTracker, setPantryTracker] = useState([])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [itemName, setItemName] = useState('')

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

  useEffect(() => {
    
    updatePantryTracker()
  }, [])

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantryTracker'), item)
    await setDoc(docRef, {})
    await updatePantryTracker()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantryTracker'), item)
    await deleteDoc(docRef)
    await updatePantryTracker()
    
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={"row"} spacing={2}>
            <TextField 
            id="outlined-basic" 
            label="Item" 
            variant="outlined" 
            fullWidth 
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            />
            <Button 
            variant="outlined"
            onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}
            >
              Add</Button>
          </Stack>
        </Box>
      </Modal>

      <Button variant="contained" onClick={handleOpen}>Add</Button>
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
        <Stack 
        width="800px" 
        height="300px" 
        spacing={2} 
        overflow={"auto"}>
          {pantryTracker.map((i) => (
            <Box
              key={i}
              width="100%"
              minHeight="150px"
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={"#f0f0f0"}
              paddingX={5}
            >
              <Typography 
              variant={"h3"} 
              color={"#333"} 
              textAlign={"center"}>
                {
                  // capitalize first letter of the item
                  i.charAt(0).toUpperCase() + i.slice(1)
                }
              </Typography>
              <Button 
                variant="contained" 
                onClick={() =>removeItem(i)}>
                Remove
              </Button>
            </Box>
        ))}
        </Stack>
      </Box>
    </Box>
  )
}
