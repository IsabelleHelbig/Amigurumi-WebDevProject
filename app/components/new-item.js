"use client";
import { useState } from "react";
import { colors } from "./colors";
import { hooks } from "./hooks";
import Script from "next/script";

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState([]);
  const [skill, setSkill] = useState("");
  const [hook, setHook] = useState("");
  const [weight, setWeight] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleColorChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add the selected color to the array
      setColor((prevColors) => [...prevColors, value]);
    } else {
      // Remove the unselected color from the array
      setColor((prevColors) => prevColors.filter((c) => c !== value));
    }
  };

  const handleUpload = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: "amimonosekai",
        upload_preset: "ml_default",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setPhotoUrl(result.info.secure_url);
        }
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!photoUrl) {
      setError(
        "We can't see your beautiful creation! Please upload a photo before submitting."
      );
      setShowError(true);
      return;
    }

    const id = Math.random().toString(36).substr(2, 9);

    const item = { id, name, color, skill, hook, weight, photoUrl };
    onAddItem(item);

    console.log(item);

    //reset form fields to initial state
    setName("");
    setColor([]);
    setSkill("");
    setHook("");
    setWeight("");
    setPhotoUrl("");
    setError("");
  };

  return (
    <div className="mt-32">
      <Script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        strategy="beforeInteractive"
      />
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-4 rounded shadow-lg text-center max-w-sm">
            {/* Close Button */}
            <button
              onClick={() => setShowError(false)}
              className="absolute top-2 right-2 text-black"
            >
              X
            </button>
            <img
              src="./icons/sad.png"
              className="justify-self-center m-5 w-32"
              alt="Error Icon"
            />
            {/* Error Message */}
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="m-4">
        <div className="bg-slate-500 p-3 rounded-md">
          <div className=" flex">
            {/* Photo */}
            <div className="rounded-md bg-slate-200 contain-content">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Uploaded"
                  className="w-full h-full object-contain"
                />
              ) : (
                <button
                  type="button"
                  onClick={handleUpload}
                  className="mb-5 mx-20"
                >
                  <img src="./icons/photo.png" className="mt-10 mb-5" />
                  Add a photos
                </button>
              )}
            </div>

            <div className="flex flex-col">
              {/* item name */}
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name your creation"
                required
                className="rounded-md p-3 outline-none m-3"
              />

              {/* skill */}
              <select
                value={skill}
                onChange={(event) => setSkill(event.target.value)}
                className="rounded-md m-3"
              >
                <option value="" disabled>
                  Select Skill Level
                </option>
                <option value="Easy">Easy</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              {/* hook */}
              <select
                value={hook} // Bind the selected value to state
                onChange={(event) => setHook(event.target.value)}
                className="rounded-md m-3"
              >
                <option value="" disabled>
                  Select Hook Size
                </option>
                {hooks.map(({ metric, us }, index) => (
                  <option key={index} value={`${metric} / ${us}`}>
                    {`${metric} / ${us}`}
                  </option>
                ))}
              </select>

              {/*color */}
              <ul>
                {colors.map(({ name }, index) => {
                  return (
                    <li key={index}>
                      <input
                        type="checkbox"
                        id={`color-${index}`}
                        value={name}
                        checked={color.includes(name)}
                        onChange={handleColorChange}
                        className="ml-3 "
                      />
                      <label
                        htmlFor={`color-${index}`}
                        className="text-white ml-1"
                      >
                        {name}
                      </label>
                    </li>
                  );
                })}
              </ul>

              {/* weight */}
              <select
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                className="rounded-md m-3"
              >
                <option value="" disabled>
                  Select Yarn Weight
                </option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-400 hover:scale-110 transition-transform duration-200 rounded-md p-2 w-80 mt-10 mb-2"
            >
              Done
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
