import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import Button from "@mui/material/Button";
import ViewListIcon from "@mui/icons-material/ViewList";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = "https://jsonplaceholder.typicode.com/albums";

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);
  const [showAlbumsModal, setShowAlbumsModal] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  const handleAddAlbum = () => {
    if (newAlbumTitle.trim() === "") return;

    axios
      .post(API_URL, { title: newAlbumTitle })
      .then((response) => setAlbums([...albums, response.data]))
      .catch((error) => console.error("Error adding album:", error));

    setNewAlbumTitle("");
    setShowAddAlbumModal(false);
  };

  const handleUpdateAlbum = (albumId, newTitle) => {
    if (newTitle.trim() === "") return;

    axios
      .put(`${API_URL}/${albumId}`, { title: newTitle })
      .then((response) => {
        setAlbums(
          albums.map((album) => (album.id === albumId ? response.data : album))
        );
      })
      .catch((error) => console.error("Error updating album:", error));
  };

  const handleDeleteAlbum = (albumId) => {
    axios
      .delete(`${API_URL}/${albumId}`)
      .then(() => setAlbums(albums.filter((album) => album.id !== albumId)))
      .catch((error) => console.error("Error deleting album:", error));
  };

  return (
    <div className="home">
      <div className="mainMenu">
        <Typography variant="h4">
          Hi! Please go with the provided options below
        </Typography>
        <div className="menuItem">
          <Button
            variant="contained"
            startIcon={<ViewListIcon />}
            onClick={() => setShowAlbumsModal(true)}
          >
            View Albuma
          </Button>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={() => setShowAddAlbumModal(true)}
          >
            Add Album
          </Button>
        </div>
      </div>

      {showAlbumsModal && (
        <div className="listModal">
          <div className="modal-content">
            <div className="modelHead">
              <Typography variant="h4">Albums List</Typography>

              <IconButton
                color="secondary"
                aria-label="close"
                onClick={() => setShowAlbumsModal(false)}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <ul>
              {albums.map((album) => (
                <li key={album.id} className="album-item">
                  <Typography>{album.title}</Typography>
                  <div className="liInnerdiv">
                    <TextField
                      id="standard-basic"
                      label="Rename Album"
                      placeholder="Type new name here"
                      variant="standard"
                      onChange={(e) =>
                        setAlbums(
                          albums.map((a) =>
                            a.id === album.id
                              ? { ...a, title: e.target.value }
                              : a
                          )
                        )
                      }
                    />
                    <div className="actionButtonForm">
                      <Button
                        variant="contained"
                        endIcon={<CheckIcon />}
                        onClick={() => handleUpdateAlbum(album.id, album.title)}
                      >
                        Done
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteAlbum(album.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {showAddAlbumModal && (
        <div className="listModal">
          <div className="modal-content">
            <div className="modelHead">
              <h4>Add Album</h4>

              <IconButton
                color="secondary"
                aria-label="close"
                onClick={() => setShowAddAlbumModal(false)}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className="addContent">
              <div className="addmodel">
                <TextField
                  id="standard-basic"
                  label="Create New"
                  placeholder="ex: New Album"
                  variant="standard"
                  value={newAlbumTitle}
                  nChange={(e) => setNewAlbumTitle(e.target.value)}
                />

                <Button
                  variant="contained"
                  startIcon={<CheckIcon />}
                  onClick={handleAddAlbum}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
