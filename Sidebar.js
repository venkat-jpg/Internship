import React, { useState } from 'react';
import "./css/sidebar.css";
import AddIcon from '@mui/icons-material/Add';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import DevicesSharpIcon from '@mui/icons-material/DevicesSharp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { Modal } from '@mui/material';
import { db, storage } from './firebase';
import firebase from 'firebase';

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("MyDrive");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();
    setUploading(true);

    storage.ref(`files/${file.name}`).put(file).then((snapshot) => {
      storage.ref("files").child(file.name).getDownloadURL().then((url) => {
        db.collection("myfiles").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          filename: file.name,
          fileURL: url,
          size: snapshot._delegate.bytesTransferred
        });

        setUploading(false);
        setFile(null);
        setOpen(false);
      });
    });
  };

  // Function to handle option selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // Implement the logic to show the files according to the selected option.
    // For example, if the option is "Starred", you can fetch and display only the starred files from the database.
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className='modal_pop'>
          <form>
            <div className='modalHeading'>
              <h3>Select file you want to upload</h3>
            </div>
            <div className='modalBody'>
              {uploading ? (
                <p className='uploading'>Uploading</p>
              ) : (
                <>
                  <input type='file' onChange={handleChange} />
                  <input type='submit' className='post__submit' onClick={handleUpload} />
                </>
              )}
            </div>
          </form>
        </div>
      </Modal>

      <div className='sidebar'>
        <div className='sidebar_btn'>
          <button onClick={handleOpen}>
            <AddIcon />
            <span>New</span>
          </button>
        </div>

        <div className='sidebar_options'>
          <div
            className={`sidebar_option ${
              selectedOption === "MyDrive" ? "sidebar_option-Active" : ""
            }`}
            onClick={() => handleOptionClick("MyDrive")}
          >
            <MobileScreenShareIcon />
            <span> <b>My Drive</b></span>
          </div>
          <div
            className={`sidebar_option ${
              selectedOption === "Computer" ? "sidebar_option-Active" : ""
            }`}
            onClick={() => handleOptionClick("Computer")}
          >
            <DevicesSharpIcon />
            <span> Computer</span>
          </div>
          <div
            className={`sidebar_option ${
              selectedOption === "ShareWithMe" ? "sidebar_option-Active" : ""
            }`}
            onClick={() => handleOptionClick("ShareWithMe")}
          >
            <PeopleAltIcon />
            <span> Share with me</span>
          </div>
          <div
            className={`sidebar_option ${
              selectedOption === "Recent" ? "sidebar_option-Active" : ""
            }`}
            onClick={() => handleOptionClick("Recent")}
          >
            <QueryBuilderIcon />
            <span> Recent</span>
          </div>
          <div
            className={`sidebar_option ${
              selectedOption === "Starred" ? "sidebar_option-Active" : ""
            }`}
            onClick={() => handleOptionClick("Starred")}
          >
            <StarBorderIcon />
            <span> Starred</span>
          </div>
          <div
            className={`sidebar_option ${
              selectedOption === "Trash" ? "sidebar_option-Active" : ""
            }`}
            onClick={() => handleOptionClick("Trash")}
          >
            <DeleteOutlineIcon />
            <span> Trash</span>
          </div>
        </div>
        <hr />
        <div className='sidebar_options'>
          <div className='sidebar_option'>
            <CloudQueueIcon />
            <span> Storage</span>
          </div>
          <div className='progress_bar'>
            <progress size='tiny' value="50" max="100" />
            <span>6.45 GB of 15 GB used</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
