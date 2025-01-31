import React, { useState } from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";

import { data } from "../feed/stories/data";
import { Link } from "react-router-dom";
function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [filter, setFilter] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(null);
  const [showImg, setShowImg] = useState(null);
  const [desc, setDesc] = useState("");
  // handleFilter
  const handleFilter = () => {
    setFilterData(
      data.filter((val) =>
        val.username.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };
  // handleCancel
  const handleCancel = () => {
    setImage("");
    setShowImg("");
    setDesc("");
    setModal(false);
  };
  //handleChange
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setShowImg(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <div className="navbar">
      {/* Overlay */}
      {modal && (
        <div className="overlay">
          <p className="dismiss__overlay" onClick={() => setModal(false)}>
            &times;
          </p>
          <div className="post__container">
            {/* header */}
            <div className="post__header">
              <p>Create new post</p>
            </div>
            {/* body */}
            <div className="post__body">
              <textarea placeholder="Description..." />
              {showImg && <img src={showImg} />}
              <label>
                <input type="file" onChange={handleChange} />
                <AddCircleOutline />
              </label>
            </div>
            {/* header */}
            <div className="post__footer">
              <button className="cancel__btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="post__btn">Post</button>
            </div>
          </div>
        </div>
      )}
      {/* Logo  */}
      <div className="dropdown">
        <Link to="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png?20160616034027" />
        </Link>
        <KeyboardArrowDownOutlinedIcon
          fontSize="medium"
          onClick={() => setShowDropdown(!showDropdown)}
        />

        {/* dropdown box */}
        {showDropdown && (
          <div className="dropdown__box">
            <div className="list__item">
              <GroupAddOutlinedIcon />
              <p>Following</p>
            </div>
            <div className="list__item">
              <StarBorderPurple500OutlinedIcon />
              <p>Favorites</p>
            </div>
          </div>
        )}
      </div>

      {/* SearchBox */}
      <div className="searchbox">
        <SearchIcon className="search__icon" />
        <input
          type="text"
          placeholder="Search"
          value={filter}
          onFocus={() => setShowSearchBox(true)}
          onChange={(e) => setFilter(e.target.value)}
          onKeyUp={handleFilter}
        />

        {/* Search Box */}
        {showSearchBox && (
          <div className="dropdown__box">
            <p
              className="dismiss__searchbox"
              onClick={() => setShowSearchBox(false)}
            >
              &times;
            </p>
            <div
              style={{
                width: "100%",
                textAlign: "left",
              }}
            >
              {/* Searchded Data */}
              {filter && filterData.length > 0 ? (
                filterData.map((filter) => (
                  <div className="filter__data">
                    <img src={filter.img} />
                    <p>{filter.username}</p>
                  </div>
                ))
              ) : (
                <>
                  <p style={{ fontWeight: "bold" }}>Recent</p>
                  <div className="empty">
                    <p>No recent searches.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Menu */}
      <div className="right__menu">
        <HomeIcon />
        <ControlPointIcon onClick={() => setModal(true)} />
        <ExploreOutlinedIcon />
        <FavoriteBorderIcon />
        <img
          src="https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="profile image"
          onClick={() => setShowProfile(!showProfile)}
        />
        {/* Profile Dropdown */}
        {showProfile && (
          <div className="dropdown__box">
            <Link to="/profile">
              <div className="list__item">
                <AccountCircleOutlinedIcon />
                <p>Profile</p>
              </div>
            </Link>
            <div className="list__item">
              <BookmarkBorderOutlinedIcon />
              <p>Saved</p>
            </div>
            <div className="list__item">
              <SettingsOutlinedIcon />
              <p>Setting</p>
            </div>
            <div className="list__item">
              <AutorenewOutlinedIcon />
              <p>Switch</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
