document.addEventListener("DOMContentLoaded", function () {

    const themeButton = document.getElementById("themeToggle");

    console.log("Button =", themeButton);

    if (!themeButton) {
        console.log("Theme button not found");
        return;
    }

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        themeButton.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }

    themeButton.onclick = function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");
            themeButton.innerHTML = '<i class="bi bi-sun-fill"></i>';

        } else {

            localStorage.setItem("theme", "light");
            themeButton.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';

        }

    };

});
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("marksheetForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        document.getElementById("marksheetResult").style.display = "block";

        document.getElementById("marksheetResult").scrollIntoView({
            behavior: "smooth"
        });

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("assessmentForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        // Show generated report
        document.getElementById("assessmentReportResult").style.display = "block";

        // Scroll to generated report
        document.getElementById("assessmentReportResult").scrollIntoView({
            behavior: "smooth"
        });

    });

});


const pdfBtn = document.getElementById("downloadPdf");

if (pdfBtn) {

    pdfBtn.addEventListener("click", function () {

        let element;
        let filename;

        if (window.location.pathname.includes("final_marksheet.php")) {

            element = document.getElementById("marksheetResult");
            filename = "Final_Marksheet.pdf";

        } else {

            element = document.getElementById("assessmentReportResult");
            filename = "Assessment_Report.pdf";

        }

        html2pdf()
            .set({
                margin: 0.5,
                filename: filename,
                image: { type: "jpeg", quality: 1 },
                html2canvas: { scale: 2 },
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    orientation: "portrait"
                }
            })
            .from(element)
            .save();

    });

}

    
const excelBtn = document.getElementById("downloadExcel");

if (excelBtn) {

    excelBtn.addEventListener("click", function () {

        let table = document.querySelector("#assessmentReportResult table");

        if (!table) return;

        let html = table.outerHTML;

        let blob = new Blob([html], {
            type: "application/vnd.ms-excel"
        });

        let url = URL.createObjectURL(blob);

        let a = document.createElement("a");

        a.href = url;

        a.download = "AssessmentReport.xls";

        a.click();

        URL.revokeObjectURL(url);

    });

}

