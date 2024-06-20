import React from "react";
import { Link } from "react-router-dom";
import "../pages/AboutPageStyle.css";
import "../components/NavBar.css";
import Chan from "../pages/ProfileImage/Chan.jpg";
import Brian from "../pages/ProfileImage/brian-business.jpeg";
import Kanaka from "../pages/ProfileImage/Kanaka.jpg";


function AboutPage() {
  const profiles = [
    {
      name: "Brian Palmiero",
      description: "ipsum",
      imageUrl: Brian,
      github: "https://github.com/bpalmiero85",
      linkedin: "",
      backgroundColor: "#e16577", // Example background color for the first profile
    },
    {
      name: "Kanaka M",
      description:
        "Mom in tech, junior full-stack developer crafting user-centric solutions with Java expertise.",
      imageUrl: Kanaka,
      github: "https://github.com/kanaka19",
      linkedin: "https://www.linkedin.com/in/kanaka-meier-b431a2129/",
      backgroundColor: "#e16577" 
    },
    {
      name: "Chan Lee",
      description: "Amateur coder doing amateur work for fun.",
      projects: "Projects: RPSJokerAce Game, Dice Game",
      imageUrl: Chan,
      github: "https://github.com/Amritlee",
      linkedin: "",

    },
  ];

  return (
    <div className="about-page">
      <div className="profile-cards">
        {profiles.map((profile, index) => (
          <div
            className="profile-card"
            key={index}
            style={{ backgroundColor: profile.backgroundColor }}
          >
            <img
              src={profile.imageUrl}
              alt={`${profile.name}`}
              className="profile-image"
            />
            <h2>{profile.name}</h2>
            <p className="description">{profile.description}</p>
            {profile.projects && <p className="projects">{profile.projects}</p>}
            <div className="social-icons">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill-rule="evenodd"
                    fill="#181717"
                    d="M12 .5c-6.62 0-12 5.38-12 12 0 5.3 3.44 9.79 8.21 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.64-4.04-1.64-.55-1.39-1.35-1.76-1.35-1.76-1.1-.76.08-.75.08-.75 1.21.08 1.85 1.24 1.85 1.24 1.08 1.85 2.82 1.31 3.51 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.54.12-3.22 0 0 1-.32 3.3 1.23a11.42 11.42 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.68.24 2.91.12 3.22.78.84 1.24 1.91 1.24 3.23 0 4.62-2.81 5.66-5.48 5.96.43.37.81 1.1.81 2.21v3.28c0 .32.22.7.82.58 4.77-1.6 8.21-6.09 8.21-11.38 0-6.62-5.38-12-12-12z"
                  />
                </svg>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="#0077B5"
                    d="M22.23 0H1.77C.792 0 0 .775 0 1.729v20.543C0 23.224.792 24 1.77 24h20.46C23.208 24 24 23.224 24 22.272V1.729C24 .775 23.208 0 22.23 0zM7.06 20.452H3.56V9.048h3.5v11.404zm-1.75-13.05c-1.116 0-2.021-.908-2.021-2.026a2.02 2.02 0 1 1 4.042 0c0 1.117-.905 2.026-2.021 2.026zM20.452 20.452h-3.5v-5.604c0-1.338-.027-3.062-1.866-3.062-1.867 0-2.153 1.458-2.153 2.964v5.702h-3.5V9.048h3.36v1.557h.048c.467-.885 1.605-1.818 3.306-1.818 3.54 0 4.192 2.33 4.192 5.361v6.304z"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutPage;
