"use client";

import React, { useRef, useState, useEffect, useContext } from "react";
import styles from "./page.module.scss";
import { ProfilePicture } from "@/common/profilePicture/ProfilePicture";
import WorkProfile from "../components/common/myProfile/WorkProfile";
import MyEmployment from "../components/common/myEmployment/MyEmployment";
import MyBasics from "../components/common/myBasics/MyBasics";
import MePageWelcome from '../components/common/welcomePage/MePageWelcome'
import { UserContext } from "./contexts/UserContext";

export default function Home() {
  const { fetchUserData, fetchEmploymentData, fetchWorkProfileData } =
    useContext(UserContext);

  const rowToFixup = useRef<HTMLDivElement>(null);
  const [expandedOption, setExpandedOption] = useState<string | null>(null);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  useEffect(() => {
    const onOrientationChange = () => {
      if (!rowToFixup.current) return;
      rowToFixup.current.style.display = "block";
      setTimeout(() => {
        if (rowToFixup.current) {
          rowToFixup.current.style.display = "flex";
        }
      }, 100);
    };

    window.addEventListener("orientationchange", onOrientationChange);
    return () => {
      window.removeEventListener("orientationchange", onOrientationChange);
    };
  }, []);

  useEffect(() => {
    if (selectedChild === "userinfo") {
      fetchUserData();
    }
    if (selectedChild === "employment") {
      fetchEmploymentData();
    }
    if (selectedChild === "profile") {
      fetchWorkProfileData();
    }
  }, [selectedChild, fetchUserData, fetchEmploymentData, fetchWorkProfileData]);

  const toggleExpand = (option: string) => {
    setExpandedOption(expandedOption === option ? null : option);
    setSelectedChild(null);
  };

  const renderContent = () => {
    if (selectedChild === "userinfo") {
      return <MyBasics />;
    }
    if (selectedChild === "employment") {
      return <MyEmployment />;
    }
    if (selectedChild === "profile") {
      return <WorkProfile />;
    }

    return (
      <div className={styles.defaultContent}>
        {/* <img
          src="/default-image.png"
          alt="Welcome"
          className={styles.defaultImage}
        />
        <p>
          Welcome to the profile page! Please select an option to view details.
        </p> */}
        <MePageWelcome />
      </div>
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.profileAndNav}>
        <div className={styles.profile}>
          <ProfilePicture />
          <p className={styles.text}>
            Click on the image above to change your profile picture.
          </p>
        </div>
        <div>
          <button onClick={() => toggleExpand("userinfo")}>
            General Information {expandedOption === "userinfo" ? "▲" : "▼"}
          </button>
          {expandedOption === "userinfo" && (
            <div className={styles.subOptions}>
              <button onClick={() => setSelectedChild("userinfo")}>
                My Basics
              </button>
              <button onClick={() => setSelectedChild("employment")}>
                My Employment
              </button>
            </div>
          )}
          <button onClick={() => setSelectedChild("profile")}>
            My Profile
          </button>
        </div>
      </div>

      <div className={styles.contentWrapper}>{renderContent()}</div>
    </div>
  );
}
