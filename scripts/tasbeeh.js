document.addEventListener("DOMContentLoaded", () => {
    const counterElement = document.getElementById("counter");
    const tasbeehButton = document.getElementById("tasbeeh-button");
    const resetButton = document.getElementById("reset-button");

    let counter = 0;

    // زيادة العد عند النقر على زر "سبحان الله"
    tasbeehButton.addEventListener("click", () => {
        counter++;
        counterElement.textContent = counter;
    });

    // إعادة العد للصفر عند النقر على زر "إعادة العد"
    resetButton.addEventListener("click", () => {
        counter = 0;
        counterElement.textContent = counter;
    });
});
