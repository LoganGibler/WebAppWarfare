import React, { useState, useEffect } from "react";
import "../css/homelab.css";

const HomeLab = () => {
  return (
    <div className="homelab-outside-div">
      <div className="homelab-main-div">
        <h3 className="homelab-title">Create a Home Lab</h3>
        <div className="homelab-img-p-div">
          <img
            src="data:image/jpeg;base64,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"
            className="homelab-img"
          ></img>
          <p className="homelab-intro-p">
            Creating a home lab is the first step to start your hacking journey!
            This guide will go over how to install virtualbox, kali linux, and
            downloading vulnerable target boxes to practice on. Once your home
            lab is complete, please remember to only attack or practice on hosts
            you have permission to practice on. Please feel free to follow any
            guides that are on this site.
          </p>
        </div>
        <p className="homelab-first-p">
          First, we will install virtualbox so we can use and manage our own
          virtual machines. A virtual machine is essentially a computer that
          runs off of your host machine, capable of running different operating
          systems- from any linux distro, windows, or MacOS. It also provides
          some additional security compared to attacking targets from your host
          pc.
        </p>
        <p className="homelab-second-p">
          Before we begin, we need to make sure virtualization is enabled in
          your BIOS settings. Most computers access BIOS by restarting your
          computer, and as it is booting up you spam f2 or f12. From there,
          navigate to the virtualization setting and enable it. This process is
          different for most computers, so if you have trouble findng it no
          worries, google is your friend!
        </p>
      </div>
    </div>
  );
};

export default HomeLab;
