
const sampleImages = [
    { name: "image-filmstrip-0.jpg", date: "2026-03-03T17:28:00" },
    { name: "image-filmstrip-1.jpg", date: "2026-03-03T17:27:00" },
    { name: "image-filmstrip-2.jpg", date: "2026-03-03T17:27:00" },
    { name: "image-filmstrip-3.jpg", date: "2026-03-03T17:27:00" },
    { name: "image-filmstrip-4.jpg", date: "2026-03-03T17:27:00" },
    { name: "image-filmstrip-5.jpg", date: "2026-03-03T17:27:00" },
    { name: "image-filmstrip-6.jpg", date: "2026-03-03T17:27:00" },
    { name: "image-filmstrip-7.jpg", date: "2026-03-03T17:27:00" },
    { name: "image-filmstrip-8.jpg", date: "2026-03-03T17:27:00" },
    { name: "image-filmstrip-9.jpg", date: "2026-03-03T17:27:00" }
];


/*
================================================================================
  AI FILE SCRIPT GENERATE AlbumCraft (USING AI)
================================================================================
Copy this Promt and past this AI :-

This is the main code Structure you have to follow 
const sampleImages = [
    { name: "image-filmstrip-0.jpg", date: "2026-03-03T17:28:00" },
    { name: "image-filmstrip-1.jpg", date: "2026-03-03T17:27:00" },
    { name: "image-filmstrip-2.jpg", date: "2026-03-03T17:27:00" },
    { name: "image-filmstrip-3.jpg", date: "2026-03-03T17:27:00" },
    { name: "image-filmstrip-4.jpg", date: "2026-03-03T17:27:00" },
    { name: "image-filmstrip-5.jpg", date: "2026-03-03T17:27:00" }
];
and this are the file data that you have to Arrange and place in to the code structure 
 
================================================================================
 PAST YOUR CMD OUTPUT := 
 example
03-Mar-26  05:28 PM             16461 image-filmstrip-0.jpg
03-Mar-26  05:27 PM             16113 image-filmstrip-1.jpg
03-Mar-26  05:27 PM             16592 image-filmstrip-2.jpg
03-Mar-26  05:27 PM             16908 image-filmstrip-3.jpg
03-Mar-26  05:27 PM             15893 image-filmstrip-4.jpg
03-Mar-26  05:27 PM             16174 image-filmstrip-5.jpg
================================================================================
*/


/*
================================================================================
  HOW TO GET IMAGE LIST FOR AlbumCraft (Windows/macOS/Linux)
================================================================================

--- WINDOWS (CMD) ---
1. Open Command Prompt in your image folder:
   - Press Win + R, type `cmd`, and hit Enter.
   - Navigate to your folder: `cd "C:\Your\Folder\Path"`.

2. Run this command to list images with creation dates:
   dir "*.jpg" "*.jpeg" "*.png" /T:W /-C

3. Format the output for `sampleImages`:
   { name: "image1.jpg", date: "YYYY-MM-DDTHH:MM:SS" },

--- macOS (Terminal) ---
1. Open Terminal in your image folder:
   - Open Terminal, then run: `cd /Your/Folder/Path`.

2. Run this command to list images with creation dates:
   stat -f "%N %SB" -t "%Y-%m-%dT%H:%M:%S" *.{jpg,jpeg,png}

3. Format the output for `sampleImages`:
   { name: "image1.jpg", date: "YYYY-MM-DDTHH:MM:SS" },

--- LINUX (Terminal) ---
1. Open Terminal in your image folder:
   - Open Terminal, then run: `cd /your/folder/path`.

2. Run this command to list images with creation dates:
   stat -c "%n %w" *.{jpg,jpeg,png}

3. Format the output for `sampleImages`:
   { name: "image1.jpg", date: "YYYY-MM-DDTHH:MM:SS" },

================================================================================
*/