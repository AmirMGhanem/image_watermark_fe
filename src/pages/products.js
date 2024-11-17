import { useState } from "react";
import PhotoCard from "@/components/PhotoCard/PhotoCard";
import FolderLoader from "@/components/FolderLoader/FolderLoader";
import { Grid, Button, Typography, Container, Box } from "@mui/material";

export default function Products() {
    const [folder, setFolder] = useState("");
    const [images, setImages] = useState([]);

    const handleFolderChange = (newFolder) => {
        console.log("Folder Changed:", newFolder);
        setFolder(newFolder);
    };

    const handleImagesFetched = (fetchedImages) => {
        setImages(
            fetchedImages.map((src) => ({
                imageSrc: src,
                name: "",
                description: "",
            }))
        );
    };

    const handleNameChange = (index, newName) => {
        const updatedImages = [...images];
        updatedImages[index].name = newName;
        setImages(updatedImages);
    };

    const handleDescriptionChange = (index, newDescription) => {
        const updatedImages = [...images];
        updatedImages[index].description = newDescription;
        setImages(updatedImages);
    };

    const handleExportClick = async () => {
        console.log("Exporting data...");
        try {
            const payload = images.map(({ name, description, imageSrc }) => ({
                name,
                description,
                imageSrc,
            }));

            const response = await fetch("http://localhost:8000/export", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ photos: payload }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Export successful:", result);
                alert("Exported successfully!");
            } else {
                console.error("Export failed:", response.statusText);
                alert("Export failed!");
            }
        } catch (error) {
            console.error("Error during export:", error);
            alert("An error occurred during export.");
        }
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Photo Cards
            </Typography>

            <Box mb={4}>
                <FolderLoader
                    onFolderChange={handleFolderChange}
                    onImagesFetched={handleImagesFetched}
                />
            </Box>

            <Grid container spacing={3}>
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <PhotoCard
                                imageSrc={image.imageSrc}
                                onNameChange={(newName) =>
                                    handleNameChange(index, newName)
                                }
                                onDescriptionChange={(newDescription) =>
                                    handleDescriptionChange(index, newDescription)
                                }
                            />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" align="center">
                        No images available
                    </Typography>
                )}
            </Grid>

            <Box mt={4} display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleExportClick}
                >
                    Export to Sheets
                </Button>
            </Box>
        </Container>
    );
}
