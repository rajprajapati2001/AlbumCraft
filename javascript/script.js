    let selectedFiles = [];

        function getPrintTimestamp() {
            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            const ts = `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
            return ` ● Printed on ${ts}`;
        }

        function triggerPrint() {
            document.getElementById('printTime').innerText = getPrintTimestamp();
            window.print();
        }

        function confirmLoadSamples() {
            if (confirm("Would you like to load the sample image gallery?")) {
                selectedFiles = sampleImages.map(img => ({
                    name: img.name,
                    date: img.date,
                    objectURL: `./gallery/${img.name}`,
                    isSample: true
                }));
                updateUI();
            }
        }

        let instructionsShown = false;
        function showLocalHostInstructions() {
            if (instructionsShown) return;
            alert(`⚠️ Sample Images Not Found!\n\nTo see samples and run this project properly:\n1. Download/Download the project folder.\n2. Put images in the same folder as this HTML.\n3. Open folder in VS Code.\n4. Run using 'Live Server' extension.`);
            instructionsShown = true;
        }

        function handleImgError(img, isSample) {
            img.src = 'https://via.placeholder.com/150?text=Missing+File';
            if (isSample) {
                img.onerror = null; 
                showLocalHostInstructions();
            }
        }

        function resetGallery() {
            if (confirm("Are you sure you want to clear all images?")) {
                selectedFiles = [];
                document.getElementById('imageUpload').value = "";
                updateUI();
            }
        }

        function formatDateTime(isoStr) {
            const d = new Date(isoStr);
            const fmt = document.getElementById('dateFormat').value;
            const is24h = document.getElementById('check24h').checked;

            const dd = String(d.getDate()).padStart(2, '0');
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const yyyy = d.getFullYear();
            const yy = String(yyyy).slice(-2);
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            let dateStr = fmt
                .replace('DD', dd)
                .replace('MMMM', months[d.getMonth()])
                .replace('MMM', shortMonths[d.getMonth()])
                .replace('MM', mm)
                .replace('YYYY', yyyy)
                .replace('YY', yy);

            let h = d.getHours();
            const m = String(d.getMinutes()).padStart(2, '0');
            let timeStr = is24h
                ? `${String(h).padStart(2, '0')}:${m}`
                : `${h % 12 || 12}:${m} ${h >= 12 ? 'PM' : 'AM'}`;

            return { dateStr, timeStr };
        }

        function updateDateFormatExamples() {
        const now = new Date();
        const options = document.querySelectorAll('#dateFormat option');
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yyyy = now.getFullYear();
        const yy = String(yyyy).slice(-2);

        options.forEach(option => {
            const fmt = option.getAttribute('data-example');
            let example = fmt
                .replace('DD', dd)
                .replace('MMMM', months[now.getMonth()])
                .replace('MMM', shortMonths[now.getMonth()])
                .replace('MM', mm)
                .replace('YYYY', yyyy)
                .replace('YY', yy);
            option.textContent = example;
        });
    }

    // Call the function when the page loads
    window.addEventListener('DOMContentLoaded', updateDateFormatExamples);


        function handleFiles(files) {
            if (files && files.length > 0) {
                selectedFiles = Array.from(files).map(file => ({
                    name: file.name,
                    date: new Date(file.lastModified).toISOString(),
                    objectURL: URL.createObjectURL(file)
                }));
                updateUI();
            }
        }

        function sortFiles() {
            const sortBy = document.getElementById('sortBy').value;
            switch (sortBy) {
                case 'name-asc': selectedFiles.sort((a, b) => a.name.localeCompare(b.name)); break;
                case 'name-desc': selectedFiles.sort((a, b) => b.name.localeCompare(a.name)); break;
                case 'date-asc': selectedFiles.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
                case 'date-desc': selectedFiles.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
            }
        }


// Global Move Helper
function moveItem(from, to) {
    const movedItem = selectedFiles.splice(from, 1)[0];
    selectedFiles.splice(to, 0, movedItem);
    renderGrid();
}



        function transformImg(idx, type) {
    const file = selectedFiles[idx];
    if (type === 'rot') file.rot = (file.rot + 90) % 360;
    if (type === 'flip') file.flip *= -1;
    
    // We re-render to ensure the grid layout adjusts to new dimensions
    renderGrid(); 
}

function removeImg(idx) {
    if(confirm("Remove this image?")) {
        selectedFiles.splice(idx, 1);
        updateUI();
    }
}

        function updateUI() {
            const cols = document.getElementById("colRange").value;
            const rad = document.getElementById("radiusRange").value;
            const scale = document.getElementById("pdfScale").value;
            const bgRemove = document.getElementById("checkBgRemove").checked;

            document.getElementById('v_count').innerText = selectedFiles.length;

            document.getElementById("v_col").innerText = cols + 'x';
            document.getElementById("v_scale").innerText = parseFloat(scale).toFixed(1);
            document.getElementById("v_rad").innerText = rad + 'px';

            document.documentElement.style.setProperty('--grid-cols', cols);
            document.documentElement.style.setProperty('--img-radius', rad + 'px');
            document.documentElement.style.setProperty('--font-size', Math.max(7, 13 - cols) + 'px');

            document.documentElement.style.setProperty('--border-val', bgRemove ? '0' : '1px solid #e0e0e0');
            document.documentElement.style.setProperty('--bg-item', bgRemove ? 'transparent' : 'white');

            // Update the quality slider number (from your sample)
            document.getElementById('v_scale').innerText = scale;

            const grid = document.getElementById("mainGrid");
            grid.classList.toggle('hide-name', !document.getElementById("checkName").checked);
            grid.classList.toggle('hide-date', !document.getElementById("checkDate").checked);
            grid.classList.toggle('hide-time', !document.getElementById("checkTime").checked);
            grid.classList.toggle('hide-sep', (!document.getElementById("checkDate").checked || !document.getElementById("checkTime").checked));

            sortFiles();
            renderGrid();

            document.getElementById('dynamicFooter').style.display = selectedFiles.length > 0 ? 'flex' : 'none';

            const estSize = (0.1 + (selectedFiles.length * scale * 0.12)).toFixed(1);
            document.getElementById("sizeDisplay").innerText = `Est. PDF: ~${estSize} MB`;
        }

        async function downloadPDF() {
    // Check if there are images to export
    if (selectedFiles.length === 0) {
        alert("Please upload images first!");
        return;
    }

    const btn = document.getElementById('dlBtn');
    const scale = parseFloat(document.getElementById('pdfScale').value);

    // 1. Hide tools using a temporary CSS class
    const style = document.createElement('style');
    style.innerHTML = '.img-tools { display: none !important; }';
    document.head.appendChild(style);

    // Update footer with print timestamp before generation
    if (document.getElementById('printTime')) {
        document.getElementById('printTime').innerText = getPrintTimestamp();
    }

    // Show loading state
    const originalBtn = btn.innerHTML;
    btn.innerHTML = "<i class='fa-solid fa-spinner fa-spin'></i>";

    const opt = {
        margin: 10,
        filename: 'AlbumCraft.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: scale,
            useCORS: true,
            logging: false,
            letterRendering: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        // Target the correct container and save
        const element = document.getElementById('printArea');
        await html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error("PDF Export Error:", error);
        alert("Error generating PDF. Please try another method.");
    } finally {
        // 2. Remove the style to show tools again
        document.head.removeChild(style);
        // Restore button state
        btn.innerHTML = originalBtn;
    }
}


        window.onload = updateUI;
