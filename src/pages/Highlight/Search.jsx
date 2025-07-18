import React, { useState } from "react";
import { TextField, IconButton, Button, Box, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import { ManageSearch } from "@mui/icons-material";

const SearchContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "96%",
  margin: "10px",
  borderRadius: 16,
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  border: "0.5px dotted gray",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    padding: theme.spacing(1),
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem",
    lineHeight: 1.5,
    padding: theme.spacing(0.5, 1),
  },
  "& .MuiInputBase-multiline": {
    padding: 0,
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(1),
}));

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    if (searchTerm.trim()) {
      console.log("Search submitted:", searchTerm);
      // Add your search logic here (e.g., API call)
      setSearchTerm("");
    }
  };

  return (
    <SearchContainer>
      <StyledTextField
        fullWidth
        variant="outlined"
        multiline
        minRows={1}
        maxRows={2}
        placeholder="Search for Vehicles etc..."
        value={searchTerm}
        onChange={handleSearch}
        aria-label="search bar"
      />
      <ButtonContainer>
        <Box>
          {/* <Button
            variant="text"
            size="small"
            sx={{ mr: 1, textTransform: "none" }}
            onClick={() => console.log("Button 1 clicked")}
          >
            Option 1
          </Button> */}
          <Button
            variant="outlined"
            size="small"
            sx={{ textTransform: "none" }}
          >
            <ManageSearch fontSize="small" />
          </Button>
        </Box>
        <IconButton
          onClick={handleSubmit}
          aria-label="submit search"
          disabled={!searchTerm.trim()}
        >
          <SendIcon color={searchTerm.trim() ? "primary" : "disabled"} />
        </IconButton>
      </ButtonContainer>
    </SearchContainer>
  );
};

export default SearchBar;
