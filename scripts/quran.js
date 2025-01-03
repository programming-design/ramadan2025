document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "https://api.alquran.cloud/v1/surah";
    const surahListElement = document.getElementById("surahList");
    const surahContentElement = document.getElementById("surahContent");
    const surahTitleElement = document.getElementById("surahTitle");
    const textContentElement = document.getElementById("textContent");
    const audioPlayerElement = document.getElementById("audioPlayer");
    const closeButton = document.getElementById("closeButton");

    try {
        // جلب قائمة السور من API
        const response = await fetch(API_URL);
        const data = await response.json();

        data.data.forEach((surah) => {
            const button = document.createElement("button");
            button.textContent = surah.name;
            button.addEventListener("click", () => loadSurah(surah.number, surah.name));
            surahListElement.appendChild(button);
        });
    } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
    }

    const loadSurah = async (surahNumber, surahName) => {
        try {
            const response = await fetch(`${API_URL}/${surahNumber}`);
            const data = await response.json();
            const ayahs = data.data.ayahs.map(ayah => ayah.text).join(" ");
            const audioUrl = data.data.ayahs[0].audio;

            surahTitleElement.textContent = surahName;
            textContentElement.textContent = ayahs;
            audioPlayerElement.src = audioUrl;

            surahContentElement.style.display = "block";
        } catch (error) {
            console.error("حدث خطأ أثناء تحميل السورة:", error);
        }
    };

    closeButton.addEventListener("click", () => {
        surahContentElement.style.display = "none";
        audioPlayerElement.pause();
    });
});

