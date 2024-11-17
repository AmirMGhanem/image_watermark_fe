import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    CircularProgress,
} from "@mui/material";
import apiClient from "../../../config/axiosConfig";

export default function PhotoCard({
    imageSrc,
    onNameChange,
    onDescriptionChange,
    onTypeChange,
}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("rectangle");
    const [isLoading, setIsLoading] = useState(false);
    const [isWaterMarked, setIsWaterMarked] = useState(false);

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        onNameChange && onNameChange(newName);
    };

    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value;
        setDescription(newDescription);
        onDescriptionChange && onDescriptionChange(newDescription);
    };

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        setType(newType);
        onTypeChange && onTypeChange(newType);
    };

    const handleWaterMarkClick = async () => {
        try {
            const response = await apiClient.post(
                `/imageWatermark?image_path=${imageSrc}`
            );
            if (response.data && response.data.result === "Image Watermarked") {
                setIsWaterMarked(true);
                alert("Image Watermarked");
            } else {
                alert("Failed to watermark image");
            }
        } catch (error) {
            alert("Error watermarking image");
        }
    };

    const analyzeImage = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.get("/", { imageUrl: imageSrc });
            if (response.data && response.data.description) {
                setDescription(response.data.description);
                onDescriptionChange(response.data.description);
            } else {
                alert("No description found");
            }
        } catch (error) {
            console.error("Error analyzing image:", error);
            alert("Error analyzing image");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            border="1px solid #ddd"
            borderRadius="8px"
            padding={2}
            boxShadow={3}
        >
            <img
                src={imageSrc}
                alt="photo"
                style={{
                    width: "100%",
                    maxWidth: "300px",
                    borderRadius: "8px",
                }}
            />
            <TextField
                label="Name"
                value={name}
                onChange={handleNameChange}
                fullWidth
                size="small"
                variant="outlined"
            />
            <TextField
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
                size="small"
                variant="outlined"
                multiline
                rows={3}
            />
            <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={handleTypeChange}>
                    <MenuItem value="Square">Square</MenuItem>
                    <MenuItem value="Rectangle">Rectangle</MenuItem>
                    <MenuItem value="Panoramic">Panoramic</MenuItem>
                </Select>
            </FormControl>
            <Box display="flex" gap={2} width="100%">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={analyzeImage}
                    fullWidth
                    disabled={isLoading}
                    startIcon={isLoading && <CircularProgress size={20} />}
                >
                    {isLoading ? "Analyzing..." : "Describe"}
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleWaterMarkClick}
                    fullWidth
                >
                    Watermark
                </Button>
            </Box>
            <Typography variant="body2" color="textSecondary">
                {isWaterMarked ? "Watermarked ✅" : "Not Watermarked 🙅🏽‍♂️"}
            </Typography>
        </Box>
    );
}
