import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import apiClient from "../../../config/axiosConfig";

export default function FolderLoader({ onFolderChange, onImagesFetched }) {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = async () => {
        onFolderChange(inputValue);
        try {
            const response = await apiClient.get(`/allImages/${inputValue}`);
            const images = response.data.images; // Assuming the API returns an object with an 'images' array
            onImagesFetched(images); // Pass the images to the parent component
        } catch (error) {
            console.error("Error getting images:", error);
            alert("Failed to fetch images. Please check the folder path.");
        }
    };

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            gap={2} 
            width="100%" 
            maxWidth={400} 
            margin="auto"
        >
            <Typography variant="h6" align="center" gutterBottom>
                Enter Folder Path
            </Typography>
            <TextField
                label="Folder Path"
                value={inputValue}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
                fullWidth
            >
                Save Folder
            </Button>
        </Box>
    );
}
