export default function (element) {
    element.style.overflow = "hidden";
    element.innerHTML = element.innerText.split("").map((char) => {
        if  (char === " ") {
            return `<span class="animatedis">&nbsp;</span>`;
        }   
        return `<span class="animatedis">${char}</span>`;
    }).join("");
    return element;
}